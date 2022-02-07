import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function ScrollToTop(props) {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <StyledScrollToTop
      onClick={scrollTop}
      style={{ display: showScroll ? "flex" : "none" }}
    ></StyledScrollToTop>
  );
}
const StyledScrollToTop = styled(motion.div)`
  position: fixed;
  border-radius: 4px;
  width: 2rem;
  bottom: 7%;
  right: 7%;
  align-items: center;
  height: 2rem;
  justify-content: center;
  color: white;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  opacity: 1;
  background-image: linear-gradient(to right, #09e1ff, #03ff85);
  &:hover {
    opacity: 1;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
export default ScrollToTop;
