import React, { useState, useEffect } from "react";

import idesignlogo2 from "./header/images/iDesignLogo2.svg";
import idesignlogo from "./header/images/idesignlogo.png";
import idesignlogopc from "./header/images/idesignlogopc.svg";
import notif from "./header/images/notif.svg";
import profilePic from "./header/images/profilePic.svg";

import mobilelogo from "./../../mobile/image/mobilelogo.png";
import idesignprofile from "./header/images/profile.png";
import { Link } from "react-router-dom";
import NavLink from "./header/navlink";
import Profile from "./header/profile";

import authservice from "../../services/authService";
import "../../../src/mobile/css/header.css";
import "../../../src/components/common/header/css/header.css";
import jwtDecode from "jwt-decode";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import userservice from "../../services/userservice";
// import LoginModal from "./loginModal"
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faLink,
  faPortrait,
  faShare,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faDeskpro, faPadlet } from "@fortawesome/free-brands-svg-icons";
import DesignerModal from "../home/designermodal";
import FilterModal from "./header/filtermodal";
import GetStartedRfa from "../home/getStartedRfa";
import find from "./header/images/find.svg";
import explore from "./header/images/explore.png";
import brand from "./header/images/Tag.svg";
import magazines from "./header/images/magazine.svg";
import join from "./header/images/joinAsPro.svg";
import getFreeQuotes from "./header/images/getFreeQuotes.svg";
import signInSignUp from "./header/images/signInSignUp.svg";

