import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAlignCenter,
  faNewspaper,
  faQuoteRight,
  faRefresh,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../home/css/style.css";
import brand from "./images/brand.svg";
import magazine from "./images/magazine.svg";
import signInSignUp from "./images/signInSignUp.svg";

const NavLink = ({ link, name, classname, mobile, logo, icon, img, idx }) => {
  const [svgLink, setSvgLink] = useState("");
  if (name === "Brand Offers") {
    img = brand;
  }
  if (name === "Magazine") {
    img = magazine;
  }
  if (name === "Sign In/Up") {
    img = signInSignUp;
  }
  console.log(name === "Get Free Quotes" ? name : "");
  return (
    <React.Fragment>
      {idx !== 4 ? (
        <li className="nav-item nav-header">
          <a
            href={link}
            className={
              "nav-link link-dark headerfont headerpadding" + classname
            }
            aria-current="page"
          >
            <div className="navbar-options-div">
              <i className={`${icon} me-2`} aria-hidden="true"></i>
              <img className="img" src={img} alt="" />
              {/* {mobile && (
          
        )} */}
              <p>&nbsp;&nbsp;{name}</p>
            </div>
          </a>
        </li>
      ) : (
        <li className="nav-item nav-header">
          <a
            alt=""
            data-bs-toggle="modal"
            data-bs-target="#mobilesignupinmodal"
            className={
              "nav-link link-dark headerfont headerpadding " + classname
            }
            aria-current="page"
          >
            {" "}
            <div className="navbar-options-div">
              <i className={`${icon} me-2`} aria-hidden="true"></i>
              <img className="img" src={img} alt="" />
              <p>&nbsp;&nbsp;{name}</p>
            </div>
          </a>
        </li>
      )}
    </React.Fragment>
  );
};

export default NavLink;
