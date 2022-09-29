"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("HelloWorld", () => {
    let helloWorldContract;
    let accounts;
    beforeEach(async () => {
        accounts = await hardhat_1.ethers.getSigners();
        const helloWorldFactory = await hardhat_1.ethers.getContractFactory("HelloWorld");
        helloWorldContract = (await helloWorldFactory.deploy());
        await helloWorldContract.deployed();
    });
    it("Should give a Hello World", async () => {
        const helloWorldText = await helloWorldContract.helloWorld();
        (0, chai_1.expect)(helloWorldText).to.equal("Hello World!");
    });
    it("Should set owner to deployer account", async () => {
        const contractOwner = await helloWorldContract.owner();
        (0, chai_1.expect)(contractOwner).to.equal(accounts[0].address);
    });
    it("Should not allow anyone other than owner to call transferOwnership", async function () {
        await (0, chai_1.expect)(helloWorldContract
            .connect(accounts[1])
            .transferOwnership(accounts[1].address)).to.be.revertedWith("Caller is not the owner");
    });
    it("Should execute transferOwnership correctly", async function () {
        const newOwner = accounts[1].address;
        const tx = await helloWorldContract.transferOwnership(newOwner);
        await tx.wait();
        const contractOwner = await helloWorldContract.owner();
        (0, chai_1.expect)(contractOwner).to.equal(newOwner);
    });
    it("Should not allow anyone other than owner to change text", async () => {
        await (0, chai_1.expect)(helloWorldContract.connect(accounts[1]).setText("")).to.be.revertedWith("Caller is not the owner");
    });
});
