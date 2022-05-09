import React from "react";
import Header from "../components/common/header";
import Footer from '../components/common/footer';

import {Link} from "react-router-dom";
function BoqComparison(props) {
  return (
    <>
      <Header />
      <section className="qcomparison">
        <div className="container">
          <div className="mt-lg-5 linking">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-xs-12">
                  <p className="mt-5">
                    <span>Home </span>
                    <span>iDesign Exclusives</span>
                    <span>BOQ Comparison</span>
                  </p>

                  <h2 className="mt-4">
                    <b>Quotation comparison</b>
                  </h2>
                  <p className="mt-4">
                    <b>
                      Skip all the doubts ! Take BOQ comparison with iDesign
                      expert
                    </b>
                  </p>
                  <p className="mt-4">
                    Video Call + Comparison Report @ <b>Just Rs 999</b>
                  </p>
                  <Link to="quotedetails.html">
                    {" "}
                    <button type="button" className="btn blue mt-5 text-light">
                      Consult Now
                    </button>
                  </Link>
                  <div className="row text-muted mt-5">
                    <div className="col-lg-4 col-xs-4">
                      <span>
                        <i className="fa fa-clock-o " aria-hidden="true"></i>
                      </span>
                      <span className="">30 mins consultation</span>
                    </div>
                    <div className="col-lg-4 col-xs-4">
                      <span>
                        <i className="fa fa-clock-o " aria-hidden="true"></i>
                      </span>
                      <span className="">iDesign Experts</span>
                    </div>
                    <div className="col-lg-4 col-xs-4">
                      <span>
                        <i className="fa fa-clock-o " aria-hidden="true"></i>
                      </span>
                      <span className="">Get Final Reports</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-12 man"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recommend mt-5">
        <div className="container">
          <div className="row">
            <h2 className="text-center p-4">
              Get Recommendations on Everything Interiors
            </h2>
            <div className="col-lg-6 col-xs-12 mt-5">
              <div className="benefits shadow rounded">
                <div className="card border-0">
                  <h3 className="text-center mt-3 mb-3">
                    <b>Benefits</b>
                  </h3>
                  <div className="benefits-bg text-center p-3 ">
                    <h4>
                      <b>INR 999 /-</b>
                    </h4>
                    <p className="text-light">*Applicable charges may apply</p>
                  </div>
                  <div className="card-body d-grid gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Speak to <b>industry professionals</b>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        <b>Unbiased</b> Consultation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        Practical <b>budgeting and planning</b>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        Save <b>Time and Money</b>
                      </label>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="button" className="btn blue btn-lg text-light">
                      Sign Up Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12 mt-5">
              <div className="row">
                <div className="col-lg-6 col-xs-6">
                  <div className="ibox text-center p-5 shadow rounded">
                    <img
                      src="assets/images/comp/modular.png"
                      alt=""
                      className="w-50"
                    />
                    <p>Modular solutions</p>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-6">
                  <div className="ibox text-center p-5 shadow rounded">
                    <img
                      src="assets/images/comp/furniture.png"
                      alt=""
                      className="w-50"
                    />
                    <p>Furniture</p>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-6">
                  <div className="ibox text-center p-5 shadow rounded">
                    <img
                      src="assets/images/comp/civil.png"
                      alt=""
                      className="w-50"
                    />
                    <p>Civil Work</p>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-6">
                  <div className="ibox text-center p-5 shadow rounded">
                    <img
                      src="assets/images/comp/celing.png"
                      alt=""
                      className="w-50"
                    />
                    <p>False Ceiling</p>
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
          <div className="row"></div>
          <div className="row">
            <div className="col-lg-4 text-center">
              <h4 className="mt-3">
                <b>Share estimates</b>
              </h4>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-4 text-center">
              <h4 className="mt-3">
                <b>Book a consultation</b>
              </h4>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
            <div className="col-lg-4 text-center">
              <h4 className="mt-3">
                <b>Make Payment</b>
              </h4>
              <p className="mt-3">Lorem Ipsum is simply dummy text.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonal mt-5">
        <div className="container mt-5">
          <h2 className="text-center">Testimonials</h2>
          <section id="testim" className="testim">
            <div className="testim-cover">
              <div className="wrap">
                <span
                  id="right-arrow"
                  className="arrow right fa fa-chevron-right"
                ></span>
                <span
                  id="left-arrow"
                  className="arrow left fa fa-chevron-left "
                ></span>
                <ul id="testim-dots" className="dots">
                  <li className="dot active"></li>
                  <li className="dot"></li>
                  <li className="dot"></li>
                  <li className="dot"></li>
                  <li className="dot"></li>
                </ul>
                <div id="testim-content" className="cont">
                  <div className="active">
                    <p>
                      “iDesign has had a huge impact on my business. The fact
                      that the marketing and the business tools are all in one
                      place is really great. Now it's saving me time and
                      everything is in the same place.”
                    </p>
                    <h2>
                      <b>Vivek Verma</b> Interior Designer
                    </h2>
                    <div className="img">
                      <img src="assets/images/home/testimonal.png" alt="" />
                    </div>
                  </div>

                  <div>
                    <p>
                      “iDesign has had a huge impact on my business. The fact
                      that the marketing and the business tools are all in one
                      place is really great. Now it's saving me time and
                      everything is in the same place.”
                    </p>
                    <h2>
                      <b>Vivek Verma</b> Interior Designer
                    </h2>
                    <div className="img">
                      <img src="assets/images/home/testimonal.png" alt="" />
                    </div>
                  </div>

                  <div>
                    <p>
                      “iDesign has had a huge impact on my business. The fact
                      that the marketing and the business tools are all in one
                      place is really great. Now it's saving me time and
                      everything is in the same place.”
                    </p>
                    <h2>
                      <b>Vivek Verma</b> Interior Designer
                    </h2>
                    <div className="img">
                      <img src="assets/images/home/testimonal.png" alt="" />
                    </div>
                  </div>

                  <div>
                    <p>
                      “iDesign has had a huge impact on my business. The fact
                      that the marketing and the business tools are all in one
                      place is really great. Now it's saving me time and
                      everything is in the same place.”
                    </p>
                    <h2>
                      <b>Vivek Verma</b> Interior Designer
                    </h2>
                    <div className="img">
                      <img src="assets/images/home/testimonal.png" alt="" />
                    </div>
                  </div>

                  <div>
                    <p>
                      “iDesign has had a huge impact on my business. The fact
                      that the marketing and the business tools are all in one
                      place is really great. Now it's saving me time and
                      everything is in the same place.”
                    </p>
                    <h2>
                      <b>Vivek Verma</b> Interior Designer
                    </h2>
                    <div className="img">
                      <img src="assets/images/home/testimonal.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default BoqComparison;
