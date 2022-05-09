import React from "react";
import design_firm from "../home/images/design-firm.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHeart, faShare, faCheck, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import "../findprofessional/css/findprofessional.css";
import tick from "../findprofessional/images/tick.png"
import share from "../findprofessional/images/share.png"
import like from "../findprofessional/images/like.png"
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const DesignerListing = ({ id, name, experience, description, fee, location, phoneNumber }) => {
  return (
    <>
      <div className="row shadow mt-5" >
        <div className=" col-lg-4 col-md-12 p-4">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" style={{cursor: "pointer"}} onClick={() => window.location.href = `/designerprofile/${id}` }>
              <div className="carousel-item active">
                <img src={design_firm} alt="" />
              </div>
              <div className="carousel-item">
                <img src={design_firm} alt=""  />
              </div>
              <div className="carousel-item">
                <img src={design_firm} alt=""  />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-md-12">
          <h4 className="mt-2 d-inline">{name}</h4>
          <div className="social-icon  d-inline m-3" >
          <img src={tick} alt="" />
          <img src={like} alt=""  />
          <img src={share} alt="" />
          </div>
          <p className="mt-2">
            Experience <b>{experience}</b>
          </p>
          <p className="mt-2">
            {description}
          </p>
          <div className="review mt-4">
            <span className="star">
            <i> <FontAwesomeIcon icon={faStar} /></i> 4.3 
            </span>
            <span>(23 review)</span>
          </div>
          <br />
          <div className="costage">
            <span>Design fee : ₹{fee}/room</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="information">
            <ul className="list-unstyled">
              <li>
                <button type="button" className="btn btn-sm blue text-light btn-width">  <i> <FontAwesomeIcon icon={faPhone} /></i>Call Designer</button>
              </li>
              <li>
              <button type="button" className="btn btn-sm green text-light btn-width">  <i> <FontAwesomeIcon icon={faWhatsapp} /></i>Whatsapp</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignerListing;
