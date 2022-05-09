import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/footer";
import Header from "../common/header";

import Testimonal from "../testimonal/testimonal";

function stepone({handleClick}) {
  return (
    <>
      <section className="qcomparison  group">
        <div className="container">
          <div className="mt-lg-5 linking">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-xs-12 details">
                  <div className="form-box text-center p-lg-4 rounded bg-light div-shadow">
                    <h1 className="p-3 ">Quote Details</h1>
                    <form action="" method="post">
                      <div className="row justify-content-center">
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Name"
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Email"
                          />
                        </div>
                        <div className="input-group mb-2">
                          <span className="input-group-text" id="basic-addon1">
                            +91
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div>
                          <select
                            className="form-select mb-2"
                            aria-label="Default select example"
                          >
                            <option selected>Select City</option>
                            <option value="1">Delhi</option>
                            <option value="2">Noida</option>
                            <option value="3">Gurgaon</option>
                          </select>
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Requirements"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Budget"
                          />
                        </div>
                        <div>
                          <select
                            className="form-select mb-2"
                            aria-label="Default select example"
                          >
                            <option selected className="text-muted">Select Bank</option>
                            <option value="1">ICICI</option>
                            <option value="2">HDFC</option>
                            <option value="3">IDBI</option>
                          </select>
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn blue me-2 text-light"
                            onClick={handleClick} >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-12">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="mt-3">
        <div className="container">
          <h3 className="inter mb-3"><b>Step 1 of 3</b></h3>
        </div>
        <div class="position-relative ieprog">
          <div class="progress ieprogress">
            <div class="progress-bar ieprogress-bar blue" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="position-absolute top-0 start-0 translate-middle btn-primary rounded-pill" ></div>
          <div class="position-absolute top-0 start-50 translate-middle btn-primary rounded-pill" ></div>
          <div class="position-absolute top-0 start-100 translate-middle btn-secondary rounded-pill" ></div>
        </div>
      </section>
      {/* <Testimonal /> */}

      
    </>
  );
}

export default stepone;
