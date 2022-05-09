import React, {useEffect, useState} from "react";
import "./footer/css/footer.css";

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
    
      const handleNewsSubmit = async (e) =>{
        e.preventDefault();
        const response = await newservice.news({"email": email});
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
    

      }

  return (
    <footer className="footer-06 bg-light p-lg-2 inter">
      <div className="container">
        <div className="row pt-4">
          <div className="col-lg-3 col-xs-12">
            <h5 id="foot">
              <b>iDesign.Market</b>
            </h5>
            <p className="rev-width inter" id="foote">
            iDesign.Market is an online marketplace providing SaaS, Design Tools and workflow features, dedicated to Interior Community.
            </p>
            <ul className="ftco-footer-social p-0 mt-4 mb-4">
              <span className="ion-logo-twitter p-1" style={{cursor:"pointer"}} >
                <img src={facebook} alt="" onClick={() => window.location.href="https://fb.com/iDesign.market"} />
              </span>
              <span className="ion-logo-facebook p-1" style={{cursor:"pointer"}} onClick={() => window.location.href="https://instagram.com/iDesign.market"}>
                <img src={Instagram} alt="" />
              </span>
              <span className="ion-logo-instagram p-1" style={{cursor:"pointer"}} onClick={() => window.location.href="https://youtube.com/channel/UCZYsSoot4r9eZSPJk6F7-xw"}>
                <img src={Youtube} alt="" />
              </span>
              <span className="ion-logo-linkedin p-1" style={{cursor:"pointer"}} onClick={() => window.location.href="https://wa.me/919289347893"}>
                <img src={WhatsApp} alt="" />
              </span>
            </ul>
            {/* <p
              className="pt-4"
              onClick={() => (window.location.href = "/csr")}
              style={{ cursor: "pointer" }}
            >
              <u> Corporate Social Responsibility </u>
            </p> */}
          </div>
          <div className="col-lg-2 col-xs-12">
            <p className="inter" id="foot">
              <b>Company</b>
            </p>
            <ul className="list-unstyled">
              <li id="foote">
                <a
                  href="https://pro.idesign.market/about-us"
                  className="py-1 d-block" id="foote"
                >
                  About
                </a>
              </li>
              <li id="foote">
                <a href="https://angel.co/company/idesign-market-1/jobs" className="py-1 d-block">
                  Carrers
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
                <a href="https://pro.idesign.market/cookie-policy" className="py-1 d-block">
                  Cookie policy
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
                <a href="https://www.idesign.market/findprofessionals" className="py-1 d-block">
                Design Professionals
                </a>
              </li>
              <li id="foote">  
                {/* <Link to="/exploreprojects" className="py-1 d-block">
                  Explore Project
                </Link> */}
                <a href="https://www.idesign.market/exploreprojects" className="py-1 d-block">Explore Project</a>
              </li>
              <li id="footing">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target={user ? "#successmodal" : "#staticBackdrop"}
                  className="py-1 d-block"
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
                <a href="https://pro.idesign.market" className="py-1 d-block">
                  Join iDesign Pro
                </a>
              </li>
              <li id="foote">
                <a href="https://pro.idesign.market/pricing" className="py-1 d-block">
                  Pricing
                </a>
              </li>
              <li id="foote">
                <a href="https://www.idesign.market/magazines" className="py-1 d-block">
                  Magazine
                </a>
              </li>
              <li id="footing">
                <a href="https://pro.idesign.market/login" className="py-1 d-block">
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
        <div className="row mt-5 p-2">
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

export default Footer;
