import React, { useEffect } from "react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Main from "../components/home/main";
import "../components/home/css/style.css";
import "../components/home/css/testimonl.css";


const Home = ({mobileview}) => {
  
  return (
    <>
      <Header />
      <Main mobileView={mobileview} />
      <Footer />
    </>
  );
};

export default Home;
