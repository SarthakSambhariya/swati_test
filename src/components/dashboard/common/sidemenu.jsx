import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faSmile, faHeart, faBookmark, faTag, faQuestion, faCircle,  } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
function Sidemenu(props) {

  const aciveLink = window.location.href.split("/")[window.location.href.split("/").length -1];
  
    return (
        <>
        <aside>
          <div id="sidebar" className="nav-collapse ">
            <ul className="sidebar-menu" id="nav-accordion">
              <li className="mt">
                <Link className={aciveLink === "home" ? "active": "" } to="/dashboard/home">
                <i> <FontAwesomeIcon icon={faHome} /></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="sub-menu">
                <Link to="/dashboard/projects" className={aciveLink === "projects" ? "active": "" }  >
                <i>  <FontAwesomeIcon icon={faBriefcase} /></i>
                  <span>Projects</span>
                </Link>
              </li>
              <li className="sub-menu">
                <Link to="/dashboard/designers" className={aciveLink === "designers" ? "active": "" }>
                <i>  <FontAwesomeIcon icon={faSmile} /></i>
                  <span>Designers</span>
                </Link>
              </li>
              <li className="sub-menu">
                <Link to="/dashboard/photos" className={aciveLink === "photos" ? "active": "" }>
                <i>  <FontAwesomeIcon icon={faHeart} /></i>
                  <span>Photos</span>
                </Link>
              </li>
              <li className="sub-menu" >
                <Link to="/dashboard/magazines" className={aciveLink === "magazines" ? "active": "" }>
                <i>   <FontAwesomeIcon icon={faBookmark} /></i>
                  <span>Magazines</span>
                </Link>
              </li>
              <li className="sub-menu">
                <Link to="/dashboard/brands" className={aciveLink === "brands" ? "active": "" }>
                <i>  <FontAwesomeIcon icon={faTag} /></i>
                  <span>Brand Offers</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        </>
    );
}

export default Sidemenu;