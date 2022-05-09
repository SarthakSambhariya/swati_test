import React from "react";
import Header from "../common/header";
import { Modal, Button } from "react-bootstrap";

import bluesofa from "../designer-profile/blue-sofa.png";
import pproject from "../designer-profile/pproject.png";
import nproject from "../designer-profile/nproject.png";
import aliciascott from "../designer-profile/aliciascott.png";
import {Link} from "react-router-dom";
import "../exploreprojects/css/explore.css";

function MorePhotosModal({ show, setShow }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        fullscreen={true}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton dialogClassName="modal-90w">
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="prev-next-project">
                <div className="row justify-content-between">
                  <div className="col-lg-6 col-md-6 mb-80">
                    <div className="d-flex">
                      <div className="arrow">
                        <Link to="" className="fs-1 green-recon border-0 ">
                          ❮
                        </Link>
                      </div>
                      <div>
                        <h4 className="mb-0 green-recon border-0">
                          Previous Project
                        </h4>
                        <p className="mb-0 border-0 float-end">Steward’s</p>
                      </div>
                      <div className="mr-lg-5 ms-3">
                        <img
                          src={nproject}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-80">
                    <div className="d-flex float-end">
                      <div className="mr-lg-5 me-3">
                        <img
                          src={pproject}
                          alt=""
                        />
                      </div>
                      <div className="mr-3">
                        <h4 className="mb-0 green-recon border-0">Next Project</h4>
                        <p className="mb-0 border-0 float-start">
                          Brooklyn Heights
                        </p>
                      </div>
                      <div className="arrow">
                        <Link to="" className="fs-1 green-recon border-0">
                          ❯
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="mySlides" style={{display: "block"}}>
                <img
                  src={bluesofa}
                  className="w-75"
                />
              </div>

              <div className="mySlides" style={{display: "none"}}>
                <img
                  src={bluesofa}
                  className="w-75"
                />
              </div>

              <div className="mySlides" style={{display: "none"}}>
                <img
                  src={bluesofa}
                  className="w-75"
                />
              </div>

              <div className="mySlides" style={{display: "none"}}>
                <img
                  src={bluesofa}
                  className="w-75"
                />
              </div>
            </div>
            <Link className="prev" onclick="plusSlides(-1)">
              ❮
            </Link>
            <Link className="next" onclick="plusSlides(1)">
              ❯
            </Link>
            <div className="col-lg-4 col-sm-12">
              <h5>
                Modern Living Room <i className="fa fa-heart-o"></i>
              </h5>
              <p>Building Name</p>

              <div className="row justify-content-between mt-5">
                <div className="col">
                  <div className=" mb-3" style={{maxWidth: "540px"}}>
                    <div className="row g-0">
                      <div className="col-md-2 align-self-center">
                        <img
                          src={aliciascott}
                          alt=""
                        />
                      </div>
                      <div className="col-md-8 ms-3">
                        <div className="card-body">
                          <h5 className="card-title">Alicia Scott</h5>
                          <p className="card-text">Interior Designer</p>
                          <p>devon_lane@gmail.com</p>
                        </div>
                      </div>
                      <p className="card-text">
                        <span className="star-icon">
                          <i className="fa fa-star"></i>4.3
                        </span>
                        <span>
                          Experience<b> 3 Years </b>
                        </span>
                      </p>
                      <p className="liked-ins float-start mt-4">
                        Design fee : ₹5000/room
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-icon">
                <span>
                  <i className="fa fa-heart-o"></i>
                </span>
                <span>
                  <i className="fa fa-whatsapp"></i>
                </span>
                <span>
                  <i className="fa fa-phone"></i>
                </span>
                <span className="text-light green chat-secure">
                  <i className="fa fa-envelope-o me-3"></i>Start Chat
                </span>
              </div>
              <div className="rooms mt-lg-5 text-light">
                <div className="two-rooms mb-4">
                  <span className="green">Living Room</span>
                  <span className="blue">Drawing Room</span>
                </div>
                <span className="maroon">Drawing Room</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MorePhotosModal;
