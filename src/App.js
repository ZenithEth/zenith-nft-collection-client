import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

//Import Pages
import { Home, Mint } from "./pages";
//Router
import { Routes, Route, useLocation } from "react-router-dom";
//Animation
import { AnimatePresence } from "framer-motion";
import { GlobalStyle, Nav } from "./components";

//Context
import myEpicNft from "./utils/MyEpicNFT.json";

const CONTRACT_ADDRESS = "0xb9f6c8212019fF9a6D966F54B9f3aB9CaE88Da2E";
function App() {
  const [wallet, setWallet] = useState(false);
  const location = useLocation();
  const [currentAccount, setCurrentAccount] = useState("");
  const [minting, setMinting] = useState(false);
  const [nftAmount, setNftAmount] = useState("0");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setWallet({ address: account });

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      setupEventListener();
    } else {
      console.log("No authorized account found");
    }

    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const polygonChainId = "0x13881";
    if (chainId !== polygonChainId) {
      alert("You are not connected to the Mumbai Test Network!");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft

    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.");
        setMinting(true);
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`
        );
        setMinting(false); //set NFT amount
        let realAmount = await connectedContract.getTotalNFTsMintedSoFar();
        console.log(realAmount.toString());
        setNftAmount(realAmount.toString());
      } else {
        setMinting(false);
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setMinting(false);
      console.log(error);
    }
  };

  const refreshAmount = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );
        let realAmount = await connectedContract.getTotalNFTsMintedSoFar();
        console.log(realAmount.toString());
        setNftAmount(realAmount.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {};
  useEffect(() => {
    checkIfWalletIsConnected();
    refreshAmount();
  }, []);

  return (
    <div className="app">
      <GlobalStyle />
      <Nav
        currentAccount={currentAccount}
        connectWallet={connectWallet}
        logout={logout}
      />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<Home />} path="/" />
          <Route
            element={
              <Mint
                wallet={wallet}
                setWallet={setWallet}
                connectWallet={connectWallet}
                askContractToMintNft={askContractToMintNft}
                minting={minting}
                nftAmount={nftAmount}
                currentAccount={currentAccount}
              />
            }
            path="/mint"
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
