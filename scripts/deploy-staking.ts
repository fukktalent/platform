import * as dotenv from "dotenv";

import { ethers } from "hardhat";

dotenv.config();

async function main() {
    const [owner] = await ethers.getSigners();

    const stakingFactory = await ethers.getContractFactory("Staking", owner);
    const staking = await stakingFactory.deploy(
      process.env.LP_TOKEN_ADDRESS || "0x9aee43130694501e5e109644ddb176e35075928f", 
      process.env.REWARD_TOKEN_ADDRESS || "0x42182E993d13181735190F2C3eAaA31c3200e749",
      process.env.VOTING_ADDRESS || "0x582BDDF6edE0717f5B7403752fCFdF9D5f98a53e"
    ); 
    await staking.deployed();

    console.log("Staking deployed to:", staking.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
