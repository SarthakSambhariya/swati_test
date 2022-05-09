import React, { useState, useEffect } from "react";
import quoteservice from "../../services/quoteservice";

import Testimonal from "../testimonal/testimonal";

function Stepone({ handleClick }) {
  const [quotes, setQuotes] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    apartment: "",
    budgetMin: "",
    budgetMax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await quoteservice.finalQuotes(quotes);

    handleClick();
  };

  return (
    <>
      <section className="group">
        <div className="container">
          <div className="mt-lg-5 linking">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-xs-12 details">
                  <div className="form-box text-center p-lg-4 rounded bg-white div-shadow">
                    <h1 className="p-3 ">Quote Details</h1>
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
                            value={quotes.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Email"
                            required={true}
                            name="email"
                            value={quotes.email}
                            onChange={handleChange}
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
                            required={true}
                            name="phoneNumber"
                            value={quotes.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <select
                            className="form-select mb-2"
                            aria-label="Default select example"
                            required={true}
                            name="apartment"
                            value={quotes.apartment}
                            onChange={handleChange}
                          >
                            <option selected>Select Apartment</option>
                            <option value="1bhk">1BHK</option>
                            <option value="2bhk">2BHK</option>
                            <option value="3bhk">3BHK</option>
                          </select>
                        </div>
                        <div className="mb-2">
                          <div className="input-group flex-nowrap">
                            <span
                              className="input-group-text"
                              id="addon-wrapping"
                            >
                              min
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="INR"
                              aria-label="Username"
                              aria-describedby="addon-wrapping"
                              required={true}
                              name="budgetMin"
                              value={quotes.budgetMin}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="input-group flex-nowrap">
                            <span
                              className="input-group-text"
                              id="addon-wrapping"
                            >
                              max
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="INR"
                              aria-label="Username"
                              aria-describedby="addon-wrapping"
                              required={true}
                              name="budgetMax"
                              value={quotes.budgetMax}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn blue me-2 text-light"
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-12"></div>
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
