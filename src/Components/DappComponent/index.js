import React, { useState } from "react";
import Web3 from "web3";

function DappComponent() {
  let web3;
  const [errorMsg, setErrorMsg] = useState('');
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
      <section>
        {errorMsg&& <p>errorMsg</p>}
      </section>
    </>
  );
}

export default DappComponent;
