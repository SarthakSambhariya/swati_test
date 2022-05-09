import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/footer";
import Header from "../common/header";

function steptwo({handleClick}) {
  return (
    <>
      <section className="qcomparison-drag-file">
        <div className="container">
          <div className="row p-5">
            <div className="col-lg-6 col-xs-12 text-center">
              <h4 className="p-4">
                Upload your
                <b>
                  <u>Quote Comparison</u>
                </b>
              </h4>
              <div className="drag-area">
                <div className="icon">
                  <i className="fa fa-upload"></i>
                </div>
                <header>Drag and drop files to upload</header>
                <p className="text-danger p-4">
                  *upload files with .pdf,..xlsx
                </p>
                <input type="file" hidden />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-lg blue me-2 text-light"
                    onClick={handleClick}
                  >
                    Next
                  </button>
              </div>
              <p className="p-4">
                By clicking Next you agree to the
                <Link to="/terms">
                  <u>Terms & Conditions</u>
                </Link>
              </p>
            </div>
            <div className="col-lg-6 col-xs-12 blueman">
              <div className="row justify-content-evenly">
                <div className="col-10">
                  <div className="row">
                    <div className="col-lg-6 col-xs-12 text-light">
                      <h2 className="text-light float-start">Header</h2>
                      <p className="d-inline-block mb-4">
                        <b>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard.
                        </b>
                      </p>
                      <button
                        type="button"
                        className="btn green me-2 text-light mb-5"
                      >
                        Find Professionals
                      </button>
                    </div>
                    <div className="col-lg-6 col-xs-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default steptwo;
