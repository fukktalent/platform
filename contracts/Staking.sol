//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Voting.sol";

/// @title staking contract for stake uniswap v2 lp tokens
/// @dev reward calculates every rewardPeriod and depends on rewardPercent and lpAmount per period
contract Staking is AccessControl {
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    struct Stake {
        uint256 lpAmount;
        uint256 rewardAmount;
        uint32 startTime;
    }

    IERC20 private tokenPair;
    IERC20 private rewardToken;

    address private _votingAddress;

    mapping(address => Stake) private _stakes;

    uint32 private _freezePeriod;
    uint32 private _rewardPeriod = 7 days;
    uint32 private _rewardPercent = 3;

    event Staked(address from, uint256 amount);
    event Unstaked(address to, uint256 amount);
    event Claimed(address to, uint256 amount);

    error TokensFreezed();
    error ActiveVotingExists();
    error ZeroRewards();

    /// @notice sets state and roles
    /// @param tokenPair_ address of staking lp token
    /// @param rewardToken_ address of reward token
    /// @param votingAddress address of dao voting contract
    constructor(IERC20 tokenPair_, IERC20 rewardToken_, address votingAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DAO_ROLE, votingAddress);
        _setRoleAdmin(DAO_ROLE, DEFAULT_ADMIN_ROLE);
        tokenPair = tokenPair_;
        rewardToken = rewardToken_;
        _votingAddress = votingAddress;
    }

    /// @notice stake lp tokens
    /// @param amount of lp tokens
    function stake(uint256 amount) public {
        tokenPair.transferFrom(msg.sender, address(this), amount);

        _stakes[msg.sender].rewardAmount += _calcReward(msg.sender);
        _stakes[msg.sender].lpAmount += amount;
        _stakes[msg.sender].startTime = uint32(block.timestamp);

        emit Staked(msg.sender, amount);
    }

    /// @notice unstake all lp tokens
    function unstake() public {
        if (block.timestamp < _stakes[msg.sender].startTime + _freezePeriod) {
            revert TokensFreezed();
        }

        uint32 lastFinishDate = Voting(_votingAddress).lastFinishDate(
            msg.sender
        );
        if (block.timestamp < lastFinishDate) {
            revert ActiveVotingExists();
        }

        _stakes[msg.sender].rewardAmount += _calcReward(msg.sender);
        uint256 lpAmount = _stakes[msg.sender].lpAmount;
        _stakes[msg.sender].lpAmount = 0;
        tokenPair.transfer(msg.sender, lpAmount);

        emit Unstaked(msg.sender, lpAmount);
    }

    /// @notice claim reward tokens
    function claim() public {
        uint256 rewardAmount = _stakes[msg.sender].rewardAmount +
            _calcReward(msg.sender);
        if (rewardAmount == 0) revert ZeroRewards();

        _stakes[msg.sender].rewardAmount = 0;
        _stakes[msg.sender].startTime = uint32(block.timestamp);
        rewardToken.transfer(msg.sender, rewardAmount);

        emit Claimed(msg.sender, rewardAmount);
    }

    /// @notice sets freeze period
    /// @param freezePeriod_ freeze period in seconds
    function setFreezePeriod(uint32 freezePeriod_) external onlyRole(DAO_ROLE) {
        _freezePeriod = freezePeriod_;
    }

    /// @notice sets reward period
    /// @param rewardPeriod_ reward period in seconds
    function setRewardPeriod(uint32 rewardPeriod_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _rewardPeriod = rewardPeriod_;
    }

    /// @notice sets reward percent
    /// @param rewardPercent_ reward percent
    function setRewardPercent(uint32 rewardPercent_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _rewardPercent = rewardPercent_;
    }

    /// @notice returns stake info
    /// @param addr address of user
    /// @return Stake stake info
    function getStakeData(address addr) external view returns (Stake memory) {
        return _stakes[addr];
    }

    /// @notice returns freeze period
    /// @return _freezePeriod freeze period in seconds
    function freezePeriod() external view returns (uint32) {
        return _freezePeriod;
    }

    /// @notice returns reward period
    /// @return _rewardPeriod reward period  in seconds
    function rewardPeriod() external view returns (uint32) {
        return _rewardPeriod;
    }

    /// @notice returns reward percent
    /// @return _rewardPercent reward percent
    function rewardPercent() external view returns (uint32) {
        return _rewardPercent;
    }

    /// @notice calculates amount of reward tokens for period
    /// @param addr address of user
    /// @return reward tokens amount
    function _calcReward(address addr) private view returns (uint256) {
        uint256 rewardPeriodsCount = (block.timestamp -
            _stakes[addr].startTime) / _rewardPeriod;
        return
            (rewardPeriodsCount * _stakes[addr].lpAmount * _rewardPercent) / 100;
    }
}
