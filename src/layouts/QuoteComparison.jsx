import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Link } from "react-router-dom";
import { useState } from "react";

import Main from "../components/quotecomparision/main";

import Stepone from "../components/quotecomparision/stepone";
import Steptwo from "../components/quotecomparision/steptwo";
import Stepthree from "../components/quotecomparision/stepthree";

function QuoteComparison(props) {
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepMain, setMain] = useState(true);

  // const handleOne = () => {
  //   setStepOne(true);
  //   setStepTwo(false);
  //   setStepThree(false);
  // };

  const handleOne = () => {
    setStepTwo(false);
    setStepThree(false);
    setMain(false);
    setStepOne(true);
  };

  const handleTwo = () => {
    setStepOne(false);
    setMain(false);
    setStepThree(false);
    setStepTwo(true);
  };

  const handleThree = () => {
    setMain(false);
    setStepTwo(false);
    setStepOne(false);
    setStepThree(true);
  };

  return (
    <>
      <Header />
      {stepMain && <Main handleClick={handleOne} />}

      {stepOne && <Stepone handleClick={handleTwo} />}

      {stepTwo && <Steptwo handleClick={handleThree} />}

      {stepThree && <Stepthree />}

      <Footer />
    </>
  );
}

export default QuoteComparison;
