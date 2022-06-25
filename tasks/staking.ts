import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task("approve", "approve tokens to address")
    .addParam("contract", "address of token")
    .addParam("signer", "signer number")
    .addParam("tokenname", "name of token contract")
    .addParam("amount", "amount of token to approve")
    .addParam("to", "user aprrove to")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, tokenname, amount, to } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory(tokenname);
        const token = factory.attach(contract);
        
        const tx = await token.connect(signers[signer]).approve(to, amount);

        console.log(tx);
    });

task("mint", "mint tokens to address")
    .addParam("contract", "address of token")
    .addParam("signer", "signer number")
    .addParam("tokenname", "name of token contract")
    .addParam("amount", "amount of token to mint")
    .addParam("to", "user mint to")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, tokenname, amount, to } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory(tokenname);
        const token = factory.attach(contract);
    
        const tx = await token.connect(signers[signer]).mint(to, amount);

        console.log(tx);
    });

task("balance", "mint tokens to address")
    .addParam("tokenaddress", "address of token")
    .addParam("signer", "signer number")
    .addParam("tokenname", "name of token contract")
    .addParam("user", "user address to check balance")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, tokenname, user } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory(tokenname);
        const token = factory.attach(contract);

        const balance = await token.connect(signers[signer]).balanceOf(user);

        console.log("balance", balance);
    });

task("stake", "stake tokens")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .addParam("amount", "tokens amount")
    .setAction(async ({ contract, signer, amount }, { ethers }) => {
        const signers = await ethers.getSigners()

        const factory = await ethers.getContractFactory("Staking");
        const staking = factory.attach(contract);

        const tx = await staking.connect(signers[signer]).stake(amount)

        console.log(tx)
    });

task("unstake", "unstake tokens")
    .addParam("contract", "contract address")
    .addParam("signer", "signer number")
    .setAction(async ({ contract, signer }, { ethers }) => {
        const signers = await ethers.getSigners()

        const factory = await ethers.getContractFactory("Staking");
        const staking = factory.attach(contract);

        const tx = await staking.connect(signers[signer]).unstake();

        console.log(tx)  
    });

task("claim", "claim tokens")
    .addParam("address", "contract address")
    .addParam("signer", "signer number")
    .setAction(async ({ contract, signer }, { ethers }) => {
        const signers = await ethers.getSigners()

        const factory = await ethers.getContractFactory("Staking");
        const staking = factory.attach(contract);

        const tx = await staking.connect(signers[signer]).claim();

        console.log(tx)  
    });