import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

function FinalBillingDetails(props) {
  return (
    <>
    <Header />
      <section className="qcomparison">
        <div className="container">
          <div className="mt-lg-5 linking">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-xs-12">
                  <div className="form-box text-center">
                    <h1 className="p-3 ">Quote Details</h1>
                    <form action="" method="post">
                      <div className="row justify-content-center">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Name"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Email"
                          />
                        </div>
                        <div className="input-group mb-3">
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
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option selected>Select Apartment</option>
                            <option value="1">1BHK</option>
                            <option value="2">2BHK</option>
                            <option value="3">3BHK</option>
                          </select>
                        </div>
                        <div className="mb-3">
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
                        <div className="text-center">
                          
                            <button
                              type="button"
                              className="btn blue me-2 text-light"
                              onClick={()=> window.location.to="/finalbillingloan" }
                            >
                              submit
                            </button>
                          
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 col-xs-12">
                  <img src="assets/images/comp/girl.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FinalBillingDetails;
