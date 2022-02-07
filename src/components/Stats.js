import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import Button from "./Button";

import { fade, aboutProjectAnimation } from "../animation";
import { CONFIG } from "../config";
const Stats = (props) => {
  const [collectionData, setData] = useState([]);
  let { address, id } = useParams();
  let blockchain_id = id ? id : CONFIG.TEMPLATE.block_chain_id;
  let address_id = address ? address : CONFIG.TEMPLATE.collection_address;
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const handleCollection = async () => {
    try {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?&key=ckey_docs`
      );
      setData([...resp.data.data.items]);
      console.log(collectionData);
      if (CONFIG.TEMPLATE.title !== "" && !address) {
        CONFIG.TEMPLATE.title = `${
          resp.data.data.items[0].collection_name !== ""
            ? resp.data.data.items[0].collection_name
            : CONFIG.TEMPLATE.title
        } Dashboard`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCollection();
  }, []);

  return (
    <StyledStats
      variants={aboutProjectAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.3 }}
      id="stats"
    >
      <motion.h2>Statistics</motion.h2>
      <motion.div className="stats-border">
        <motion.div className="stats">
          <span>
            <h2>Name of Collection:</h2>
            <h3>Zenith Snake NFT</h3>
          </span>
          <div className="line"></div>
          <span>
            <h2>Ticker Symbol:</h2>
            <h3>
              {collectionData[0]?.collection_ticker_symbol
                ? collectionData[0]?.collection_ticker_symbol
                : 0}
            </h3>
          </span>
          <div className="line"></div>
          <span>
            <h2>24hr Volume:</h2>
            <h3>
              {" "}
              {collectionData[0]?.volume_quote_day
                ? formatter
                    .format(collectionData[0]?.volume_quote_day)
                    .split(".")[0]
                : 0}
            </h3>
          </span>
          <div className="line"></div>
          <span>
            <h2>24hr Sold Count:</h2>
            <h3>
              {collectionData[0]?.unique_token_ids_sold_count_day
                ? collectionData[0]?.unique_token_ids_sold_count_day
                : 0}
            </h3>
          </span>
        </motion.div>
      </motion.div>
    </StyledStats>
  );
};

const StyledStats = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  overflow: hidden;
  gap: 1rem;
  margin-bottom: 10rem;
  .stats-border {
    padding: 0.1rem;
    background-image: linear-gradient(to right, #09e1ff, #03ff85);
    border-radius: 1rem;
    .stats {
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      background: #0b172e;
      .line {
        background-image: linear-gradient(to right, #09e1ff, #03ff85);
        width: 100%;
        height: 0.1rem;
      }
      span {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
        @media (max-width: 900px) {
          padding: 1rem;
          gap: 1rem;
        }
        h2 {
          @media (max-width: 900px) {
            font-size: 1.3rem;
          }
        }
        h3 {
          @media (max-width: 900px) {
            font-size: 1rem;
          }
        }
      }
    }
  }
  h2 {
    font-family: "Amiri", serif;
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

export default Stats;
