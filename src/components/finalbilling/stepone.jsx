import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import billingservice from "../../services/billingservice";
import Footer from "../common/footer";
import Header from "../common/header";

import Testimonal from "../testimonal/testimonal";

function Stepone({ handleClick }) {

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    apartment: "",
    requirements: "",
    budget: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await billingservice.finalBilling(billing);
    handleClick();

  };


  return (
    <>
      <section className="qcomparison  group">
        <div className="container">
          <div className="mt-lg-5 linking">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-xs-12 details">
                  <div className="form-box text-center p-lg-4 rounded bg-white div-shadow">
                    <h1 className="p-3 ">Loan Details</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="row justify-content-center">
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Name"
                            required={true}
                            name="name"
                            value={billing.name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleInput2"
                            required={true}
                            name="email"
                            value={billing.email}
                            onChange={(e) => handleChange(e)}
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
                            required={true}
                            name="phoneNumber"
                            value={billing.phoneNumber}
                            onChange={(e) => handleChange(e)}
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div>
                          <select
                            className="form-select mb-2"
                            aria-label="Default select example"
                            required={true}
                            name="apartment"
                            value={billing.apartment}
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select Apartment</option>
                            <option value="1bhk">1BHK</option>
                            <option value="2bhk">2BHK</option>
                            <option value="3bhk">3BHK</option>
                          </select>
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Requirements"
                            required={true}
                            name="requirements"
                            value={billing.requirements}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Budget"
                            required={true}
                            name="budget"
                            value={billing.budget}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn blue me-2 text-light">
                            submit
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

export default Stepone;
