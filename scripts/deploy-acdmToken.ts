import * as dotenv from "dotenv";

import { ethers } from "hardhat";

dotenv.config();

async function main() {
    const ERC20Token = await ethers.getContractFactory("ACDMToken");
    const erc20Token = await ERC20Token.deploy("ACDMToken", "ACDM");

    await erc20Token.deployed();

    console.log("Token deployed to:", erc20Token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
