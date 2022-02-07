import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";
import { pageAnimation } from "../animation";

import { Meta, Footer, AboutProject, Stats } from "../components";
//Image

//Icons

const Home = () => {
  const scrollToStats = () => {
    const element = document.getElementById("stats");
    element.scrollIntoView();
  };
  return (
    <StyledHome
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Meta />
      <motion.div className="container">
        <AboutProject scrollToStats={scrollToStats} />
        <Stats />
      </motion.div>

      <Footer />
    </StyledHome>
  );
};

const StyledHome = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 0rem 6.5rem;
  background: #0b172e;
  align-items: center;
  width: 100%;
  @media (max-width: 900px) {
    padding: 0rem 0rem;
  }
  .container {
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    gap: 0rem;
    .cont {
      background: red;
    }
    @media (max-width: 900px) {
      gap: 1rem;
    }
  }
  @media (max-width: 900px) {
    padding: 1rem 1rem;
  }
`;

export default Home;
