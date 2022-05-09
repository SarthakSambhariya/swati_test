import React from "react";
import testi from "../../components/home/images/testimonal.png"
import report from "../quotecomparision/images/report.png";
import time from "../quotecomparision/images/time.png";
import profile from "../quotecomparision/images/profile.png";
import billingwork from "../finalbilling/images/billingwork.png"
import btime from "../finalbilling/images/btime.png";
import budget from "../finalbilling/images/budget.png";
import expert from "../finalbilling/images/expert.png";
import unbiased from "../finalbilling/images/unbiased.png";

import Testimonal from "../testimonal/testimonal";
import mobile from "../../mobile/css/main.css";
import mshare from "../../mobile/image/mshare.png";
import consult from "../../mobile/image/consult.png";

function main({ handleClick }) {

  return (
    <>
      <section className="qcomparison">
        <div className="container">
          <div className="linking mt-lg-5 man">
            <div className="container ">
              <div className="row">
                <div className="col-lg-6 col-xs-12 mt-lg-5">
                  <h2 className="mt-4">
                    <b>Final Billing</b>
                  </h2>

                  <p className="mt-4 fs-4">
                    Get a final application checklist with unmatched benefits
                  </p>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary blue mt-lg-5 mt-sm-2 text-light ps-5 pe-5"
                    onClick={() => handleClick()}
                  >
                    Consult Now
                  </button>
                  <div className="row text-muted mt-5">
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
            Get advisory on Final Billing
            </h2>
            <div className="scrollmenu displaydn p-2">
              <span className="p-3 m-2 mob-shadow">
                <span><img src={expert} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={unbiased} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={budget} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
              <span className="p-3 m-2 mob-shadow">
                <span><img src={btime} alt="" width="40" /></span>
                <span>Lorem Ipsum</span>
              </span>
            </div>
            <div className="col-lg-2 col-xs-12 m-2 displayn">
              <div className="row gy-3">
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-5 box-border">
                    <img src={expert} alt="" className="w-100" />
                    <p>Measurement advice</p>
                  </div>
                </div>
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-5 box-border">
                    <img src={unbiased} alt="" className="w-100" />
                    <p>Extra Works </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xs-12 m-2">
              <div className="benefits mid-shadow">
                <div className="card border-0 ">
                  <h3 className="text-center mt-3 mb-4">
                    <b>Benefits</b>
                  </h3>

                  <div className="card-body d-grid gap-3 text-start fs-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />

                      Speak to <b>industry professionals</b>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        <b>Unbiased</b> Consultation
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Practical <b>budgeting and planning</b>
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Save <b>Time and Money</b>
                      </label>
                    </div>
                  </div>
                  <div className="text-center p-3 ">
                    <p className="fs-3" style={{ color: "#3B5998", padding: "15px" }}>
                      INR <b> 999 /-</b>
                    </p>
                    <p className="">*Terms and conditions may apply</p>
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
            <div className="col-lg-2 col-xs-12 m-2 displayn">
              <div className="row gy-3">
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-5 box-border">
                    <img src={budget} alt="" className="w-100" />
                    <p>Price Breakdowns</p>
                  </div>
                </div>
                <div className="col-lg-12 col-xs-12">
                  <div className="ibox text-center p-5 box-border">
                    <img src={btime} alt="" className="w-100" />
                    <p>Reconciliation</p>
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
                <img src={mshare} alt="" width="100" />               
                <div className="card-body">
                  <span className="card-text">
                  <p><b>Share estimates /pictures</b></p>
                    Lorem Ipsum is simply dummy text.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1 m-1 mob-shadow d-inline-block w-50">
              <div className="ws text-center">
                <img src={consult} alt="" width="100" />               
                <div className="card-body">
                  <span className="card-text">
                  <p><b>Book a consultation</b></p>
                    Lorem Ipsum is simply dummy text.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1 m-1 mob-shadow d-inline-block w-50">
              <div className="ws text-center">
                <img src={mshare} alt="" width="100" />               
                <div className="card-body">
                  <span className="card-text">
                  <p><b>Make <br /> Payment</b></p>
                    Lorem Ipsum is simply dummy text.
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-center displayn">
            <img src={billingwork} alt="" className="w-75" />
          </div>
          <div className="row displayn">
            <div className="col-lg-4 text-center">
              <p className="mt-3 fs-5">
                <b>Share estimates /pictures</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-4 text-center">
              <p className="mt-3  fs-5">
                <b>Book a consultation</b>
              </p>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-4 text-center">
              <p className="mt-3  fs-5">
                <b>Make Payment</b>
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
