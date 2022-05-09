import React, { useState, useEffect } from "react";
import Header from "../components/common/header";

import bluesofa from "../components/designer-profile/blue-sofa.png";
import aliciascott from "../components/designer-profile/aliciascott.png";

import "../components/designer-profile/css/designerprofile.css";
import ProjectsCards from "../components/exploreprojects/projectcards";
import MorePhotosModal from "../components/exploreprojects/morephotosmodal";
import Footer from "../components/common/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPhone,
  faShare,
  faStar,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import constants from "../services/constants";
import tick from "../components/findprofessional/images/tick.png";
import locationicon from "../components/findprofessional/images/location.png";
import b2bservice from "../services/b2bservice";
import { Link } from "react-router-dom";

import noimage from "../components/home/images/noimage.png";
import authService from "../services/authService";
import heartO from "../components/home/images/heart-o.png";
import projectservice from "../services/projectservice";
import AllProjectsModal from "../components/exploreprojects/allprojectsmodal";
import { Classnames } from "react-alice-carousel";
import reviews from "../services/reviewservice";
import Share from "../components/common/buttons/share";
import CallButton from "../components/common/buttons/callbutton";
import WhatsApp from "../components/common/buttons/whatsapp";

function ExploreProjectDetais({ match, location }) {
  
  const [showHeart, setShowHeart] = useState(false);
  const [show, setShow] = useState(false);
  const [skip, setSkip] = useState(1);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState({});
  const [user, setUser] = useState({
    "imageUrl":{
      "thumbnail":{
        
      }
    }
  });
  const [images, setImages] = useState([]);
  const [review, setReview] = useState({
    avgReview: 0,
    count: 0,
  });
  const [nextProject, setNextProject] = useState({});
  const [prevProject, setPrevProject] = useState({});


  const handleLike = async () => {
    const params = {
      projectId: projects["_id"],
      userId: authService.getLocalStorage("id"),
    };
    const project = await projectservice.likedProjects(params);
    setShowHeart(!showHeart);
  };

  const getInit = async () => {
    setLoading(true);
    const params = `projectName=${match.params["name"].split("-").join(" ")}`;
    const response = await b2bservice.getlistProjectsFilter(params);
    setProjects(response[0]);
    setImages(response[0]["data"][0]["images"]);
    setUser(response[0]["userId"]);
    const nextandprevparam = `designerId=${response[0]["userId"]["_id"]}`;
    const nextandprev = await b2bservice.getlistProjectsFilter(
      nextandprevparam + "&" + nextandprevparam
    );

    console.log(nextandprev, "nextandprev");
    const parms = {
      designerId: response[0]["_id"],
    };

    const r = await reviews.getUserReview(parms);
    if (r.length > 0) {
      setReview(r[0]);
    }

    if (nextandprev.length > 0) {
      setNextProject(nextandprev[0]);
    }

    if (nextandprev.length >= 2) {
      setNextProject(nextandprev[0]);
      setPrevProject(nextandprev[1]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getInit();
    handleLike();
    if (location["data"]) {
      setSkip(location["data"]["skip"]);
    }
  }, [location["data"]]);

  return (
    <>
      <MorePhotosModal show={show} setShow={setShow} />
      <Header />
      <AllProjectsModal
      designerImage={user && user["imageUrl"]["thumbnail"] !== ""
      ? user["imageUrl"]["thumbnail"]
      : "https://www.w3schools.com/howto/img_avatar.png"}
      modalName="projectsModal-1"
        name={user.companyName}
        review={review}
        exp={user.workExperience}
        address={user.city}
        pname={projects.name}
        fee={user.fees && user.fees.zoomPrice}
        images={images.length > 0 && images}
        phoneNumber={user.phoneNumber}
        projects={projects}
      />

      
      <section className="mt-lg-5 linking">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <nav aria-label="breadcrumb" className="displayn">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item" aria-current="page">
                    <a href="/home" className="bred">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <a href="/exploreprojects" className="bred">
                      Projects
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="#">{projects.name}</a>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-5">
              <div className="displayn">
                <Link
                  className="btn green-recon rounded-pill"
                  to={{
                    pathname:
                      prevProject.name &&
                      `/projects/${prevProject.address}/${prevProject.name
                        .replaceAll(" ", "-")
                        .toLowerCase()}`,
                    data: { skip: skip + 1 },
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Previous Project
                </Link>

                <Link
                  className="btn ms-5 green text-light rounded-pill"
                  to={{
                    pathname:
                      nextProject.name &&
                      `/projects/${nextProject.address}/${nextProject.name
                        .replaceAll(" ", "-")
                        .toLowerCase()}`,
                    data: { skip: skip + 1 },
                  }}
                >
                  Next Project <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-living mt-lg-5">
        <div className="container">
          <div className="mobile-project displaydn">
            <div className="row">
              <div className="col-lg-5">
                <div className="persondetails childmargin">
                  <h4>
                    <span className="fs-4">{projects.name}</span>
                  </h4>
                  
                </div>

                <div className="nextprev">
                  <Link
                    className="btn green-recon rounded-pill"
                    to={{
                      pathname:
                        prevProject.name &&
                        `/projects/${prevProject.address}/${prevProject.name
                          .replaceAll(" ", "-")
                          .toLowerCase()}`,
                      data: { skip: skip + 1 },
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Previous Project
                  </Link>

                  <Link
                    className="btn text-light float-end green rounded-pill"
                    to={{
                      pathname:
                        nextProject.name &&
                        `/projects/${nextProject.address}/${nextProject.name
                          .replaceAll(" ", "-")
                          .toLowerCase()}`,
                      data: { skip: skip + 1 },
                    }}
                  >
                    Next Project <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>

                <div className="projectslider childmargin">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                    {images.length > 0 &&
                        images.map((image, index) => (
                            <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className={index === 0 && "active"}
                            aria-current="true"
                            aria-label="Slide 1"
                            style={{borderRadius:"50%", width:"7px", height:"7px"}}
                          ></button>
                        ))}

                    </div>
                    <div className="carousel-inner">
                      {images.length > 0 &&
                        images.map((image, index) => (
                            <div className={index == 0 ? "carousel-item active" : "carousel-item"}>
                              <img
                              src={image["original"]}
                              className="d-block w-100"
                              alt="..."
                            />
                            </div>
                        ))}
                    </div>
                  </div>
                </div>

                <h3><b>Designed by</b></h3>
                <div className="row justify-content-between mt-4">
                  <div className="w-25 align-self-center">
                    <img style={{width:"100%"}} src={user.imageUrl && user.imageUrl["original"] ? user.imageUrl["original"] : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"  } alt="" />
                  </div>
                  <div className="w-75">
                    <div className="card-body">
                      <h6 className="card-title">
                        {user.companyName} <img src={tick} alt="" />
                        {user ? (
                      showHeart ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          size="lg"
                          className="fs-3 ms-3"
                          onClick={handleLike}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            margin: "-2px 15px",
                          }}
                        />
                      ) : (
                        <img
                          src={heartO}
                          style={{ margin: "0px 15px", cursor: "pointer" }}
                          alt=""
                          srcset=""
                          onClick={handleLike}
                        />
                      )
                    ) : (
                      <img
                        src={heartO}
                        style={{ cursor: "pointer" }}
                        alt=""
                        srcset=""
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      />
                    )}
                    <Share />
                      </h6>
                      
                      {/* <p className="card-text">Interior Designer</p> */}
                      <p>
                        <span className="star-icon">
                          <i className="pe-2">
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          0.0
                        </span>
                        {user.workExperience && (
                        <span>
                          Experience :<b> {user.workExperience} </b>
                        </span>

                        )}
                      </p>
                    </div>
                  </div>
                  <div className="card-text childmargin">
                    {user.fees && (
                    <span className="liked-ins mt-2 blue-text">
                      Design fee :{" "}
                      <b>₹{user.fees && user.fees.zoomPrice}/room</b>
                    </span>

                    )}
                    &nbsp; &nbsp;
                    <span className="">
                    <p className="mt-3">
                      <img src={locationicon} alt="" />{" "}
                      {user.city}</p>
                    </span>
                  </div>
                </div>
                <div className="row mt-lg-1 interfont">
                  <div className="">
                    <CallButton number={user.phoneNumber} listingName={"designer"} /> &nbsp;
                    <WhatsApp phoneNumber={user.phoneNumber} />
                  </div>
                </div>

                <div className="rooms mt-lg-5  text-light mt-5 displayn">
                  <div className="two-rooms mb-4">
                    {images &&
                      images.map((m) => (
                        <button
                          type="button"
                          className="btn green text-light btn-sm m-2"
                        >
                          {m.name}
                        </button>
                      ))}
                  </div>
                </div>
                <div className=" mt-2">
                  <button
                    className="btn btn-primary blue ps-5 pe-5 w-100"
                    type="button"
                    onClick={() =>
                      (window.location.href = `/designer/${
                        user.city
                      }/${user.companyName.replaceAll(" ", "-").toLowerCase()}`)
                    }
                  >
                    View all projects by <b>{user.companyName}</b>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row displayn">
            <div className="col-lg-7 row-room displayn">
              <img
                src={
                  images.length > 0 &&
                  images[0]["original"]
                }
                alt=""
                className="w-100 rounded project-detail-card div-shadow"
              />
              {/* <div className="text-block green ps-5 pe-5">
                <p className="fs-6">{images.length > 0 && images[0]["name"]}</p>
              </div> */}
            </div>
            <div className="col-lg-5">
              <p>
                <span className="fs-4">{user.companyName}</span>
                {user ? (
                  showHeart ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      className="fs-3 ms-3"
                      onClick={handleLike}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        margin: "-2px 15px",
                      }}
                    />
                  ) : (
                    <img
                      src={heartO}
                      style={{ margin: "0px 15px", cursor: "pointer" }}
                      alt=""
                      srcset=""
                      onClick={handleLike}
                    />
                  )
                ) : (
                  <img
                    src={heartO}
                    alt=""
                    srcset=""
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  />
                )}
                <Share />
              </p>
              <p className="mt-3">{projects.name}</p>

              <div className="row justify-content-between mt-4">
                <div className="col">
                  <div className=" mb-3" style={{ maxWidth: "540px;" }}>
                    <div className="row g-0">
                      <div className="col-md-2 align-self-center">
                        
                      <img style={{width:"100%"}} src={user.imageUrl && user.imageUrl["original"] ? user.imageUrl["original"] : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"  } alt="" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {user.companyName} <img src={tick} alt="" />
                          </h5>
                          {/* <p className="card-text">Interior Designer</p> */}
                          <p>
                            <span className="social-icon">
                              <img src={locationicon} alt="" />
                              {user.city}
                            </span><br />
                            <span className="star-icon">
                              <i className="pe-2">
                                <FontAwesomeIcon icon={faStar} />
                              </i>
                              0.0
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="card-text">
                      {user.workExperience && (
                        <span>
                          Experience<b> {user.workExperience} </b>
                        </span>

                      )}
                      </p>
                      {user.fees && (
                      <p className="liked-ins float-start mt-4 blue-text">
                        Design fee :{" "}
                        <b>₹{user.fees && user.fees.zoomPrice}/room</b>
                      </p>

                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="social-icon">
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                  <i className="fa fa-heart-o"></i>
                </span>
                <span>
                  <i className="fa fa-whatsapp"></i>
                </span>
                <span>
                  <i className="fa fa-phone"></i>
                </span>
                <span className="text-light green chat-secure">
                  <i className="fa fa-envelope-o me-3"></i>Start Chat
                </span>
              </div> */}

              <div className="row mt-lg-1 interfont">
                <div className="col-lg-4 col-sm-6">
                  <CallButton
                    number={user.phoneNumber}
                    listingName={"designer"}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 ms-3">
                  <WhatsApp phoneNumber={user.phoneNumber} />
                </div>
              </div>

              <div className="rooms mt-lg-5  text-light mt-5 displayn">
                {/* <div className="two-rooms mb-4">
                  {images &&
                    images.map((m) => (
                      <button
                        type="button"
                        className="btn green text-light btn-sm m-2"
                      >
                        {m.name}
                      </button>
                    ))}
                </div> */}
              </div>
              <div className="">
                <button
                  className="btn btn-primary blue ps-5 pe-5"
                  type="button"
                  onClick={() =>
                    (window.location.href = `/designer/${
                      user.city
                    }/${user.companyName.replaceAll(" ", "-").toLowerCase()}`)
                  }
                >
                  View all projects by <b>{user.companyName}</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="All-moderate-room mt-5 displayn">
        <div className="container">
          <div className="row row-modal">
            {images.map(
              (m, i) =>
                i < 2 && (
                  <div className="col-lg-4 col-md-6 row-room">
                    <div className="card">
                      <img
                        src={
                          m["original"]
                            ? m["original"]
                            : noimage
                        }
                        alt="Nature"
                        className="w-100  card-img-top custom-card div-shadow"
                      />
                    </div>
                    {/* <div className="text-block bblok maroon ps-5 pe-5">
                      <p className="fs-6">{m.name}</p>
                    </div> */}
                  </div>
                )
            )}

            <div
              className="col-lg-4 col-md-6"
              data-bs-toggle="modal"
              data-bs-target="#projectsModal-1"
              style={{ cursor: "pointer" }}
            >
              <div className="card epd">
                <p className="text-light bolder fs-6">View More Photos</p>
                <img
                  src={images.length > 2 ? images[2]["original"] : noimage}
                  alt="Nature"
                  className="w-100 rounded card-img-top custom-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rennovation mt-5 displayn">
        <div className="container">
          <div className="text-center">
            <p className=" fs-5">Want to find designers for your renovation?</p>
            <div className="mt-3">
              <button
                type="button"
                className="btn me-2 green text-light"
                onClick={() => (window.location.href = "/findprofessionals")}
              >
                See designer listings
              </button>
              <button
                type="button"
                className="btn me-2 green-recon"
                data-bs-toggle="modal"
                data-bs-target={user ? "#successmodal" : "#getstartedmodal"}
              >
                Let iDesign recommend designers©g
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="slider-project mt-5">
        <div className="container">
          <div className="row">
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
            <ProjectsCards pname={"Project Name"} dname={"Building Name"} />
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default ExploreProjectDetais;
