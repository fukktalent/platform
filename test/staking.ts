import { expect } from "chai";
import { ethers } from "hardhat";

import { XXXToken, IUniswapV2Pair, Staking, IUniswapV2Factory, IUniswapV2Router02, Voting } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish } from "ethers";

import config from "./config";

const { PERIOD_DURATION, MINIMUM_QUORUM } = config.VOTING;
const { DEF_SETTINGS, NEW_SETTINGS, STAKE_AMOUNT } = config.STAKING;

describe("Staking", function () {
    let staking: Staking;

    let uniRouter: IUniswapV2Router02;
    let uniFactory: IUniswapV2Factory;

    let owner: SignerWithAddress;
    let user: SignerWithAddress;

    let xxxToken: XXXToken;
    let pair: IUniswapV2Pair;

    let voting: Voting;

    before(async function () {
        uniRouter = <IUniswapV2Router02>(await ethers.getContractAt("IUniswapV2Router02", process.env.ROUTER_ADDRESS as string));
        uniFactory = <IUniswapV2Factory>(await ethers.getContractAt("IUniswapV2Factory", process.env.FACTORY_ADDRESS as string));

        [owner, user] = await ethers.getSigners();

        // create and mint two erc20 tokens
        const erc20Factory = await ethers.getContractFactory("XXXToken", owner);
        xxxToken = <XXXToken>(await erc20Factory.deploy("Token XXX", "XXX"));
        await xxxToken.deployed();
        
        await xxxToken.grantRole(
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_BURNER_ROLE")), 
            owner.address
        );
        await xxxToken.connect(owner).mint(
            owner.address, 
            1000000000
        );

        expect(await xxxToken.balanceOf(owner.address)).to.be.equal(
            1000000000
        );

        // creating liquidity pool
        await xxxToken.approve(uniRouter.address, ethers.constants.MaxUint256);

        expect(await xxxToken.allowance(owner.address, uniRouter.address)).to.be.equal(ethers.constants.MaxUint256);

        const deadline: BigNumberish = (await ethers.provider.getBlock("latest")).timestamp + 60;
        await uniRouter.connect(owner).addLiquidityETH(
            xxxToken.address,
            1000000,
            0,
            ethers.utils.parseEther("1"),
            owner.address, 
            deadline,
            { value: ethers.utils.parseEther("1") }
        );

        // get lp pair contract
        const pairAddress: string = await uniFactory.getPair(uniRouter.WETH(), xxxToken.address);
        pair = <IUniswapV2Pair> await ethers.getContractAt("IUniswapV2Pair", pairAddress);

        const votingFactory = await ethers.getContractFactory("Voting", owner);
        voting = <Voting>(await votingFactory.deploy(PERIOD_DURATION, MINIMUM_QUORUM, owner.address));
        await voting.deployed();

        const stakingFactory = await ethers.getContractFactory("Staking", owner);
        staking = <Staking>(await stakingFactory.deploy(pair.address, xxxToken.address, voting.address));
        await staking.deployed();

        await voting.setStakingAddress(staking.address);
    });

    it("Should correct deploy contract", async function () {
        expect(await staking.freezePeriod()).to.be.equal(DEF_SETTINGS.FREEZE_PERIOD);
        expect(await staking.rewardPeriod()).to.be.equal(DEF_SETTINGS.REWARD_PERIOD);
        expect(await staking.rewardPercent()).to.be.equal(DEF_SETTINGS.REWARD_PERCENT);
    });

    it("Should approve lp to staking contract", async function () {
        await pair.approve(staking.address, STAKE_AMOUNT);
        expect(await pair.allowance(owner.address, staking.address)).to.be.equal(STAKE_AMOUNT);
    });

    it("Should mint reward tokens to staking contract", async function () {
        await xxxToken.mint(staking.address, 1_000_000_000);
        expect(await xxxToken.balanceOf(staking.address)).to.be.equal(1_000_000_000);
    });


    describe("freezePeriod", function () {
        it("Should set freeze period", async function () {
            const iface = new ethers.utils.Interface([
                "function setFreezePeriod(uint32 freezePeriod_)"
            ]);
            const calldata = iface.encodeFunctionData("setFreezePeriod", [NEW_SETTINGS.FREEZE_PERIOD]);
            await voting.addProposal(calldata, staking.address, "setFreezePeriod")

            await pair.transfer(user.address, 1001);

            await pair.connect(user).approve(staking.address, 1001);
            await staking.connect(user).stake(1001);
            await voting.connect(user).vote(0, true);
    
            await ethers.provider.send("evm_increaseTime", [61 * 60]);
            await ethers.provider.send("evm_mine", []);
    
            await voting.finishProposal(0)
            expect(await staking.freezePeriod()).to.be.equal(NEW_SETTINGS.FREEZE_PERIOD)
        });

        it("Should revert with no access error", async function () {
            const freezePeriod = await staking.freezePeriod();

            const tx = staking.connect(user).setFreezePeriod(NEW_SETTINGS.FREEZE_PERIOD);
            await expect(tx).to.be.revertedWith("AccessControl:");

            const newFreezePeriod = await staking.freezePeriod();
            expect(newFreezePeriod).to.be.equal(freezePeriod);
        });
    });

    describe("rewardPeriod", function () {
        it("Should set reward period", async function () {
            await staking.setRewardPeriod(NEW_SETTINGS.REWARD_PERIOD);
            const rewardPeriod = await staking.rewardPeriod();
            expect(rewardPeriod).to.be.equal(NEW_SETTINGS.REWARD_PERIOD);
        });

        it("Should revert with no access error", async function () {
            const rewardPeriod = await staking.rewardPeriod();

            const tx = staking.connect(user).setRewardPeriod(NEW_SETTINGS.REWARD_PERIOD);
            await expect(tx).to.be.revertedWith("AccessControl:");

            const newRewardPeriod = await staking.rewardPeriod();
            expect(newRewardPeriod).to.be.equal(rewardPeriod);
        });
    });

    describe("rewardPercent", function () {
        it("Should set reward percent", async function () {
            await staking.setRewardPercent(NEW_SETTINGS.REWARD_PERCENT);
            const rewardPercent = await staking.rewardPercent();
            expect(rewardPercent).to.be.equal(NEW_SETTINGS.REWARD_PERCENT);
        });

        it("Should revert with no access error", async function () {
            const rewardPercent = await staking.rewardPercent();

            const tx = staking.connect(user).setRewardPercent(5 * 60);
            await expect(tx).to.be.revertedWith("AccessControl:");

            const newRewardPercent = await staking.rewardPercent();
            expect(newRewardPercent).to.be.equal(rewardPercent);
        });
    });

    describe("stake", function() {
        it("Should stake lp tokens", async function () {
            const userBalance = await pair.balanceOf(owner.address);
            const stakingBalance = await pair.balanceOf(staking.address);

            const tx = staking.stake(STAKE_AMOUNT);
            await expect(tx).to.emit(staking, "Staked").withArgs(owner.address, STAKE_AMOUNT);

            expect(await pair.balanceOf(owner.address)).to.be.equal(
                userBalance.sub(STAKE_AMOUNT)
            );
            expect(await pair.balanceOf(staking.address)).to.be.equal(
                stakingBalance.add(STAKE_AMOUNT)
            );

            const stakeData = await staking.getStakeData(owner.address);
            expect(stakeData.lpAmount).to.be.equal(STAKE_AMOUNT);
            expect(stakeData.rewardAmount).to.be.equal(0);
        });
    });

    describe("claim", function() {
        it("Should revert with nothing to claim", async function () {
            const tx = staking.claim();
            await expect(tx).to.be.revertedWith("ZeroRewards");
        });

        it("Should claim reward for first reward period", async function () {
            await ethers.provider.send("evm_increaseTime", [3 * 60]);
            await ethers.provider.send("evm_mine", []);

            const userBalance = await xxxToken.balanceOf(owner.address);
            const stakingBalance = await xxxToken.balanceOf(staking.address);

            const tx = staking.claim();
            await expect(tx).to.emit(staking, "Claimed").withArgs(
                owner.address, 
                STAKE_AMOUNT * NEW_SETTINGS.REWARD_PERCENT / 100
            );

            expect(await xxxToken.balanceOf(owner.address)).to.be.equal(
              userBalance.add(STAKE_AMOUNT * NEW_SETTINGS.REWARD_PERCENT / 100)
            );
            expect(await xxxToken.balanceOf(staking.address)).to.be.equal(
              stakingBalance.sub(STAKE_AMOUNT * NEW_SETTINGS.REWARD_PERCENT / 100)
            );
        });

        it("Should claim reward for nine reward periods", async function () {
            await ethers.provider.send("evm_increaseTime", [3 * 60 * 9]);
            await ethers.provider.send("evm_mine", []);

            const tx = staking.claim();
            await expect(tx).to.emit(staking, "Claimed").withArgs(
                owner.address, 
                STAKE_AMOUNT * NEW_SETTINGS.REWARD_PERCENT / 100 * 9
            );
        });

        it("Should claim reward for five reward periods and five x2 balance reward periods", async function () {
            await ethers.provider.send("evm_increaseTime", [3 * 60 * 5]);
            await ethers.provider.send("evm_mine", []);

            await pair.approve(staking.address, STAKE_AMOUNT);
            await staking.stake(STAKE_AMOUNT);

            await ethers.provider.send("evm_increaseTime", [3 * 60 * 5]);
            await ethers.provider.send("evm_mine", []);

            const tx = staking.claim();
            await expect(tx).to.emit(staking, "Claimed").withArgs(
                owner.address, 
                STAKE_AMOUNT * NEW_SETTINGS.REWARD_PERCENT / 100 * 15
            );
        });
    });

    describe("unstake", function() {
        it("Should revert with tokens still freezed", async function () {    
            const tx = staking.unstake();
            await expect(tx).to.be.revertedWith("TokensFreezed");
        });

        it("Should unstake tokens to owner", async function () {    
            await ethers.provider.send("evm_increaseTime", [3 * 60 * 5]);
            await ethers.provider.send("evm_mine", []);

            const userBalance = await pair.balanceOf(owner.address);
            const stakingBalance = await pair.balanceOf(staking.address);

            const tx = await staking.connect(owner).unstake();
            await expect(tx).to.emit(staking, "Unstaked").withArgs(
                owner.address, 
                STAKE_AMOUNT * 2
            );

            await ethers.provider.send("evm_increaseTime", [3 * 60 * 5]);
            await ethers.provider.send("evm_mine", []);

            expect(await pair.balanceOf(owner.address)).to.be.equal(
              userBalance.add(STAKE_AMOUNT * 2)
            );
            expect(await pair.balanceOf(staking.address)).to.be.equal(
              stakingBalance.sub(STAKE_AMOUNT * 2)
            );

            const stakeData = await staking.getStakeData(owner.address);
            expect(stakeData.lpAmount).to.be.equal(0);
        });

        it("Should revert with active voting exists", async function () {    
            const iface = new ethers.utils.Interface([
                "function setFreezePeriod(uint32 freezePeriod_)"
            ]);
            const calldata = iface.encodeFunctionData("setFreezePeriod", [NEW_SETTINGS.FREEZE_PERIOD]);
            await voting.addProposal(calldata, staking.address, "setFreezePeriod")

            await voting.connect(user).vote(1, true);

            const tx = staking.connect(user).unstake();
            await expect(tx).to.be.revertedWith("ActiveVotingExists");
        });
    });
});
