import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import "../components/finalbilling/css/comparison.css";
import testi from "../components/home/images/testimonal.png";
import Testimonal from "../components/testimonal/testimonal";
import testimonialservice from "../services/testimonialservice";
import expert from "../components/finalbilling/images/expert.png";
import budget from "../components/finalbilling/images/budget.png";
import btime from "../components/finalbilling/images/btime.png";
import unbiased from "../components/finalbilling/images/unbiased.png";
import billingwork from "../components/finalbilling/images/billingwork.png";
import time from "../components/quotecomparision/images/time.png";
import profile from "../components/quotecomparision/images/profile.png";
import report from "../components/quotecomparision/images/report.png";

import Main from "../components/finalbilling/main";
import Stepone from "../components/finalbilling/stepone";
import Steptwo from "../components/finalbilling/steptwo";
import Stepthree from "../components/finalbilling/stepthree";

function FinalBilling(props) {

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

export default FinalBilling;
