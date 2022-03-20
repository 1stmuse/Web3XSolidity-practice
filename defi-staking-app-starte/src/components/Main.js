import React from "react";
import tether from "../tether.png";
// import web3 from "web3";

const Main = ({ stakeBalance, rwdBalance, tetherBalance }) => {
  console.log(tetherBalance);
  return (
    <div className="mt-7">
      <table className="table text-muted text-center">
        <thead>
          <tr style={{ color: "black" }}>
            <th scope="col"> Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: "black" }}>
            <td>{window.web3.utils.fromWei(stakeBalance, "Ether")} USDT</td>
            <td>{window.web3.utils.fromWei(rwdBalance, "Ether")} RWD</td>
          </tr>
        </tbody>
      </table>
      <div className="card mb-2" style={{ opacity: ".9" }}>
        <form className="mb-3">
          <div>
            <div
              style={{
                borderSpacing: "0 1em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                {/* Balance: {window.web3.utils.fromWei(tetherBalance, "Ether")} */}
              </span>
            </div>
            <div className="input-group mb-4">
              <input type="text" placeholder="0" required />
              <div className="input-group-open">
                <div className="input-group-text">
                  <img height="32" src={tether} alt="tether" />
                  &nbsp;&nbsp;&nbsp;USDT
                </div>
              </div>
            </div>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-primary btn-large btn-black"
            >
              DEPOSIT
            </button>
          </div>
        </form>
        <button type="submit" className="btn btn-primary btn-large btn-black">
          WITHDRAW
        </button>
        <div className="card-body text-center" style={{ color: "blue" }}>
          Airdrop
        </div>
      </div>
    </div>
  );
};

export default Main;
