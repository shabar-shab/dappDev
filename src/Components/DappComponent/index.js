import React, { useState, useEffect } from "react";
import Web3 from "web3";
import vmContract from "../../blockchain";
import "../../App.css";

function DappComponent() {
  let web3;
  const [errorMsg, setErrorMsg] = useState("");
  const [inventoryValue, setInventoryValue] = useState("");
  const [myDonoutsValue, setMyDonoutsValue] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [accountAddress, setAccountAddress] = useState('');


//   async function getAccount() {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     showAccount.innerHTML = account;
//   }
  const handleButtonClick = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        // getAccount();
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        window.innerHTML = account;
        getDodonutHandler();
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

  const getDodonutHandler = async () => {
    const accounts = await web3.eth.getAccounts();
    const count = await vmContract.methods.donutBalances(accounts[0]).call();
    console.log('account addres',accounts);
    let accountBalance = await web3.eth.getBalance(accounts[0]);
    accountBalance = accountBalance.toString();
    console.log('update balance',`${accountBalance}`+1 )
    const updatedAccoutBalance = await web3.utils.fromWei(accountBalance,'ether');
    console.log('updated balnce', updatedAccoutBalance);
    setAccountAddress(accounts[0]);
    setAccountBalance(updatedAccoutBalance);
    setMyDonoutsValue(count);
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

      <section className="App">
        <p>Account Address {accountAddress}</p>
      </section>
      <section className="App">
        <p>Account Balance {accountBalance}</p>
      </section>
      <section className="App">
        <p>My donouts Value {myDonoutsValue}</p>
      </section>

      <section className="App">
        <p>Buy donouts</p>
        <inpu type="text" ></inpu>
      </section>
    </>
  );
}

export default DappComponent;
