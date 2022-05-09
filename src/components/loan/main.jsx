import React from "react";
import testi from "../../components/home/images/testimonal.png"
import report from "../quotecomparision/images/report.png";
import time from "../quotecomparision/images/time.png";
import profile from "../quotecomparision/images/profile.png";
import quotework from "../quotecomparision/images/quotework.png"
import axis from "../loan/images/axis.png";
import dhfl from "../loan/images/dhfl.png";
import lic from "../loan/images/lic.png";
import mahindra from "../loan/images/mahindra.png"
import loanwork from "../loan/images/loanwork.png"

import Testimonal from "../testimonal/testimonal";

function main({ handleClick }) {

  return (
    <>
      <section className="qcomparison">
        <div className="container">
          <div className="mt-lg-5 linking loan">
            <div className=" container">
              <div className="row">
                <div className="col-lg-6 col-xs-12 mt-lg-5 mobileloan">
                  <h2 className="mt-3" style={{ color: "#3b5998" }}>
                    <b>Easy Loan</b>
                  </h2>

                  <p className="mt-4 displayn fs-4">
                    Do repairs, renovations and more!
                    Give your home the makeover you always wanted
                  </p>
                  <p className="mt-4 displaydn">
                    Do repairs, renovations and more!
                    Give your home the makeover you always wanted
                  </p>
                  <div className="mobilelaondata">
                    <div>
                      <button
                        type="button"
                        className="btn btn-lg btn-primary blue mt-5 text-light me-3 "
                        onClick={() => handleClick()}
                      >
                        Apply Now
                      </button>
                      <button
                        type="button"
                        className="btn btn-lg btn-primary designer-btn mt-5 bg-light"
                        onClick={() => handleClick()}
                      >
                        Need Help ?
                      </button>
                    </div>
                    <div className="row text-muted mt-3">
                      <div className="col-lg-4 col-xs-4 consult-icon">
                        <span className=""><img src={time} alt="" className="pe-2" /> 30 mins consultation</span>
                      </div>
                      <div className="col-lg-4 col-xs-4 consult-icon">
                        <span className=""><img src={profile} alt="" className="pe-2" />Design Experts</span>
                      </div>
                      <div className="col-lg-4 col-xs-4 consult-icon">
                        <span className=""><img src={report} alt="" className="pe-2" />Get Final Reports</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-12 "></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recommend mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <h2 className="text-center p-4">
              Get Recommendations on Everything Interiors
            </h2>
            <div className="scrollmenu displaydn p-2">
              <span className="p-3 m-2 mob-shadow">
                <span><img src={lic} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={axis} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={mahindra} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={dhfl} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
            </div>
            <div className="col-lg-3 col-xs-12 m-2">
              <div className="benefits">
                <div className="card border-0 mid-shadow">
                  <h3 className="text-center mt-3 mb-3">
                    <b>Benefits</b>
                  </h3>

                  <div className="card-body d-grid gap-3 text-start fs-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        <b>Max loan</b> amount on interiors
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        <b>Lower</b> Interest Rate
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Multiple <b>bank option</b>
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        <b>Convenince</b>
                      </label>
                    </div>
                  </div>
                  <div className="text-center p-3 m-4">
                    <h4>
                      <b></b>
                    </h4>
                    <p className="mt-5"></p>
                  </div>
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn blue btn-lg text-light"
                    >
                      Sign Up Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-xs-12 m-2 displayn pe-0">
              <div className="row gy-3">
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-3  box-border">
                    <img src={lic} alt="" className="w-100" />
                    <p>Lic</p>
                  </div>
                </div>
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-3  box-border">
                    <img src={axis} alt="" className="w-100" />
                    <p>Axis</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-xs-12 m-2 displayn ps-0">
              <div className="row gy-3">
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-3  box-border">
                    <img src={mahindra} alt="" className="w-100" />
                    <p>Mahindra</p>
                  </div>
                </div>
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-3  box-border">
                    <img src={dhfl} alt="" className="w-100" />
                    <p>DHFL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-works mt-5">
        <div className="container">
          <h2 className="text-center p-4">How it Works</h2>

          <div className="scrollmenu displaydn p-2">
            <div className="p-1 m-1 mob-shadow d-inline-block w-50">
              <div className="ws text-center">
                <img src={dhfl} alt="" width="100" />
                <div className="card-body">
                  <span className="card-text">
                    <p><b>Share estimates /pictures</b></p>
                    Will help us get an idea of your work.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1 m-1 mob-shadow d-inline-block w-50">
              <div className="ws text-center">

                <img src={dhfl} alt="" width="100" />
                <div className="card-body">
                  <span className="card-text">
                    <p><b>Book a consultation</b></p>
                    Select a Convenient time.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1 m-1 mob-shadow d-inline-block w-50">
              <div className="ws text-center">
                <img src={dhfl} alt="" width="100" />
                <div className="card-body">
                  <span className="card-text">
                    <p><b>Make <br /> Payment</b></p>
                    Easy Payment Options.
                  </span>
                </div>
              </div>
            </div>
          
          </div>

          <div className="row justify-content-center displayn">
            <img src={loanwork} alt="" className="w-100" />
          </div>
          <div className="row displayn">
            <div className="col-lg-3 text-center">
              <p className="mt-3 fs-4">
                <b>Enquire</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-3 text-center">
              <p className="mt-3  fs-4">
                <b>Meet bank specialist</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-3 text-center">
              <p className="mt-3 fs-4">
                <b>Documentation</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-3 text-center">
              <p className="mt-3 fs-4">
                <b>Git Disburasal</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonal />
    </>
  );
}

export default main;
