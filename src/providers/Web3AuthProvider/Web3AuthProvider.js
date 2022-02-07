import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import Web3AuthDappContext from "./context";

function Web3AuthProvider({ children }) {
  const polygonMumbaiConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://rpc-mumbai.maticvigil.com",
    blockExplorer: "https://mumbai-explorer.matic.today",
    chainId: "0x13881",
    displayName: "Polygon Mumbai Testnet",
    ticker: "matic",
    tickerName: "matic",
  };

  const web3auth = new Web3Auth({
    chainConfig: polygonMumbaiConfig,
    clientId: "localhost-id", // get your clientId from https://developer.web3auth.io
  });
  function subscribeAuthEvents(web3auth) {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
      console.log("Yeah!, you are successfully logged in", data);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("some error or user have cancelled login request", error);
    });

    web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
      console.log("modal visibility", isVisible);
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    subscribeAuthEvents(web3auth);
  }, []);

  return (
    <Web3AuthDappContext.Provider
      value={{
        web3auth,
        subscribeAuthEvents,
      }}
    >
      {children}
    </Web3AuthDappContext.Provider>
  );
}

function useWeb3Auth() {
  const context = React.useContext(Web3AuthDappContext);
  if (context === undefined) {
    throw new Error("useWeb3AuthApp must be used within a Web3DappProvider");
  }
  return context;
}

export { Web3AuthProvider, useWeb3Auth };
