import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";

import Tether from "../truffle_abis/Tether.json";
import Rwd from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";

const App = () => {
  const [accNumber, setAccNumber] = useState("");
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentalBank, setDecentralBank] = useState({});
  const [tetherBal, setTetherBal] = useState("0");
  const [rwdBal, setRwdBal] = useState("0");
  const [stakingBal, setStakingBal] = useState("0");
  const [loading, setLoading] = useState(true);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("no ethereum browser");
    }
  };

  const laodBlockChain = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    await setAccNumber(account[0]);
    const networkId = await web3.eth.net.getId();

    // console.log(accNumber, "account Number");

    //load tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether(tether);
      if (accNumber) {
        tether.methods.balanceOf(accNumber).call((err, bal) => {
          console.log(bal, "tether a---");
          setTetherBal(bal);
        });
      }
    } else {
      alert("Error! Tether contarct not deployed - no detected network");
    }

    const rwdData = Rwd.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(Rwd.abi, rwdData.address);
      setRwd(rwd);
      if (accNumber) {
        rwd.methods.balanceOf(accNumber).call((err, bal) => {
          setRwdBal(bal);
          // console.log(bal, "reward balance");
        });
      }
    } else {
      alert("Error! Tether contarct not deployed - no detected network");
    }

    const DecentralData = DecentralBank.networks[networkId];
    if (DecentralData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        DecentralData.address
      );
      setDecentralBank(decentralBank);
      if (accNumber) {
        decentralBank.methods.stakingBalance(accNumber).call((err, bal) => {
          // console.log(bal, "staking balance");
          setStakingBal(bal);
          // console.log(bal, "balance");
        });
      }
    } else {
      alert("Error! Tether contarct not deployed - no detected network");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadWeb3();
    laodBlockChain();
  }, [accNumber]);

  if (loading) {
    return (
      <p className="text-center" style={{ margin: "30px" }}>
        LOADING PLEASE
      </p>
    );
  }

  return (
    <div>
      <Navbar accNumber={accNumber} />
      <div className="container-fluid">
        <dic className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto mt-5"
            style={{ maxWidth: "600px", minHeight: "100vm" }}
          >
            <Main
              stakeBalance={stakingBal}
              tetherBalance={tetherBal}
              rwdBalance={rwdBal}
            />
          </main>
        </dic>
      </div>
    </div>
  );
};

export default App;
