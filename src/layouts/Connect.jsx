import React from "react";
import Header from "../components/common/header";

function Connect(props) {
  return (
    <>
      <Header />
      <section className="help-desk">
        <div className="container p-5">
          <div className="connect-heading text-center">
            <h3>
              <b>Connect</b>
            </h3>
            <div className="row justify-content-center">
              <div className="col-2 border w-25">
                <i className="fa fa-envelope">&nbsp; Email</i>
              </div>
              <div className="col-2 border">
                <i className="fa fa-whatsapp">&nbsp; Chat</i>
              </div>
              <div className="col-2 border">
                <i className="fa fa-phone">&nbsp; Call Us</i>
              </div>
            </div>
          </div>
          <h4>
            <b>Frequently Asked Questions</b>
          </h4>
          <div className="">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Report an issue
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Connect with us
                </button>
              </li>
            </ul>
            <div
              className="tab-content shadow p-5 mb-5 bg-body rounded"
              id="pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button bg-light text-dark border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Issue Title
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                        <div className="float-end mt-4 p-3">
                          <label>
                            <input
                              type="checkbox"
                              name="issue"
                              className="text-muted"
                            />{" "}
                            I am facing this issue
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button bg-light text-dark border-0 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Issue Title
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button bg-light border-0 text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Issue Title
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              ></div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Connect;
