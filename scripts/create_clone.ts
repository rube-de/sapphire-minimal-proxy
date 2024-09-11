import { ethers } from "hardhat";

async function main() {

  const CLONE_FACTORY = "0x4252C6b9d61447Ef75196c4e2178B6B7c8e0b540"
  const cloneFactory = await ethers.getContractAt("ERC20CloneFactory", CLONE_FACTORY);

  // create new clone
  const name = "Test";
  const symbol = "TST";
  const salt = "123";
  console.log(salt);
  const clone = await cloneFactory.create(name, symbol, salt);
  const receipt = await clone.wait();
  // console.log(receipt);
  const address = receipt!.logs[1].args[0];

  console.log(`New clone deployed at ${address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});