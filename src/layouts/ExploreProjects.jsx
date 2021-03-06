import { faL, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { faFilter, faClose } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import "../components/exploreprojects/css/explore.css";
import ProjectsCards from "../components/exploreprojects/projectcards";
import constants from "../services/constants";
import homeservice from "../services/homeservice";
import searchIcon from "../components/findprofessional/images/searchIcon.svg";
import blueCard from "../components/findprofessional/images/blueCard.svg";
import shareBtn from "../components/findprofessional/images/shareButtonOnProfile.svg";
import heartLikeBtn from "../components/findprofessional/images/heartLikeBtn.svg";
import getStartedArrows from "../components/findprofessional/images/getStartedArrows.svg";
import { Form, CloseButton } from "react-bootstrap";
import noimage from "../components/home/images/noimage.png";
import filter from "../components/exploreprojects/images/filter.png";
import photo from "../components/exploreprojects/images/photo.png";
import photowhite from "../components/exploreprojects/images/photowhite.png";
import project from "../components/exploreprojects/images/project.png";
import projectwhite from "../components/exploreprojects/images/projectwhite.png";
import reco from "../components/findprofessional/images/reco.png";
import b2bservice from "../services/b2bservice";
import Filter from "../components/exploreprojects/filter";
import authService from "../services/authService";
import FilterModal from "../components/exploreprojects/filtermodal";
import Pagination from "../components/common/pagination";
import Footer2 from "../components/common/footer2";

function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const ExploreProjects = ({ location }) => {
  const [searchValue, setSearchValue] = useState("");
  const [projectsIconShow, setprojectsIconShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostViewed, setMostViewed] = useState(false);
  const [mostLiked, setMostLiked] = useState(false);
  const [user, setUser] = useState(false);
  const [cityshow, setCityShow] = useState(false);
  const [citytarget, setCityTarget] = useState(null);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  const [feeshow, setFeeShow] = useState(false);
  const [feetarget, setFeeTarget] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFieldVisibility, setSearchFieldVisibility] = useState(false);

  const [professionshow, setprofessionShow] = useState(false);
  const [professiontarget, setprofessionTarget] = useState(null);
  const [page, setPage] = useState(1);
  const [applyFilter, setAppliedFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [componentsToRender, setComponentsToRender] = useState("Projects");

  const getInit = async () => {
    setLoading(true);
    let pageNo = 1;
    try {
      pageNo = location.search.split("?")[1].split("=")[1];
      setPage(parseInt(pageNo));
    } catch (error) {}
    const skip = parseInt(pageNo - 1) * 5;
    let params = "";
    // console.log(params);
    if (skip) {
      params += `&skip=${skip}`;
    }
    const projects = await b2bservice.getlistProjectsFilter2(params);
    setPageCount(projects["count"]);
    setProjects(projects["data"]);

    setLoading(false);
  };

  useEffect(() => {
    getInit();
    const token = authService.getToken();
    token ? setUser(true) : setUser(false);
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cityPopover = (event) => {
    setCityShow(!cityshow);
    setCityTarget(event.target);
    setFeeShow(false);
    setprofessionShow(false);
  };

  const feePopover = (event) => {
    setFeeShow(!feeshow);
    setFeeTarget(event.target);
    setCityShow(false);
    setprofessionShow(false);
  };

  const professionPopover = (event) => {
    setprofessionShow(!professionshow);
    setprofessionTarget(event.target);
    setFeeShow(false);
    setCityShow(false);
  };

  // const onPageChange = (pageNo) => {
  //   setPage(pageNo);
  // };

  const cityInit = [
    {
      name: "Delhi",
      value: "delhi",
    },
    {
      name: "Gurugram",
      value: "gurugram",
    },
    {
      name: "Chandigard",
      value: "chandigard",
    },
    {
      name: "Noida",
      value: "noida",
    },
  ];

  const handleSearch = async () => {
    setLoading(true);
    const params = `&search=${searchValue}`;
    const searchprojects = await b2bservice.getlistProjectsFilter(params);
    setProjects(searchprojects);
    setLoading(false);
  };

  const handleDesignerFee = async (perRoom, perSqr) => {
    setShowFilters(true);
    setLoading(true);

    console.log(perRoom, perSqr);

    setLoading(false);
  };

  const handleAppliedFilters = (listoffilters) => {
    let fil = "";
    if (typeof listoffilters === "object") {
      // applyFilter.map(value =>{
      //   listoffilters = Object.entries(listoffilters).filter(item => item[1] !==value);
      // })
      // console.log(listoffilters);
      fil = [...listoffilters];
    } else {
      fil = [...applyFilter, listoffilters];
    }
    setAppliedFilter(fil);
  };

  const handleCityFilter = async (cityObj) => {
    setLoading(true);
    let params = "";
    Object.entries(cityObj).map((city) => {
      if (city[1]) {
        params += "city=" + city[0] + "&";
      }
    });

    setCityFilter(
      Object.entries(cityObj)
        .filter((elm) => {
          return elm[1];
        })
        .map((elm) => elm[0])
    );
    handleAppliedFilters(
      Object.entries(cityObj)
        .filter((elm) => {
          return elm[1];
        })
        .map((elm) => elm[0])
    );
    // const response = await b2bservice.getlistDesignersFilter(params);
    // setDesignerListings(response);
    setLoading(false);
  };

  const resetFilter = () => {
    setAppliedFilter([]);
    getInit();
  };

  return (
    <React.Fragment>
      {screenWidth > 767 && (
        <>
          <Header />
          <FilterModal />
          <section className="filters">
            <div className="container pt-lg-5 pb-lg-4">
              <nav aria-label="breadcrumb" className="displayn">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/home" className="bred">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="/exploreprojects"> Explore Project</a>
                  </li>
                </ol>
              </nav>

              <div className="">
                <div className="col-md-6">
                  <h2 className="home-renovate displayn">Explore Projects</h2>
                  <div className="displaydn mt-3">
                    <h2 className="d-inline">
                      {" "}
                      <b>Explore Projects</b>{" "}
                    </h2>
                    <span className="float-end">
                      <img
                        src={filter}
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-target="#mobileexploremodal"
                      />
                    </span>
                    <p className="inter">
                      Browse through millions of home and living pictures
                    </p>{" "}
                    <br />
                  </div>
                  <p className="fs-5 mt-lg-2 mb-lg-2 displayn">
                    Browse through millions of home and living pictures
                  </p>
                  <div className="input-group search-icon">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by building name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon2"
                      style={{ cursor: "pointer" }}
                      name="search"
                      value={searchValue}
                      onClick={() => handleSearch()}
                    >
                      <i>
                        <FontAwesomeIcon icon={faSearch} />
                      </i>
                    </span>
                  </div>
                </div>
                <div className="row mtop">
                  <div className="col-lg-6">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link   active prof-btn w-100"
                          // id="projects-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-project"
                          type="button btn-lg"
                          role="tab"
                          aria-controls="pills-project"
                          aria-selected="true"
                          onClick={() => setprojectsIconShow(!projectsIconShow)}
                        >
                          {projectsIconShow ? (
                            <img src={project} alt="" className="me-3" />
                          ) : (
                            <img src={projectwhite} alt="" className="me-3" />
                          )}
                          Projects
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link prof-btn w-100"
                          id="photos-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-photo"
                          type="button btn-lg"
                          role="tab"
                          aria-controls="pills-photo"
                          aria-selected="false"
                          onClick={() => setprojectsIconShow(!projectsIconShow)}
                        >
                          {projectsIconShow ? (
                            <img src={photowhite} alt="" className="me-3" />
                          ) : (
                            <img src={photo} alt="" className="me-3" />
                          )}
                          Photos
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-12 displayn">
                    {/* <div>
                  <span
                    className="float-end text-primary"
                    onClick={() => resetFilter()}
                    style={{ cursor: "pointer" }}
                  >
                    Reset All
                  </span>
                </div> */}
                    {/* <div className="btn-group" role="group" aria-label="Basic radio toggle button group"></div> */}

                    {/* <div
                  className="div-shadow p-2 mb-3"
                  style={{
                    visibility: applyFilter.length > 0 ? "visible" : "hidden",
                  }}
                >
                  <div className>
                    <span>
                      <b>Applied Filters</b>
                    </span>
                    <span
                      className="float-end green-recon border-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => resetFilter()}
                    >
                      Clear All
                    </span>
                  </div>
                  <div className="filterselected pt-3 pb-2" id="id_filters">
                    {applyFilter.map((filter) => (
                      <label className="p-2 m-1 green-recon greenlight rounded-pill">
                        {filter}
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </label>
                    ))}
                  </div>
                </div> */}
                    <div
                      className="btn-toolbar mb-3 text-center"
                      style={{ float: "right" }}
                      role="toolbar"
                      aria-label="Toolbar with button groups "
                    >
                      <div
                        className="btn-group me-2 btn-group-sm filter-btn"
                        role="group"
                        aria-label="First group"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={(e) => cityPopover(e)}
                        >
                          City
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={(e) => feePopover(e)}
                        >
                          Designer Fee
                        </button>
                        {projectsIconShow && (
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={(e) => feePopover(e)}
                          >
                            Rooms
                          </button>
                        )}
                        {!projectsIconShow && (
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={(e) => professionPopover(e)}
                          >
                            Professionals
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setMostViewed(!mostViewed)}
                          className={
                            mostViewed
                              ? "btn btn-outline-secondary blue text-white"
                              : "btn btn-outline-secondary"
                          }
                        >
                          Most Viewed
                        </button>
                        <button
                          type="button"
                          onClick={() => setMostLiked(!mostLiked)}
                          className={
                            mostLiked
                              ? "btn btn-outline-secondary blue text-white"
                              : "btn btn-outline-secondary"
                          }
                        >
                          Most Liked
                        </button>
                      </div>
                    </div>
                    <div className="btn-group">
                      <Filter
                        cityshow={cityshow}
                        cityInit={cityInit}
                        handleCityFilter={handleCityFilter}
                        feeshow={feeshow}
                        feetarget={feetarget}
                        professionshow={professionshow}
                        professiontarget={professiontarget}
                        citytarget={citytarget}
                        handleDesignerFee={handleDesignerFee}
                      />
                    </div>
                  </div>
                </div>

                <div className="mtop">
                  <div className="">
                    <div
                      className="p-2 mb-3"
                      style={{
                        display: applyFilter.length > 0 ? "block" : "none",
                      }}
                    >
                      <div
                        className="filterselected text-end pt-3 pb-2"
                        id="id_filters"
                      >
                        <span>
                          <b>Applied Filters</b>
                        </span>{" "}
                        &nbsp;
                        {applyFilter.map((filter) => (
                          <span className="p-1 m-1 green-recon greenlight rounded-pill">
                            {filter} &nbsp;
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </span>
                        ))}
                        <span
                          className="green-recon border-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => resetFilter()}
                        >
                          Clear All
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tabs-for-pp">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-project"
                    role="tabpanel"
                    aria-labelledby="projects-tab"
                  >
                    <section className="project-details mt-lg-2">
                      <div className="container">
                        {loading ? (
                          <center>
                            <Spinner animation="border" />
                          </center>
                        ) : (
                          <div className="row cards">
                            {projects.map((p, i) => (
                              <>
                                {i === projects.length - 1 && (
                                  <div className="col-lg-4 col-md-6 mt-3">
                                    <div className="still-not-sure blue">
                                      <div className="row">
                                        <div className="col-md-12 explore-ns">
                                          <div className="text-light p-4 stillheight">
                                            <p className="asd">
                                              Still not sure?
                                            </p>
                                            <h2>
                                              Let idesign send you instant
                                              recommendations.
                                            </h2>

                                            <button
                                              type="button"
                                              className="btn btn-light blue-text"
                                              style={{
                                                margin: "100px 0px 20px",
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target={
                                                user
                                                  ? "#successmodal"
                                                  : "#getstartedmodal"
                                              }
                                            >
                                              <b>Get Started ???</b>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <ProjectsCards
                                  id={p._id}
                                  pname={p.name}
                                  imagepath={
                                    p.data[0]["images"].length > 0
                                      ? p.data[0]["images"][0] !== null &&
                                        p.data[0]["images"][0]["original"]
                                      : noimage
                                  }
                                  dname={p.userId && p.userId.firstName}
                                  bname={"building name"}
                                  likes={""}
                                  key={p._id}
                                  city={p.address}
                                />
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Pagination
            page={page}
            location={location}
            pageCount={pageCount}
            pageSize={3}
          />
          <Footer />
        </>
      )}
      {screenWidth < 767 && (
        <>
          <Header />
          <FilterModal />
          <section className="filters">
            <div className="container pt-lg-5 pb-lg-4">
              <nav aria-label="breadcrumb" className="displayn">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/home" className="bred">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="/exploreprojects"> Explore Project</a>
                  </li>
                </ol>
              </nav>

              <div className="">
                <div className="col-md-6">
                  <h2 className="home-renovate displayn">Explore Projects</h2>
                  <div className="displaydn mt-3">
                    <h2 className="d-inline" id="exploreProjectsHeading">
                      Explore Projects
                    </h2>
                    <span className="float-end">
                      <img
                        src={filter}
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-target="#mobileexploremodal"
                      />
                    </span>
                    {!searchFieldVisibility && (
                      <span
                        onClick={() => {
                          setSearchFieldVisibility(true);
                        }}
                        className="float-end mx-2"
                        style={{ cursor: "pointer" }}
                      >
                        <img src={searchIcon} />
                      </span>
                    )}

                    <br />
                    {searchFieldVisibility && (
                      <div className="mt-3">
                        <Form.Group
                          controlId=""
                          style={{ position: "relative" }}
                        >
                          <Form.Control type="text" placeholder="" />
                          <CloseButton
                            style={{
                              position: "absolute",
                              top: "0.55rem",
                              right: "0.5rem",
                            }}
                            onClick={() => {
                              setSearchFieldVisibility(false);
                            }}
                          />
                        </Form.Group>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mtop">
                  <div className="">
                    <div
                      className="p-2 mb-3"
                      style={{
                        display: applyFilter.length > 0 ? "block" : "none",
                      }}
                    >
                      <div
                        className="filterselected text-end pt-3 pb-2"
                        id="id_filters"
                      >
                        <span>
                          <b>Applied Filters</b>
                        </span>{" "}
                        &nbsp;
                        {applyFilter.map((filter) => (
                          <span className="p-1 m-1 green-recon greenlight rounded-pill">
                            {filter} &nbsp;
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </span>
                        ))}
                        <span
                          className="green-recon border-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => resetFilter()}
                        >
                          Clear All
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className=" d-flex justify-content-evenly">
                  {
                    <div
                      className="mt-3 me-4"
                      id="projects-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-project"
                      type="button btn-lg"
                      role="tab"
                      aria-controls="pills-project"
                      aria-selected="true"
                      style={{
                        position:
                          componentsToRender === "Projects" ? "relative" : "",
                        top: componentsToRender === "Projects" ? "12px" : "",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setprojectsIconShow(!projectsIconShow);
                        setComponentsToRender("Projects");
                      }}
                      // onClick={() =>
                      //   (window.location.href = "/findprofessionals2")
                      // }
                    >
                      <p
                        className={
                          componentsToRender === "Projects"
                            ? "titleSelectedTab"
                            : "navTextMob"
                        }
                        id=""
                      >
                        Projects
                      </p>
                    </div>
                  }
                  {
                    <div
                      className="mt-3 ms-4"
                      id="photos-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-photo"
                      type="button btn-lg"
                      role="tab"
                      aria-controls="pills-photo"
                      aria-selected="false"
                      style={{
                        position:
                          componentsToRender === "Photos" ? "relative" : "",
                        top: componentsToRender === "Photos" ? "12px" : "",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setprojectsIconShow(!projectsIconShow);
                        setComponentsToRender("Photos");
                      }}
                    >
                      <p
                        className={
                          componentsToRender === "Photos"
                            ? "titleSelectedTab"
                            : "navTextMob"
                        }
                      >
                        Photos
                      </p>
                    </div>
                  }
                </div>
                <hr style={{ position: "relative", bottom: "16px" }} />
                {componentsToRender === "Projects" && (
                  <div
                    className=""
                    style={{ transform: "translateY(-2.4rem)" }}
                  >
                    <div className="col-md-7 ">
                      {/****MAIN CONTENT HERE******/}
                      <div className="" id="">
                        <div
                          className="tab-pane fade show active"
                          id="designer"
                          role="tabpanel"
                          aria-labelledby="designer-tab"
                        >
                          <section className="design-firm">
                            <div className="">
                              {loading ? (
                                <center>
                                  <Spinner animation="border" />
                                </center>
                              ) : (
                                <div className="row cards">
                                  {projects.map((p, i) => (
                                    <>
                                      {i === projects.length - 1 && (
                                        <div
                                          className=""
                                          style={{
                                            transform: "translateX(-1.5rem)",
                                            position: "relative",
                                          }}
                                        >
                                          <img
                                            src={blueCard}
                                            alt="blueCard"
                                            style={{ width: "112%" }}
                                          />
                                          <button
                                            type="button"
                                            className="btn btn-light text-success mt-4"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              user
                                                ? "#successmodal"
                                                : "#getstartedmodal"
                                            }
                                            style={{
                                              position: "absolute",
                                              bottom: "1rem",
                                              left: "1.5rem",
                                            }}
                                          >
                                            <div className="d-flex align-items-center justify-content-between">
                                              <b
                                                className="mx-2"
                                                id=""
                                                style={{ color: "#3B5998" }}
                                              >
                                                Get Started
                                              </b>
                                              <img
                                                src={getStartedArrows}
                                                alt="..."
                                              />
                                            </div>
                                          </button>
                                        </div>
                                      )}

                                      <ProjectsCards
                                        id={p._id}
                                        pname={p.name}
                                        imagepath={
                                          p.data[0]["images"].length > 0
                                            ? p.data[0]["images"][0] !== null &&
                                              p.data[0]["images"][0]["original"]
                                            : noimage
                                        }
                                        dname={p.userId && p.userId.firstName}
                                        bname={"building name"}
                                        likes={""}
                                        key={p._id}
                                        city={p.address}
                                      />
                                    </>
                                  ))}
                                </div>
                              )}
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {componentsToRender === "Photos" && (
                  <div style={{ transform: "translateY(-2rem)" }}>
                    <section className="">
                      <div className="">
                        <div className="">
                          {loading ? (
                            <center>
                              <Spinner animation="border" />
                            </center>
                          ) : (
                            <div
                              className="row"
                              style={{
                                width: "110%",
                                transform: "translateX(-1.7rem)",
                              }}
                            >
                              {projects &&
                                projects.map((p) => (
                                  <span className="m-1" style={{ position: "relative",width:"13.1rem" }}>
                                    <img
                                      
                                      src={
                                        p.data[0]["images"].length > 0
                                          ? p.data[0]["images"][0] !== null &&
                                            p.data[0]["images"][0]["original"]
                                          : noimage
                                      }
                                      key={p._id}
                                      style={{
                                        objectFit: "cover",
                                        height: "13.1rem",
                                        width: "13.1rem",
                                        margin: "0",
                                        padding: "0",
                                      }}
                                    ></img>
                                    <img
                                      src={shareBtn}
                                      style={{
                                        position: "absolute",
                                        bottom: "10%",
                                        right: "0%",
                                        width: "2rem",
                                      }}
                                    />
                                    <img
                                      src={heartLikeBtn}
                                      style={{
                                        position: "absolute",
                                        bottom: "35%",
                                        right: "0%",
                                        width: "2rem",
                                      }}
                                    />
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </div>
              <div className="container">
                <div
                  className="dont-know mb-5"
                  id="dont-know"
                  style={{ position: "relative" }}
                >
                  <button
                    type="button"
                    className="btn btn-light text-success mt-4"
                    data-bs-toggle="modal"
                    data-bs-target={user ? "#successmodal" : "#getstartedmodal"}
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                    }}
                  ></button>
                </div>
              </div>
            </div>
          </section>

          <Pagination
            page={page}
            location={location}
            pageCount={pageCount}
            pageSize={3}
          />
          <Footer2 />
        </>
      )}
    </React.Fragment>
  );
};

export default ExploreProjects;
