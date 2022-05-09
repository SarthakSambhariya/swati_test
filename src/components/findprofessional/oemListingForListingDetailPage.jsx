import one from "../home/images/21-pea-green-sofa-industrial-living-space.jpg";
import two from "../home/images/collov-home-design--aDGbdTsBZg-unsplash.jpg";
import three from "../home/images/curtain.png";
import React, { useState } from "react";
import design_firm from "../home/images/design-firm.png";
import "./css/mobile/filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faHeart,
  faTrash,
  faShare,
  faCheck,
  faArrowRight,
  faStar,
  faHeartPulse,
  faTicket,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import "../findprofessional/css/findprofessional.css";
import tick from "../findprofessional/images/tick.png";
import share from "../findprofessional/images/share.png";
import like from "../findprofessional/images/like.png";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Carousel from "react-bootstrap/Carousel";
import { useEffect } from "react";
import authService from "../../services/authService";
import constants from "../../services/constants";

import heartO from "../home/images/heart-o.png";
import designerservice from "../../services/designerservice";
import CallButton from "../common/buttons/callbutton";
import reviews from "../../services/reviewservice";
import Share from "../common/buttons/share";
import WhatsApp from "../common/buttons/whatsapp";
import b2bservice from "../../services/b2bservice";

import noProject from "../common/noimage/noProject.png";
import { Card } from "react-bootstrap";

