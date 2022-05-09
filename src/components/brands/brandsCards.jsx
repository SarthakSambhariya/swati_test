import React, { useState } from "react";
import ddecor from "../brands/images/ddecor.png"

import ddecoricon from "../brands/images/ddecoricon.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPhone } from '@fortawesome/free-solid-svg-icons';
import CallButton from "../common/buttons/callbutton";
// import location from "../findprofessional/images/location.png"
// import lamp1 from "./brands/images/lamp.png"
// import diyas from "./brands/images/diyas.png"
// import time from "./brands/images/time.png"
// import pepperfry from "./brands/images/pepperfry.png"
// import eleg from "./brands/images/eleg.png"
// import ikea from "./brands/images/ikea.png"




const BrandsCards = ({id,company, category, description, location, number}) => {
  // const city = location.replaceAll(" ","-").toLowerCase();
  // const name = company.replaceAll(" ", "-").toLowerCase();
const [show, setShow] = useState(false);

  return (
    <>
      <div className="row mt-lg-3 p-3 brand-card-shadow">
        <div className="col-lg-4 big-deal" onClick={() => window.location.href=`/brand/${id}`} style={{cursor:"pointer"}}>
          <img src={ddecor} alt="" />
          <h4>15 % off<br /> on fabric</h4>
        </div>
        <div className="col-lg-4">
          <div className="deals-des">
            <span className="decor-card-img" onClick={() => window.location.href=`/brand/${id}`} style={{cursor:"pointer"}}>
              <img src={ddecoricon} alt="" />
            </span>
            <span className="span-dis ms-3">
              <p className="" style={{color:"#2CBF81"}}>{company}</p>
              <p>{category}</p>
            </span>
          </div>
          <p className="mt-lg-3">
            {description}
          </p>
          <div className="mt-3 mb-3">
            <span className="star">
            <i> <FontAwesomeIcon icon={faStar} /></i> 4.3 
            </span>
            <span className="social-icon"><img src={location} alt="" />{location}</span>
          </div>
         
        </div>
        <div className="col-lg-4 text-end">
          <div className="information">
            <ul className="list-unstyled">
              <li>
                <button type="button" onClick={() => window.location.href=`/brand/${id}`} style={{cursor:"pointer"}} className="btn btn-sm full-deal w-50"><b>View All Deals</b></button>
              </li>
              <li>
              
              <button type="button" className="btn btn-sm blue text-light w-50" onClick={() => setShow(!show)} ><i> <FontAwesomeIcon icon={faPhone} /></i> {show ? number : "Call Brand"} </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsCards;
