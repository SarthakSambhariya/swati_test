import React, { useEffect, useState } from "react";
import Header from "../components/common/header";

import aliciascott from "../components/designer-profile/aliciascott.png"; 
import "../components/home/css/testimonl.css";
import bluesofa from "../components/designer-profile/blue-sofa.png";
import constants from "../services/constants";
import projectservice from "../services/projectservice";
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
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const LikedInspriation = ({match}) => {
  const [projectDetail, setProjectDetail] = useState({});

  const getProjectDetails = async () =>{

    // const result = await projectservice.getProjectDetails(match.params["id"]);
    // setProjectDetail(result);
  }

  useEffect(() => {
    getProjectDetails();
  },[])

  return (
    <>
    <Header />
      <section className="mt-lg-5 linking">
        <div className="container">
          <nav
              aria-label="--bs-breadcrumb-divider: '>';"
              // aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active" aria-current="page">
                Signup
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <a href="">Liked Inspirations</a>
                </li>
              </ol>
            </nav>
        </div>
      </section>

      <section className="modern-living mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 room-position">
              <img src={constants.apiurl+projectDetail["image"]} alt="" />
              <div className="bottom-right text-light">Living Room</div>
            </div>
            <div className="col-lg-5">
              <p className="fs-4">
                Modern Living Room 
              </p>
              <p>{projectDetail["buildingname"]}</p>

              <div className="row justify-content-between mt-5">
                <div className="col">
                  <div className=" mb-3" style={{maxWidth: "540px"}}>
                    <div className="row g-0">
                      <div className="col-md-2 align-self-center">
                        <img
                          src={aliciascott}
                          alt=""
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{projectDetail["designer"] && projectDetail["designer"]["name"]}</h5>
                          <p className="card-text">{projectDetail["designer"] && projectDetail["designer"]["name"]}</p>
                          <p>{projectDetail["designer"] && projectDetail["designer"]["email"]}</p>
                        </div>
                      </div>
                      <p className="card-text">
                        <span className="star-icon">
                          <i className="fa fa-star"></i>4.3
                        </span>
                        <span>
                          Experience<b> {projectDetail["designer"] && projectDetail["designer"]["experience"]} Years </b>
                        </span>
                      </p>
                      <p className="liked-ins float-start mt-4">
                        Design fee : {projectDetail["designer"] && projectDetail["designer"]["fee"]}/room
                      </p>
                    </div>  
                  </div>
                </div>
              </div>
              <div className="social-icon">
              <ul className="list-unstyled d-flex" >
              <li>
                <button
                  type="button"
                  className="btn btn-sm text-light btn-width designer me-3"
                  data-bs-toggle="modal"
                  
                >
                  <i>
                    <FontAwesomeIcon icon={faPhone} />
                  </i>
                  Call Designer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-sm text-light btn-width whatsapp"
                  data-bs-toggle="modal"
                >
                  <i>
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </i>
                  Whatsapp
                </button>
              </li>
              </ul>
              </div>
              <div className="rooms mt-lg-5 text-light">
                <div className="two-rooms mb-4">
                  <span className="green">Living Room</span>
                  <span className="blue">Drawing Room</span>
                </div>
                <span className="maroon">Drawing Room</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LikedInspriation;
