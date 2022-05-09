import React from "react";
import Header from "../components/common/header";

import tania from "../components/magazines/images/tania.png";
import "../components/Idesignexclusive/css/idesignexclusive.css";
import Footer from "../components/common/footer";
import qc from "../components/Idesignexclusive/images/qc.png";
import Testimonal from "../components/testimonal/testimonal";
import testimonialservice from "../services/testimonialservice";

const Idesignexclusive = () => {
  return (
    <>
      <Header />

      <section className="understand mt-lg-4 ">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-12 p-5 text-center ">
              <h1>
                <b>iDesign Exclusives</b>
              </h1>
              <p className="fs-5">
                We understand how important a Home is, so we go{" "}
                <b>beyond the obvious.</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="exclusive">
        <div className="container">
          <div className="row justify-content-center get text-center">
            <div className="col-md-3">
              <div className=" ">
                <div className="card-body qc">
                  <div id="qc">
                    <h4
                      className="p-3"
                      style={{ color: "#3B5998", fontWeight: "600" }}
                    >
                      Quote Comparison
                    </h4>
                    <p className="card-text">
                      Got too many quotations ? Don't know which one is best for
                      you? We can help.
                    </p>
                  </div>
                </div>
                <div
                  className="d-grid grid-btn"
                  onClick={() => (window.location.href = "/quotecomparison")}
                >
                  <button type="button" className="btn blue btn-lg text-light">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="">
                <div className="card-body fb">
                  <div id="fb">
                    <h4
                      className="p-3"
                      style={{ color: "#6838CC", fontWeight: "600" }}
                    >
                      Final Billing
                    </h4>
                    <p className="card-text">
                      Got a Final Interior Bill? We can help you check .
                    </p>
                  </div>
                </div>
                <div
                  className="d-grid grid-btn"
                  onClick={() => (window.location.href = "/finalbilling")}
                >
                  <button type="button" className="btn blue btn-lg text-light">
                    Get Final Billing
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="">
                <div className="card-body el">
                  <div id="el">
                    <h4
                      className="p-3"
                      style={{ color: "#4BEBEB", fontWeight: "600" }}
                    >
                      Easy Loans
                    </h4>
                    <p className="card-text">
                      IDesigns brings to you easy finance options.
                    </p>
                  </div>
                </div>
                <div
                  className="d-grid grid-btn"
                  onClick={() => (window.location.href = "/loan")}
                >
                  <button type="button" className="btn blue btn-lg text-light">
                    Get Loans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonal />

      <Footer />
    </>
  );
};

export default Idesignexclusive;
