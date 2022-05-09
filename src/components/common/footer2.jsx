import React, { useEffect, useState } from "react";
import "./footer/css/footer2.css";
import fbImage from "./footer/images/facebookFooter.svg";
import instaImage from "./footer/images/instaFooter.svg";
import ytImage from "./footer/images/ytFooter.svg";
import linkedInImage from "./footer/images/linkedInFooter.svg";
import iDesignFooter from "./footer/images/iDesignFooter.svg";
import facebook from "../home/images/facebook.png";
import Instagram from "../home/images/Instagram.png";
import Youtube from "../home/images/Youtube.png";
import WhatsApp from "../home/images/WhatsApp.png";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import newservice from "../../services/newservices";

import { ToastContainer, toast } from "react-toastify";
const Footer2 = () => {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = authService.getToken();
    token ? setUser(true) : setUser(false);
  }, []);

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    const response = await newservice.news({ email: email });
    toast.success("Thanks", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setEmail("");
  };

  return (
    <footer className="footer-06 p-lg-2 inter" id="footer2">
      <div className="container">
        <div className="row pt-4">
          <div className="col-lg-3 col-xs-12 ">
            <p
              className="inter"
              id="foot"
              style={{ color: "white", textAlign: "center" }}
            >
              <b>Sign Up to our newsletter</b>
            </p>
            <form className="d-flex" action="" onSubmit={handleNewsSubmit}>
              <input
                type="email"
                className="form-control mt-2"
                placeholder="Email"
                aria-label="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className=" btn-sm btn-dark text-light mt-2"
                style={{
                  backgroundColor: "#414242",
                  border: "2px solid #414242",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
          <div
            className="col-lg-2 col-xs-12 mt-4"
            style={{ margin: "auto", width: "auto", textAlign: "center" }}
          >
            <ul className="list-unstyled">
              <li id="foote">
                <a
                  href="https://pro.idesign.market/about-us"
                  className="py-1 d-block"
                  id="foote"
                >
                  About
                </a>
              </li>
              <li id="foote">
                <a
                  href="https://pro.idesign.market/privacy-policy"
                  className="py-1 d-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li id="foote">
                <a
                  href="https://pro.idesign.market/terms"
                  className="py-1 d-block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li id="foote">
                <a
                  href="https://pro.idesign.market/cookie-policy"
                  className="py-1 d-block"
                >
                  Cookie policy
                </a>
              </li>
              <li id="foote">
                <a
                  href="https://angel.co/company/idesign-market-1/jobs"
                  className="py-1 d-block"
                >
                  Careers
                </a>
              </li>
              <li id="footing">
                <a
                  href="https://pro.idesign.market/contact"
                  className="py-1 d-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-xs-12 mt-4 d-flex justify-content-center">
            <img className="mx-2" src={fbImage} alt="Follow us on Facebook!" />
            <img
              className="mx-2"
              src={instaImage}
              alt="Follow us on Instagram!"
            />
            <img
              className="mx-2"
              src={linkedInImage}
              alt="Follow us on LinkedIn!"
            />
            <img className="mx-2" src={ytImage} alt="Follow us on YouTube!" />
          </div>
          <div className="col-lg-2 col-xs-12" style={{width:"auto",margin:"auto"}}>
            <img src={iDesignFooter} alt="Follow us on YouTube!" />
          </div>
        </div>
        <div className="row mt-3 pb-3 text-light">
          <div className="col-md-6 col-lg-12">
            <p className="copyright text-center">
              {new Date().getFullYear()} iDesign. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
