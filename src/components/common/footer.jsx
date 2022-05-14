import React, { useEffect, useState } from "react";
import "./footer/css/footer.css";
import iDesignMarket from "../common/footer/images/iDesignFooterPc.svg";
import facebook from "../home/images/facebook.png";
import Instagram from "../home/images/Instagram.png";
import Youtube from "../home/images/Youtube.png";
import WhatsApp from "../home/images/WhatsApp.png";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import newservice from "../../services/newservices";

import { ToastContainer, toast } from "react-toastify";
const Footer = () => {
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
    <React.Fragment>
      <footer className="footer-06 bg-light p-lg-2 inter">
        <div className="container">
          <div className="row pt-4">
            <div className="col-lg-3 col-xs-12">
              <img src={iDesignMarket} alt="" />
              <p className="rev-width inter mt-3" id="foote">
                We are revolutioning the Interior design industry.
              </p>
              <ul className="ftco-footer-social p-0 mt-4 mb-4">
                <span
                  className="ion-logo-twitter p-1"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={facebook}
                    alt=""
                    onClick={() =>
                      (window.location.href = "https://fb.com/iDesign.market")
                    }
                  />
                </span>
                <span
                  className="ion-logo-facebook p-1"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (window.location.href =
                      "https://instagram.com/iDesign.market")
                  }
                >
                  <img src={Instagram} alt="" />
                </span>
                <span
                  className="ion-logo-instagram p-1"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (window.location.href =
                      "https://youtube.com/channel/UCZYsSoot4r9eZSPJk6F7-xw")
                  }
                >
                  <img src={Youtube} alt="" />
                </span>
                <span
                  className="ion-logo-linkedin p-1"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (window.location.href = "https://wa.me/919289347893")
                  }
                >
                  <img src={WhatsApp} alt="" />
                </span>
              </ul>
              <p
                className=""
                onClick={() => (window.location.href = "/csr")}
                style={{ cursor: "pointer" }}
              >
                <u> Corporate Social Responsibility </u>
              </p>
            </div>
            <div className="col-lg-2 col-xs-12">
              <p className="inter" id="foot">
                <b>Company</b>
              </p>
              <ul className="list-unstyled">
                <li id="foote">
                  <a
                    href="https://pro.idesign.market/about-us"
                    className="py-1 d-block"
                    id="foote"
                    style={{ color: "black" }}
                  >
                    About
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://angel.co/company/idesign-market-1/jobs"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Careers
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://pro.idesign.market/privacy-policy"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://pro.idesign.market/terms"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://pro.idesign.market/cookie-policy"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Cookie policy
                  </a>
                </li>
                <li id="footing">
                  <a
                    href="https://pro.idesign.market/contact"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-xs-12">
              <p className="inter" id="foot">
                <b> Homeowners</b>
              </p>
              <ul className="list-unstyled">
                {/* <li>
                <Link to="/findprofessionals" className="py-1 d-block">
                  Design Professionals
                </Link>
                <a href="https://www.idesign.market/findprofessionals" className="py-1 d-block"></a>
              </li> */}
                <li id="foote">
                  <a
                    href="https://www.idesign.market/findprofessionals"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Find Professionals
                  </a>
                </li>
                <li id="foote">
                  {/* <Link to="/exploreprojects" className="py-1 d-block">
                  Explore Project
                </Link> */}
                  <a
                    href="https://www.idesign.market/exploreprojects"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Explore Projects
                  </a>
                </li>
                <li id="footing">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target={user ? "#successmodal" : "#staticBackdrop"}
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-xs-12">
              <p className="inter" id="foot">
                <b>Design Professionals</b>
              </p>
              <ul className="list-unstyled">
                <li id="foote">
                  <a
                    href="https://pro.idesign.market"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Join iDesign Pro
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://pro.idesign.market/pricing"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Pricing
                  </a>
                </li>
                <li id="foote">
                  <a
                    href="https://www.idesign.market/magazines"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Magazine
                  </a>
                </li>
                <li id="footing">
                  <a
                    href="https://pro.idesign.market/login"
                    className="py-1 d-block"
                    style={{ color: "black" }}
                  >
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-xs-12">
              <p className="inter" id="foot">
                <b>Sign Up to our newsletter</b>
              </p>
              <form action="" onSubmit={handleNewsSubmit}>
                <input
                  type="email"
                  className="form-control form-control mt-2"
                  placeholder="Email"
                  aria-label="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-success blue me-2 mt-4 text-light ps-5 pe-5"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div
            className="mt-4"
            style={{ borderBottom: "1px solid #7F8790", width: "100%" }}
          ></div>
          <div
            className="mt-3"
            style={{
              color: "black",
              fontFamily: "Manrope",

              fontWeight: "500",
              fontSize: "0.875rem",
              lineHeight: "1.1875rem",
            }}
          >
            <p>Locations</p>
            <div
              className="mt-3"
              style={{
                fontFamily: "Manrope",

                fontWeight: "200",
                fontSize: "0.75rem",
                lineHeight: "1.4rem",
                color: "black",
              }}
            >
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Delhi &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Mumbai &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Gurugram &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Faridabad &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Noida &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Ghaziabad &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Bengaluru &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Hyderabad &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Pune &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Jaipur &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Chandigarh &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Lucknow &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Indore &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Ahmedabad &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Chennai &#x2022;&nbsp;
              </span>
              <span style={{ cursor: "pointer" }}>
                Interior Designers in Kolkata &#x2022;&nbsp;
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="mt-3 p-2"
        style={{ backgroundColor: "#383F45", color: "white", width: "100%" }}
      >
        <div className="col-md-6 col-lg-12">
          <p className="copyright text-center">
            {new Date().getFullYear()} iDesign. All rights reserved
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