const OemListingForListingDetailPage = ({
  id,
  name,
  experience,
  description,
  fee,
  city,
  phoneNumber,
  company,
  pro,
  liked,
  listingName,
  pricing,
  showTables,
}) => {
  const [user, setUser] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [review, setReview] = useState({ avgReview: 0, count: 0 });
  const [projects, setProjects] = useState([]);
  const handleLike = async () => {
    const params = {
      designerId: id,
      userId: authService.getLocalStorage("id"),
    };
    const designer = await designerservice.likedDesigner(params);
    setShowHeart(!showHeart);
  };

  const designerReview = async () => {
    const parms = {
      designerId: id,
    };

    const r = await reviews.getUserReview(parms);
    if (r.length > 0) {
      setReview(r[0]);
    }
  };

  const getDesignerProjects = async () => {
    const params = `designerId=${id}&designerId=${id}`;
    const userprojects = await b2bservice.getlistProjectsFilter(params);
    console.log(userprojects);
    if (userprojects.length > 0) {
      setProjects(userprojects[0]["data"][0]["images"]);
    }
  };

  const getlikedDesigner = async () => {
    const parms = {
      userId: authService.getLocalStorage("id"),
      designerId: id,
    };
    try {
      const responser = await designerservice.getLikedDesigner(parms);
      if (responser) {
        setShowHeart(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
    authService.getToken() && getlikedDesigner();
    authService.getToken() && designerReview();
    getDesignerProjects();
  }, []);

  console.log(listingName, city);
  return (
    <Card
      className=""
      style={{
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        backgroundColor: "#F6F6F6",
      }}
    >
      <div className=" ">
        <div
          className="col-md-12 brand-card-shadow rounded-3 crousal-dots"
          key={id}
        >
          <div className="row p-2">
            <div className="col-lg-4 col-md-12 crousalimg">
              {projects.length > 0 ? (
                <>
                  <Carousel
                    indicators={false}
                    interval={null}
                    style={{ width: "30em" }}
                  >
                    <Carousel.Item>
                      <div
                        className="star"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          position: "absolute",
                          left: "23em",
                          top: "1em",
                        }}
                      >
                        <span>
                          <i>
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          {review.avgReview ? review.avgReview : "4.3"}
                        </span>
                      </div>
                      <div className="carousel-img">
                        <img
                          className="d-block w-100 "
                          src={one}
                          alt="First slide"
                          onClick={() =>
                            console.log("OEM Card clicked")(
                              (window.location.href = `/oemlistingpage`)
                            )
                          }
                          style={{ cursor: "pointer", height: "180px" }}
                        />
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div
                        className="star"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          position: "absolute",
                          left: "23em",
                          top: "1em",
                          // border: "2px solid red",
                        }}
                      >
                        <span>
                          <i>
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          {review.avgReview ? review.avgReview : "4.3"}
                        </span>
                      </div>
                      <div className="carousel-img">
                        <img
                          className="d-block w-100"
                          src={two}
                          alt="First slide"
                          onClick={() =>
                            console.log("OEM Card clicked")(
                              (window.location.href = `/oemlistingpage`)
                            )
                          }
                          style={{ cursor: "pointer", height: "180px" }}
                        />
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div
                        className="star"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          position: "absolute",
                          left: "23em",
                          top: "1em",
                        }}
                      >
                        <span>
                          <i>
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          {review.avgReview ? review.avgReview : "4.3"}
                        </span>
                      </div>
                      <div className="carousel-img">
                        <img
                          className="d-block w-100"
                          src={three}
                          alt="First slide"
                          onClick={() =>
                            console.log("OEM Card clicked")(
                              (window.location.href = `/oemlistingpage`)
                            )
                          }
                          style={{ cursor: "pointer", height: "180px" }}
                        />
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </>
              ) : (
                <Carousel
                  indicators={false}
                  interval={null}
                  style={{ width: "30em" }}
                >
                  <Carousel.Item>
                    <div
                      className="star"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        position: "absolute",
                        left: "45vw",
                        top: "1em",
                      }}
                    >
                      <span>
                        <i>
                          <FontAwesomeIcon icon={faStar} />
                        </i>
                        {review.avgReview ? review.avgReview : "4.3"}
                      </span>
                    </div>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100 "
                        src={one}
                        alt="First slide"
                        onClick={() =>
                          console.log("OEM Card clicked")(
                            (window.location.href = `/oemlistingpage`)
                          )
                        }
                        style={{ cursor: "pointer", height: "180px" }}
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div
                      className="star"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        position: "absolute",
                        left: "45vw",
                        top: "1em",
                      }}
                    >
                      <span>
                        <i>
                          <FontAwesomeIcon icon={faStar} />
                        </i>
                        {review.avgReview ? review.avgReview : "4.3"}
                      </span>
                    </div>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100"
                        src={two}
                        alt="First slide"
                        onClick={() =>
                          console.log("OEM Card clicked")(
                            (window.location.href = `/oemlistingpage`)
                          )
                        }
                        style={{ cursor: "pointer", height: "180px" }}
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div
                      className="star"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        position: "absolute",
                        left: "45vw",
                        top: "1em",
                      }}
                    >
                      <span>
                        <i>
                          <FontAwesomeIcon icon={faStar} />
                        </i>
                        {review.avgReview ? review.avgReview : "4.3"}
                      </span>
                    </div>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100"
                        src={three}
                        alt="First slide"
                        onClick={() =>
                          console.log("OEM Card clicked")(
                            (window.location.href = `/oemlistingpage`)
                          )
                        }
                        style={{ cursor: "pointer", height: "180px" }}
                      />
                    </div>
                  </Carousel.Item>
                </Carousel>
              )}
            </div>
            <div className="col-lg-5 col-md-12 socialpart">
              <table style={{ width: "100%" }} className="social">
                <tr>
                  <td
                    onClick={() =>
                      console.log("OEM Card clicked")(
                        (window.location.href = `/oemlistingpage`)
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <p className="mt-2 d-inline dlsize mx-3">
                      {name ? name : "Woodmac"}
                      {pro && (
                        <span className="mx-1">
                          <img src={tick} alt="" />
                        </span>
                      )}
                      {user ? (
                        showHeart ? (
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            onClick={handleLike}
                            style={{
                              color: "red",
                              cursor: "pointer",
                              margin: "0 0.5em",
                            }}
                          />
                        ) : (
                          <img
                            src={heartO}
                            style={{
                              width: "15px",
                              cursor: "pointer",
                              margin: "0 0.5em",
                            }}
                            alt=""
                            srcset=""
                            onClick={handleLike}
                            id="heart"
                          />
                        )
                      ) : (
                        <img
                          src={heartO}
                          style={{
                            width: "15px",
                            cursor: "pointer",
                            margin: "0 0.5em",
                          }}
                          alt=""
                          srcset=""
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          id="hearto"
                        />
                      )}
                      <Share size="xs" />
                    </p>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <td></td>
                      <td style={{ margin: "0 0.5em" }}></td>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mt-2 my-3 mx-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-geo-alt-fill mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>{" "}
                      {description
                        ? description
                        : "A - 4, Block A, Mayapuri Industrial Area"}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      className="star"
                      style={{
                        backgroundColor: "#e8e8e8",
                        borderRadius: "5px",
                      }}
                    >
                      <i>
                        <FontAwesomeIcon icon={faStar} />
                      </i>
                      &nbsp;&nbsp;
                      <span class="mt-2">
                        {review.avgReview ? review.avgReview : "4.3"}
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-center d-flex my-4">
                      <span className="callbuttons">
                        <CallButton
                          number={phoneNumber}
                          listingName={listingName ? listingName : ""}
                          id="bluecallbuttons"
                        />
                      </span>
                      <span>
                        <WhatsApp phoneNumber={phoneNumber} />
                      </span>
                    </span>
                  </td>
                </tr>
              </table>

              {/* <div className="col-lg-3 col-md-12 paddingauto">
                <div
                  className="text-center d-flex"
                  style={{ border: "2px solid red", width: "21vw" }}
                >
                  <CallButton number={phoneNumber} listingName={listingName} />

                  <WhatsApp phoneNumber={phoneNumber} />
                </div>
              </div> */}
              {/* <div className="review">
                <span className="star">
                  {review.avgReview}
                  <i>
                    <FontAwesomeIcon icon={faStar} />
                  </i>
                </span>
                <span>({review.count} review)</span>
              </div>
              <br />
              {!(listingName === "contractor") && fee && (
                <div className="costage">
                  <span>
                    Design fee : <b>₹{fee}/room</b>
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OemListingForListingDetailPage;
