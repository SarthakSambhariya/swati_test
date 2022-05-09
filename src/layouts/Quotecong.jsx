import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import {Link} from "react-router-dom";

function Quotecong(props) {
  return (
    <>
    <Header />
      <section className="congrts">
        <div className="container">
          <div className="congrts-confrm text-center p-5">
            <img src="assets/images/comp/loan.png" alt="" className="w-25" />
            <h5>
              <b>Congratulations!</b> your enquiry has been listed
            </h5>
            <Link to="" className="p-4 text-dark">
              <p>We will contact you shortly</p>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Quotecong;
