import { task } from "hardhat/config";
import { Platform } from '../typechain-types';

task("register", "register in platform")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("referrer", "referrer address")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, referrer } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        let tx;
        if (referrer.length > 0) {
            tx = await platform.connect(signers[signer])["register(address)"](referrer);
        } else {
            tx = await platform.connect(signers[signer])["register()"]();
        }

        console.log(tx);
});

task("buyacdm", "register in platform")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("amount", "amount of tokens")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, amount } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).buyACDM(amount);

        console.log(tx);
});

task("addorder", "create order")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("amount", "amount of tokens")
    .addParam("price", "price of one token")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, amount, price } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).addOrder(amount, price);

        console.log(tx);
});

task("removeorder", "create order")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("orderId", "order id")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, orderId } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).removeOrder(orderId);

        console.log(tx);
});

task("redeemorder", "create order")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("orderId", "order id")
    .addParam("amount", "amount of tokens")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, orderId, amount } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).redeemOrder(orderId, amount);

        console.log(tx);
});


task("starttraderound", "create order")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .setAction(async (args, { ethers }) => {
        const { contract, signer } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).startTradeRound();

        console.log(tx);
});

task("startsaleround", "create order")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .setAction(async (args, { ethers }) => {
        const { contract, signer } = args;

        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Platform");
        const platform: Platform = <Platform>factory.attach(contract);

        const tx = await platform.connect(signers[signer]).startSaleRound();

        console.log(tx);
});

