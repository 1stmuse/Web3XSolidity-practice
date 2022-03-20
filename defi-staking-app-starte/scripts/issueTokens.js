const decentralbank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(callback) {
  let decentralBank = await decentralbank.deployed();
  await decentralBank.issueTokens();
  console.log("tokens have been issued successfully");
  callback();
};
