import React from "react";
import styled from "styled-components";

const WalletConnectButton = ({ currentAccount, onClick }) => {
  return (
    <StyledWalletConnectButton onClick={onClick}>
      <div>
        <h3 className="text-gradient">
          {!currentAccount
            ? "Connect"
            : `${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
        </h3>
      </div>
    </StyledWalletConnectButton>
  );
};
const StyledWalletConnectButton = styled.div`
  min-width: 8rem;
  padding: 1px;
  border-radius: 0.4rem;
  background-image: linear-gradient(to right, #09e1ff, #03ff85);
  @media (max-width: 900px) {
    min-width: 5rem;
  }
  &:hover {
    cursor: pointer;
  }
  div {
    border-radius: 0.4rem;
    background: #0b172e;
    padding: 0.5rem 1.4rem;
    h3 {
      @media (max-width: 900px) {
        font-size: 0.8rem;
      }
    }
  }
`;
export default WalletConnectButton;
