import React from "react";
import logo from "../bank.png";

const Navbar = ({ accNumber }) => {
  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: "black", height: "50p" }}
    >
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        style={{ color: "white" }}
      >
        <img
          src={logo}
          alt="logo"
          width="50"
          height="30"
          className="d-inline-block align-top"
        />
        &nbsp; DAPP Yield Staking (Decentralized Banking)
      </a>
      <ul className="navbar-nav px-3">
        <li className="text-nowrap d-none nav-item d-sm-block">
          <small style={{ color: "white" }}>Account Number: {accNumber}</small>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
