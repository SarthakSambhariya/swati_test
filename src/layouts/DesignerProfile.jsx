import React, { useState, useEffect } from "react";
import Header from "../components/common/header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/common/footer";
import {
  faHeart,
  faShare,
  faCheck,
  faLocation,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import tick from "../components/findprofessional/images/tick.png";
import share from "../components/findprofessional/images/share.png";
import like from "../components/findprofessional/images/like.png";
import location from "../components/findprofessional/images/location.png";
import { Spinner } from "react-bootstrap";
import authService from "../services/authService";
import userservice from "../services/userservice";
import noimage from "../components/home/images/noimage.png";
import b2bservice from "../services/b2bservice";
import heartO from "../components/home/images/heart-o.png";
import designerservice from "../services/designerservice";
import main from "../mobile/css/main.css";
import { ToastContainer, toast } from "react-toastify";

import CallButton from "../components/common/buttons/callbutton";
import reviewservice from "../services/reviewservice";
import Share from "../components/common/buttons/share";
import WhatsApp from "../components/common/buttons/whatsapp";
import MobileSlider from "../components/designer-profile/mobileslider";
import noProject from "../components/common/noimage/noProject.png";
import AllProjectsModal from "../components/exploreprojects/allprojectsmodal";

const DesignerProfile = ({ match, location }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [designerProfile, setDesignerProfile] = useState({});
  const [nextDesigner, setNextDesigner] = useState({});
  const [prevDesigner, setPrevDesigner] = useState({});
  const [user, setUser] = useState(false);
  const [skip, setSkip] = useState(3);
  const [showHeart, setShowHeart] = useState(false);
  const [review, setReview] = useState({ avgReview: 0, count: 0 });
  const [ratingValue, setRatingValue] = useState(0);
  const [images, setImages] = useState([]);

  const [reviews, setReviews] = useState({
    designerId: "",
    userId: "",
    title: "",
    review: "",
    rating: "",
  });

  const [designerProject, setDesignerProject] = useState([]);
  const [userData, setUserData] = useState({
    imageUrl: {
      original: "",
    },
  });
  const Name = match.params["name"];
  const Company = match.params["company"].split("-").join(" ");

  const handleLike = async () => {
    const params = {
      designerId: designerProfile["_id"],
      userId: authService.getLocalStorage("id"),
    };

    const designer = await designerservice.likedDesigner(params);
    setShowHeart(!showHeart);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReview = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authService.getLocalStorage("id")) {
    }

    reviews["userId"] = authService.getLocalStorage("id");
    reviews["designerId"] = designerProfile["_id"];
    reviews["rating"] = ratingValue;

    try {
      const response = await userservice.reviews(reviews);
      toast.success("Thanks for Your Review", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("SomeThing wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setShow(false);
    // window.location.reload();
  };

  const getInit = async () => {
    // const result = await desginerservice.getlistDesigners();
    const params = `city=${match.params["city"]}&city=&companyName=${Company}`;
    const designer = await b2bservice.getlistDesignersFilter(params);
    const nextandprevParms = `skip=${skip}`;
    const nextandprev = await b2bservice.getlistDesignersFilter(
      nextandprevParms
    );

    if (designer.length > 0) {
      setNextDesigner(nextandprev[0]);
      setPrevDesigner(nextandprev[1]);
    }
    if (designer.length > 0) {
      setDesignerProfile(designer[0]);
      const projectParams = `designerId=${designer[0]["_id"]}`;
      const projects = await b2bservice.getlistProjectsFilter(
        projectParams + "&" + projectParams
      );
      console.log(projects[0]["data"][0]["images"], "project");
      setDesignerProject(projects);
      if (projects.length > 0) {
        setUserData(projects[0]["userId"]);
        console.log(projects[0]["data"]);
        setImages(projects[0]["data"][0]["images"]);
      }
    }

    const likedParams = {
      userId: authService.getLocalStorage("id"),
      designerId: designer[0]["_id"],
    };
    try {
      const responser = await designerservice.getLikedDesigner(likedParams);
      if (responser) {
        setShowHeart(true);
      }
    } catch (error) {}

    const parms = {
      designerId: designer[0]["_id"],
    };

    const r = await reviewservice.getUserReview(parms);
    if (r.length > 0) {
      setReview(r[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getInit();
    authService.getToken() ? setUser(true) : setUser(false);
    if (location["data"]) {
      setSkip(location["data"]["skip"]);
    }
  }, [location["data"]]);

  console.log(userData["imageUrl"], "000");

  return (
    <>
      <Header />
      <section className="mt-lg-5 linking displayn">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home" className="bred">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Find Designer
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a href="/findprofessionals" className="bred">
                  Designer Listing
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="" style={{ textTransform: "capitalize" }}>
                  {Company}
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {designerProject.length < 0 ? (
        <center>
          <Spinner animation="border" />
        </center>
      ) : (
        <>
          <section className="Designer-profile mt-lg-5 displayn">
            <div className="container">
              <div className="row gx-5">
                <div className="col-lg-7">
                  <h2 className="mb-3" style={{ textTransform: "capitalize" }}>
                    {Company}
                  </h2>
                  <div className="row">
                    <div className="row justify-content-between">
                      <div className="col-8">
                        <div className=" mb-3">
                          <div className="row g-0">
                            <div className="col-md-3 align-self-center card-icon">
                              <img
                                className="rounded"
                                src={
                                  userData["imageUrl"]["thumbnail"] !== ""
                                    ? userData["imageUrl"]["thumbnail"]
                                    : "https://www.w3schools.com/howto/img_avatar.png"
                                }
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body interfont">
                                <h5 className="card-title d-inline">
                                  {designerProfile &&
                                    designerProfile["companyName"]}
                                </h5>
                                <div className="dp d-inline m-1">
                                  {designerProfile &&
                                    designerProfile["planId"] &&
                                    designerProfile["planId"]["price"] !==
                                      0 && <img src={tick} alt="" />}

                                  {user ? (
                                    showHeart ? (
                                      <FontAwesomeIcon
                                        icon={faHeart}
                                        size="lg"
                                        className="me-2"
                                        style={{
                                          cursor: "pointer",
                                          color: "red",
                                        }}
                                        onClick={handleLike}
                                      />
                                    ) : (
                                      <img
                                        src={heartO}
                                        style={{
                                          width: "15px",
                                          cursor: "pointer",
                                        }}
                                        alt=""
                                        srcset=""
                                        onClick={handleLike}
                                      />
                                    )
                                  ) : (
                                    <img
                                      src={heartO}
                                      style={{
                                        width: "15px",
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                      srcset=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                    />
                                  )}

                                  <Share />
                                </div>
                                <p className="card-text">
                                  <span>Experience </span>
                                  <span>
                                    <b>
                                      {designerProfile &&
                                        designerProfile["workExperience"]}{" "}
                                    </b>
                                  </span>
                                </p>
                                <p className="card-text">
                                  <span>
                                    <FontAwesomeIcon />{" "}
                                    <b>
                                      {designerProfile &&
                                        designerProfile["city"]}{" "}
                                    </b>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {Name === "designer" && (
                        <div className="col-md-4">
                          <p className="liked-ins float-start blue-text w-100 text-center">
                            Design fee :
                            <b>
                              ₹
                              {designerProfile &&
                                designerProfile["fees"] &&
                                designerProfile["fees"]["designRoomPrice"]}
                              /room
                            </b>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-lg-3 interfont">
                    <div className="col-lg-3 col-sm-6">
                      <CallButton
                        number={designerProfile && designerProfile.phoneNumber}
                        listingName={Name}
                      />
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <WhatsApp
                        phoneNumber={
                          designerProfile && designerProfile.phoneNumber
                        }
                      />
                    </div>
                  </div>

                  <div className="projects mt-5">
                    <p className="mt-5 mb-3 fs-5">
                      <b>PROJECTS</b>
                    </p>
                    <div className="row">
                      {designerProject.length > 0 ? (
                        <>
                          {designerProject.map((project, index) => (
                            <AllProjectsModal
                              designerImage={
                                userData["imageUrl"]["thumbnail"] !== ""
                                  ? userData["imageUrl"]["thumbnail"]
                                  : "https://www.w3schools.com/howto/img_avatar.png"
                              }
                              modalName={`projectsModal-${index}`}
                              name={designerProfile.companyName}
                              review={review}
                              exp={designerProfile.workExperience}
                              address={designerProfile.city}
                              pname={project.name}
                              fee={
                                designerProfile.fees &&
                                designerProfile.fees.zoomPrice
                              }
                              images={project["data"][0]["images"]}
                              phoneNumber={designerProfile.phoneNumber}
                              projects={designerProject}
                            />
                          ))}

                          <div
                            className="col-lg-7 col-sm-12"
                            data-bs-toggle="modal"
                            data-bs-target="#projectsModal-0"
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="designer-profile"
                              style={{ display: "relative" }}
                            >
                              <img
                                src={
                                  designerProject.length > 0 &&
                                  designerProject[0]["data"].length > 0 &&
                                  designerProject[0]["data"][0]["images"]
                                    .length > 0
                                    ? designerProject[0]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top"
                                alt="..."
                              />

                              <div className="contempory">
                                <div className="row justify-content-between">
                                  <div className="col-4 text-light">
                                    <p>
                                      <b>
                                        {" "}
                                        {designerProject.length > 0 &&
                                          designerProject[0]["name"]}
                                      </b>
                                    </p>
                                    <p>
                                      {designerProject.length > 0 &&
                                        designerProject[0]["address"]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-lg-7 col-sm-12">
                          <div
                            className="designer-profile"
                            style={{ display: "relative" }}
                          >
                            <img
                              src={noProject}
                              className="card-img-top"
                              alt="..."
                            />
                          </div>
                        </div>
                      )}

                      {designerProject.length > 1 && (
                        <div className="col-lg-5 col-sm-5">
                          <div className="short-img">
                            {/* {designerProject["data"] && designerProject["data"]} */}
                            <div
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target="#projectsModal-1"
                            >
                              <img
                                src={
                                  designerProject.length > 1
                                    ? designerProject[1]["data"][0]["images"]
                                        .length > 0 &&
                                      designerProject[1]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                          </div>
                          <br />

                          {designerProject.length > 2 && (
                            <div
                              className="short-img"
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target="#projectsModal-2"
                            >
                              {/* {designerProject["data"] && designerProject["data"]} */}

                              <img
                                src={
                                  designerProject.length > 2
                                    ? designerProject[2]["data"][0]["images"]
                                        .length > 0 &&
                                      designerProject[2]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <br />
                    {designerProject.length > 3 && (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <div
                              className=""
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target="#projectsModal-3"
                            >
                              <img
                                // src={designerProject["data"] && designerProject["data"][0]["images"][0]["original"]}
                                src={
                                  designerProject.length > 2
                                    ? designerProject[3]["data"][0]["images"]
                                        .length > 0 &&
                                      designerProject[3]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top"
                                alt="... "
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="">
                              <img
                                src={
                                  designerProject.length > 4
                                    ? designerProject[4]["data"][0]["images"]
                                        .length > 0 &&
                                      designerProject[4]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top"
                                alt="..."
                              />
                              <div className="">
                                <div className="row justify-content-between">
                                  <div className="col-4 text-light">
                                    <p>
                                      <b>
                                        {designerProject.length > 3 &&
                                          designerProject[2]["data"][0]["name"]}
                                      </b>
                                    </p>
                                    <p>{designerProfile.city}</p>
                                  </div>
                                  <div className="col-6"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="text-center"
                          data-bs-toggle="modal"
                          data-bs-target={review.count > 0 && "#review"}
                          style={{ cursor: "pointer" }}
                        >
                          <p className="green-recon border-0 fs-4">
                            Review by other homeowners ({review.count})
                          </p>
                        </div>
                      </>
                    )}

                    <div
                      className="modal fade"
                      id="review"
                      tabIndex="-1"
                      aria-labelledby="reviewLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="reviewLabel">
                              Modal title
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <section className="review-by-others mt-40">
                              <div className="container">
                                <h3>Reviews by other homeowners (40)</h3>
                                <div className=" mt-5 g-0">
                                  <div className="d-inline text-white para-p">
                                    P
                                  </div>
                                  <div className="d-inline ms-3">
                                    <b>Reliable And Dependable Firm</b>
                                    <p className="ms-5">
                                      Review given by Parismita - Client
                                    </p>
                                  </div>
                                  <p className="mt-3">
                                    We engaged Forefront after interviewing
                                    quite a few interior designers as we were
                                    not sure at the time how the renovation for
                                    our new 5 room BTO flat should be done Lorem
                                    Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever
                                    since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to
                                    make a type specimen book. It has survived
                                    not only five centuries, but also the leap
                                    into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in
                                    the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and
                                    more recently with desktop publishing
                                    software like Aldus PageMaker including
                                    versions of Lorem Ipsum..... Read More
                                  </p>
                                </div>
                                <div className=" mt-5 g-0">
                                  <div className="d-inline text-white para-p">
                                    P
                                  </div>
                                  <div className="d-inline ms-3">
                                    <b>Reliable And Dependable Firm</b>
                                    <p className="ms-5">
                                      Review given by Parismita - Client
                                    </p>
                                  </div>
                                  <p className="mt-3">
                                    We engaged Forefront after interviewing
                                    quite a few interior designers as we were
                                    not sure at the time how the renovation for
                                    our new 5 room BTO flat should be done Lorem
                                    Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever
                                    since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to
                                    make a type specimen book. It has survived
                                    not only five centuries, but also the leap
                                    into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in
                                    the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and
                                    more recently with desktop publishing
                                    software like Aldus PageMaker including
                                    versions of Lorem Ipsum..... Read More
                                  </p>
                                </div>
                                <div className="mt-5 g-0">
                                  <div className="d-inline text-white para-p">
                                    P
                                  </div>
                                  <div className="d-inline ms-3">
                                    <b>Reliable And Dependable Firm</b>
                                    <p className="ms-5">
                                      Review given by Parismita - Client
                                    </p>
                                  </div>
                                  <p className="mt-3">
                                    We engaged Forefront after interviewing
                                    quite a few interior designers as we were
                                    not sure at the time how the renovation for
                                    our new 5 room BTO flat should be done Lorem
                                    Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever
                                    since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to
                                    make a type specimen book. It has survived
                                    not only five centuries, but also the leap
                                    into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in
                                    the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and
                                    more recently with desktop publishing
                                    software like Aldus PageMaker including
                                    versions of Lorem Ipsum..... Read More
                                  </p>
                                </div>
                                <div className=" mt-5 g-0">
                                  <div className="d-inline text-white para-p">
                                    P
                                  </div>
                                  <div className="d-inline ms-3">
                                    <b>Reliable And Dependable Firm</b>
                                    <p className="ms-5">
                                      Review given by Parismita - Client
                                    </p>
                                  </div>
                                  <p className="mt-3">
                                    We engaged Forefront after interviewing
                                    quite a few interior designers as we were
                                    not sure at the time how the renovation for
                                    our new 5 room BTO flat should be done Lorem
                                    Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever
                                    since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to
                                    make a type specimen book. It has survived
                                    not only five centuries, but also the leap
                                    into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in
                                    the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and
                                    more recently with desktop publishing
                                    software like Aldus PageMaker including
                                    versions of Lorem Ipsum..... Read More
                                  </p>
                                </div>
                              </div>
                              <div className="text-center mt-3 d-grid gap-2">
                                <button
                                  type="button"
                                  className="btn btn-light  border-secondary pl-2 see-all"
                                >
                                  SEE ALL REVIEWS
                                </button>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 ms-5">
                  <Link
                    className="btn me-3 green-recon mb-3 disable"
                    to={{
                      pathname:
                        prevDesigner["city"] &&
                        `/designer/${prevDesigner[
                          "city"
                        ].toLowerCase()}/${prevDesigner[
                          "companyName"
                        ].replaceAll(" ", "-")}`,
                      data: { skip: skip > 0 ? skip - 1 : skip },
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Previous
                  </Link>

                  <Link
                    className="btn text-light float-end green"
                    to={{
                      pathname:
                        nextDesigner["city"] &&
                        `/designer/${nextDesigner[
                          "city"
                        ].toLowerCase()}/${nextDesigner[
                          "companyName"
                        ].replaceAll(" ", "-")}`,
                      data: { skip: skip + 1 },
                    }}
                    style={{ textTransform: "capitalize" }}
                  >
                    Next {Name} <FontAwesomeIcon icon={faArrowRight} />
                  </Link>

                  <div className="div-shadow mb-3 p-3">
                    <div className="row g-0">
                      <div className="col-md-3 align-self-center card-icon">
                        <img
                          className="rounded"
                          src={
                            nextDesigner["imageUrl"] &&
                            nextDesigner["imageUrl"]["original"] !== ""
                              ? nextDesigner["imageUrl"]["original"]
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title d-inline">
                            {nextDesigner["companyName"]}
                          </h5>
                          {nextDesigner["planId"] &&
                            nextDesigner["planId"]["price"] !== 0 && (
                              <img src={tick} alt="" className="ms-2" />
                            )}
                          <p className="card-text">
                            <p>Interior Designer</p>
                            <span>Experience </span>
                            <span>
                              <b>{nextDesigner["workExperience"]} </b>
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="card-text">
                        <span className="star-icon">
                          <i className="pe-2">
                            <FontAwesomeIcon icon={faStar} />
                          </i>
                          0.0
                        </span>

                        <span className="social-icon">
                          <img src={location} alt="" />
                          {nextDesigner["city"]}
                        </span>
                      </p>
                    </div>
                    {Name === "contractor" && (
                      <>
                        <button
                          type="button"
                          className="btn me-3 text-primary liked-ins"
                        >
                          Electrical Works
                        </button>
                        <button
                          type="button"
                          className="btn text-primary text-primary liked-ins"
                        >
                          Painting
                        </button>
                      </>
                    )}
                  </div>
                  {designerProject.length > 0 && (
                    <div className="sfpro">
                      <p className="fs-5">ALL PROJECTS</p>

                      {designerProject.map((project, index) => (
                        <p
                          data-bs-toggle="modal"
                          data-bs-target={`#projectsModal-${index}`}
                          style={{ cursor: "pointer" }}
                        >
                          {project.name}
                        </p>
                      ))}

                      {designerProject.length > 5 && (
                        <p>
                          <a href="">View More</a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="Designer-profile mt-lg-5 displaydn">
            <div className="container">
              <h2 className="mb-3" style={{ textTransform: "capitalize" }}>
                {/* <b>{Company} </b> */}
              </h2>
              <div className="">
                <div className="border-0">
                  <div className="nextprev">
                    <Link
                      className="btn me-3  mb-3 disable"
                      to={{
                        pathname:
                          prevDesigner["city"] &&
                          `/designer/${prevDesigner[
                            "city"
                          ].toLowerCase()}/${prevDesigner[
                            "companyName"
                          ].replaceAll(" ", "-")}`,
                        data: { skip: skip > 0 ? skip - 1 : skip },
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Previous
                    </Link>
                    <Link
                      className="btn text-light float-end green rounded-pill"
                      to={{
                        pathname:
                          nextDesigner["city"] &&
                          `/designer/${nextDesigner[
                            "city"
                          ].toLowerCase()}/${nextDesigner[
                            "companyName"
                          ].replaceAll(" ", "-")}`,
                        data: { skip: skip + 1 },
                      }}
                    >
                      Next Designer <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
                <div className="">
                  <div className="justify-content-between">
                    <div className="interfont">
                      <h4
                        style={{ textTransform: "capitalize" }}
                        className="card-title d-inline"
                      >
                        <b>
                          {designerProfile && designerProfile["companyName"]}
                        </b>
                      </h4>

                      <div className="dp d-inline float-end">
                        {designerProfile &&
                          designerProfile["planId"] &&
                          designerProfile["planId"]["price"] !== 0 && (
                            <img src={tick} alt="" />
                          )}
                        {user ? (
                          showHeart ? (
                            <FontAwesomeIcon
                              icon={faHeart}
                              size="lg"
                              className="me-2"
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          ) : (
                            <img
                              src={heartO}
                              style={{
                                width: "15px",
                                cursor: "pointer",
                              }}
                              alt=""
                              srcset=""
                              onClick={handleLike}
                            />
                          )
                        ) : (
                          <img
                            src={heartO}
                            style={{
                              width: "15px",
                              cursor: "pointer",
                            }}
                            alt=""
                            srcset=""
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          />
                        )}

                        <Share />
                      </div>

                      <div className="mt-3 mb-3">
                        {designerProfile &&
                          designerProfile["fees"] &&
                          Name === "designer" && (
                            <span className="liked-ins blue-text text-center w-50">
                              Design fee :{" "}
                              <b>
                                ₹
                                {designerProfile["fees"] &&
                                  designerProfile["fees"]["designRoomPrice"]}
                                /room
                              </b>
                            </span>
                          )}
                        {designerProfile && designerProfile["workExperience"] && (
                          <span className="ms-3">
                            Experience &nbsp;
                            <span>
                              <b>
                                {designerProfile &&
                                  designerProfile["workExperience"]}{" "}
                              </b>
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="loc mt-4 mb-3">
                        <span className="social-icon">
                          <img src={location} alt="" />
                          {designerProfile && designerProfile["city"]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-muted">
                  <CallButton
                    number={designerProfile && designerProfile["phoneNumber"]}
                    listingName={Name}
                  />{" "}
                  &nbsp;
                  <WhatsApp
                    phoneNumber={
                      designerProfile && designerProfile["phoneNumber"]
                    }
                  />
                </div>
              </div>

              {designerProject.length > 0 ? (
                <>
                  <div className="projects mt-5">
                    <span className="mt-5 mb-3 fs-6">
                      <b>Projects</b>
                    </span>
                    <span className="ms-4">
                      <div className="btn-group">
                        <button
                          className="btn border btn-sm dropdown-toggle"
                          type="button"
                          // data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          {designerProject[0].name}
                        </button>
                      </div>
                    </span>

                    <MobileSlider projects={designerProject[0]} />
                  </div>
                  <br />
                  <p
                    type="button"
                    className="green-recon text-center p-2 rounded"
                    data-bs-toggle="modal"
                    data-bs-target="#viewallprofile"
                  >
                    View all ({designerProject.length}) Project
                  </p>
                </>
              ) : (
                <>
                  <br />
                  <div className="card">
                    <div className="card-body">
                      <img src={noProject} alt="" style={{ width: "100%" }} />
                    </div>
                  </div>
                </>
              )}

              <div
                className="modal fade"
                id="review"
                tabIndex="-1"
                aria-labelledby="reviewLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="reviewLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <section className="review-by-others mt-40">
                        <div className="container">
                          <h3>Reviews by other homeowners (40)</h3>
                          <div className=" mt-5 g-0">
                            <div className="d-inline text-white para-p">P</div>
                            <div className="d-inline ms-3">
                              <b>Reliable And Dependable Firm</b>
                              <p className="ms-5">
                                Review given by Parismita - Client
                              </p>
                            </div>
                            <p className="mt-3">
                              We engaged Forefront after interviewing quite a
                              few interior designers as we were not sure at the
                              time how the renovation for our new 5 room BTO
                              flat should be done Lorem Ipsum is simply dummy
                              text of the printing and typesetting industry.
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type specimen book. It has survived not only five
                              centuries, but also the leap into electronic
                              typesetting, remaining essentially unchanged. It
                              was popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum..... Read More
                            </p>
                          </div>
                          <div className=" mt-5 g-0">
                            <div className="d-inline text-white para-p">P</div>
                            <div className="d-inline ms-3">
                              <b>Reliable And Dependable Firm</b>
                              <p className="ms-5">
                                Review given by Parismita - Client
                              </p>
                            </div>
                            <p className="mt-3">
                              We engaged Forefront after interviewing quite a
                              few interior designers as we were not sure at the
                              time how the renovation for our new 5 room BTO
                              flat should be done Lorem Ipsum is simply dummy
                              text of the printing and typesetting industry.
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type specimen book. It has survived not only five
                              centuries, but also the leap into electronic
                              typesetting, remaining essentially unchanged. It
                              was popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum..... Read More
                            </p>
                          </div>
                          <div className="mt-5 g-0">
                            <div className="d-inline text-white para-p">P</div>
                            <div className="d-inline ms-3">
                              <b>Reliable And Dependable Firm</b>
                              <p className="ms-5">
                                Review given by Parismita - Client
                              </p>
                            </div>
                            <p className="mt-3">
                              We engaged Forefront after interviewing quite a
                              few interior designers as we were not sure at the
                              time how the renovation for our new 5 room BTO
                              flat should be done Lorem Ipsum is simply dummy
                              text of the printing and typesetting industry.
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type specimen book. It has survived not only five
                              centuries, but also the leap into electronic
                              typesetting, remaining essentially unchanged. It
                              was popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum..... Read More
                            </p>
                          </div>
                          <div className=" mt-5 g-0">
                            <div className="d-inline text-white para-p">P</div>
                            <div className="d-inline ms-3">
                              <b>Reliable And Dependable Firm</b>
                              <p className="ms-5">
                                Review given by Parismita - Client
                              </p>
                            </div>
                            <p className="mt-3">
                              We engaged Forefront after interviewing quite a
                              few interior designers as we were not sure at the
                              time how the renovation for our new 5 room BTO
                              flat should be done Lorem Ipsum is simply dummy
                              text of the printing and typesetting industry.
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type specimen book. It has survived not only five
                              centuries, but also the leap into electronic
                              typesetting, remaining essentially unchanged. It
                              was popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum..... Read More
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3 d-grid gap-2">
                          <button
                            type="button"
                            className="btn btn-light  border-secondary pl-2 see-all"
                          >
                            SEE ALL REVIEWS
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade w3-modal-content w3-animate-zoom"
                id="viewallprofile"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="viewallprofileLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h5
                        className="modal-title text-dark"
                        id="viewallprofileLabel"
                      >
                        All Project
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {designerProject.map((project, index) => (
                        <div className="card" key={`id-${index}`}>
                          <img
                            style={{ cursor: "pointer" }}
                            src={
                              designerProject.length > 0 &&
                              designerProject[0]["data"].length > 0 &&
                              designerProject[0]["data"][0]["images"].length > 0
                                ? designerProject[0]["data"][0]["images"][0][
                                    "original"
                                  ]
                                : noimage
                            }
                            className="card-img-top custom-card"
                            alt=""
                          />

                          <div className="card-body">
                            <div className="">
                              <div className="row">
                                <div className="col-lg-7 mseventy">
                                  <span className="fs-5">{project.name}</span>
                                  <p>{project.description}</p>
                                  {/* <span>dname</span> */}
                                </div>
                                <div className="col-lg-4 text-end mthirty">
                                  <table className="">
                                    <tr>
                                      <th>
                                        <Share />
                                      </th>
                                      <th style={{ cursor: "pointer" }}>
                                        {/* <img src={like} alt="" className="me-2 " /> */}

                                        {user ? (
                                          showHeart ? (
                                            <FontAwesomeIcon
                                              icon={faHeart}
                                              size="lg"
                                              className="fs-3 ms-3"
                                              // style={{ cursor: "pointer" }}
                                            />
                                          ) : (
                                            <img
                                              src={heartO}
                                              style={{ margin: "0px 15px" }}
                                              alt=""
                                              srcset=""
                                              onClick={handleLike}
                                            />
                                          )
                                        ) : (
                                          <img
                                            src={heartO}
                                            style={{}}
                                            alt=""
                                            srcset=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                          />
                                        )}
                                      </th>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <span className=""></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container displayn">
            <p className="mt-4 fs-4">Review</p>
            <div className="col-lg-8 form-enquiry p-4 ">
              {show && (
                <div className="row justify-content-center">
                  <div className="rating col-md-4">
                    <input
                      type="radio"
                      id="star5"
                      name="rate"
                      value="5"
                      onClick={(e) => setRatingValue(e.target.value)}
                    />
                    <label for="star5" title="text">
                      5 stars
                    </label>
                    <input
                      type="radio"
                      id="star4"
                      name="rate"
                      value="4"
                      onClick={(e) => setRatingValue(e.target.value)}
                    />
                    <label for="star4" title="text">
                      4 stars
                    </label>
                    <input
                      type="radio"
                      id="star3"
                      name="rate"
                      value="3"
                      onClick={(e) => setRatingValue(e.target.value)}
                    />
                    <label for="star3" title="text">
                      3 stars
                    </label>
                    <input
                      type="radio"
                      id="star2"
                      name="rate"
                      value="2"
                      onClick={(e) => setRatingValue(e.target.value)}
                    />
                    <label for="star2" title="text">
                      2 stars
                    </label>
                    <input
                      type="radio"
                      id="star1"
                      name="rate"
                      value="1"
                      onClick={(e) => setRatingValue(e.target.value)}
                    />
                    <label for="star1" title="text">
                      1 star
                    </label>
                  </div>
                </div>
              )}
              <div className="text-center">
                <p
                  className="pt-5 fs-4"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target={!user && "#staticBackdrop"}
                  onClick={user && handleReview}
                >
                  Write a Review
                </p>
              </div>
            </div>

            {show && (
              <div className="col-lg-8 form-enquiry mt-4">
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        id="id_title"
                        value={reviews.title}
                        placeholder="Add a title"
                        name="title"
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="id_review"
                      rows="3"
                      placeholder="Written review"
                      value={reviews.review}
                      name="review"
                      onChange={handleChange}
                      required={true}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <h4 className="p-1">
                      <button type="submit" className="btn blue text-light">
                        Submit
                      </button>
                    </h4>
                  </div>
                </form>
              </div>
            )}
          </section>

          {/* -----------mobile section------------------- */}
          <section className="displaydn">
            <div className=" container mobilereview">
              {review.count > 0 && (
                <>
                  <p className="revieseve fs-4">
                    <b>Review</b> ({review.count})
                    <hr />
                  </p>

                  <div className="div-shadow">
                    <div className="review-by-others mt-40 p-2">
                      <div className="container">
                        <div className="mt-3 g-0">
                          <div className="d-inline text-white para-p">P</div>
                          <div className="d-inline ms-3">
                            <b>Reliable And Dependable Firm</b>
                            <p className="ms-5">
                              Review given by Parismita - Client
                            </p>
                          </div>
                          <p className="mt-3">
                            We engaged Forefront after interviewing quite a few
                            interior designers as we were not sure at the time
                            how the renovation for our new 5 room BTO flat
                            should be done Lorem..... Read More
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="review para green-recon text-center border-0 mt-3">
                    <p
                      className="dropdown-toggle"
                      id="dropdownMenuButton1"
                      aria-expanded="false"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Reviews by other homeowners ({review.count})
                    </p>
                  </div>
                </>
              )}

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered w-75 m-auto">
                  <div className="modal-content">
                    <div className="modal-body fs-6">
                      <p>
                        <b>Projects</b>
                      </p>
                      <div className="allproject">
                        {designerProject.map((project, index) => (
                          <div className="form-check" key={`id-${index}`}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked
                              onClick={() =>
                                (window.location.href = `/projects/${
                                  project.address
                                }/${project.name
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`)
                              }
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              {project.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-end m-3">
                      <p data-bs-dismiss="modal">CANCEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="col-lg-8 p-4 ">
                <div className="star-wrapper text-center fs-2">
                  {show && (
                    <div className="row justify-content-center">
                      <div className="rating col-md-4">
                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input
                          type="radio"
                          id="star2"
                          name="rate"
                          value="2"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input
                          type="radio"
                          id="star1"
                          name="rate"
                          value="1"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star1" title="text">
                          1 star
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p
                    className=""
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={!user && "#staticBackdrop"}
                    onClick={user && handleReview}
                  >
                    Write a Review
                  </p>
                </div>
              </div>
              {show && (
                <>
                  <div className="col-lg-8 form-enquiry mt-4 div-shadow">
                    <form onSubmit={handleSubmit} className="p-4">
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className="form-control"
                            id="id_title"
                            value={reviews.title}
                            placeholder="Add a title"
                            name="title"
                            onChange={handleChange}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          id="id_review"
                          rows="3"
                          placeholder="Written review"
                          value={reviews.review}
                          name="review"
                          onChange={handleChange}
                          required={true}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="text-center mt-3">
                    <h4 className="p-1">
                      <button type="submit" className="btn blue text-light">
                        Submit
                      </button>
                    </h4>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

export default DesignerProfile;
