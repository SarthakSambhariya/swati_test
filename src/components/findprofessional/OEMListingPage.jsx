import React, { useState, useEffect } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Footer from "../common/footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PricingTabs1 from "./PricingTabs1";
import one from "../home/images/21-pea-green-sofa-industrial-living-space.jpg";
import two from "../home/images/cdn.cliqueinc.com__cache__posts__252735__scandinavian-interior-design-ideas-252735-1521558937549-main.700x0c-7c09a944a8d64989a7ab39ba1aabe7a3.jpg";
import three from "../home/images/curtain.png";
import four from "../home/images/kara-eads-L7EwHkq1B2s-unsplash.jpg";
import {
  faHeart,
  faShare,
  faCheck,
  faLocation,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import tick from "../findprofessional/images/tick.png";
import share from "../findprofessional/images/share.png";
import like from "../findprofessional/images/like.png";
import location from "../findprofessional/images/location.png";
import { Card, ProgressBar, Spinner } from "react-bootstrap";
import authService from "../../services/authService";
import userservice from "../../services/userservice";
import noimage from "../home/images/noimage.png";
import b2bservice from "../../services/b2bservice";
import heartO from "../home/images/heart-o.png";
import designerservice from "../../services/designerservice";
import main from "../../mobile/css/main.css";
import { ToastContainer, toast } from "react-toastify";
// import OEMListing from "../components/findprofessional/oemListing";
import OemListingForListingDetailPage from "./oemListingForListingDetailPage";
import CallButton from "../common/buttons/callbutton";
import reviewservice from "../../services/reviewservice";
import Share from "../common/buttons/share";
import WhatsApp from "../common/buttons/whatsapp";
import MobileSlider from "../designer-profile/mobileslider";
import noProject from "../common/noimage/noProject.png";
import AllProjectsModal from "../exploreprojects/allprojectsmodal";
import ReactStars from "react-rating-stars-component";
import "./OEMListingPage.css";
const OEMListingPage = ({ name, match, location }) => {
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
  const [showCommentTextArea, setShowCommentTextArea] = useState(false);

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
  const Company = match.params["company"];

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

  const submitReviewHandler = () => {
    const textAreaEl = document.getElementById("exampleFormControlTextarea1");

    //  REVIEW SUBMITTED BY USER IN THE FORM REQUIRES CHECKING FOR VALID REVIEW ie isn't empty.
    console.log(textAreaEl.value);
  };
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
                OEM
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a href="/findprofessionals/oem" className="bred">
                  OEM Listing
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="" style={{ textTransform: "capitalize" }}>
                  {Company ? Company : "Woodmac"}
                </a>
              </li>
              <li></li>
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
                  <OemListingForListingDetailPage
                    name=""
                    style={{
                      border: "2px solid red",
                      display: "block",
                      height: "40em",
                    }}
                  />
                  <div className="row">
                    <div className="row justify-content-between">
                      <div className="col-8">
                        <div className=" mb-3">
                          <div className="row g-0"></div>
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

                  <div className="projects mt-5">
                    <div>
                      <PricingTabs1 />
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
                <div
                  className="col-lg-4 ms-5"
                  style={{ transform: "translatey(-4.3em)" }}
                >
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
                            <p
                              class="mx-2"
                              style={{ fontSize: "1.5em", fontWeight: "500" }}
                            >
                              {name ? (
                                name
                              ) : (
                                <td>
                                  Woodmac &nbsp;
                                  <img src={tick} alt="" />
                                </td>
                              )}
                            </p>

                            {}

                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-geo-alt-fill mx-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                              </svg>
                              {"New Delhi"}{" "}
                            </span>
                            <span>
                              <b>{nextDesigner["workExperience"]} </b>
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="card-text">
                        <div class="my-3">Services offered</div>

                        <span className="social-icon ">
                          <button
                            type="button"
                            class="mx-2 btn "
                            style={{
                              backgroundColor: "#EBECFF",
                              color: "#3B5998",
                            }}
                          >
                            Wardrobe
                          </button>
                          <button
                            type="button"
                            class=" mx-2 btn "
                            style={{
                              backgroundColor: "#EBECFF",
                              color: "#3B5998",
                            }}
                          >
                            Kitchen
                          </button>
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
              <OemListingForListingDetailPage />
              <div>
                <PricingTabs1 />
              </div>
              {/* {designerProject.length > 0 ? (
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
              )} */}

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
            <p className="mt-4 fs-4 mx-4 my-4">Images</p>
            {/* <div className="container mx-3 my-4">
              <div class="row">
                <div class="col">
                  <img
                    src={one}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={two}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={three}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={four}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div class="row my-5">
                <div class="col">
                  <img
                    src={one}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={two}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={three}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div class="col">
                  <img
                    src={four}
                    style={{
                      display: "block",
                      maxWidth: "460px",
                      maxHeight: "190px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div> */}
            <div class="lightbox-gallery">
              <div className="container">
                <div class="row photos">
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={one} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={four} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={one} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={four} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={one} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={four} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={one} />
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 item">
                    <img class="img-fluid" src={four} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* mobilereview */}
          <section>
            <div className=" container mobilereview">
              <p className="revieseve fs-4 mx-3">
                <b>User Reviews</b>
              </p>
              <div className="">
                <div className="review-by-others mt-40 p-2">
                  <div className="container mt-40 p-2 ">
                    <Card className="">
                      {/*CHANGE FLEX COLUMN TO ROW */}
                      <div className="d-flex justify-content-around">
                        <div className="averageReviewHeading d-flex flex-column justify-content-center align-content-center justify-items-center">
                          <div>
                            <b style={{ fontSize: "5em" }}>3.8</b>
                          </div>
                          <div>
                            <b style={{ fontSize: "2em" }}>out of 5</b>
                          </div>
                        </div>
                        <div
                          className="reviewProgressBars my-4"
                          style={{ width: "66%" }}
                        >
                          <span className="d-flex align-items-center">
                            <p className="px-3">5</p>
                            <p style={{ width: "100%" }}>
                              <ProgressBar
                                className="my-1 progressgreen"
                                now={40}
                              />
                            </p>
                            <p className="px-3">98</p>
                          </span>
                          <span className="d-flex align-items-center">
                            <p className="px-3">4</p>
                            <p style={{ width: "100%" }}>
                              <ProgressBar
                                className="my-2 progressneon"
                                now={60}
                              />
                            </p>
                            <p className="px-3">73</p>
                          </span>
                          <span className="d-flex align-items-center">
                            <p className="px-3">3</p>
                            <p style={{ width: "100%" }}>
                              <ProgressBar
                                className="my-2 progressyellow"
                                now={50}
                              />
                            </p>
                            <p className="px-3">84</p>
                          </span>
                          <span className="d-flex align-items-center">
                            <p className="px-3">2</p>
                            <p style={{ width: "100%" }}>
                              <ProgressBar
                                className="my-2 progressorange"
                                now={55}
                              />
                            </p>
                            <p className="px-3">45</p>
                          </span>
                          <span className="d-flex align-items-center">
                            <p className="px-3">1</p>
                            <p style={{ width: "100%" }}>
                              <ProgressBar
                                className="my-2 progressred"
                                now={30}
                              />
                            </p>
                            <p className="px-3">67</p>
                          </span>
                          
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

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
          </section>
          <section>
            <div className=" container mobilereview">
              {
                <>
                  <p className="revieseve fs-4 mx-3">
                    <b>Reviews</b> ({review.count})
                    <hr />
                  </p>

                  <div className="">
                    <div className="review-by-others mt-40 p-2">
                      <div className="container">
                        <div
                          className="mt-3 g-0 "
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="d-inline text-white para-p"
                            style={{ backgroundColor: "#139F32" }}
                          >
                            P
                          </div>
                          <div
                            className="d-inline ms-3"
                            style={{ width: "auto" }}
                          >
                            <b>
                              Parismita Raval &nbsp;
                              <span
                                class="badge badge-pill"
                                style={{
                                  width: "auto",
                                  backgroundColor: "rgba(22, 172, 109, 0.1)",
                                  color: "#16AC6D",
                                  borderRadius: "10px",
                                }}
                              >
                                4 &nbsp;{" "}
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.96839 1.62284C6.75964 1.26309 6.24012 1.26309 6.03137 1.62284L4.56126 4.15638C4.45814 4.33409 4.27991 4.45537 4.07675 4.48605L1.32166 4.90217C0.858926 4.97207 0.69661 5.55631 1.05698 5.85488L3.10941 7.55529C3.29939 7.71269 3.38873 7.96097 3.34257 8.20333L2.80569 11.0228C2.72082 11.4685 3.18871 11.8148 3.59016 11.6034L6.18442 10.2374C6.38188 10.1334 6.61788 10.1334 6.81534 10.2374L9.4096 11.6034C9.81105 11.8148 10.2789 11.4685 10.1941 11.0228L9.65719 8.20333C9.61104 7.96097 9.70037 7.71269 9.89035 7.55529L11.9428 5.85488C12.3031 5.55631 12.1408 4.97207 11.6781 4.90217L8.92301 4.48605C8.71985 4.45537 8.54162 4.33409 8.4385 4.15638L6.96839 1.62284Z"
                                    fill="#16AC6D"
                                  />
                                </svg>
                              </span>
                              {/* Reliable And Dependable Firm */}
                            </b>
                            <p className="">
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
                        <p className="mt-3 mx-5">
                          We engaged Forefront after interviewing quite a few
                          interior designers as we were not sure at the time how
                          the renovation for our new 5 room BTO flat should be
                          done Lorem..... Read More
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="review-by-others mt-40 p-2">
                      <div className="container">
                        <div
                          className="mt-3 g-0 "
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="d-inline text-white para-p"
                            style={{ backgroundColor: "#9F6713" }}
                          >
                            R
                          </div>
                          <div
                            className="d-inline ms-3"
                            style={{ width: "auto" }}
                          >
                            <b>
                              Rohit Khokar &nbsp;
                              <span
                                class="badge badge-pill"
                                style={{
                                  width: "auto",
                                  backgroundColor: "rgba(22, 172, 109, 0.1)",
                                  color: "#16AC6D",
                                  borderRadius: "10px",
                                }}
                              >
                                5 &nbsp;{" "}
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.96839 1.62284C6.75964 1.26309 6.24012 1.26309 6.03137 1.62284L4.56126 4.15638C4.45814 4.33409 4.27991 4.45537 4.07675 4.48605L1.32166 4.90217C0.858926 4.97207 0.69661 5.55631 1.05698 5.85488L3.10941 7.55529C3.29939 7.71269 3.38873 7.96097 3.34257 8.20333L2.80569 11.0228C2.72082 11.4685 3.18871 11.8148 3.59016 11.6034L6.18442 10.2374C6.38188 10.1334 6.61788 10.1334 6.81534 10.2374L9.4096 11.6034C9.81105 11.8148 10.2789 11.4685 10.1941 11.0228L9.65719 8.20333C9.61104 7.96097 9.70037 7.71269 9.89035 7.55529L11.9428 5.85488C12.3031 5.55631 12.1408 4.97207 11.6781 4.90217L8.92301 4.48605C8.71985 4.45537 8.54162 4.33409 8.4385 4.15638L6.96839 1.62284Z"
                                    fill="#16AC6D"
                                  />
                                </svg>
                              </span>
                              {/* Reliable And Dependable Firm */}
                            </b>
                            <p className="">
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
                        <p className="mt-3 mx-5">
                          We engaged Forefront after interviewing quite a few
                          interior designers as we were not sure at the time how
                          the renovation for our new 5 room BTO flat should be
                          done Lorem..... Read More
                        </p>
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
              }

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
          </section>
          <section className="container displayn">
            <span className="d-flex align-items-center  mx-3 justify-content-between">
              <p className="mt-4 fs-4">Give your Reviews</p>
              <span className="mt-4 fs-4 me-4">
                <ReactStars
                  count={5}
                  // onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </span>
            </span>
            <div className="writeAReviewLayout container px-3 py-4">
              <div class="form-group lg">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  cols="100"
                  placeholder="Write your review here..."
                  style={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                ></textarea>
                <button
                  type="button"
                  class="btn btn-success my-4 float-left"
                  style={{ background: "#2CBF81", border: "none" }}
                  onClick={() => {
                    submitReviewHandler();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
          {/* <section className="container displayn">
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
          </section> */}

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

export default OEMListingPage;
