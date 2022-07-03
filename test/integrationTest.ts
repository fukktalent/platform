import { expect } from "chai";
import { ethers } from "hardhat";

import { XXXToken, XXXToken__factory, ACDMToken__factory, ACDMToken, Platform, Platform__factory, IUniswapV2Router02, IUniswapV2Factory, IERC20, IUniswapV2Pair, Voting__factory, Staking__factory, Voting, Staking } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, BigNumberish } from "ethers";

import config from "./config";

const { REF, SOME_AMOUNT } = config.PLATFORM;
const { MINIMUM_QUORUM, PERIOD_DURATION } = config.VOTING;

describe("Integration test", function () {
    let owner: SignerWithAddress;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let acc4: SignerWithAddress;

    let xxxToken: XXXToken;
    let acdmToken: ACDMToken;

    let voting: Voting;

    let staking: Staking;

    let platform: Platform;

    let daoBalance: BigNumber = ethers.constants.Zero;

    let uniRouter: IUniswapV2Router02;
    let uniFactory: IUniswapV2Factory;
    let pairToken: IUniswapV2Pair;

    before(async function() {
        [owner, acc1, acc2, acc3, acc4] = await ethers.getSigners();

        uniRouter = <IUniswapV2Router02>(await ethers.getContractAt("IUniswapV2Router02", process.env.ROUTER_ADDRESS as string));
        uniFactory = <IUniswapV2Factory>(await ethers.getContractAt("IUniswapV2Factory", process.env.FACTORY_ADDRESS as string));

        // deploy xxx token
        xxxToken = await new XXXToken__factory(owner).deploy("Token XXX", "XXX");
        await xxxToken.deployed();

        // deploy acdm token
        acdmToken = await new ACDMToken__factory(owner).deploy("Token ACDM", "ACDM");
        await acdmToken.deployed();

        // add liquidity to acdm/eth
        await xxxToken.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_BURNER_ROLE")), owner.address);
        await xxxToken.mint(owner.address, SOME_AMOUNT * 10);
        await xxxToken.approve(uniRouter.address, ethers.constants.MaxUint256);

        const deadline: BigNumberish = (await ethers.provider.getBlock("latest")).timestamp + 60;
        await uniRouter.addLiquidityETH(
            xxxToken.address,
            SOME_AMOUNT * 10,
            0,
            ethers.utils.parseEther("1"),
            owner.address, 
            deadline,
            { value: ethers.utils.parseEther("1") }
        );

        const pairAddress: string = await uniFactory.getPair(uniRouter.WETH(), xxxToken.address);
        pairToken = <IUniswapV2Pair> await ethers.getContractAt("IUniswapV2Pair", pairAddress);

        // deploy voting
        voting = await new Voting__factory(owner).deploy(PERIOD_DURATION, MINIMUM_QUORUM, owner.address);
        await voting.deployed();

        // deploy staking
        staking = await new Staking__factory(owner).deploy(
            pairToken.address,
            xxxToken.address,
            voting.address
        );
        await staking.deployed();

        await voting.setStakingAddress(staking.address);

        platform = await new Platform__factory(owner).deploy(
            acdmToken.address,
            xxxToken.address,
            60 * 60, 
            voting.address,
        );
        await platform.deployed();

        await acdmToken.grantRole(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_BURNER_ROLE")), 
            platform.address
        );

        await xxxToken.grantRole(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_BURNER_ROLE")), 
            platform.address
        );

        await pairToken.transfer(acc1.address, SOME_AMOUNT);
        await pairToken.transfer(acc2.address, SOME_AMOUNT);
        await pairToken.transfer(acc3.address, SOME_AMOUNT);
    });

    it("Customers add tokens to staking", async function() {
        await pairToken.connect(acc1).approve(staking.address, SOME_AMOUNT);
        await pairToken.connect(acc2).approve(staking.address, SOME_AMOUNT);
        await pairToken.connect(acc3).approve(staking.address, SOME_AMOUNT);

        await staking.connect(acc1).stake(SOME_AMOUNT);
        await staking.connect(acc2).stake(SOME_AMOUNT);
        await staking.connect(acc3).stake(SOME_AMOUNT);

        expect(
            (await staking.getStakeData(acc1.address)).lpAmount
        ).to.be.equal(
            SOME_AMOUNT
        );
        expect(
            (await staking.getStakeData(acc2.address)).lpAmount
        ).to.be.equal(
            SOME_AMOUNT
        );
        expect(
            (await staking.getStakeData(acc3.address)).lpAmount
        ).to.be.equal(
            SOME_AMOUNT
        );
    });

    it("Customers register in the platform", async function() {
        await platform.connect(acc1)["register()"]();
        await platform.connect(acc2)["register(address)"](acc1.address);
        await platform.connect(acc3)["register(address)"](acc2.address);
        
        expect(
            (await platform.user(acc1.address)).isRegistered
        ).to.be.equal(true);
        expect(
            (await platform.user(acc2.address)).referrer
        ).to.be.equal(acc1.address);
        expect(
            (await platform.user(acc3.address)).referrer
        ).to.be.equal(acc2.address);
    });

    it("Customers buy some tokens", async function() {
        await platform.connect(acc1).buyACDM(
            ethers.utils.parseUnits("30000", await acdmToken.decimals()),
            { value: ethers.utils.parseEther("1")}
        );

        daoBalance = daoBalance.add(
            ethers.utils.parseEther("0.3")
                .mul(REF.DEF.SALE_1_PERC + REF.DEF.SALE_2_PERC)
                .div(1000)
        );
        
        await platform.connect(acc2).buyACDM(
            ethers.utils.parseUnits("20000", await acdmToken.decimals()),
            { value: ethers.utils.parseEther("1")}
        );

        daoBalance = daoBalance.add(
            ethers.utils.parseEther("0.2")
                .mul(REF.DEF.SALE_2_PERC)
                .div(1000)
        );
        
        expect(
            await acdmToken.balanceOf(acc1.address)
        ).to.be.equal(
            ethers.utils.parseUnits("30000", await acdmToken.decimals()),
        );
        expect(
            await acdmToken.balanceOf(acc2.address)
        ).to.be.equal(
            ethers.utils.parseUnits("20000", await acdmToken.decimals()),
        );

        expect(await platform.daoBalance()).to.be.equal(daoBalance);
    });

    it("Starts trade round", async function() {
        await ethers.provider.send("evm_increaseTime", [60 * 60]);
        await ethers.provider.send("evm_mine", []);

        await platform.connect(acc1).startTradeRound();
            
        const roundData = await platform.roundData();
        expect(roundData.round).to.be.equal(1);
        expect(roundData.tokensSoldInEth).to.be.equal(0);
    })

    it("Customers create order", async function() {
        await acdmToken.connect(acc1).approve(platform.address, ethers.constants.MaxUint256);
        await platform.connect(acc1).addOrder(
            ethers.utils.parseUnits("1000", await acdmToken.decimals()),
            ethers.utils.parseEther("0.00002")
        );

        const order = await platform.order(1);
        expect(order.owner).to.be.equal(acc1.address);
        expect(order.amount).to.be.equal(
            ethers.utils.parseUnits("1000", await acdmToken.decimals()),
        );
        expect(order.price).to.be.equal(
            ethers.utils.parseEther("0.00002")
        );
    })

    it("Customers redeem order", async function() {
        const balance = await acdmToken.balanceOf(acc2.address);
        const platformBalance = await acdmToken.balanceOf(platform.address);

        await acdmToken.connect(acc2).approve(platform.address, ethers.constants.MaxUint256);
        await platform.connect(acc2).redeemOrder(
            1,
            ethers.utils.parseUnits("500", await acdmToken.decimals()),
            { value: ethers.utils.parseEther("0.01") }
        );

        expect(
            await acdmToken.balanceOf(acc2.address)
        ).to.be.equal(
            balance.add(ethers.utils.parseUnits("500", await acdmToken.decimals()))
        );

        expect(
            await acdmToken.balanceOf(platform.address)
        ).to.be.equal(
            platformBalance.sub(ethers.utils.parseUnits("500", await acdmToken.decimals()))
        );
        
        const order = await platform.order(1);
        expect(order.amount).to.be.equal(
            ethers.utils.parseUnits("500", await acdmToken.decimals()),
        );

        daoBalance = (ethers.utils.parseEther("0.01").mul(REF.DEF.TRADE_2_PERC).div(1000)).add(daoBalance);
        expect(await platform.daoBalance()).to.be.equal(daoBalance);
    })

    it("Chairman creates voting for burning xxx tokens", async function() {
        const iface = new ethers.utils.Interface([
            "function buyAndBurnXXXToken()"
        ]);
        const calldata = iface.encodeFunctionData(
            "buyAndBurnXXXToken",
            []
        );
        await voting.addProposal(calldata, platform.address, "buyAndBurnXXXToken");

        const proposal = await voting.proposal(0);
        expect(proposal.callData).to.be.equal(calldata);
        expect(proposal.recipient).to.be.equal(platform.address);
        expect(proposal.description).to.be.equal("buyAndBurnXXXToken");
        expect(proposal.votesFor).to.be.equal(0);
        expect(proposal.votesAgainst).to.be.equal(0);
    });

    it("Customers votes for proposal", async function() {
        await voting.connect(acc1).vote(0, true);
        await voting.connect(acc2).vote(0, true);
        await voting.connect(acc3).vote(0, true);

        const proposal = await voting.proposal(0);
        expect(proposal.votesFor).to.be.equal(SOME_AMOUNT * 3);
        expect(proposal.votesAgainst).to.be.equal(0);
    });

    it("Finish prooposal and burn xxx tokens", async function() {
        await ethers.provider.send("evm_increaseTime", [60 * 60]);
        await ethers.provider.send("evm_mine", []);

        const tokenSupply = await xxxToken.totalSupply();

        const tx =  await voting.finishProposal(0);

        await expect(() => tx).changeEtherBalance(
            platform,
            ethers.constants.Zero.sub(daoBalance)
        );

        const newTokenSupply = await xxxToken.totalSupply();
        expect(newTokenSupply).to.lt(tokenSupply);
    });
});
