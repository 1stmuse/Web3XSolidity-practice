const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // transfer all all tokens to Decentral (1 million)
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // Transfer 100 nack Tethers to Customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });
  // All of the code goes here for testing
  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("RWD Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentalised Bank Deployment", async () => {
    it("matches the name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has token", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });

    describe("Yield Farming", async () => {
      it("rewards token for staking", async () => {
        let result;
        //Check investor balance
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("100"),
          "customer mock wallet balance before staking"
        );

        //check staking customer of 100 tokens
        await tether.approve(decentralBank.address, tokens("100"), {
          from: customer,
        });

        await decentralBank.depositTokens(tokens("100"), {
          from: customer,
        });

        //check balance of customer
        result = await tether.balanceOf(customer);

        assert.equal(
          result.toString(),
          tokens("0"),
          "customer mock wallet balance after staking"
        );

        //check balance of decentral bank
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(result.toString(), tokens("100"), "decentral bank token");

        //isStaking balance
        result = await decentralBank.isStaking(customer);
        assert.equal(
          result.toString(),
          "true",
          "customer is staking status after staking"
        );
      });

      it("unstake token", async () => {
        await decentralBank.unstakeToken({ from: customer });
        //check unstaking balance
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("100"),
          "customer balance after unstaking"
        );

        //check updated balance of decentral bank
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(
          result.toString(),
          tokens("0"),
          "decentral bsnk mock wallet after unstaking"
        );

        //is staking update

        result = await decentralBank.isStaking(customer);
        assert.equal(
          result.toString(),
          "false",
          "customer is no longer staking"
        );
      });
    });
  });
});
