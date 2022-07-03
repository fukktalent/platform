import { expect } from "chai";
import { ethers } from "hardhat";

import { XXXToken, XXXToken__factory, ACDMToken__factory, ACDMToken, Platform, Platform__factory, IUniswapV2Router02, IUniswapV2Factory, IERC20, IUniswapV2Pair } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, BigNumberish } from "ethers";

import config from "./config";

const { REF, SOME_AMOUNT } = config.PLATFORM;

describe("Platform", function () {
    let owner: SignerWithAddress;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let acc4: SignerWithAddress;
    let dao: SignerWithAddress;

    let xxxToken: XXXToken;
    let acdmToken: ACDMToken;

    let platform: Platform;

    let daoBalance: BigNumber = ethers.constants.Zero;

    let uniRouter: IUniswapV2Router02;
    let uniFactory: IUniswapV2Factory;
    let pairToken: IUniswapV2Pair;

    before(async function() {
        [owner, acc1, acc2, acc3, acc4, dao] = await ethers.getSigners();

        uniRouter = <IUniswapV2Router02>(await ethers.getContractAt("IUniswapV2Router02", process.env.ROUTER_ADDRESS as string));
        uniFactory = <IUniswapV2Factory>(await ethers.getContractAt("IUniswapV2Factory", process.env.FACTORY_ADDRESS as string));

        xxxToken = await new XXXToken__factory(owner).deploy("Token XXX", "XXX");
        await xxxToken.deployed();

        acdmToken = await new ACDMToken__factory(owner).deploy("Token ACDM", "ACDM");
        await acdmToken.deployed();

        await xxxToken.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_BURNER_ROLE")), owner.address);
        await xxxToken.mint(owner.address, SOME_AMOUNT * 10);
        await xxxToken.approve(uniRouter.address, ethers.constants.MaxUint256);
        const deadline: BigNumberish = (await ethers.provider.getBlock("latest")).timestamp + 60;
        await uniRouter.addLiquidityETH(
            xxxToken.address,
            SOME_AMOUNT,
            0,
            ethers.utils.parseEther("1"),
            owner.address, 
            deadline,
            { value: ethers.utils.parseEther("1") }
        );

        const pairAddress: string = await uniFactory.getPair(uniRouter.WETH(), xxxToken.address);
        pairToken = <IUniswapV2Pair> await ethers.getContractAt("IUniswapV2Pair", pairAddress);

        platform = await new Platform__factory(owner).deploy(
            acdmToken.address,
            xxxToken.address,
            60 * 60, 
            dao.address
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
    });

    it("Should deploy contract correctly", async function() {
        const roundData = await platform.roundData();

        expect(roundData.round).to.be.equal(0);
        expect(roundData.roundFinishDate).to.not.equal(0);
        expect(roundData.tokenPrice).to.be.equal(ethers.utils.parseEther("0.00001"));
        expect(roundData.tokenAmount).to.be.equal(
            ethers.utils.parseUnits("100000", await acdmToken.decimals())
        );
        expect(roundData.tokensSoldInEth).to.be.equal(0);
    });

    describe("register", function() {
        it ("Should register without referrers", async function() {
            await platform.connect(acc1)["register()"]();

            const userData = await platform.user(acc1.address);
            expect(userData.isRegistered).to.be.equal(true);
            expect(userData.referrer).to.be.equal(ethers.constants.AddressZero);
        });

        it ("Should register with referrer", async function() {
            await platform["register()"]();
            await platform.connect(acc2)["register(address)"](acc1.address);
            await platform.connect(acc3)["register(address)"](acc2.address);

            const userData2 = await platform.user(acc2.address);
            expect(userData2.isRegistered).to.be.equal(true);
            expect(userData2.referrer).to.be.equal(acc1.address);

            const userData3 = await platform.user(acc3.address);
            expect(userData3.isRegistered).to.be.equal(true);
            expect(userData3.referrer).to.be.equal(acc2.address);
        });

        it ("Should revert when user already registered", async function() {
            const tx = platform.connect(acc2)["register(address)"](acc3.address);

            await expect(tx).to.be.revertedWith("UserAlreadyRegistered");
        });

        it ("Should revert when referere didn't register", async function() {
            const tx = platform.connect(acc2)["register(address)"](acc4.address);

            await expect(tx).to.be.revertedWith("UserIsNotRegistered");
        });

        it ("Should revert when user is their own referrer", async function() {
            const tx = platform.connect(acc4)["register(address)"](acc4.address);

            await expect(tx).to.be.revertedWith("InvalidReferrer");
        });
    });

    describe("buyACDM", function() {
        it ("Should revert when not enough tokens at platform", async function() {
            const tx = platform.connect(acc3).buyACDM(
                ethers.utils.parseUnits("100001", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("1") }
            );

            await expect(tx).to.be.revertedWith("NotEnoughTokensExists");
        });

        it ("Should revert when not enough ether was sent", async function() {
            const tx = platform.connect(acc3).buyACDM(
                ethers.utils.parseUnits("100000", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.01") }
            );

            await expect(tx).to.be.revertedWith("NotEnoughEtherSent");
        });

        it ("Should revert when user didn't register", async function() {
            const tx = platform.connect(acc4).buyACDM(
                ethers.utils.parseUnits("100000", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.01") }
            );

            await expect(tx).to.be.revertedWith("UserIsNotRegistered");
        });

        it ("Should mint acdm tokens to sender", async function() {
            const tx = platform.connect(acc3).buyACDM(
                ethers.utils.parseUnits("10000", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("1") }
            );

            await expect(() => tx).changeTokenBalance(
                acdmToken,
                acc3,
                ethers.utils.parseUnits("10000", await acdmToken.decimals())
            );

            await expect(() => tx).changeEtherBalances(
                [acc3, acc1, acc2, platform],
                [
                    ethers.constants.Zero.sub(ethers.utils.parseEther("0.1")),
                    ethers.utils.parseEther("0.1").mul(REF.DEF.SALE_2_PERC).div(1000),
                    ethers.utils.parseEther("0.1").mul(REF.DEF.SALE_1_PERC).div(1000),
                    ethers.utils.parseEther("0.1").mul(1000 - REF.DEF.SALE_1_PERC - REF.DEF.SALE_2_PERC).div(1000),
                ]
            );

            await expect(tx).to.emit(platform, "TokensSold").withArgs(
                acc3.address,
                ethers.utils.parseUnits("10000", await acdmToken.decimals()),
                ethers.utils.parseEther("0.00001")
            );

            const daoBalance = await platform.daoBalance();
            expect(daoBalance).to.be.equal(0);

            const roundData = await platform.roundData();
            expect(roundData.tokenAmount).to.be.equal(
                ethers.utils.parseUnits("90000", await acdmToken.decimals())
            );
        });
    });

    describe ("setMinTokensToStartTrade", function() {
        it ("Should set _minTokensToStartTrade", async function() {
            await platform.connect(dao).setMinTokensToStartTrade(
                ethers.utils.parseUnits("20000", await acdmToken.decimals()),
            );

            expect(
                await platform.minTokensToStartTrade()
            ).to.be.equal(
                ethers.utils.parseUnits("20000", await acdmToken.decimals())
            );
        });
    });

    describe ("startTradeRound", function() {
        it ("Should revert when time of sale is not over", async function() {
            const tx = platform.startTradeRound();

            await expect(tx).to.be.revertedWith("EarlyToStartNextRound");
        });

        it ("Should start trade round when almost all tokens sold", async function() {
            await platform.connect(acc2).buyACDM(
                ethers.utils.parseUnits("30000", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.3") }
            );
            daoBalance = (
                ethers.utils.parseEther("0.3").mul(REF.DEF.SALE_2_PERC).div(1000)
            ).add(daoBalance);

            await platform.connect(acc1).buyACDM(
                ethers.utils.parseUnits("50000", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.5") }
            );
            daoBalance = (
                ethers.utils.parseEther("0.5").mul(REF.DEF.SALE_2_PERC + REF.DEF.SALE_1_PERC).div(1000)
            ).add(daoBalance);

            const roundData = await platform.roundData();

            const tx = platform.startTradeRound();
            
            await expect(tx).to.emit(platform, "RoundStarted");

            const newRoundData = await platform.roundData();
            expect(newRoundData.round).to.be.equal(1);
            expect(roundData.roundFinishDate).to.not.equal(newRoundData.roundFinishDate);
            expect(newRoundData.tokenPrice).to.be.equal(ethers.utils.parseEther("0.00001"));
            expect(newRoundData.tokenAmount).to.be.equal(
                ethers.utils.parseUnits("10000", await acdmToken.decimals()),
            );
            expect(roundData.tokensSoldInEth).to.be.equal(0);
        });
    });

    describe ("addOrder", function() {
        it ("Should revert when no balance", async function() {
            await acdmToken.approve(platform.address, ethers.constants.MaxUint256);

            const tx = platform.addOrder(
                ethers.utils.parseUnits("1000", await acdmToken.decimals()),
                ethers.utils.parseEther("0.00002")
            );

            await expect(tx).to.be.reverted;
        });

        it ("Should place order", async function() {
            await acdmToken.connect(acc3).approve(platform.address, ethers.constants.MaxUint256);

            const tx = await platform.connect(acc3).addOrder(
                ethers.utils.parseUnits("1000", await acdmToken.decimals()),
                ethers.utils.parseEther("0.00002")
            );

            
            const order = await platform.order(1);
            expect(order.owner).to.be.equal(acc3.address);
            expect(order.amount).to.be.equal(
                ethers.utils.parseUnits("1000", await acdmToken.decimals()),
            );
            expect(order.price).to.be.equal(
                ethers.utils.parseEther("0.00002")
            );

            await expect(tx).to.emit(platform, "OrderCreated").withArgs(
                1,
                order
            );
        });
    });

    describe ("redeemOrder", function() {
        it ("Should transfer tokens to buyer and eth to seller", async function() {
            const balance = await acdmToken.balanceOf(acc2.address);
            const platformBalance = await acdmToken.balanceOf(platform.address);

            const tx = platform.connect(acc2).redeemOrder(
                1,
                ethers.utils.parseUnits("500", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.01") }
            );

            await expect(() => tx).changeEtherBalances(
                [acc2, acc1, acc3],
                [
                    ethers.utils.parseEther("-0.01"),
                    ethers.utils.parseEther("0.01").mul(REF.DEF.TRADE_1_PERC).div(1000),
                    ethers.utils.parseEther("0.01").mul(1000 - REF.DEF.SALE_1_PERC).div(1000),
                ]
            );

            await expect(tx).to.emit(platform, "OrderRedeemed").withArgs(
                1,
                acc2.address,
                ethers.utils.parseUnits("500", await acdmToken.decimals())
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
            expect(order.owner).to.be.equal(acc3.address);
            expect(order.amount).to.be.equal(
                ethers.utils.parseUnits("500", await acdmToken.decimals()),
            );
            expect(order.price).to.be.equal(
                ethers.utils.parseEther("0.00002")
            );

            daoBalance = (ethers.utils.parseEther("0.01").mul(REF.DEF.TRADE_2_PERC).div(1000)).add(daoBalance);
            const daoBalance_ = await platform.daoBalance();
            expect(daoBalance_).to.be.equal(daoBalance);
        });

        it ("Should revert when not enough tokens exists", async function() {
            const tx = platform.connect(acc2).redeemOrder(
                1,
                ethers.utils.parseUnits("501", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.01") }
            );

            await expect(tx).to.be.revertedWith("NotEnoughTokensExists");
        });

        it ("Should revert when not enough ether sent", async function() {
            const tx = platform.connect(acc2).redeemOrder(
                1,
                ethers.utils.parseUnits("500", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.009") }
            );

            await expect(tx).to.be.revertedWith("NotEnoughEtherSent");
        });
    });

    describe ("removeOrder", function() {
        it ("Should revert when other owner", async function() {
            const tx = platform.connect(acc1).removeOrder(1);

            await expect(tx).to.be.revertedWith("NotOwner");
        });

        it ("Should revert when order doesn't exist", async function() {
            const tx = platform.connect(acc3).removeOrder(0);

            await expect(tx).to.be.revertedWith("NotOwner");
        });

        it ("Should remove order and send tokens back to owner", async function() {
            const balance = await acdmToken.balanceOf(acc3.address);
            const platformBalance = await acdmToken.balanceOf(platform.address);

            const tx = platform.connect(acc3).removeOrder(1);

            await expect(tx).to.emit(platform, "OrderRemoved").withArgs(
                1
            );

            expect(
                await acdmToken.balanceOf(acc3.address)
            ).to.be.equal(
                balance.add(ethers.utils.parseUnits("500", await acdmToken.decimals()))
            );

            expect(
                await acdmToken.balanceOf(platform.address)
            ).to.be.equal(
                platformBalance.sub(ethers.utils.parseUnits("500", await acdmToken.decimals()))
            );

            const order = await platform.order(1);
            expect(order.owner).to.be.equal(ethers.constants.AddressZero);
            expect(order.amount).to.be.equal(0);
            expect(order.price).to.be.equal(0);
        });
    });

    describe ("startSaleRound", function() {
        it ("Should revert when early to start", async function() {
            const tx = platform.startSaleRound();

            await expect(tx).to.be.revertedWith("EarlyToStartNextRound");
        });

        it ("Should set sale settings and start sale round", async function() {
            const roundData = await platform.roundData();

            await ethers.provider.send("evm_increaseTime", [60 * 60]);
            await ethers.provider.send("evm_mine", []);

            const tx = platform.startSaleRound();

            await expect(tx).to.emit(platform, "RoundStarted");

            const newRoundData = await platform.roundData();

            expect(newRoundData.round).to.be.equal(0);
            expect(newRoundData.roundFinishDate).to.not.equal(roundData.roundFinishDate);
            expect(newRoundData.tokenPrice).to.be.equal(ethers.utils.parseEther("0.0000143"));
            expect(newRoundData.tokenAmount).to.be.equal(
                newRoundData.tokensSoldInEth.div(ethers.utils.parseEther("0.0000143"))
            );
            expect(newRoundData.tokensSoldInEth).to.be.equal(
                ethers.utils.parseEther("0.01")
            );
        });

        it ("Should revert when same round", async function() {
            const tx = platform.startSaleRound();

            await expect(tx).to.be.revertedWith("FunctionInvalidAtThisRound");
        });

        it ("Should starts another trade round when in trade round 0 tokens was sold ", async function() {
            // trade round after sale round
            await ethers.provider.send("evm_increaseTime", [60 * 60]);
            await ethers.provider.send("evm_mine", []);

            await platform.startTradeRound();

            const roundData = await platform.roundData();
            expect(roundData.round).to.be.equal(1);
            expect(roundData.tokensSoldInEth).to.be.equal(0);

             // trade round after trade round
            await ethers.provider.send("evm_increaseTime", [60 * 60]);
            await ethers.provider.send("evm_mine", []);

            const tx = platform.startSaleRound();

            await expect(tx).to.emit(platform, "RoundStarted");

            const newRoundData = await platform.roundData();
            expect(newRoundData.round).to.be.equal(1);
            expect(newRoundData.roundFinishDate).to.not.equal(roundData.roundFinishDate);
            expect(newRoundData.tokenPrice).to.be.equal(ethers.utils.parseEther("0.0000143"));
            expect(newRoundData.tokensSoldInEth).to.be.equal(0);
        });
    });

    describe ("buyAndBurnXXXToken", function() {
        it ("Should revert when access denied", async function() {
            const tx = platform.buyAndBurnXXXToken();

            await expect(tx).to.be.revertedWith("AccessControl");
        });

        it ("Should buy xxx tolen for eth and burn burn it", async function() {
            await platform.grantRole(
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes("DAO_ROLE")), 
                dao.address
            );

            const tokenSupply = await xxxToken.totalSupply();

            const tx = platform.connect(dao).buyAndBurnXXXToken();
            await expect(() => tx).changeEtherBalance(
                platform,
                ethers.constants.Zero.sub(daoBalance)
            );

            const newTokenSupply = await xxxToken.totalSupply();
            expect(newTokenSupply).to.lt(tokenSupply);

            daoBalance = ethers.constants.Zero;
        });

        it ("Should revert when no dao tokens", async function() {
            const tx = platform.connect(dao).buyAndBurnXXXToken();

            await expect(tx).to.be.revertedWith("NotEnoughTokensExists");
        });
    });

    describe ("transferDAOEtherToOwner", function() {
        it ("Should transfer eth to owner", async function() {
            await platform.connect(acc3).addOrder(
                ethers.utils.parseUnits("500", await acdmToken.decimals()),
                ethers.utils.parseEther("0.00002")
            );

            await platform.connect(acc2).redeemOrder(
                2,
                ethers.utils.parseUnits("500", await acdmToken.decimals()),
                { value: ethers.utils.parseEther("0.01") }
            );

            daoBalance = ethers.utils.parseEther("0.01").mul(REF.DEF.TRADE_2_PERC).div(1000);

            const tx = platform.connect(dao).transferDAOEtherToOwner();

            await expect(() => tx).changeEtherBalances(
                [platform, owner],
                [ethers.constants.Zero.sub(daoBalance), daoBalance]
            );
        });
    });

    describe ("setRefSettings", function() {
        it ("Should set new ref settings", async function() {
            await platform.connect(dao).setRefSettings(
                REF.NEW.SALE_1_PERC,
                REF.NEW.SALE_2_PERC,
                REF.NEW.TRADE_1_PERC,
                REF.NEW.TRADE_2_PERC,
                REF.NEW.PERC_DECIMAL
            );

            const settings = await platform.refSettings(); 
            expect(settings.saleRef1Percent).to.be.equal(REF.NEW.SALE_1_PERC);
            expect(settings.saleRef2Percent).to.be.equal(REF.NEW.SALE_2_PERC);
            expect(settings.tradeRef1Percent).to.be.equal(REF.NEW.TRADE_1_PERC);
            expect(settings.tradeRef2Percent).to.be.equal(REF.NEW.TRADE_2_PERC);
            expect(settings.refPercentDecimals).to.be.equal(REF.NEW.PERC_DECIMAL);
        });
    });
});
