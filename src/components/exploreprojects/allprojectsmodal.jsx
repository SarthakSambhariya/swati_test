import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPhone,
  faShare,
  faStar,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import heartO from "../home/images/heart-o.png";
import aliciascott from "../designer-profile/aliciascott.png";
import tick from "../findprofessional/images/tick.png";
import location from "../findprofessional/images/location.png";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Share from "../common/buttons/share";
import CallButton from "../common/buttons/callbutton";
import WhatsApp from "../common/buttons/whatsapp";
import noimage from "../../components/home/images/noimage.png";

function AllProjectsModal({ name, modalName,review, exp, address, images, fee, pname, phoneNumber, projects=[], designerImage }) {
  return (
    <div
      className="modal fade"
      id={modalName}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      backdrop='static'
      keyboard={false}
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-9 col-sm-12">
                <div className="prev-next-project">
                  <div className="row justify-content-between">
                    <div className="col-lg-6 col-md-6 mb-80">
                      <div className="d-flex">
                        <div className="arrow" style={{cursor:"pointer"}}>
                          
                          <a className="fs-1 green-recon border-0 ">
                            ❮
                          </a>
                        </div>
                        <div>
                          <h4 className="mb-0 green-recon border-0">
                            Previous Project
                          </h4>
                          <p className="mb-0 border-0 float-end">{projects.length > 0 && projects[0]["name"]}</p>
                        </div>
                        <div className="mr-lg-5 ms-3"></div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-80">
                      <div className="d-flex">
                        <div className="mr-lg-5 me-3">
                          {/* <img src="assets/images/designer-profile/pproject.png" alt=""> */}
                        </div>
                        <div className="mr-3">
                          <h4 className="mb-0 green-recon border-0">
                            Next Project
                          </h4>
                          <p className="mb-0 border-0">{projects.length > 1 && projects[1]["name"]}</p>
                        </div>
                        <div className="arrow" style={{cursor:"pointer"}}>
                          <a className="fs-1 green-recon border-0">
                            ❯
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <button
                  type="button"
                  className="btn-close float-end"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <div className="">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner p-3 bg-secondary">
                      {images.length > 0 ? (
                        images.map((m, i) => (
                          <div className={i ===0 ? "carousel-item modal-img text-center active" : "carousel-item modal-img text-center"}>
                          <img src={m["original"]} alt="" className="m-auto w-75" />
                        </div>
                        ))
                      ) : (
                        <>
                        <div className="carousel-item modal-img text-center active">
                          <img src={noimage} alt="" className="m-auto w-75" />
                        </div>
                        </>
                      )}
                      
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <p>
                  <span className="fs-4">{ name }</span>
                  <FontAwesomeIcon
                    icon={heartO}
                    size="lg"
                    className="fs-3 ms-3"
                    style={{
                      cursor: "pointer",
                      margin: "-2px 0px",
                    }}
                  />
                  <img
                    src={heartO}
                    size="lg"
                    className="fs-3 ms-3"
                    alt=""
                    srcset=""
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  />
                  <Share />
                </p>
                <p className="mt-3">{pname}</p>

                <div className="row justify-content-between mt-4">
                  <div className="col">
                    <div className=" mb-3" style={{ maxWidth: "540px;" }}>
                      <div className="row g-0">
                        <div className="col-md-3 align-self-center">
                          <img src={designerImage} className="rounded w-100" alt="" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {name} <img src={tick} alt="" />
                            </h5>
                            <p className="card-text">Interior Designer</p>
                            <p>
                              <span className="star-icon">
                                <i className="pe-2">
                                  <FontAwesomeIcon icon={faStar} />
                                </i>
                                {review.avgReview}
                              </span>
                              <span className="social-icon">
                                <img src={location} alt="" />
                                {address}
                              </span>
                            </p>
                          </div>
                        </div>
                        {exp && (

                        <p className="card-text">
                          <span>
                            Experience<b> {exp}</b>
                          </span>
                        </p>
                        )}
                        {fee && (
                        <p className="liked-ins float-start mt-4 blue-text w-50">
                          Design fee : <b>₹{fee} Price/room</b>
                        </p>

                        )}
                      </div>
                    </div>
                    <div className="row mt-lg-1 interfont">
                      <div className="">
                        <CallButton number={phoneNumber} listingName={"Designer"} />
                        &nbsp;
                        <WhatsApp phoneNumber={phoneNumber} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        className="btn btn-primary blue ps-5 pe-5"
                        type="button"
                        onClick={() =>
                          (window.location.href = `/designer/${
                            address
                          }/${name.replaceAll(" ", "-").toLowerCase()}`)
                        }
                      >
                        View all projects by <b>{name}</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-4 col-sm-12">
                    <h5>Modern Living Room </h5>
                    <p>Building Name</p>

                    <div className="row justify-content-between mt-5">
                        <div className="col">
                            <div className=" mb-3">
                                <div className="row g-0">
                                    <div className="col-md-2 align-self-center">
                                        <img src="assets/images/designer-profile/aliciascott.png" alt="" />
                                    </div>
                                    <div className="col-md-8 ms-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Alicia Scott</h5>
                                            <p className="card-text">
                                                Interior Designer
                                            </p>
                                            <p>devon_lane@gmail.com</p>

                                        </div>
                                    </div>
                                    <p className="card-text">
                                        <span className="star-icon"><i className="fa fa-star"></i>4.3</span>
                                        <span>Experience<b> 3 Years </b></span>
                                    </p>
                                    <p className="liked-ins float-start mt-4">Design fee : ₹5000/room</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="social-icon">
                        <span><i className="fa fa-heart-o"></i></span>
                        <span><i className="fa fa-whatsapp"></i></span>
                        <span><i className="fa fa-phone"></i></span>
                        <span className="text-light green chat-secure"><i className="fa fa-envelope-o me-3"></i>Start
                            Chat</span>
                    </div>
                    <div className="rooms mt-lg-5 text-light">
                        <div className="two-rooms mb-4">
                            <span className="green">Living Room</span>
                            <span className="blue">Drawing Room</span>
                        </div>
                        <span className="maroon">Drawing Room
                        </span>
                    </div>
                </div>
            */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProjectsModal;
