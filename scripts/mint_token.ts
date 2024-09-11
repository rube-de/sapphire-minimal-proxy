import { ethers } from "hardhat";

async function main() {

  const TOKEN_ADDR = "0xbA7F3eE55b7939294caFA0F1e096E79722e1BD88"
  const clonedToken = await ethers.getContractAt("ERC20Impl", TOKEN_ADDR);

  // create new clone
  const to = "0xD17a67Ba1AAEDB6AA9B9A0c7ffb1020c951630F0"
  const amount = ethers.parseUnits("1000", 18);
  // mint token
  await clonedToken.mint(to, amount);
  // get balance
  const toBalance = await clonedToken.balanceOf(to);
  console.log(`Balance of ${to} is ${toBalance.toString()}`);  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});