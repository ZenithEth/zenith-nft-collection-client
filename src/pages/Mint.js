import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { motion } from "framer-motion";
import styled from "styled-components";

import { pageAnimation } from "../animation";

import { Meta, Footer, Loader } from "../components";
import { Button } from "../components";
//Image

//Icons

const Mint = ({
  minting,
  askContractToMintNft,
  nftAmount,
  connectWallet,
  currentAccount,
}) => {
  return (
    <StyledMint
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Loader visible={minting} />
      <Meta />

      <motion.div className="Mint-row">
        <motion.div className="Mint-container-border">
          <div className="Mint-container">
            <span>
              {" "}
              <h2>Mint Zenith Snake Collection</h2>
              <h2 className="text-gradient">NFT's</h2>
            </span>
            <h2>{nftAmount}/500</h2>
            {currentAccount ? (
              <Button title="MINT" onClick={askContractToMintNft} />
            ) : (
              <Button title="Connect Wallet" onClick={connectWallet} />
            )}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </StyledMint>
  );
};

const StyledMint = styled(motion.div)`
  padding: 0rem 6.5rem;
  background: #0b172e;

  @media (max-width: 900px) {
    padding: 0rem 1rem;
  }
  .Mint-row {
    padding: 4rem 4rem;
    display: flex;
    justify-content: center;
    @media (max-width: 900px) {
      padding: 3rem 10rem;
    }
    .Mint-container-border {
      padding: 0.1rem;
      background-image: linear-gradient(to right, #09e1ff, #03ff85);
      border-radius: 1rem;
    }
    .Mint-container {
      border-radius: 1rem;
      width: 25rem;
      padding: 3rem 2rem;
      @media (max-width: 900px) {
        padding: 1rem 1rem;
        width: 20rem;
      }
      background: #0b172e;
      display: flex;
      flex-flow: column wrap;
      gap: 1.5rem;

      &:hover {
        cursor: pointer;
      }
      div {
        border-radius: 0.4rem;
        background: #0b172e;
        padding: 2rem;
      }
      h2 {
        font-family: "Urbanist", sans-serif;
        color: white;
        font-weight: bold;
        font-size: 1.6rem;
      }
      .row {
        background: green;
        display: flex;
        justify-content: space-between;
        border-radius: 0.2rem;
        padding: 2rem;
        h3 {
          font-family: "Urbanist", sans-serif;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
    }
  }
`;

export default Mint;
