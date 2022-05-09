import one from "../home/images/21-pea-green-sofa-industrial-living-space.jpg";
import two from "../home/images/collov-home-design--aDGbdTsBZg-unsplash.jpg";
import three from "../home/images/curtain.png";
import React, { useState } from "react";
import design_firm from "../home/images/design-firm.png";
import "./css/mobile/filter.css";
import "./oemlisting.css";

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

function getScreenWidth() {
  const { innerWidth: screenWidth } = window;
  return screenWidth;
}

const OEMListing = ({
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
  address,
}) => {
  const [user, setUser] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [review, setReview] = useState({ avgReview: 0, count: 0 });
  const [projects, setProjects] = useState([]);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

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

    //to get screenwidth
    function widthResizeHandler() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", widthResizeHandler);
    return () => window.removeEventListener("resize", widthResizeHandler);
  }, []);

  // console.log(screenWidth);
  return (
    <Card
      className=" "
      style={{
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        padding: "0",
      }}
    >
      <div
        className="col-md-12 brand-card-shadow rounded-3 crousal-dots"
        key={id}
      >
        <div className="row p-2">
          <div className="col-lg-4 col-md-12 crousalimg">
            {projects.length > 0 ? (
              <>
                <Carousel indicators={false} interval={null}>
                  <Carousel.Item>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100 "
                        src={one}
                        alt="First slide"
                        onClick={() => {
                          window.location.href = "/oemlistingpage";
                        }}
                        style={{ cursor: "pointer", height: "200px" }}
                      />
                      <div className="">
                        <div
                          className="star "
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            position: "absolute",
                            left: "70%",
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
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100 "
                        src={two}
                        alt="First slide"
                        onClick={() =>
                          console.log("OEM Card clicked")(
                            (window.location.href = `/oemlistingpage`)
                          )
                        }
                        style={{ cursor: "pointer", height: "200px" }}
                      />
                      <div className="">
                        <div
                          className="star "
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            position: "absolute",
                            left: "70%",
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
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-img">
                      <img
                        className="d-block w-100 "
                        src={three}
                        alt="First slide"
                        onClick={() =>
                          console.log("OEM Card clicked")(
                            (window.location.href = `/oemlistingpage`)
                          )
                        }
                        style={{ cursor: "pointer", height: "200px" }}
                      />
                      <div className="">
                        <div
                          className="star "
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            position: "absolute",
                            left: "70%",
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
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </>
            ) : (
              <Carousel
                indicators={false}
                interval={null}
                style={{ width: "100vw", margin: "auto" }}
              >
                <Carousel.Item>
                  <div className="carousel-img">
                    <img
                      className="d-block w-100 "
                      src={one}
                      alt="First slide"
                      onClick={() =>
                        console.log("OEM Card clicked")(
                          (window.location.href = "/oemlistingpage")
                        )
                      }
                      style={{ cursor: "pointer", height: "200px" }}
                    />
                    <div className="">
                      <div
                        className="star "
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          position: "absolute",
                          left: "70%",
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
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel-img">
                    <img
                      className="d-block w-100 "
                      src={two}
                      alt="First slide"
                      onClick={() =>
                        console.log("OEM Card clicked")(
                          (window.location.href = "/oemlistingpage")
                        )
                      }
                      style={{ cursor: "pointer", height: "200px" }}
                    />
                    <div className="">
                      <div
                        className="star "
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          position: "absolute",
                          left: "70%",
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
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel-img">
                    <img
                      className="d-block w-100 "
                      src={three}
                      alt="First slide"
                      onClick={() =>
                        console.log("OEM Card clicked")(
                          (window.location.href = `/oemlistingpage`)
                        )
                      }
                      style={{ cursor: "pointer", height: "200px" }}
                    />
                    <div className="">
                      <div
                        className="star "
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          position: "absolute",
                          left: "70%",
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
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            )}
          </div>
          {screenWidth >= 990 ? (
            <div className="col-lg-5 col-md-12 socialpart">
              <table style={{ width: "100%" }} className="social">
                <tr>
                  <td style={{ cursor: "pointer" }}>
                    <span
                      className="d-flex mx-2"
                      style={{ alignItems: "center" }}
                    >
                      <b
                        className=" d-inline dlsize"
                        onClick={() => {
                          window.location.href = `/oemlistingpage`;
                        }}
                      >
                        {name ? name : "Woodmac"}
                      </b>
                      {pro && <img className="mx-2" src={tick} alt="" />}
                      {user ? (
                        showHeart ? (
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            id="he"
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
                        <span className="mx-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-suit-heart"
                            viewBox="0 0 16 16"
                          >
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                          </svg>
                        </span>
                        // <img
                        //   src={heartO}
                        //   style={{
                        //     // width: "15px",
                        //     cursor: "pointer",
                        //     margin: "0 0.5em",
                        //   }}
                        //   alt=""
                        //   srcset=""
                        //   data-bs-toggle="modal"
                        //   data-bs-target="#staticBackdrop"
                        //   id="hearto"
                        // />
                      )}
                      <Share />
                    </span>
                  </td>
                  <td></td>
                  {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <td>
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
                    </td>
                    <td style={{ margin: "0 0.5em" }}>
                      <Share />
                    </td>
                  </div> */}
                </tr>
                <tr>
                  <td>
                    <div className="mb-4 mx-2">
                      {address
                        ? address
                        : "A-4, Block A, Mayapuri Industrial Area Phase I"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      className="pricing-table"
                      style={{ float: "left", width: "55%" }}
                    >
                      <div
                        className="table-headings"
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <b className="mx-2">Pricing</b>
                        <b className="mx-2 me-4">Laminated finish</b>
                      </div>
                      <hr className="hr" />
                      <Card>
                        <div
                          className="table-data mx-2"
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <b style={{ marginTop: "4px" }}>Wardrobe</b>
                          <p>
                            <b style={{ fontSize: "1.4em" }}>
                              ₹ {pricing ? pricing : "150"}
                            </b>
                            &nbsp;&nbsp;per/sqft
                          </p>
                        </div>
                      </Card>
                      <Card>
                        <div
                          className="table-data mx-2"
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <b style={{ marginTop: "4px" }}>Kitchen</b>
                          <p>
                            <b
                              style={{
                                fontSize: "1.4em",
                                fontWeight: "bolder",
                              }}
                            >
                              ₹ {pricing ? pricing : "150"}
                            </b>
                            &nbsp;&nbsp;per/sqft
                          </p>
                        </div>
                      </Card>
                    </div>
                  </td>
                </tr>
              </table>

              {/* {
                <p className="mt-2">
                  <div className="pricing-table px-5">
                    <div
                      className="table-headings"
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                      }}
                    >
                      <b>Pricing</b>
                      <b>Laminated finish</b>
                    </div>
                    <hr className="hr" />
                    <Card>
                      <div
                        className="table-data"
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <b style={{ marginTop: "4px" }}>Wardrobe</b>
                        <p>
                          <b style={{ fontSize: "1.4em" }}>
                            ₹ {pricing ? pricing : "150"}
                          </b>
                          &nbsp;&nbsp;per/sqft
                        </p>
                      </div>
                    </Card>
                    <Card>
                      <div
                        className="table-data"
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <b style={{ marginTop: "4px" }}>Kitchen</b>
                        <p>
                          <b
                            style={{ fontSize: "1.4em", fontWeight: "bolder" }}
                          >
                            ₹ {pricing ? pricing : "150"}
                          </b>
                          &nbsp;&nbsp;per/sqft
                        </p>
                      </div>
                    </Card>
                  </div>
                </p>
              } */}
              <p className="mt-2">{description}</p>
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
          ) : (
            <div className="" style={{ margin: "auto", width: "100%" }}>
              <table style={{ margin: "auto", width: "100%" }} className="">
                <tr>
                  <td style={{ cursor: "pointer" }}>
                    <span className="d-flex align-items-center ">
                      <b
                        className=" d-inline dlsize"
                        onClick={() => {
                          window.location.href = `/oemlistingpage`;
                        }}
                      >
                        {name ? name : "Woodmac"}
                      </b>
                      {pro && <img className="mx-2" src={tick} alt="" />}
                      {user ? (
                        showHeart ? (
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            onClick={handleLike}
                            id="he"
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
                        <span className="mx-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-suit-heart"
                            viewBox="0 0 16 16"
                          >
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                          </svg>
                        </span>
                        // <img
                        //   src={heartO}
                        //   style={{
                        //     // width: "15px",
                        //     cursor: "pointer",
                        //     margin: "0 0.5em",
                        //   }}
                        //   alt=""
                        //   srcset=""
                        //   data-bs-toggle="modal"
                        //   data-bs-target="#staticBackdrop"
                        //   id="hearto"
                        // />
                      )}
                      <Share />
                    </span>
                  </td>
                  <td></td>
                  {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <td>
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
                    </td>
                    <td style={{ margin: "0 0.5em" }}>
                      <Share />
                    </td>
                  </div> */}
                </tr>
                <tr>
                  <td>
                    <div className="mb-4">
                      {address
                        ? address
                        : "A-4, Block A, Mayapuri Industrial Area Phase I"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pricing-table">
                      <div
                        className="table-headings me-2 ms-2"
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <b>Pricing</b>
                        <b>Laminated finish</b>
                      </div>
                      <hr className="hr" />
                      <Card>
                        <div
                          className="table-data me-2 ms-2"
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <b style={{ marginTop: "4px" }}>Wardrobe</b>
                          <p>
                            <b style={{ fontSize: "1.4em" }}>
                              ₹ {pricing ? pricing : "150"}
                            </b>
                            &nbsp;&nbsp;per/sqft
                          </p>
                        </div>
                      </Card>
                      <Card>
                        <div
                          className="table-data me-2 ms-2"
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <b style={{ marginTop: "4px" }}>Kitchen</b>
                          <p>
                            <b
                              style={{
                                fontSize: "1.4em",
                                fontWeight: "bolder",
                              }}
                            >
                              ₹ {pricing ? pricing : "150"}
                            </b>
                            &nbsp;&nbsp;per/sqft
                          </p>
                        </div>
                      </Card>
                    </div>
                  </td>
                </tr>
              </table>

              {/* {
                <p className="mt-2">
                  <div className="pricing-table px-5">
                    <div
                      className="table-headings"
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                      }}
                    >
                      <b>Pricing</b>
                      <b>Laminated finish</b>
                    </div>
                    <hr className="hr" />
                    <Card>
                      <div
                        className="table-data"
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <b style={{ marginTop: "4px" }}>Wardrobe</b>
                        <p>
                          <b style={{ fontSize: "1.4em" }}>
                            ₹ {pricing ? pricing : "150"}
                          </b>
                          &nbsp;&nbsp;per/sqft
                        </p>
                      </div>
                    </Card>
                    <Card>
                      <div
                        className="table-data"
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <b style={{ marginTop: "4px" }}>Kitchen</b>
                        <p>
                          <b
                            style={{ fontSize: "1.4em", fontWeight: "bolder" }}
                          >
                            ₹ {pricing ? pricing : "150"}
                          </b>
                          &nbsp;&nbsp;per/sqft
                        </p>
                      </div>
                    </Card>
                  </div>
                </p>
              } */}
              <p className="mt-2">{description}</p>
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
          )}
          <div className="col-lg-3 col-md-12 paddingauto my-2">
            {screenWidth >= 990 && (
              // <div className=" text-center d-flex">
              <div className=" d-flex flex-column text-center">
                <span className="my-3">
                  <CallButton number={phoneNumber} listingName={listingName} />
                </span>
                <span className="my-3">
                  <WhatsApp phoneNumber={phoneNumber} />
                </span>
              </div>
            )}
          </div>
        </div>
        {screenWidth < 990 && (
          <div
            // className="d-flex justify-content-center"
            className="d-flex"
            style={{
              width: "101%",
              float: "left",
              margin: "0",
              padding: "0",
            }}
          >
            <CallButton number={phoneNumber} listingName={listingName} />
            <WhatsApp phoneNumber={phoneNumber} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default OEMListing;
