import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AliceCarousel from "react-alice-carousel";
import DesignerListing from "../findprofessional/designerlisting";
import "react-alice-carousel/lib/alice-carousel.css";
import Share from "../common/buttons/share";
import kitch from "./images/kitch.jpg";
import space from "./images/space.jpg";
import theme from "./images/theme.jpg";
import CallButton from "../common/buttons/callbutton";
import WhatsApp from "../common/buttons/whatsapp";
import "./css/designSlider.css";
import tick from "../findprofessional/images/tick.png";
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

const DesignerSlider = () => {
  const Items = [
    <div className="row ">
      <div className="col-md-12  align-center rounded-3 crousal-dots">
        <div className="row p-2">
          <div className="col-lg-4 col-md-12 crousalimg">
            <img
              className="d-block w-100"
              src={space}
              alt="First slide"
              style={{
                cursor: "pointer",
                height: "180px",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="col-lg-5 col-md-12 socialpart">
            <table style={{ width: "100%" }} className="social">
              <tr
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1em",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <td style={{ cursor: "pointer" }}>
                    <p className="mt-2 d-inline dlsize">Neon</p>
                  </td>
                  <td>
                    <img src={tick} alt="" />
                  </td>
                </div>
                {/* {pro && (
                    <td>
                      <img src={tick} alt="" />
                    </td>
                  )} */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <td>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      // onClick={handleLike}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        margin: "0 0.5em",
                      }}
                    />
                    {/* {user ? (
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
                      )} */}
                  </td>
                  <td style={{ margin: "0 0.5em" }}>
                    <Share />
                  </td>
                </div>
              </tr>
            </table>

            <p className="mt-2">
              Experience <b>2-3 years</b>
            </p>
            <p className="mt-2">Cool Painter</p>
            <div className="review">
              <span className="star">
                Avg Review
                <i>
                  <FontAwesomeIcon icon={faStar} />
                </i>
              </span>
              {/* <span>****</span> */}
            </div>
            <br />
            <div className="costage">
              <span>
                Design fee : <b>₹5000/room</b>
              </span>
            </div>
            {/* {!(listingName === "contractor") && fee && (
              )} */}
          </div>
          <div className="col-lg-3 col-md-12 paddingauto">
            <div className="information text-center">
              <CallButton number={"95425322233 "} listingName="Neon" />

              <WhatsApp phoneNumber="95425322233" />
            </div>
          </div>
        </div>
      </div>
    </div>,

    <div className="row ">
      <div className="col-md-12  align-center rounded-3 crousal-dots">
        <div className="row p-2">
          <div className="col-lg-4 col-md-12 crousalimg">
            <img
              className="d-block w-100"
              src={kitch}
              alt="First slide"
              style={{
                cursor: "pointer",
                height: "180px",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="col-lg-5 col-md-12 socialpart">
            <table style={{ width: "100%" }} className="social">
              <tr
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1em",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <td style={{ cursor: "pointer" }}>
                    <p className="mt-2 d-inline dlsize">Yagami</p>
                  </td>
                  <td>
                    <img src={tick} alt="" />
                  </td>
                </div>
                {/* {pro && (
                    <td>
                      <img src={tick} alt="" />
                    </td>
                  )} */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <td>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      // onClick={handleLike}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        margin: "0 0.5em",
                      }}
                    />
                    {/* {user ? (
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
                      )} */}
                  </td>
                  <td style={{ margin: "0 0.5em" }}>
                    <Share />
                  </td>
                </div>
              </tr>
            </table>

            <p className="mt-2">
              Experience <b>5 years</b>
            </p>
            <p className="mt-2">Neon Painter</p>
            <div className="review">
              <span className="star">
                Hit Review
                <i>
                  <FontAwesomeIcon icon={faStar} />
                </i>
              </span>
              {/* <span>****</span> */}
            </div>
            <br />
            <div className="costage">
              <span>
                Design fee : <b>₹10000/room</b>
              </span>
            </div>
            {/* {!(listingName === "contractor") && fee && (
              )} */}
          </div>
          <div className="col-lg-3 col-md-12 paddingauto">
            <div className="information text-center">
              <CallButton number={"95425322233 "} listingName="Neon" />

              <WhatsApp phoneNumber="95425322233" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className="row ">
      <div className="col-md-12  align-center rounded-3 crousal-dots">
        <div className="row p-2">
          <div className="col-lg-4 col-md-12 crousalimg">
            <img
              className="d-block w-100"
              src={theme}
              alt="First slide"
              style={{
                cursor: "pointer",
                height: "180px",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="col-lg-5 col-md-12 socialpart">
            <table style={{ width: "100%" }} className="social">
              <tr
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1em",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <td style={{ cursor: "pointer" }}>
                    <p className="mt-2 d-inline dlsize">Kira</p>
                  </td>
                  <td>
                    <img src={tick} alt="" />
                  </td>
                </div>
                {/* {pro && (
                    <td>
                      <img src={tick} alt="" />
                    </td>
                  )} */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <td>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      // onClick={handleLike}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        margin: "0 0.5em",
                      }}
                    />
                    {/* {user ? (
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
                      )} */}
                  </td>
                  <td style={{ margin: "0 0.5em" }}>
                    <Share />
                  </td>
                </div>
              </tr>
            </table>

            <p className="mt-2">
              Experience <b>5 years</b>
            </p>
            <p className="mt-2">Neon Painter</p>
            <div className="review">
              <span className="star">
                Hit Review
                <i>
                  <FontAwesomeIcon icon={faStar} />
                </i>
              </span>
              {/* <span>****</span> */}
            </div>
            <br />
            <div className="costage">
              <span>
                Design fee : <b>₹10000/room</b>
              </span>
            </div>
            {/* {!(listingName === "contractor") && fee && (
              )} */}
          </div>
          <div className="col-lg-3 col-md-12 paddingauto">
            <div className="information text-center">
              <CallButton number={"95425322233 "} listingName="Neon" />

              <WhatsApp phoneNumber="95425322233" />
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
  return (
    <div className="row">
      <AliceCarousel
        mouseTracking
        responsive={[375, 444, 1024]}
        // disableButtonsControls
        items={Items}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DesignerSlider;
