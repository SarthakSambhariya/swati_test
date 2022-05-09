import React, {useState} from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import Main from "../components/loan/main";
import Stepone from "../components/loan/stepone";
import Stepthree from "../components/loan/stepthree";

function Loan(props) {
  const [stepOne, setStepOne] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepMain, setMain] = useState(true);

  const handleOne = () => {
    setStepThree(false);
    setMain(false);
    setStepOne(true);
  };

  const handleThree = () => {
    setMain(false);
    setStepOne(false);
    setStepThree(true);
  };

  return (
    <>
      <Header />
      {stepMain && <Main handleClick={handleOne} />}

      {stepOne && <Stepone handleClick={handleThree} />}

      {stepThree && <Stepthree />}

      <Footer />
    </>
  );
}

export default Loan;
