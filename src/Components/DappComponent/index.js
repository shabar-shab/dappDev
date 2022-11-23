import React, { useState, useEffect } from "react";
import Web3 from "web3";
import vmContract from "../../blockchain";
import "../../App.css";

function DappComponent() {
  let web3;
  const [errorMsg, setErrorMsg] = useState("");
  const [inventoryValue, setInventoryValue] = useState("");
  const handleButtonClick = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setErrorMsg("please install meata mask");
    }
  };

  useEffect(() => {
    getInventoryHandler();
  });

  const getInventoryHandler = async () => {
    console.log("vm contracts", vmContract);
    const inventory = await vmContract.methods
      .getVendingMachineBalance()
      .call();
    setInventoryValue(inventory);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <button onClick={handleButtonClick}>Connect to the MetaMask</button>
      </div>
      <section>{errorMsg && <p>errorMsg</p>}</section>
      <section className="App">
        <p>Total no of donouts we are having {inventoryValue}</p>
      </section>
    </>
  );
}

export default DappComponent;
