import * as dotenv from "dotenv";

import { ethers } from "hardhat";

dotenv.config();

async function main() {
    const Platform = await ethers.getContractFactory("Platform");
    const platform = await Platform.deploy(
        process.env.ACDM_ADDRESS || "0x42182E993d13181735190F2C3eAaA31c3200e749",
        process.env.XXX_ADDRESS || "0xB9c541db3F8f59b442D43e8EEa70043CC0e36b40",
        process.env.PLATFORM_ROUND_TIME || 3 * 24 * 60 * 60,
        process.env.VOTING_ADDRESS || "0x582BDDF6edE0717f5B7403752fCFdF9D5f98a53e"
    );

    await platform.deployed();

    console.log("Voting contract deployed to:", platform.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});