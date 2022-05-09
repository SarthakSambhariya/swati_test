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

const DesignerListing = ({
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

  return (
    <>
      <div className="row mt-4">
        <div
          className="col-md-12 brand-card-shadow rounded-3 crousal-dots"
          key={id}
        >
          <div className="row p-2">
            <div className="col-lg-4 col-md-12 crousalimg">
              {projects.length > 0 ? (
                <>
                  <img
                    className="d-block w-100"
                    src={projects.length > 0 && projects[0]["original"]}
                    alt="First slide"
                    onClick={() =>
                      (window.location.href = `/${listingName}/${city}/${company
                        .replaceAll(" ", "-")
                        .toLowerCase()}`)
                    }
                    style={{ cursor: "pointer", height: "180px" }}
                  />
                </>
              ) : (
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
              )}
            </div>
            <div className="col-lg-5 col-md-12 socialpart">
              <table style={{ width: "100%" }} className="social">
                <tr>
                  <td
                    onClick={() =>
                      (window.location.href = `/${listingName}/${city}/${company
                        .replaceAll(" ", "-")
                        .toLowerCase()}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <p className="mt-2 d-inline dlsize">{name}</p>
                  </td>
                  {pro && (
                    <td>
                      <img src={tick} alt="" />
                    </td>
                  )}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                  </div>
                </tr>
              </table>

              <p className="mt-2">
                Experience <b>{experience}</b>
              </p>
              <p className="mt-2">{description}</p>
              <div className="review">
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
              )}
            </div>
            <div className="col-lg-3 col-md-12 paddingauto">
              <div className="information text-center">
                <CallButton number={phoneNumber} listingName={listingName} />

                <WhatsApp phoneNumber={phoneNumber} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignerListing;
