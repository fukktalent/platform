//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./Staking.sol";
import "./uniswap/IUniswapV2Router02.sol";
import "./ACDMToken.sol";
import "./XXXToken.sol";

/// @title DAO Voting contract
/// @author fukktalent
/// @notice voting for purposes. one token is one vote
contract Platform is AccessControl, ReentrancyGuard {
    uint8 private constant TOKEN_DECIMALS = 6;
    bytes32 private constant DAO_ROLE = keccak256("DAO_ROLE");
    address private constant UNI_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    using Address for address payable;

    enum Rounds {
        Sale,
        Trade
    }

    struct User {
        address referrer;
        bool isRegistered;
    }

    struct Order {
        address owner;
        uint256 amount;
        uint256 price;
    }

    address private _owner;

    Rounds private _round;
    uint32 private _roundFinishDate;
    uint256 private _tokenPrice = 10_000 gwei;
    uint256 private _tokenAmount = 100_000 * (10**TOKEN_DECIMALS);
    uint256 private _tokensSoldInEth = 0;

    ACDMToken private _acdmToken;
    XXXToken private _xxxToken;

    uint32 private _roundTime;
    uint256 private _minTokensToStartTrade = 1 * (10**TOKEN_DECIMALS);

    mapping(address => User) private _users;

    mapping(uint256 => Order) private _orders;
    uint256 private _ordersCount;

    uint256 private _daoBalance;

    uint16 private _saleRef1Percent = 50;
    uint16 private _saleRef2Percent = 30;
    uint16 private _tradeRef1Percent = 25;
    uint16 private _tradeRef2Percent = 25;
    uint8 private _refPercentDecimals = 1;

    modifier atRound(Rounds round_) {
        if (_round != round_) revert FunctionInvalidAtThisRound();
        _;
    }

    modifier notZeroDaoBalance() {
        if (_daoBalance == 0) revert NotEnoughTokensExists();
        _;
    }

    modifier onlyRegistered() {
        if (!_users[msg.sender].isRegistered) {
            revert UserIsNotRegistered(msg.sender);
        }
        _;
    }

    /// @notice when started new round
    /// @param round type of round: sale or trade
    /// @param roundFinishDate round finish timestamp
    event RoundStarted(Rounds round, uint32 roundFinishDate);

    /// @notice when sold tokens in sale round
    /// @param buyer type of round: sale or trade
    /// @param amount round finish timestamp
    /// @param price round finish timestamp
    event TokensSold(address buyer, uint256 amount, uint256 price);

    /// @notice when order was created in trade round
    /// @param orderId order id
    /// @param order order info
    event OrderCreated(uint256 orderId, Order order);

    /// @notice when order was redeemed in trade round
    /// @param orderId order id
    /// @param buyer buyer address
    /// @param amount amount of purchased tokens
    event OrderRedeemed(uint256 orderId, address buyer, uint256 amount);

    /// @notice when order was removed in trade round
    /// @param orderId order id
    event OrderRemoved(uint256 orderId);

    error FunctionInvalidAtThisRound();
    error UserIsNotRegistered(address);
    error UserAlreadyRegistered(address);
    error NotEnoughEtherSent();
    error NotEnoughTokensExists();
    error NotOwner();
    error NotRegistered();
    error EarlyToStartNextRound();
    error InvalidReferrer();

    /// @notice set up state, roles and start trade round
    /// @param acdmToken_ address of acdm token
    /// @param xxxToken_ address of xxx token
    /// @param roundTime_ duration time of every round in seconds
    /// @param votingAddress dao voting address
    constructor(
        ACDMToken acdmToken_,
        XXXToken xxxToken_,
        uint32 roundTime_,
        address votingAddress
    ) {
        _acdmToken = acdmToken_;
        _xxxToken = xxxToken_;
        _roundTime = roundTime_;
        _owner = msg.sender;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DAO_ROLE, votingAddress);
        _setRoleAdmin(DAO_ROLE, DEFAULT_ADMIN_ROLE);

        _nextRound(Rounds.Sale);
    }

    /// @notice register user
    function register() public {
        if (_users[msg.sender].isRegistered) {
            revert UserAlreadyRegistered(msg.sender);
        }

        _users[msg.sender].isRegistered = true;
    }

    /// @notice register user and sets their referrer
    /// @param referrer address of referrer
    function register(address referrer) external {
        if (referrer == msg.sender) revert InvalidReferrer();
        if (!_users[referrer].isRegistered) {
            revert UserIsNotRegistered(referrer);
        }

        register();

        _users[msg.sender].referrer = referrer;
    }

    /// @notice mint needed tokens amount for ether
    ///         reward referrers if they exist
    /// @param amount needed tokens amount
    function buyACDM(
        uint256 amount
    ) 
        external
        payable
        atRound(Rounds.Sale)
        onlyRegistered()
    {
        if (amount > _tokenAmount) revert NotEnoughTokensExists();

        uint256 ethNeeded = (amount * _tokenPrice) / (10**TOKEN_DECIMALS);
        if (ethNeeded > msg.value) revert NotEnoughEtherSent();

        _acdmToken.mint(msg.sender, amount);

        _tokenAmount -= amount;

        _payback(ethNeeded);
        _refReward(ethNeeded, _saleRef1Percent, _saleRef2Percent);

        emit TokensSold(msg.sender, amount, _tokenPrice);
    }

    /// @notice creates sell order
    /// @param amount tokens amount to place in order
    /// @param price price of one token
    function addOrder(
        uint256 amount,
        uint256 price
    )
        external
        atRound(Rounds.Trade)
        onlyRegistered()
    {
        _acdmToken.transferFrom(msg.sender, address(this), amount);

        _ordersCount++;
        Order storage order_ = _orders[_ordersCount];
        order_.amount = amount;
        order_.price = price;
        order_.owner = msg.sender;

        emit OrderCreated(_ordersCount, order_);
    }

    /// @notice removes sell order
    /// @param orderId id of order
    function removeOrder(
        uint64 orderId
    )
        external
        atRound(Rounds.Trade)
        onlyRegistered()
    {
        if (_orders[orderId].owner != msg.sender) revert NotOwner();

        _acdmToken.transfer(msg.sender, _orders[orderId].amount);
        delete _orders[orderId];

        emit OrderRemoved(_ordersCount);
    }

    /// @notice buy tokens from order for ether
    ///         reward referrers if they exist
    /// @dev updates _tokensSoldInEth
    /// @param orderId id of order
    /// @param amount tokens amount to buy
    function redeemOrder(
        uint64 orderId,
        uint256 amount
    )
        external
        payable
        atRound(Rounds.Trade)
        nonReentrant()
        onlyRegistered()
    {
        Order storage order_ = _orders[orderId];

        if (order_.amount < amount) revert NotEnoughTokensExists();

        uint256 ethNeeded = (amount * order_.price) / (10**TOKEN_DECIMALS);

        if (ethNeeded > msg.value) revert NotEnoughEtherSent();

        _acdmToken.transfer(msg.sender, amount);

        order_.amount -= amount;
        _tokensSoldInEth += ethNeeded;

        uint256 refsAmount = _tradeRef1Percent + _tradeRef2Percent;
        uint256 fullShare = 100 * (10**_refPercentDecimals); // 100%
        payable(order_.owner).sendValue(
            (ethNeeded * (fullShare - refsAmount) / fullShare)
        );

        _payback(ethNeeded);
        _refReward(ethNeeded, _tradeRef1Percent, _tradeRef2Percent);

        emit OrderRedeemed(orderId, msg.sender, amount);
    }

    /// @notice buys xxx tokens for dao ether and burns it
    function buyAndBurnXXXToken() 
        external 
        onlyRole(DAO_ROLE) 
        notZeroDaoBalance() 
    {
        IERC20(IUniswapV2Router02(UNI_ROUTER).WETH()).approve(UNI_ROUTER, _daoBalance);

        address[] memory path = new address[](2);
        path[0] = IUniswapV2Router02(UNI_ROUTER).WETH();
        path[1] = address(_xxxToken);

        uint256[] memory amounts = IUniswapV2Router02(UNI_ROUTER)
            .swapExactETHForTokens{value: _daoBalance}(
            0,
            path,
            address(this),
            block.timestamp + 60
        );

        _xxxToken.burn(address(this), amounts[1]);
        _daoBalance = 0;
    }

    /// @notice sends dao tokens to owner of contract
    function transferDAOEtherToOwner() 
        external 
        onlyRole(DAO_ROLE)
        notZeroDaoBalance()
    {
        uint256 toTransfer = _daoBalance;
        _daoBalance = 0;
        payable(_owner).sendValue(toTransfer);
    }

    /// @notice calc values for trade round and starts trade round
    ///         trade round can be started earlier if in sale round all tokens was sold
    function startTradeRound() 
        external 
        atRound(Rounds.Sale)
        onlyRegistered()
    {
        if (
            block.timestamp < _roundFinishDate
            && _tokenAmount > _minTokensToStartTrade
        ) {
            revert EarlyToStartNextRound();
        }

        _tokensSoldInEth = 0;
        _nextRound(Rounds.Trade);
    }

    /// @notice calc values for sale round and starts sale round
    ///         if in trade round tokens sold for 0 eth, then starts trade round again
    function startSaleRound()
        external
        atRound(Rounds.Trade)
        onlyRegistered()
    {
        if (block.timestamp < _roundFinishDate) revert EarlyToStartNextRound();

        if (_tokensSoldInEth == 0) {
            _nextRound(Rounds.Trade);
        } else {
            _tokenPrice = (_tokenPrice * 103) / 100 + 4_000 gwei;
            _tokenAmount = _tokensSoldInEth / _tokenPrice;
            _nextRound(Rounds.Sale);
        }
    }

    /// @notice Set referal settings
    /// @param saleRef1Percent percent for first referrer in sale deal
    /// @param saleRef2Percent percent for second referrer in sale deal
    /// @param tradeRef1Percent percent for first referrer in trade deal
    /// @param tradeRef2Percent percent for second referrer in trade deal
    /// @param refPercentDecimals percent decimals
    function setRefSettings(
        uint16 saleRef1Percent, 
        uint16 saleRef2Percent,
        uint16 tradeRef1Percent,
        uint16 tradeRef2Percent,
        uint8 refPercentDecimals
    ) 
        external
        onlyRole(DAO_ROLE)
    {
        _saleRef1Percent = saleRef1Percent;
        _saleRef2Percent = saleRef2Percent;
        _tradeRef1Percent = tradeRef1Percent;
        _tradeRef2Percent = tradeRef2Percent;
        _refPercentDecimals = refPercentDecimals;
    }

    /// @notice Set _setMinTokensToStartTrade
    /// @param amount the minimum amount of tokens at which trade round can be started
    function setMinTokensToStartTrade(
        uint256 amount
    ) 
        external
        onlyRole(DAO_ROLE)
    {
        _minTokensToStartTrade = amount;
    }

    /// @notice returns referal settings
    /// @return saleRef1Percent percent for first referrer in sale deal
    /// @return saleRef2Percent percent for second referrer in sale deal
    /// @return tradeRef1Percent percent for first referrer in trade deal
    /// @return tradeRef2Percent percent for second referrer in trade deal
    /// @return refPercentDecimals percent decimals
    function refSettings()
        external
        view
        returns (
            uint16 saleRef1Percent,
            uint16 saleRef2Percent,
            uint16 tradeRef1Percent,
            uint16 tradeRef2Percent,
            uint8 refPercentDecimals
        )
    {
        return (
            _saleRef1Percent,
            _saleRef2Percent,
            _tradeRef1Percent,
            _tradeRef2Percent,
            _refPercentDecimals
        );
    }

    /// @notice returns round info
    /// @return round type of round
    /// @return roundFinishDate round finish timestamp
    /// @return tokenPrice price of token in eth in sale round
    /// @return tokenAmount tokens amount sale round
    /// @return tokensSoldInEth 
    function roundData()
        external
        view
        returns (
            Rounds round,
            uint32 roundFinishDate,
            uint256 tokenPrice,
            uint256 tokenAmount,
            uint256 tokensSoldInEth
        )
    {
        return (
            _round,
            _roundFinishDate,
            _tokenPrice,
            _tokenAmount,
            _tokensSoldInEth
        );
    }

    /// @notice returns dao balance
    /// @return _daoBalance dao balance
    function daoBalance() external view returns (uint256) {
        return _daoBalance;
    }

    /// @notice returns user info
    /// @param addr address of user
    /// @return User 
    function user(address addr) external view returns (User memory) {
        return _users[addr];
    }

    /// @notice returns order info
    /// @param orderId order id
    /// @return Order
    function order(uint256 orderId) external view returns (Order memory) {
        return _orders[orderId];
    }

    /// @notice returns _minTokensToStartTrade
    /// @return _minTokensToStartTrade the minimum amount of tokens at which trade round can be started
    function minTokensToStartTrade() external view returns (uint256) {
        return _minTokensToStartTrade;
    }

    /// @notice update round type and sets new round finish date
    /// @param nextRound type of next round
    function _nextRound(Rounds nextRound) private {
        _round = nextRound;
        _roundFinishDate = uint32(block.timestamp) + _roundTime;
        emit RoundStarted(_round, _roundFinishDate);
    }

    /// @notice send reward ethers to referrers
    ///         if there are no referrers then collects ether to dao balance
    /// @param amount amount on which percent is calculated
    /// @param ref1Percent percent of reward for first referrer
    /// @param ref2Percent percent of reward for second referrer
    function _refReward(
        uint256 amount,
        uint16 ref1Percent,
        uint16 ref2Percent
    ) private {
        User storage user_ = _users[msg.sender];

        uint256 ref1Amount = amount * ref1Percent / (100 * (10**_refPercentDecimals));
        uint256 ref2Amount = amount * ref2Percent / (100 * (10**_refPercentDecimals));

        if (user_.referrer != address(0)) {
            payable(user_.referrer).sendValue(ref1Amount);

            if (_users[user_.referrer].referrer != address(0)) {
                payable(_users[user_.referrer].referrer).sendValue(ref2Amount);
            } else {
                _daoBalance += ref2Amount;
            }
        } else {
            _daoBalance += ref1Amount + ref2Amount;
        }
    }

    /// @notice payback eth if eth amount more than necessary
    /// @param ethNeeded needed eth amount to buy tokens
    function _payback(uint256 ethNeeded) private {
        if (msg.value > ethNeeded) {
            payable(msg.sender).sendValue(msg.value - ethNeeded);
        }
    }
}