function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const Header = () => {
  const [user, setUser] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showShareEmail, setShowShareEmail] = useState(true);
  const [showShareWhatsApp, setShowShareWhatsApp] = useState(false);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  const [signedIn, setSignedIn] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    const token = authservice.getToken();
    token ? setUser(true) : setUser(false);
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loginData, setLoginData] = useState({
    email: String,
    password: String,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [show, setShow] = React.useState(false);

  const menus = [
    {
      link: "/findprofessionals",
      name: "Find Professionals",
    },
    {
      link: "/exploreprojects",
      name: "Explore Projects",
    },
    {
      link: "/brands",
      name: "Brand Offers",
    },
    {
      link: "/magazines",
      name: "Magazines",
    },
  ];

  const mobilemenus = [
    {
      link: "/findprofessionals",
      name: "Find Professionals",
      img: find,
    },
    {
      link: "/exploreprojects",
      name: "Explore Projects",
      img: explore,
    },
    // {
    //   link: "/brands",
    //   name: "Brand Offers",
    //   icon: brand,
    // },
    {
      link: "/magazines",
      name: "Magazine",
      icon: magazines,
    },
    {
      link: "/login",
      name: "Sign In/Up",
      icon: signInSignUp,
    },
    {
      link: "https://pro.idesign.market/login",
      name: "Get Free Quotes",
      img: getFreeQuotes,
    },
    {
      link: "https://pro.idesign.market/login",
      name: "Join as pro",
      img: join,
    },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ToastContainer />
        <DesignerModal />
        <FilterModal />
        {screenWidth > 768 && (
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-brand d-flex justify-content-between">
              <Link to="/" className="nav-link mx-">
                <img
                  src={screenWidth < 768 ? idesignlogo2 : idesignlogopc}
                  alt="logo"
                  className="logosize"
                />
              </Link>
              {screenWidth < 768 ? (
                <img
                  className="mx-5"
                  src={profilePic}
                  alt="profile-pic"
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <></>
              )}
            </div>

            <div
              className={
                isNavCollapsed ? "collapse navbar-collapse" : "navbar-collapse"
              }
              id="navbarsExample09"
            >
              <Link to="/" className="nav-link mobile-logo">
                <img src={mobilelogo} alt="logo" className="w-50" />
              </Link>
              <div
                className="close__menu"
                data-toggle="collapse"
                data-target="#navbarsExample09"
                aria-controls="navbarsExample09"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
              >
                <svg
                  viewPort="0 0 12 12"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="11"
                    x2="11"
                    y2="1"
                    stroke="black"
                    stroke-width="2"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="11"
                    y2="11"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0 dm-serif"
                style={{
                  fontFamily: "Manrope",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  lineHeight: "2.04875rem",
                  color: "#121212",
                }}
              >
                {menus.map((m) => (
                  <NavLink
                    link={m.link}
                    name={m.name}
                    mobile={false}
                    icon={window.location.pathname === m.link ? m.icon : " "}
                    classname={
                      window.location.pathname === m.link
                        ? " active displayn"
                        : " displayn"
                    }
                  />
                ))}

                {mobilemenus.map((m, i) => (
                  <NavLink
                    link={m.link}
                    img={m.img}
                    name={m.name}
                    idx={i}
                    // icon={m.icon}
                    mobile={true}
                    classname={
                      window.location.pathname === m.link
                        ? " active displaydn inter"
                        : " displaydn inter"
                    }
                  />
                ))}
                {/* <li className="nav-item nav-header displaydn">
                <a
                  alt=""
                  data-bs-toggle="modal"
                  data-bs-target="#mobilesignupinmodal"
                  className="nav-link link-dark headerfont headerpadding "
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Sign In/Up
                </a>
              </li> */}
              </ul>
              <form className="d-flex">
                <ul className="nav displayn">
                  {/* <button
                  type="button"
                  className="btn green text-light me-4 btn-sm"
                >
                  Get Free Quotes
                </button> */}
                  <button
                    type="button"
                    className="btn me-4 btn-sm text-light fs-6"
                    onClick={() =>
                      (window.location.href =
                        "https://pro.idesign.market/login")
                    }
                    style={{
                      backgroundColor: "#49B7CF",
                      fontFamily: "Public Sans",
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineHeight: "1.5rem",
                    }}
                  >
                    Get Free Quotes
                  </button>
                  <button
                    type="button"
                    className="btn me-4 btn-sm blue text-light fs-6"
                    onClick={() =>
                      (window.location.href =
                        "https://pro.idesign.market/login")
                    }
                    style={{
                      backgroundColor: "#49B7CF",
                      fontFamily: "Public Sans",
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineHeight: "1.5rem",
                    }}
                  >
                    Join as Pro
                  </button>

                  {/* <Profile imagepath={bellicon} showarrow={false} /> */}

                  {!user && (
                    <li
                      type=""
                      className=" me-4 btn-sm"
                      style={{ cursor: "pointer" }}
                    >
                      {signedIn ? (
                        <span
                          className="green-recon border-0"
                          data-bs-toggle="modal"
                          data-bs-target={
                            user ? "#successmodal" : "#staticBackdrop"
                          }
                        >
                          <img className="me-2" src={notif} alt="..." />
                          <img
                            src={profilePic}
                            alt=""
                            style={{ width: "3rem" }}
                          />
                        </span>
                      ) : (
                        <span
                          className="green-recon border-0"
                          data-bs-toggle="modal"
                          data-bs-target={
                            user ? "#successmodal" : "#staticBackdrop"
                          }
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            lineHeight: "2.04875rem",
                          }}
                        >
                          Sign in / Sign up
                        </span>
                      )}
                    </li>
                  )}

                  {user && (
                    <Profile
                      imagepath={"https://github.com/mdo.png"}
                      showarrow={true}
                      path="/dashboard/home"
                      className="displayn"
                    />
                  )}
                </ul>
              </form>
            </div>
          </div>
        )}
        {screenWidth < 768 && (
          <div className="container-fluid">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample09"
                aria-controls="navbarsExample09"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link to="/" className="nav-link">
                <img
                  src={screenWidth < 768 ? idesignlogo2 : idesignlogo}
                  alt="logo"
                  style={{ width: "12rem" }}
                />
              </Link>
              {user && (
                
                    <Profile
                      imagepath={"https://github.com/mdo.png"}
                      showarrow={true}
                      path="/dashboard/home"
                      className="displayn"
                    />
                  )}
            </div>

            <div
              className={
                isNavCollapsed ? "collapse navbar-collapse" : "navbar-collapse"
              }
              id="navbarsExample09"
            >
              <Link to="/" className="nav-link mobile-logo">
                <img src={mobilelogo} alt="logo" className="w-50" />
              </Link>
              <div
                className="close__menu"
                data-toggle="collapse"
                data-target="#navbarsExample09"
                aria-controls="navbarsExample09"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
              >
                <svg
                  viewPort="0 0 12 12"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="11"
                    x2="11"
                    y2="1"
                    stroke="black"
                    stroke-width="2"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="11"
                    y2="11"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 dm-serif">
                {menus.map((m) => (
                  <NavLink
                    link={m.link}
                    name={m.name}
                    mobile={false}
                    icon={window.location.pathname === m.link ? m.icon : " "}
                    classname={
                      window.location.pathname === m.link
                        ? " active displayn"
                        : " displayn"
                    }
                  />
                ))}

                {mobilemenus.map((m, i) => (
                  <NavLink
                    link={m.link}
                    img={m.img}
                    name={m.name}
                    idx={i}
                    // icon={m.icon}
                    mobile={true}
                    classname={
                      window.location.pathname === m.link
                        ? " active displaydn inter"
                        : " displaydn inter"
                    }
                  />
                ))}
                {/* <li className="nav-item nav-header displaydn">
                <a
                  alt=""
                  data-bs-toggle="modal"
                  data-bs-target="#mobilesignupinmodal"
                  className="nav-link link-dark headerfont headerpadding "
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Sign In/Up
                </a>
              </li> */}
              </ul>
              <form className="d-flex">
                <ul className="nav displayn">
                  {/* <button
                  type="button"
                  className="btn green text-light me-4 btn-sm"
                >
                  Get Free Quotes
                </button> */}
                  <button
                    type="button"
                    className="btn me-4 btn-sm blue text-light fs-6"
                    onClick={() =>
                      (window.location.href =
                        "https://pro.idesign.market/login")
                    }
                  >
                    Join as Pro
                  </button>

                  {/* <Profile imagepath={bellicon} showarrow={false} /> */}

                  {!user && (
                    <li
                      type=""
                      className=" me-4 btn-sm"
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        className="green-recon border-0"
                        data-bs-toggle="modal"
                        data-bs-target={
                          user ? "#successmodal" : "#staticBackdrop"
                        }
                      >
                        Sign in / Sign up
                      </span>
                    </li>
                  )}

                  {user && (
                    <Profile
                      imagepath={"https://github.com/mdo.png"}
                      showarrow={true}
                      path="/dashboard/home"
                      className="displayn"
                    />
                  )}
                </ul>
              </form>
            </div>
          </div>
        )}
      </nav>

      
      {show ? (
        <div className="right-nav_mobile displaydn">
          <div className="nav_mobile">
            <ul>
              <li>
                <a href="/dashboard/home">
                  {" "}
                  <FontAwesomeIcon icon={faDashboard} className="me-1" />
                  Dashboard{" "}
                </a>
              </li>
              <li>
                <a href="/dashboard/designers">
                  {" "}
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Designers
                </a>
              </li>
              <li>
                <a href="/dashboard/projects">
                  {" "}
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Projects
                </a>
              </li>
              <li>
                <a href="/dashboard/magazines">
                  <FontAwesomeIcon icon={faShare} className="me-1" /> Settings
                </a>
              </li>
              <li>
                <a href="/logout">
                  <FontAwesomeIcon icon={faSignOut} className="me-1" /> Log out
                </a>
              </li>
              <li>
                <a href="/dashboard/help">
                  <FontAwesomeIcon icon={faDeskpro} className="me-1" /> Help
                  Desk
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      <div className="sub-header">
        <div className="container ">
          <ul>
            <li
              onClick={() => (window.location.href = "/idesignexclusive")}
              style={{
                cursor: "pointer",
                background: "#174E86",
              }}
            >
              iDesign Exclusives
            </li>
            <li
              onClick={() => (window.location.href = "/finalbilling")}
              style={{ cursor: "pointer" }}
            >
              Final Billing
            </li>
            <li
              onClick={() => (window.location.href = "/quotecomparison")}
              style={{ cursor: "pointer" }}
            >
              <span className="circle"></span>Quote comparision
            </li>
            <li
              onClick={() => (window.location.href = "/loan")}
              style={{ cursor: "pointer" }}
            >
              <span className="circle"></span>Easy Loans
            </li>
            <li
              onClick={() => (window.location.href = "/idesignexclusive")}
              style={{ cursor: "pointer" }}
              className="displayn"
            >
              <u>Know More</u>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="sub-header">
        <div className="container ">
          <div className="d-flex sub-head">
            <div className="bd-highlight " >
              <div
                className="idesign-exclusive"
                onClick={() => (window.location.href = "/idesignexclusive")}
                style={{ cursor: "pointer" }}
              >
                iDesign Exclusive
              </div>
            </div>

            <div className="d-flex position-absolute top-30 start-50 translate-middle-x text-white" style={{fontSize:"15px"}}>
              <div
                className="p-2 bd-highlight"
                onClick={() => (window.location.href = "/finalbilling")}
                style={{ cursor: "pointer" }}
              >
                Final Billing
              </div>
              <li
                className="p-2 bd-highlight"
                onClick={() => (window.location.href = "/quotecomparison")}
                style={{ cursor: "pointer" }}
              >
                Quote comparision
              </li>
              <li
                className="p-2 bd-highlight"
                onClick={() => (window.location.href = "/loan")}
                style={{ cursor: "pointer" }}
              >
                Easy Loans
              </li>
            </div>
            <div className="d-flex position-absolute top-30 translate-middle-x text-white" style={{right: "6rem" ,fontWeight: "700" ,padding: "2px"}}>
              <div
                className="p-2 bd-highlight d-flex justify-content-end"
                onClick={() => (window.location.href = "/idesignexclusive")}
                style={{ cursor: "pointer" }}
              >
                <u>Know More</u>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="modal fade" id="share" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

      <div
        className="modal fade"
        id="share"
        tabindex="-1"
        aria-labelledby="shareLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div className="share-link">
                <div className="d-flex">
                  <span>
                    <FontAwesomeIcon
                      icon={faShare}
                      size="lg"
                      className="me-2 border rounded-circle p-2 blue text-light"
                    />
                  </span>
                  <span>
                    <p className="fs-4">Share via</p>
                  </span>
                </div>
                <div className="share-form mt-3">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="email"
                        value={showShareEmail}
                        onClick={() => {
                          setShowShareWhatsApp(false);
                          setShowShareEmail(true);
                        }}
                      />
                      <label className="form-check-label" for="email">
                        Email
                      </label>
                    </div>
                    {showShareEmail && (
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter email address"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="whatsapp"
                        checked={showShareWhatsApp}
                        onClick={() => {
                          setShowShareWhatsApp(true);
                          setShowShareEmail(false);
                        }}
                      />
                      <label className="form-check-label" for="whatsapp">
                        Whatsapp
                      </label>
                    </div>
                    {showShareWhatsApp && (
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary blue text-light"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#getlink"
              >
                Share
              </button>
            </div>
          </div>
          <div className="modal-content mt-3">
            <div className="modal-body">
              <div className="share-link">
                <div className="d-flex">
                  <span>
                    <FontAwesomeIcon
                      icon={faLink}
                      size="lg"
                      className="me-2 border rounded-circle p-2 green text-light"
                    />
                  </span>
                  <span>
                    <p className="fs-4">Get Link</p>
                  </span>
                </div>
                <div className="share-form mt-3">
                  <div className="mb-1">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={window.location}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary green border-0 text-light"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#getlink"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="getstartedmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
              <center>Find Designers</center>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            <div className="modal-body">
              <GetStartedRfa />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
