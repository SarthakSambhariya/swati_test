import React, { useState, useEffect, useRef } from "react";
import Header from "../components/common/header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faClose } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faStar, faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/common/footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
import { CloseButton, Spinner, Alert } from "react-bootstrap";
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
import Footer2 from "../components/common/footer2";
import profileBackground from "../components/findprofessional/images/profileBackground.svg";
import shareBtn from "../components/findprofessional/images/shareButtonOnProfile.svg";
import contractorWork from "../components/findprofessional/images/contractorWorks.png";
import profilePicture from "../components/findprofessional/images/profilePicture.svg";
import profilePageReviewStar from "../components/findprofessional/images/profilePageReviewStar.svg";
import blueHeart from "../components/findprofessional/images/blueHeart.svg";
import blankHeart from "../components/findprofessional/images/blankHeart.svg";
import fullHeart from "../components/findprofessional/images/fullHeart.svg";
import designFeeProfilePage from "../components/findprofessional/images/designFeeProfilePage.svg";
import experienceProfilePage from "../components/findprofessional/images/experienceProfilePage.svg";
import projectsProfilePage from "../components/findprofessional/images/projectsProfilePage.svg";
import otherDesignerProfilePic from "../components/findprofessional/images/otherDesignersPic.svg";
import briefCaseDesigner from "../components/findprofessional/images/briefCaseDesigner.svg";
import falseCeiling from "../components/findprofessional/images/falseCeiling.svg";
import tiles from "../components/findprofessional/images/tiles.svg";
import putty from "../components/findprofessional/images/putty.svg";
import wardrobes from "../components/findprofessional/images/wardrobes.svg";
import kitchen from "../components/findprofessional/images/kitchen.svg";
import whiteWhatsapp from "../components/findprofessional/images/whiteWhatsapp.svg";
import whiteCallButton from "../components/findprofessional/images/whiteCallButton.svg";
import { ProgressBar, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import DesignerPosts from "./designerPosts";
import DesignerProfileProjectCarousel from "./DesignerProfileProjectCarousel";

function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const DesignerProfile = ({ match, location, address }) => {
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
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  const [componentsToRender, setComponentToRender] = useState("about");
  const [totalProjectsByDesigner, setTotalProjectsByDesigner] =
    useState("200+");
  const [writeAReviewTextArea, setWriteAReviewTextArea] = useState(false);
  const reviewTextAreaRef = useRef();
  const [wordCount, setWordCount] = useState(0);
  const [projectCarouselOpen, setProjectCarouselOpen] = useState(false);
  const [profileLiked, setProfileLiked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [commentAlert, setCommentAlert] = useState(false);
  // const [listingType, setListingType] = useState("");

  const ratingSettings = {
    size: 50,
    count: 5,
    color: "#888888",
    activeColor: "#ffd700",
    value: 4,
    a11y: true,
    // isHalf: true,
    emptyIcon: <i class="far fa-thin fa-star"></i>,
    // halfIcon: <i class="fa-solid fa-star-half-stroke"></i>,
    filledIcon: <i class="far fa-solid fa-star"></i>,
    onChange: (newValue) => {
      // console.log(`Example 2: new value is ${newValue}`);
    },
  };

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
      // console.log(projects[0]["data"][0]["images"], "project");
      setDesignerProject(projects);
      if (projects.length > 0) {
        setUserData(projects[0]["userId"]);
        // console.log(projects[0]["data"]);
        setImages(projects[0]["data"][0]["images"]);
        setTotalProjectsByDesigner(projects.length);
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

    setTimeout(() => {
      setAlert(false);
    }, 3000);
    setTimeout(() => {
      setCommentAlert(false);
      setWriteAReviewTextArea(false);
    }, 3000);
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }
    // if (window.location.pathname.includes("contractor")) {
    //   setListingType("contractor");
    // } else {
    //   setListingType("designer");
    // }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location["data"],alert,commentAlert]);

  const textAreaWordCountHandler = () => {
    setWordCount(reviewTextAreaRef.current.value.length);
  };

  return (
    <React.Fragment>
      {screenWidth > 767 && (
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
                      <h2
                        className="mb-3"
                        style={{ textTransform: "capitalize" }}
                      >
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
                                            designerProfile["workExperience"]}
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
                            number={
                              designerProfile && designerProfile.phoneNumber
                            }
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
                                ></div>
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
                                        ? designerProject[2]["data"][0][
                                            "images"
                                          ].length > 0 &&
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
                                        ? designerProject[3]["data"][0][
                                            "images"
                                          ].length > 0 &&
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
                                        ? designerProject[4]["data"][0][
                                            "images"
                                          ].length > 0 &&
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
                                              designerProject[2]["data"][0][
                                                "name"
                                              ]}
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
                                        quite a few interior designers as we
                                        were not sure at the time how the
                                        renovation for our new 5 room BTO flat
                                        should be done Lorem Ipsum is simply
                                        dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has
                                        been the industry's standard dummy text
                                        ever since the 1500s, when an unknown
                                        printer took a galley of type and
                                        scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged. It was
                                        popularised in the 1960s with the
                                        release of Letraset sheets containing
                                        Lorem Ipsum passages, and more recently
                                        with desktop publishing software like
                                        Aldus PageMaker including versions of
                                        Lorem Ipsum..... Read More
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
                                        quite a few interior designers as we
                                        were not sure at the time how the
                                        renovation for our new 5 room BTO flat
                                        should be done Lorem Ipsum is simply
                                        dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has
                                        been the industry's standard dummy text
                                        ever since the 1500s, when an unknown
                                        printer took a galley of type and
                                        scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged. It was
                                        popularised in the 1960s with the
                                        release of Letraset sheets containing
                                        Lorem Ipsum passages, and more recently
                                        with desktop publishing software like
                                        Aldus PageMaker including versions of
                                        Lorem Ipsum..... Read More
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
                                        quite a few interior designers as we
                                        were not sure at the time how the
                                        renovation for our new 5 room BTO flat
                                        should be done Lorem Ipsum is simply
                                        dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has
                                        been the industry's standard dummy text
                                        ever since the 1500s, when an unknown
                                        printer took a galley of type and
                                        scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged. It was
                                        popularised in the 1960s with the
                                        release of Letraset sheets containing
                                        Lorem Ipsum passages, and more recently
                                        with desktop publishing software like
                                        Aldus PageMaker including versions of
                                        Lorem Ipsum..... Read More
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
                                        quite a few interior designers as we
                                        were not sure at the time how the
                                        renovation for our new 5 room BTO flat
                                        should be done Lorem Ipsum is simply
                                        dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has
                                        been the industry's standard dummy text
                                        ever since the 1500s, when an unknown
                                        printer took a galley of type and
                                        scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged. It was
                                        popularised in the 1960s with the
                                        release of Letraset sheets containing
                                        Lorem Ipsum passages, and more recently
                                        with desktop publishing software like
                                        Aldus PageMaker including versions of
                                        Lorem Ipsum..... Read More
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
                              {designerProfile &&
                                designerProfile["companyName"]}
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
                                      designerProfile["fees"][
                                        "designRoomPrice"
                                      ]}
                                    /room
                                  </b>
                                </span>
                              )}
                            {designerProfile &&
                              designerProfile["workExperience"] && (
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
                        number={
                          designerProfile && designerProfile["phoneNumber"]
                        }
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
                          <img
                            src={noProject}
                            alt=""
                            style={{ width: "100%" }}
                          />
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
                                  We engaged Forefront after interviewing quite
                                  a few interior designers as we were not sure
                                  at the time how the renovation for our new 5
                                  room BTO flat should be done Lorem Ipsum is
                                  simply dummy text of the printing and
                                  typesetting industry. Lorem Ipsum has been the
                                  industry's standard dummy text ever since the
                                  1500s, when an unknown printer took a galley
                                  of type and scrambled it to make a type
                                  specimen book. It has survived not only five
                                  centuries, but also the leap into electronic
                                  typesetting, remaining essentially unchanged.
                                  It was popularised in the 1960s with the
                                  release of Letraset sheets containing Lorem
                                  Ipsum passages, and more recently with desktop
                                  publishing software like Aldus PageMaker
                                  including versions of Lorem Ipsum..... Read
                                  More
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
                                  We engaged Forefront after interviewing quite
                                  a few interior designers as we were not sure
                                  at the time how the renovation for our new 5
                                  room BTO flat should be done Lorem Ipsum is
                                  simply dummy text of the printing and
                                  typesetting industry. Lorem Ipsum has been the
                                  industry's standard dummy text ever since the
                                  1500s, when an unknown printer took a galley
                                  of type and scrambled it to make a type
                                  specimen book. It has survived not only five
                                  centuries, but also the leap into electronic
                                  typesetting, remaining essentially unchanged.
                                  It was popularised in the 1960s with the
                                  release of Letraset sheets containing Lorem
                                  Ipsum passages, and more recently with desktop
                                  publishing software like Aldus PageMaker
                                  including versions of Lorem Ipsum..... Read
                                  More
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
                                  We engaged Forefront after interviewing quite
                                  a few interior designers as we were not sure
                                  at the time how the renovation for our new 5
                                  room BTO flat should be done Lorem Ipsum is
                                  simply dummy text of the printing and
                                  typesetting industry. Lorem Ipsum has been the
                                  industry's standard dummy text ever since the
                                  1500s, when an unknown printer took a galley
                                  of type and scrambled it to make a type
                                  specimen book. It has survived not only five
                                  centuries, but also the leap into electronic
                                  typesetting, remaining essentially unchanged.
                                  It was popularised in the 1960s with the
                                  release of Letraset sheets containing Lorem
                                  Ipsum passages, and more recently with desktop
                                  publishing software like Aldus PageMaker
                                  including versions of Lorem Ipsum..... Read
                                  More
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
                                  We engaged Forefront after interviewing quite
                                  a few interior designers as we were not sure
                                  at the time how the renovation for our new 5
                                  room BTO flat should be done Lorem Ipsum is
                                  simply dummy text of the printing and
                                  typesetting industry. Lorem Ipsum has been the
                                  industry's standard dummy text ever since the
                                  1500s, when an unknown printer took a galley
                                  of type and scrambled it to make a type
                                  specimen book. It has survived not only five
                                  centuries, but also the leap into electronic
                                  typesetting, remaining essentially unchanged.
                                  It was popularised in the 1960s with the
                                  release of Letraset sheets containing Lorem
                                  Ipsum passages, and more recently with desktop
                                  publishing software like Aldus PageMaker
                                  including versions of Lorem Ipsum..... Read
                                  More
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
                                  designerProject[0]["data"][0]["images"]
                                    .length > 0
                                    ? designerProject[0]["data"][0][
                                        "images"
                                      ][0]["original"]
                                    : noimage
                                }
                                className="card-img-top custom-card"
                                alt=""
                              />

                              <div className="card-body">
                                <div className="">
                                  <div className="row">
                                    <div className="col-lg-7 mseventy">
                                      <span className="fs-5">
                                        {project.name}
                                      </span>
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
                    <div
                      className="pt-5 fs-4"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target={!user && "#staticBackdrop"}
                      onClick={user && handleReview}
                    >
                      Write a Review
                    </div>
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
                                We engaged Forefront after interviewing quite a
                                few interior designers as we were not sure at
                                the time how the renovation for our new 5 room
                                BTO flat should be done Lorem..... Read More
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
      )}
      {screenWidth < 767 && (
        <div style={{ position: "relative" }}>
          {projectCarouselOpen && (
            <div
              className="d-flex flex-column"
              style={{
                position: "fixed",
                zIndex: "20",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            >
              <div
                className="d-flex justify-content-end mt-3 me-3"
                onClick={() => {
                  setProjectCarouselOpen(false);
                }}
              >
                <CloseButton variant="white" />
              </div>
              <div style={{ position: "relative", top: "20%" }}>
                <DesignerProfileProjectCarousel
                  arrayOfImages={designerProject}
                />
              </div>
            </div>
          )}
          <Header />

          <section>
            <div>
              <div
                className="profileImagesAndInfo"
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={profileBackground}
                    alt="..."
                    style={{ margin: "auto", width: "100%" }}
                  />
                  <div
                    className="shareLikesHeart"
                    style={{
                      position: "absolute",
                      bottom: "-30px",
                      right: "15px",
                    }}
                  >
                    <div className="d-flex justify-content-end">
                      <img src={shareBtn} alt="..." />
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <span
                        className="d-flex align-items-center mx-3"
                        style={{
                          border: "0.2px solid #7F8790",
                          borderRadius: "12px",
                        }}
                      >
                        <img className="mx-1" src={blueHeart} alt="" />
                        <p
                          className="me-1"
                          style={{
                            fontWeight: "500",
                            lineHeight: "9.4px",
                            fontFamily: "Public Sans",
                            color: "#888888",
                            fontSize: "8px",
                          }}
                        >
                          {profileLiked ? 0 : 1}
                        </p>
                      </span>
                      {}
                      {profileLiked && (
                        <img
                          src={blankHeart}
                          alt=""
                          onClick={() => {
                            setProfileLiked(!profileLiked);
                            setAlert(true);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                      {!profileLiked && (
                        <img
                          src={fullHeart}
                          alt=""
                          onClick={() => {
                            setProfileLiked(!profileLiked);
                            setAlert(false);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                      {alert && (
                        <Alert
                          key={"light"}
                          variant={"light"}
                          style={{
                            height: "3rem",
                            position: "fixed",
                            width: "50%",
                            top: "40%",
                            zIndex: "12",
                            left: "25%",
                            border: "1px solid",
                          }}
                        >
                          <img className="me-2" src={fullHeart} alt="" />
                          This has been wishlisted
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="profilePictureAndInfoBox d-flex flex-column justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    top: "60%",
                    left: "33%",
                    width: "35%",
                  }}
                >
                  <img
                    src={
                      userData["imageUrl"]["thumbnail"] !== ""
                        ? userData["imageUrl"]["thumbnail"]
                        : profilePicture
                    }
                    style={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "5rem",
                      objectFit: "cover",
                    }}
                  />
                  {/* <img src={profilePicture} alt="profile-picture" /> */}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "21.86px",
                      fontFamily: "Manrope",
                      textAlign: "center",
                    }}
                  >
                    {Company ? Company : "ABC Design Firm"}
                  </span>
                  <span
                    style={{
                      fontFamily: "Public Sans",
                      fontWeight: "400",
                      color: "#7F8790",
                      fontSize: "12px",
                      lineHeight: "14.1px",
                    }}
                  >
                    {designerProfile
                      ? designerProfile["city"]
                      : "Saket,New Delhi"}
                  </span>
                  <span
                    className="d-flex align-items-center mt-2"
                    style={{
                      background: "rgba(0,0,0,0.05)",
                      borderRadius: "5px",
                      // border: "2px solid red",
                      top: "10px",
                    }}
                  >
                    <img className="mx-1" src={profilePageReviewStar} alt="" />
                    <p
                      className="mx-1"
                      style={{
                        color: "#174E86",
                        fontWeight: "500",
                        fontSize: "10px",
                        fontFamily: "Inter",
                      }}
                    >
                      4.3
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="container" style={{ marginTop: "34%" }}>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column mx-4 align-items-center">
                <img src={experienceProfilePage} alt="" />
                <span
                  className="mt-2"
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#7F8790",
                  }}
                >
                  Experience
                </span>
                <span
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#121212",
                  }}
                >
                  {designerProfile ? designerProfile["workExperience"] : "3"}{" "}
                  Years
                </span>
              </div>
              {Name === "designer" && (
                <div className="d-flex flex-column mx-4 align-items-center">
                  <img src={designFeeProfilePage} alt="" />
                  <span
                    className="mt-2"
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#7F8790",
                    }}
                  >
                    Design fee
                  </span>
                  <span
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "400",
                      fontSize: "12px",
                      color: "#121212",
                    }}
                  >
                    ₹
                    {designerProfile && designerProfile["fees"]
                      ? designerProfile["fees"]["designRoomPrice"]
                      : "5000"}
                    /room
                  </span>
                </div>
              )}
              <div className="d-flex flex-column mx-4 align-items-center">
                <img src={projectsProfilePage} alt="" />
                <span
                  className="mt-2"
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#7F8790",
                  }}
                >
                  Projects
                </span>
                <span
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#121212",
                  }}
                >
                  {totalProjectsByDesigner}
                </span>
              </div>
            </div>
            {Name === "designer" && (
              <div className="d-flex mt-4 justify-content-center">
                <span
                  className="mx-2 py-1 px-2"
                  style={{
                    border: "0.2px solid rgba(127, 135, 144, 0.5)",
                    fontWeight: "400",
                    lineHeight: "13.66px",
                    fontFamily: "Manrope",
                    borderRadius: "7px",
                  }}
                >
                  Bohemian
                </span>
                <span
                  className="mx-2 py-1 px-2"
                  style={{
                    border: "0.2px solid rgba(127, 135, 144, 0.5)",
                    fontWeight: "400",
                    lineHeight: "13.66px",
                    fontFamily: "Manrope",
                    borderRadius: "7px",
                  }}
                >
                  Modern
                </span>
                <span
                  className="mx-2 py-1 px-2"
                  style={{
                    border: "0.2px solid rgba(127, 135, 144, 0.5)",
                    fontWeight: "400",
                    lineHeight: "13.66px",
                    fontFamily: "Manrope",
                    borderRadius: "7px",
                  }}
                >
                  Traditional
                </span>
              </div>
            )}
            {Name === "contractor" && (
              <div className="mb-4">
                <div
                  className="my-4"
                  style={{
                    width: "95%",
                    borderBottom: "0.0625rem solid rgba(127, 135, 144, 0.2)",
                  }}
                />
                <div className="d-flex mt-4 justify-content-center flex-column ms-5">
                  <div
                    className="mb-2 d-flex justify-content-between align-items-center"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        lineHeight: "1.195rem",
                      }}
                    >
                      Provided Services
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        lineHeight: "1.024375rem",
                      }}
                    >
                      Rate per sqft
                    </div>
                  </div>
                  <div
                    className="my-2 d-flex justify-content-between"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      <img className="me-2" src={falseCeiling} alt="..." />
                      POP False Ceiling
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      ₹ 1,000
                    </div>
                  </div>
                  <div
                    className="my-2 d-flex justify-content-between"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      {" "}
                      <img className="me-2" src={tiles} alt="..." />
                      Tiles
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      ₹ 1,000
                    </div>
                  </div>
                  <div
                    className="my-2 d-flex justify-content-between"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      {" "}
                      <img className="me-2" src={putty} alt="..." />
                      Putty
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      ₹ 1,000
                    </div>
                  </div>
                  <div
                    className="my-2 d-flex justify-content-between"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      {" "}
                      <img className="me-2" src={wardrobes} alt="..." />
                      Wardrobe
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      ₹ 1,000
                    </div>
                  </div>
                  <div
                    className="my-2 d-flex justify-content-between"
                    style={{ width: "80%" }}
                  >
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      {" "}
                      <img className="me-2" src={kitchen} alt="..." />
                      Kitchen
                    </div>
                    <div
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        lineHeight: "0.88125rem",
                        color: "#7F8790",
                      }}
                    >
                      ₹ 1,000
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4 mx-2">
              <div className="d-flex justify-content-evenly">
                {
                  <div
                    style={{
                      position:
                        componentsToRender === "projects" ? "relative" : "",
                      top: componentsToRender === "projects" ? "12px" : "",
                      cursor: "pointer",
                    }}
                    onClick={
                      () => setComponentToRender("projects")

                      // (window.location.href = "/findprofessionals2")
                    }
                  >
                    <p
                      className={
                        componentsToRender === "projects"
                          ? "titleSelectedTab"
                          : "navTextMob"
                      }
                    >
                      Projects
                    </p>
                  </div>
                }
                {
                  <div
                    style={{
                      position:
                        componentsToRender === "posts" ? "relative" : "",
                      top: componentsToRender === "posts" ? "12px" : "",
                      cursor: "pointer",
                    }}
                    onClick={
                      () => setComponentToRender("posts")
                      // (window.location.href = "/findprofessionals2/contractor2")
                    }
                  >
                    <p
                      className={
                        componentsToRender === "posts"
                          ? "titleSelectedTab"
                          : "navTextMob"
                      }
                    >
                      Posts
                    </p>
                  </div>
                }
                {
                  <div
                    style={{
                      position:
                        componentsToRender === "about" ? "relative" : "",
                      top: componentsToRender === "about" ? "12px" : "",
                      cursor: "pointer",
                    }}
                    onClick={
                      () => setComponentToRender("about")

                      // (window.location.href = "/findprofessionals/oem")
                    }
                  >
                    <p
                      className={
                        componentsToRender === "about"
                          ? "titleSelectedTab"
                          : "navTextMob"
                      }
                    >
                      About
                    </p>
                  </div>
                }
              </div>
              <hr style={{ position: "relative", bottom: "16px" }} />
              <div className="tabContents">
                {componentsToRender === "projects" && (
                  <div className="d-flex justify-content-center">
                    <div
                      className=""
                      style={{ width: "110%", cursor: "pointer" }}
                      onClick={() => {
                        setProjectCarouselOpen(true);
                      }}
                    >
                      <DesignerProfileProjectCarousel
                        arrayOfImages={designerProject}
                      />
                      <div
                        className="mt-2 ms-2"
                        style={{
                          color: "#7F8790",
                          fontFamily: "Public Sans",
                          fontSize: "0.875rem",
                          lineHeight: "1rem",
                          fontWeight: "400",
                        }}
                      >
                        {designerProject.length > 0 &&
                          designerProject[0]["name"]}
                      </div>
                      <div
                        className="my-1 ms-2"
                        style={{
                          color: "#7F8790",
                          fontFamily: "Public Sans",
                          fontSize: "0.75rem",
                          lineHeight: "1rem",
                          fontWeight: "400",
                        }}
                      >
                        {designerProject.length > 0 &&
                          designerProject[0]["address"]}
                      </div>
                    </div>
                  </div>
                )}
                {componentsToRender === "posts" && (
                  <div>
                    <DesignerPosts />
                  </div>
                )}
                {componentsToRender === "about" && (
                  <div>
                    <div
                      style={{
                        fontFamily: "Public Sans",
                        fontWeight: "300",
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#383F45",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        fontFamily: "Public Sans",
                        fontWeight: "300",
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#383F45",
                      }}
                    >
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      >
                        Awards
                      </div>
                      IHR Award for Highly Recommended Interior Designer in
                      Bangalore 2021 Golden Aim Super Achiever Award in Interior
                      Designing 2021 Jury Member in ACE Tech, Bangalore Best Of
                      Houzz 2021 SERVICE Best Of Houzz 2019 SERVICE Best Of
                      Houzz 2018 SERVICE
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        fontFamily: "Public Sans",
                        fontWeight: "300",
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        color: "#383F45",
                      }}
                    >
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                          lineHeight: "1rem",
                        }}
                      >
                        Service Provided
                      </div>
                      Custom Cabinets, Custom Entertainment Centers, Custom
                      Furniture, Custom Home Bars, Custom Kitchen Cabinets,
                      Custom Shelving, Custom Walk-in Wardrobes, Dining Room
                      Design, Furniture Selection, Home Gym Design &
                      Construction, Home Theater Design,
                    </div>
                    <div
                      className="mt-4"
                      style={{
                        fontFamily: "Public Sans",
                        fontWeight: "300",
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        color: "#383F45",
                      }}
                    >
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                          lineHeight: "1rem",
                        }}
                      >
                        Areas Served
                      </div>
                      Bangalore Urban, PAN India
                    </div>
                  </div>
                )}

                <div
                  className="my-4"
                  style={{
                    width: "100%",
                    borderBottom: "0.0625rem solid rgba(127, 135, 144, 0.2)",
                  }}
                />
                <section>
                  <div className=" ">
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: "300",
                        fontSize: "16px",
                        lineHeight: "21.86px",
                      }}
                    >
                      <p>User Reviews ({review.count ? review.count : "17"})</p>
                    </div>
                    <div className="">
                      <div className="review-by-others">
                        <div className="container p-2 ">
                          <div className="">
                            {/*CHANGE FLEX COLUMN TO ROW */}
                            <div className="d-flex justify-content-evenly">
                              <div className=" d-flex flex-column justify-content-center align-content-center justify-items-center">
                                <div>
                                  <p
                                    style={{
                                      fontSize: "2rem",
                                      fontFamily: "Public Sans",
                                      fontWeight: "500",
                                      lineHeight: "37.6px",
                                    }}
                                  >
                                    3.8
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      fontSize: "0.75rem",
                                      fontFamily: "Public Sans",
                                      fontWeight: "500",
                                      lineHeight: "14.1px",
                                    }}
                                  >
                                    out of 5
                                  </p>
                                </div>
                              </div>
                              <div
                                className="reviewProgressBars"
                                style={{ width: "66%" }}
                                id="profilePage"
                              >
                                <span className="d-flex align-items-center">
                                  <p className="px-3">5</p>
                                  <p style={{ width: "100%" }}>
                                    <ProgressBar
                                      className="my-1 progressgreen"
                                      now={50}
                                    />
                                  </p>
                                  <p className="px-3">67</p>
                                </span>
                                <span className="d-flex align-items-center">
                                  <p className="px-3">4</p>
                                  <p style={{ width: "100%" }}>
                                    <ProgressBar
                                      className="my-2 progressneon"
                                      now={70}
                                    />
                                  </p>
                                  <p className="px-3">98</p>
                                </span>
                                <span className="d-flex align-items-center">
                                  <p className="px-3">3</p>
                                  <p style={{ width: "100%" }}>
                                    <ProgressBar
                                      className="my-2 progressyellow"
                                      now={55}
                                    />
                                  </p>
                                  <p className="px-3">73</p>
                                </span>
                                <span className="d-flex align-items-center">
                                  <p className="px-3">2</p>
                                  <p style={{ width: "100%" }}>
                                    <ProgressBar
                                      className="my-2 progressorange"
                                      now={60}
                                    />
                                  </p>
                                  <p className="px-3">84</p>
                                </span>
                                <span className="d-flex align-items-center">
                                  <p className="px-3">1</p>
                                  <p style={{ width: "100%" }}>
                                    <ProgressBar
                                      className="my-2 progressred"
                                      now={40}
                                    />
                                  </p>
                                  <p className="px-3">45</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-4">
                  <div className="">
                    <div className="review-by-others">
                      <div className="">
                        <div
                          className="mt-3 g-0 "
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="d-flex justify-content-center text-white para-p "
                            style={{ backgroundColor: "#174E86" }}
                          >
                            P
                          </div>
                          <div
                            className="d-inline ms-3"
                            style={{ width: "auto" }}
                          >
                            <b
                              style={{
                                fontFamily: "Manrope",
                                fontWeight: "500",
                                fontSize: "0.875rem",
                                lineHeight: "1.195rem",
                              }}
                            >
                              Parismita Raval &nbsp;
                              <div
                                class="badge badge-pill"
                                style={{
                                  width: "auto",
                                  backgroundColor: "rgba(73, 183, 207, 0.13)",
                                  color: "#49B7CF",
                                  borderRadius: "0.8125rem",
                                  fontSize: "0.625rem",
                                  lineHeight: "0.625rem",
                                }}
                              >
                                <span>4 &nbsp;</span>
                                <svg
                                  className="mb-1"
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.96839 1.62284C6.75964 1.26309 6.24012 1.26309 6.03137 1.62284L4.56126 4.15638C4.45814 4.33409 4.27991 4.45537 4.07675 4.48605L1.32166 4.90217C0.858926 4.97207 0.69661 5.55631 1.05698 5.85488L3.10941 7.55529C3.29939 7.71269 3.38873 7.96097 3.34257 8.20333L2.80569 11.0228C2.72082 11.4685 3.18871 11.8148 3.59016 11.6034L6.18442 10.2374C6.38188 10.1334 6.61788 10.1334 6.81534 10.2374L9.4096 11.6034C9.81105 11.8148 10.2789 11.4685 10.1941 11.0228L9.65719 8.20333C9.61104 7.96097 9.70037 7.71269 9.89035 7.55529L11.9428 5.85488C12.3031 5.55631 12.1408 4.97207 11.6781 4.90217L8.92301 4.48605C8.71985 4.45537 8.54162 4.33409 8.4385 4.15638L6.96839 1.62284Z"
                                    fill="#49B7CF"
                                  />
                                </svg>
                              </div>
                              {/* Reliable And Dependable Firm */}
                            </b>
                            <p
                              style={{
                                fontFamily: "Public Sans",
                                fontWeight: "400",
                                fontSize: "0.625rem",
                                lineHeight: "0.734375rem",
                                color: "#888888",
                              }}
                            >
                              Designer{" "}
                              <svg
                                width="4"
                                height="4"
                                viewBox="0 0 4 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                              </svg>
                              &nbsp; 01-02-2022
                              {/* Review given by Parismita - Client */}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mt-3"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            color: "#888888",
                          }}
                        >
                          We engaged Forefront after interviewing quite a few
                          interior designers as we were not sure at the time how
                          the renovation for our new 5 room BTO flat should be
                          done Lorem..... Read More
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-4">
                  <div className="">
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: "500",
                        fontSize: "1rem",
                        lineHeight: "1.36625rem",
                      }}
                    >
                      <p>Give your Review</p>
                      <p
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: "300",
                          fontSize: "0.625rem",
                          lineHeight: "1rem",
                          color: "#8B8A8A",
                        }}
                      >
                        Tell others what you think
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <ReactStars {...ratingSettings} />
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between"
                    style={{
                      color: "#49B7CF",
                      fontFamily: "Manrope",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      lineHeight: "1.1875",
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setWriteAReviewTextArea(true);
                      }}
                    >
                      Write a review
                    </div>
                    {writeAReviewTextArea && (
                      <div>
                        <FontAwesomeIcon
                          icon={faClose}
                          size="sm"
                          color={"#8B8A8A"}
                          className="fs-5 ms-5"
                          onClick={() => {
                            setWriteAReviewTextArea(false);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </div>
                  {writeAReviewTextArea && (
                    <div>
                      <div class="form-group">
                        <textarea
                          className="form-control mt-3"
                          id="exampleFormControlTextarea1"
                          rows="1"
                          placeholder="Write your review here"
                          ref={reviewTextAreaRef}
                          onChange={textAreaWordCountHandler}
                          maxLength={200}
                          style={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            fontWeight: "400",
                            fontFamily: "Manrope",
                          }}
                        ></textarea>
                        <div
                          className="mt-1"
                          style={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            fontWeight: "400",
                            fontFamily: "Manrope",
                            color: "#a7a7a7",
                            textAlign: "right",
                          }}
                        >
                          {wordCount}/200
                        </div>
                      </div>
                      <button
                        className="mt-3"
                        style={{
                          height: "2.625rem",
                          width: "100%",
                          background: "#49B7CF",
                          color: "white",
                          fontFamily: "Manrope",
                          fontWeight: "400",
                          fontSize: "0.875rem",
                          lineHeight: "1.195rem",
                          border: "none",
                          borderRadius: "0.3125rem",
                        }}
                        onClick={()=>{setCommentAlert(true)}}
                      >
                        Submit
                      </button>
                      {commentAlert && (
                        <Alert
                          key={"light"}
                          variant={"light"}
                          style={{
                            height: "3rem",
                            position: "fixed",
                            width: "50%",
                            top: "40%",
                            zIndex: "12",
                            left: "25%",
                            border: "1px solid",
                          }}
                        >
                          Comment posted!
                        </Alert>
                      )}
                    </div>
                  )}
                </section>
                <section>
                  <div className="">
                    <div
                      className="mt-4"
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: "600",
                        fontSize: "1rem",
                        lineHeight: "1.36625rem",
                      }}
                    >
                      <p>Other designers we think you you'd love</p>
                    </div>
                  </div>

                  <div className="my-5">
                    <Carousel responsive={responsive}>
                      <div
                        className="p-2 mx-2 d-flex flex-column align-items-center justify-items-center"
                        style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="my-3">
                          <img src={otherDesignerProfilePic} alt="..." />
                        </div>
                        <div
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "500",
                            fontSize: "0.875rem",
                            lineHeight: "1.195rem",
                          }}
                        >
                          Veena Malik
                        </div>
                        <div
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "0.88125rem",
                            color: "#7F8790",
                          }}
                        >
                          Designer
                        </div>
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                          <img
                            className="mx-1"
                            src={briefCaseDesigner}
                            alt="..."
                          />
                          <div
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: "400",
                              fontSize: "0.75rem",
                              lineHeight: "0.88125rem",
                              color: "#7F8790",
                            }}
                          >
                            3 yrs
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-2 mx-2 d-flex flex-column align-items-center justify-items-center"
                        style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="my-3">
                          <img src={otherDesignerProfilePic} alt="..." />
                        </div>
                        <div
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "500",
                            fontSize: "0.875rem",
                            lineHeight: "1.195rem",
                          }}
                        >
                          Veena Malik
                        </div>
                        <div
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "0.88125rem",
                            color: "#7F8790",
                          }}
                        >
                          Designer
                        </div>
                        <div className=" mt-2 d-flex align-items-center justify-content-center">
                          <img
                            className="mx-1"
                            src={briefCaseDesigner}
                            alt="..."
                          />
                          <div
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: "400",
                              fontSize: "0.75rem",
                              lineHeight: "0.88125rem",
                              color: "#7F8790",
                            }}
                          >
                            3 yrs
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-2 mx-2 d-flex flex-column align-items-center justify-items-center"
                        style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="my-3">
                          <img src={otherDesignerProfilePic} alt="..." />
                        </div>
                        <div
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "500",
                            fontSize: "0.875rem",
                            lineHeight: "1.195rem",
                          }}
                        >
                          Veena Malik
                        </div>
                        <div
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "0.88125rem",
                            color: "#7F8790",
                          }}
                        >
                          Designer
                        </div>
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                          <img
                            className="mx-1"
                            src={briefCaseDesigner}
                            alt="..."
                          />
                          <div
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: "400",
                              fontSize: "0.75rem",
                              lineHeight: "0.88125rem",
                              color: "#7F8790",
                            }}
                          >
                            3 yrs
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-2 mx-2 d-flex flex-column align-items-center justify-items-center"
                        style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="my-3">
                          <img src={otherDesignerProfilePic} alt="..." />
                        </div>
                        <div
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: "500",
                            fontSize: "0.875rem",
                            lineHeight: "1.195rem",
                          }}
                        >
                          Veena Malik
                        </div>
                        <div
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "0.88125rem",
                            color: "#7F8790",
                          }}
                        >
                          Designer
                        </div>
                        <div className="mt-2 d-flex align-items-center justify-content-center">
                          <img
                            className="mx-1"
                            src={briefCaseDesigner}
                            alt="..."
                          />
                          <div
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: "400",
                              fontSize: "0.75rem",
                              lineHeight: "0.88125rem",
                              color: "#7F8790",
                            }}
                          >
                            3 yrs
                          </div>
                        </div>
                      </div>
                    </Carousel>
                  </div>
                </section>
              </div>
            </div>
          </section>

          <Footer2 />
          <div
            className="contactBtns d-flex"
            style={{
              height: "3rem",
              position: "fixed",
              width: "100%",
              bottom: "0",
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ background: "#174E86", width: "50%", cursor: "pointer" }}
            >
              <img className="me-2" src={whiteCallButton} alt="" />
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  lineHeight: "1.1875rem",
                  color: "white",
                }}
              >
                Call Designer
              </p>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ background: "#49B7CF", width: "50%", cursor: "pointer" }}
            >
              <img className="me-2" src={whiteWhatsapp} alt="" />
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  lineHeight: "1.1875rem",
                  color: "white",
                }}
              >
                Whatsapp
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DesignerProfile;
