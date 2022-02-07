import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WalletConnectButton from "./WalletConnectButton";

const Nav = ({ connectWallet, currentAccount, logout }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  // ⭐️ initialize modal on page mount.

  const { pathname } = useLocation();
  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to disconnect?")) {
      logout();
    }
  };
  const onClickHandler = () => {
    if (!currentAccount) {
      connectWallet();
    } else {
      logout();
    }
  };
  return (
    <StyledNav menuToggle={menuToggle}>
      <motion.div className="left">
        <Link to="/">
          <h2>ZENITH COLLECTION</h2>
        </Link>
      </motion.div>
      <motion.div className="middle">
        <motion.div className="link">
          <Link to="/mint" className={pathname == "/mint" && "active"}>
            Mint
          </Link>
        </motion.div>
      </motion.div>
      <motion.div className="right">
        <WalletConnectButton
          onClick={() => onClickHandler()}
          currentAccount={currentAccount}
        />
      </motion.div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  background: #0b172e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 6.5rem;
  @media (max-width: 900px) {
    padding: 0.5rem 0.6rem;
  }
  .left {
    width: 33%;

    h2 {
      text-decoration: none;
      font-family: "Amiri", serif;
      color: white;
      font-weight: bold;
      font-size: 1.6rem;
      background: -webkit-linear-gradient(#09e1ff, #03ff85);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
      @media (max-width: 900px) {
        font-size: 1rem;
      }
    }
  }
  .middle {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .link {
      a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        @media (max-width: 900px) {
          font-size: 1.1rem;
        }
        &:hover {
          background: -webkit-linear-gradient(#09e1ff, #03ff85);
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
      }
      .active {
        background: -webkit-linear-gradient(#09e1ff, #03ff85);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }
    }
  }
  .right {
    width: 33%;
    display: flex;
    justify-content: flex-end;
  }
  .mobileNav {
    display: none;
  }
`;

export default Nav;
