import { task } from 'hardhat/config'
import { Voting } from '../typechain-types';

task("addproposal", "add proposal")
    .addParam("contract", "address of voting")
    .addParam("signer", "signer number")
    .addParam("calldata", "calldata bytes array")
    .addParam("recipient", "recipient address")
    .addParam("description", "description of proposal")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, calldata, recipient, description } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Voting");
        const voting: Voting = <Voting>factory.attach(contract);
        
        const tx = await voting.connect(signers[signer]).addProposal(calldata, recipient, description);

        console.log(tx);
    });

task("vote", "vote for proposal")
    .addParam("contract", "address of voting")
    .addParam("signer", "signer number")
    .addParam("id", "proposal id")
    .addParam("isfor", "true - for, false - against")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, id, isfor } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Voting");
        const voting: Voting = <Voting>factory.attach(contract);

        const tx = await voting.connect(signers[signer]).vote(id, isfor === "true");

        console.log(tx);
    });


task("finishProposal", "finish proposal")
    .addParam("contract", "address of voting")
    .addParam("signer", "signer number")
    .addParam("id", "proposal id")
    .setAction(async (args, { ethers }) => {
        const { contract, signer, id } = args;
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Voting");
        const voting: Voting = <Voting>factory.attach(contract);

        const tx = await voting.connect(signers[signer]).finishProposal(id);

        console.log(tx);
    });
