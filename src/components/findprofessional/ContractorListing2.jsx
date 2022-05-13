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
// import "../findprofessional/css/findprofessional.css";
import tick from "../findprofessional/images/pro-tick-blue.svg";
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
import likesOnImage from "./images/likesOnImage.svg";
import noProject from "../common/noimage/noProject.png";
import CallButton2 from "../common/buttons/callbutton2";
import WhatsApp2 from "../common/buttons/whatsappbutton2";

function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const ContractorListing2 = ({
  id,
  name,
  experience,
  description,
  address,
  fee,
  city,
  phoneNumber,
  company,
  pro,
  liked,
  rating,
  listingName,
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

    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(address);
  return (
    <React.Fragment>
      {screenWidth > 768 && (
        <div
          className="d-flex me-2 ms-2 mb-3"
          style={{ width: "20.8125rem", height: "34.5rem" }}
        >
          <div
            className="mb-1 "
            style={{
              border: "2px solid rgba(127, 135, 144, 0.2)",
              width: "20.8125rem",
              height: "100%",
            }}
          >
            <div className="" key={id}>
              <div className="col-lg-4 col-md-12" style={{ width: "100%" }}>
                {projects.length > 0 ? (
                  <div style={{ position: "relative" }}>
                    <img
                      className="d-block w-100"
                      src={projects.length > 0 && projects[0]["original"]}
                      alt="First slide"
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{
                        cursor: "pointer",
                        height: "11.375rem",
                        width: "22.5rem",
                      }}
                    />
                    <div
                      className="d-flex justify-content-evenly align-items-center"
                      style={{
                        padding: "3px",
                        borderRadius: "20px",
                        background: "white",
                        position: "absolute",
                        top: "140px",
                        right: "15px",
                      }}
                    >
                      <img className="mx-1" src={likesOnImage} alt="..." />
                      <p className="mx-2" style={{ color: "#888888" }}>
                        {rating ? rating : 34}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <img
                      className="d-block w-100"
                      src={noProject}
                      alt="First slide"
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{ cursor: "pointer", height: "180px" }}
                    />
                    <div
                      className="d-flex justify-content-evenly align-items-center"
                      style={{
                        padding: "3px",
                        borderRadius: "20px",
                        background: "white",
                        position: "absolute",
                        top: "140px",
                        right: "15px",
                      }}
                    >
                      <img className="mx-1" src={likesOnImage} alt="..." />
                      <p className="mx-2" style={{ color: "#888888" }}>
                        200
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="col-lg-5 col-md-12 socialpart p-3"
                style={{ width: "100%" }}
              >
                <table style={{ width: "100%" }} className="social">
                  <tr>
                    <td
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{ cursor: "pointer", padding: "0", width: "100%" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p className="mt-2 d-inline dlsize">
                          {name.length > 8 ? `${name.substr(0, 8)}...` : name}
                        </p>
                        {pro && <img className="ms-2 mt-2" src={tick} alt="" />}
                        <span
                          id="#designerListing2Star"
                          className="star2 mt-2 ms-2"
                        >
                          <i>
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          <span className="mx-2">{review.avgReview}</span>
                        </span>
                      </div>
                    </td>
                    <td
                      className="d-flex justify-content-between"
                      style={{ width: "100px", padding: "0" }}
                    ></td>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <td
                        className=""
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {user ? (
                          showHeart ? (
                            <FontAwesomeIcon
                              icon={faHeart}
                              onClick={handleLike}
                              style={{
                                color: "red",
                                cursor: "pointer",
                                margin: "0 0.5em",
                                width: "1.25rem",
                              }}
                            />
                          ) : (
                            <img
                              src={heartO}
                              style={{
                                width: "1.25rem",
                                cursor: "pointer",
                                margin: "0 0.5em",
                              }}
                              alt=""
                              srcSet=""
                              onClick={handleLike}
                              id="heart"
                            />
                          )
                        ) : (
                          <img
                            src={heartO}
                            style={{
                              width: "1.25rem",
                              cursor: "pointer",
                              margin: "0 0.5em",
                            }}
                            alt=""
                            srcSet=""
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            id="hearto"
                          />
                        )}
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontFamily: "Manrope",
                        color: "#7F8790",
                        fontWeight: "400",
                        fontSize: "0.75rem",
                        lineHeight: "0.88125rem",
                      }}
                    >
                      {address}
                    </td>
                  </tr>
                </table>
                <div className="d-flex justify-content-center mt-2" style={{}}>
                  <div
                    className="d-flex flex-column align-items-center  p-3"
                    style={{
                      borderRight: "2px solid rgba(127, 135, 144, 0.2)",
                    }}
                  >
                    <p
                      className="mt-2"
                      style={{ fontSize: "16px", color: "#7F8790" }}
                    >
                      Experience
                    </p>
                    <p style={{ fontSize: "16px", fontFamily: "Public Sans" }}>
                      {experience ? experience : "2-3yrs"} Yrs
                    </p>
                  </div>

                  <div className="d-flex flex-column align-items-center  p-3">
                    <p
                      className="mt-2"
                      style={{ fontSize: "16px", color: "#7F8790" }}
                    >
                      Projects
                    </p>
                    <p style={{ fontSize: "16px", fontFamily: "Public Sans" }}>
                      200+
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center flex-column align-items-center p-3 mt-2"
                  style={{
                    width: "110%",
                    background: "#F5F5F5",
                    transform: "translateX(-0.95rem)",
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      Putty
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹50 sqft
                    </p>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      Fixing
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹200 sqft
                    </p>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      False Ceiling
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹1000 sqft
                    </p>
                  </div>
                </div>
                <div
                  className="mt-3"
                  style={{ borderTop: "2px solid rgba(127, 135, 144, 0.2)" }}
                />
                <div className="d-flex justify-content-center mt-2">
                  <CallButton2 number={phoneNumber} listingName={listingName} />
                  <WhatsApp2 phoneNumber={phoneNumber} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 768 && (
        <>
          <div
            className="mb-3 "
            style={{ border: "2px solid rgba(127, 135, 144, 0.2)" }}
          >
            <div className="" key={id}>
              <div className="col-lg-4 col-md-12">
                {projects.length > 0 ? (
                  <div style={{ position: "relative" }}>
                    <img
                      className="d-block w-100"
                      src={projects.length > 0 && projects[0]["original"]}
                      alt="First slide"
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{
                        cursor: "pointer",
                        height: "11.375rem",
                        width: "22.5rem",
                      }}
                    />
                    <div
                      className="d-flex justify-content-evenly align-items-center"
                      style={{
                        padding: "3px",
                        borderRadius: "20px",
                        background: "white",
                        position: "absolute",
                        top: "140px",
                        right: "15px",
                      }}
                    >
                      <img className="mx-1" src={likesOnImage} alt="..." />
                      <p className="mx-2" style={{ color: "#888888" }}>
                        {rating ? rating : 34}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <img
                      className="d-block w-100"
                      src={noProject}
                      alt="First slide"
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{ cursor: "pointer", height: "180px" }}
                    />
                    <div
                      className="d-flex justify-content-evenly align-items-center"
                      style={{
                        padding: "3px",
                        borderRadius: "20px",
                        background: "white",
                        position: "absolute",
                        top: "140px",
                        right: "15px",
                      }}
                    >
                      <img className="mx-1" src={likesOnImage} alt="..." />
                      <p className="mx-2" style={{ color: "#888888" }}>
                        200
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-5 col-md-12 socialpart p-3">
                <table style={{ width: "100%" }} className="social">
                  <tr>
                    <td
                      onClick={() =>
                        (window.location.href = `/${listingName}/${city}/${company
                          .replaceAll(" ", "-")
                          .toLowerCase()}`)
                      }
                      style={{ cursor: "pointer", padding: "0", width: "100%" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p className="mt-2 d-inline dlsize">
                          {name.length > 15 ? `${name.substr(0, 9)}...` : name}
                        </p>
                        {pro && <img className="ms-2 mt-2" src={tick} alt="" />}
                        <span
                          id="#designerListing2Star"
                          className="star2 mt-2 ms-4"
                        >
                          <i>
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          <span className="mx-2">{review.avgReview}</span>
                        </span>
                      </div>
                    </td>
                    <td
                      className="d-flex justify-content-between"
                      style={{ width: "100px", padding: "0" }}
                    ></td>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <td
                        className=""
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {user ? (
                          showHeart ? (
                            <FontAwesomeIcon
                              icon={faHeart}
                              onClick={handleLike}
                              style={{
                                color: "red",
                                cursor: "pointer",
                                margin: "0 0.5em",
                                width: "20px",
                              }}
                            />
                          ) : (
                            <img
                              src={heartO}
                              style={{
                                width: "20px",
                                cursor: "pointer",
                                margin: "0 0.5em",
                              }}
                              alt=""
                              srcSet=""
                              onClick={handleLike}
                              id="heart"
                            />
                          )
                        ) : (
                          <img
                            src={heartO}
                            style={{
                              width: "20px",
                              cursor: "pointer",
                              margin: "0 0.5em",
                            }}
                            alt=""
                            srcSet=""
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            id="hearto"
                          />
                        )}
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontFamily: "Manrope",
                        color: "#7F8790",
                        fontWeight: "400",
                        fontSize: "0.75rem",
                        lineHeight: "0.88125rem",
                      }}
                    >
                      {address}
                    </td>
                  </tr>
                </table>
                <div className="d-flex justify-content-center mt-2" style={{}}>
                  <div
                    className="d-flex flex-column align-items-center  p-3"
                    style={{
                      borderRight: "2px solid rgba(127, 135, 144, 0.2)",
                    }}
                  >
                    <p
                      className="mt-2"
                      style={{ fontSize: "16px", color: "#7F8790" }}
                    >
                      Experience
                    </p>
                    <p style={{ fontSize: "16px", fontFamily: "Public Sans" }}>
                      {experience ? experience : "2-3yrs"} Yrs
                    </p>
                  </div>

                  <div className="d-flex flex-column align-items-center  p-3">
                    <p
                      className="mt-2"
                      style={{ fontSize: "16px", color: "#7F8790" }}
                    >
                      Projects
                    </p>
                    <p style={{ fontSize: "16px", fontFamily: "Public Sans" }}>
                      200+
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center flex-column align-items-center p-3 mt-2"
                  style={{
                    width: "110%",
                    background: "#F5F5F5",
                    transform: "translateX(-1.2rem)",
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      Putty
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹50 sqft
                    </p>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      Fixing
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹200 sqft
                    </p>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "45%" }}
                  >
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      False Ceiling
                    </p>
                    <p
                      className=""
                      style={{ fontSize: "0.75rem", color: "#7F8790" }}
                    >
                      :
                    </p>
                    <p
                      style={{ fontSize: "0.75rem", fontFamily: "Public Sans" }}
                    >
                      ₹1000 sqft
                    </p>
                  </div>
                </div>
                <div
                  className="mt-3"
                  style={{ borderTop: "2px solid rgba(127, 135, 144, 0.2)" }}
                />
                <div className="d-flex justify-content-center mt-2">
                  <CallButton2 number={phoneNumber} listingName={listingName} />
                  <WhatsApp2 phoneNumber={phoneNumber} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default ContractorListing2;
