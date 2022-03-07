const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed t0:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Get contract balance

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  const waveTxn = await waveContract.wave("hello i'm Muse");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("another wave for winning");
  await waveTxn2.wait();

  // Get contract balnce again to see changes

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  console.log(
    "Wave contract balance updated",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
