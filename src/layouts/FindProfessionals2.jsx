import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import "../components/home/css/testimonl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faCall,
  faFilter,
  faL,
  faArrowRight,
  faGreaterThan,
  faSearch,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import searchIcon from "../components/findprofessional/images/searchIcon.svg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../components/findprofessional/css/findprofessional.css";
import DesignerListing2 from "../components/findprofessional/DesignerListing2";
import OEMListing from "../components/findprofessional/oemListing";
import contractorvector from "../components/findprofessional/images/contractorvector.png";
import OEMLogoBlue from "../components/findprofessional/images/OEM blue.svg";
import OEMLogoWhite from "../components/findprofessional/images/OEM White.svg";
import designervector from "../components/findprofessional/images/designervector.png";
import designerout from "../components/findprofessional/images/designerout.png";
import contractorout from "../components/findprofessional/images/contractorout.png";
import reco from "../components/findprofessional/images/reco.png";
import guide from "../components/findprofessional/images/guide.png";
import filter from "../components/exploreprojects/images/filter.png";
import main from "../mobile/css/main.css";
import "../components/findprofessional/css/findProfessionals2.css";
import { Link } from "react-router-dom";
import getStartedArrows from "../components/findprofessional/images/getStartedArrows.svg";
import screwWrench from "../components/findprofessional/images/reco.png";
import {
  Popover,
  Overlay,
  Spinner,
  Breadcrumb,
  ListGroup,
} from "react-bootstrap";
import b2bservice from "../services/b2bservice";
import authService, { apiLogout } from "../services/authService";
import Filter from "../components/findprofessional/css/mobile/filter";
import designerservice from "../services/designerservice";
import Filters from "../components/findprofessional/filters";
import { Redirect } from "react-router-dom";
import DesignerModal from "../components/home/designermodal";
import FilterModal from "../components/findprofessional/filtermodal";
import Pagination from "../components/common/pagination";
import CalendarModal from "../components/modal/CalendarModal";
import Footer2 from "../components/common/footer2";
import blueCard from "../components/findprofessional/images/blueCard.svg";
function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const FindProfessionals = ({ mobileview, location }) => {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(false);
  const [designerIconShow, setDesignerIconShow] = useState(false);
  const [oemIconShow, setOEMIconShow] = useState(false);
  const [cityshow, setCityShow] = useState(false);
  const [citytarget, setCityTarget] = useState(null);
  const [defaultd, setDefault] = useState(true);
  const [feeshow, setFeeShow] = useState(false);
  const [feetarget, setFeeTarget] = useState(null);
  const [componentsToRender, setComponentsToRender] = useState("designer");
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  const [expshow, setExpShow] = useState(false);
  const [exptarget, setExpTarget] = useState(null);

  const [showFilters, setShowFilters] = useState(false);

  const [afiltershow, setAfilterShow] = useState(false);
  const [afiltertarget, setAfilterTarget] = useState(null);
  const [filterData, setFilterData] = useState("");

  const [designerListings, setDesignerListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState("");
  const [pageCount, setPageCount] = useState(0);

  const [applyFilter, setAppliedFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [clearCityCheckBox, setClearCityCheckBox] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  // console.log(location);
  const navTextMob = {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "15px",
    textAlign: "center",
    color: "#A7A7A7",
    marginTop: "0px",
    width: "100%",
    position: "relative",
  };
  const icon = {
    width: "30px",
    height: "25px",
    marginRight: "10px",
    marginTop: "4px",
  };
  const leftText = {
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "16px",
    color: "#3D3C3C",
  };
  console.log(location.pathname.split("/")[2]);
  const getInit = async () => {
    setLoading(true);
    const token = authService.getToken();
    token ? setUser(true) : setUser(false);

    let pageNo = 1;
    try {
      pageNo = location.search.split("?")[1].split("=")[1];
      setPage(parseInt(pageNo));
    } catch (error) {}

    const skip = parseInt(pageNo - 1) * 5;
    let params = "type=1";
    if (location.pathname.split("/")[2] === "") {
      params = "type=1";
      setDefault(true);
      setOEMIconShow(false);
      setDesignerIconShow(false);
      setComponentsToRender("designer");
    } else if (location.pathname.split("/")[2] === "contractor2") {
      params = "type=2";
      setDefault(false);
      setOEMIconShow(false);
      setDesignerIconShow(true);
      setComponentsToRender("contractor2");
    } else if (location.pathname.split("/")[2] === "oem") {
      params = "type=3";
      setDefault(false);
      setDesignerIconShow(false);
      setOEMIconShow(true);
      setComponentsToRender("oem2");
    }

    if (skip) {
      params += `&skip=${skip}`;
    }
    const response = await b2bservice.getlistDesignersFilter2(params);
    const r = await b2bservice.getlistProjectsFilter2(params);
    console.log(r);
    setPageCount(response["count"]);
    setDesignerListings(response["data"]);
    setLoading(false);
  };

  useEffect(() => {
    getInit();
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
    setExpShow(false);
  };

  const feePopover = (event) => {
    setFeeShow(!feeshow);
    setFeeTarget(event.target);
    setCityShow(false);
    setExpShow(false);
  };

  const expPopover = (event) => {
    setExpShow(!expshow);
    setExpTarget(event.target);
    setCityShow(false);
    setFeeShow(false);
  };

  const afilterPopover = (event) => {
    setAfilterShow(!afiltershow);
    setAfilterTarget(event.target);
    setCityShow(false);
    setExpShow(false);
  };

  const resetFilter = () => {
    const boxs = document.getElementsByClassName("city-check-box");

    Object.entries(boxs).map((b) => {
      b[1].checked = false;
    });
    setClearCityCheckBox(true);
    setAppliedFilter([]);
    getInit();
  };

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

  // const showDesigner = async () => {
  //   setDesignerIconShow(!designerIconShow);
  //   setLoading(true);
  //   const params = "type=1";
  //   const response = await b2bservice.getlistDesignersFilter(params);
  //   setDesignerListings(response);
  //   setLoading(false);
  // };

  // const showContractor = async () => {
  //   setDesignerIconShow(!designerIconShow);
  //   setLoading(true);
  //   const params = "type=2";
  //   const response = await b2bservice.getlistDesignersFilter(params);
  //   setDesignerListings(response);
  //   setLoading(false);
  // };

  const handleExpFilter = async (value) => {
    setShowFilters(true);
    setLoading(true);

    const params = `experience=${value}`;

    handleAppliedFilters(value);

    const response = await b2bservice.getlistDesignersFilter(params);
    setDesignerListings(response);
    setLoading(false);
  };
  // const innerElements = useRef();
  const handleAppliedFilters = (listoffilters) => {
    setClearCityCheckBox(false);
    let fil = "";
    if (typeof listoffilters === "object") {
      let afilter = [...listoffilters];
      applyFilter.map((value) => {
        var index = afilter.indexOf(value);
        console.log(index);
        if (index !== -1) {
          afilter.splice(index, 1);
        }
      });

      console.log(applyFilter, "applyFilter--", afilter);
      // console.log(listoffilters);
      fil = [...afilter, ...applyFilter];
    } else {
      fil = [...applyFilter, listoffilters];
    }
    setAppliedFilter(fil);
  };

  const handleDesignerFee = async (perRoom, perSqr) => {
    setShowFilters(true);
    setLoading(true);
    let params = "";

    if (perRoom) {
      params += "&perRoomPrice=" + perRoom;
      handleAppliedFilters(perRoom);
    }
    if (perSqr) {
      params += "&perSqft=" + perSqr;
      handleAppliedFilters(perSqr);
    }
    // const response = await b2bservice.getlistDesignersFilter(params);
    // console.log(response);
    setLoading(false);
  };

  const handleRemoveCityFromFilter = (value) => {
    alert(value);
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

  const removeFromFilter = (value) => {
    const newFilter = applyFilter.filter((filter) => {
      return filter !== value;
    });

    setAppliedFilter(newFilter);
  };

  const getCallBackHandler = () => {
    console.log("getCallBackHandler fired");
    setShowCalendarModal(true);
  };

  return (
    <React.Fragment>
      {screenWidth > 768 && (
        <>
          <Header />
          <DesignerModal />
          <FilterModal componentsToRender={componentsToRender==="contractor"?"contractor":""}/>
          <section className="filters">
            <div className="container">
              <div className="pt-lg-5 ">
                <nav aria-label="breadcrumb" className="displayn">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/home" className="bred">
                        Home
                      </a>
                    </li>

                    <li className="breadcrumb-item" aria-current="page">
                      <a href="##">Find Professionals</a>
                    </li>
                  </ol>
                </nav>
                <div className="">
                  <div className="displaydn mt-3">
                    <h2 className="fs-1 d-inline">
                      <b>Find Professionals</b>
                    </h2>
                    <span className="float-end">
                      <img
                        src={filter}
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-target="#mobiledesignersuccessmodal"
                      />
                    </span>
                  </div>

                  <div className="professional-filter">
                    <div className="col-lg-7">
                      <div className="HeadingAndCalendarButtonStyling">
                        <h2 className="displayn">Find Professionals</h2>
                        <CalendarModal />
                      </div>
                      <p className="fs-5 mt-lg-2 mb-lg-2 inter displayn">
                        Contact thousands of experts from one single directory
                      </p>
                    </div>

                    <div className="row mtop">
                      <div className="col-lg-7" id="pill-tab-div">
                        <ul
                          className="nav nav-pills"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className={
                                defaultd
                                  ? "nav-link btn-sm prof-btn w-100 active"
                                  : "nav-link btn-sm prof-btn w-100"
                              }
                              id="designer-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#designer"
                              type="button"
                              role="tab"
                              aria-controls="designer"
                              aria-selected="true"
                              onClick={() =>
                                (window.location.href = "/findprofessionals")
                              }
                            >
                              {componentsToRender === "designer" ? (
                                <img
                                  src={designervector}
                                  alt=""
                                  className="me-3"
                                />
                              ) : (
                                <img
                                  src={designerout}
                                  alt=""
                                  className="me-3"
                                />
                              )}
                              Designer
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={
                                componentsToRender === "contractor"
                                  ? "nav-link btn-sm prof-btn w-100 active"
                                  : "nav-link btn-sm prof-btn w-100"
                              }
                              id="contractor-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#contractor"
                              type="button"
                              role="tab"
                              aria-controls="contractor"
                              aria-selected="false"
                              onClick={() =>
                                (window.location.href =
                                  "/findprofessionals/contractor")
                              }
                            >
                              {componentsToRender === "contractor" ? (
                                <img
                                  src={contractorvector}
                                  alt=""
                                  className="me-3"
                                />
                              ) : (
                                <img
                                  src={contractorout}
                                  alt=""
                                  className="me-3"
                                />
                              )}
                              Contractor
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={
                                oemIconShow
                                  ? "nav-link btn-sm prof-btn w-100 px-1 active"
                                  : "nav-link btn-sm prof-btn w-100 px-1"
                              }
                              id="oem-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#oem"
                              type="button"
                              role="tab"
                              aria-controls="oem"
                              aria-selected="false"
                              onClick={() =>
                                (window.location.href =
                                  "/findprofessionals/oem")
                              }
                            >
                              {oemIconShow ? (
                                <img
                                  src={OEMLogoWhite}
                                  alt=""
                                  className="me-3"
                                  id="OEMLogo"
                                />
                              ) : (
                                <img
                                  src={OEMLogoBlue}
                                  alt=""
                                  className="me-3"
                                  id="OEMLogo"
                                />
                              )}
                              OEM
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-5 col-md-12 displayn">
                        <div className="container">
                          <div
                            className="btn-group btn-group-sm filter-btn"
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
                            {!designerIconShow && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={(e) => feePopover(e)}
                                // ref={domNode}
                              >
                                Designer Fee
                              </button>
                            )}

                            {designerIconShow && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={(e) => feePopover(e)}
                              >
                                Services
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={(e) => expPopover(e)}
                            >
                              Experience
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={(e) => afilterPopover(e)}
                            >
                              All Filters
                            </button>
                          </div>
                        </div>

                        <Filters
                          citytarget={citytarget}
                          cityshow={cityshow}
                          cityInit={cityInit}
                          feeshow={feeshow}
                          handleCityFilter={handleCityFilter}
                          afiltershow={afiltershow}
                          afiltertarget={afiltertarget}
                          feetarget={feetarget}
                          expshow={expshow}
                          exptarget={exptarget}
                          handleExpFilter={handleExpFilter}
                          handleDesignerFee={handleDesignerFee}
                          clearCheckBox={clearCityCheckBox}
                          handleRemoveCityFromFilter={
                            handleRemoveCityFromFilter
                          }
                          componentsToRender = {componentsToRender}
                        />
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
                              <label className="p-1 m-1 green-recon greenlight rounded-pill">
                                {filter} &nbsp;
                                <i
                                  className="fa fa-times"
                                  onClick={() => removeFromFilter(filter)}
                                  style={{ cursor: "pointer" }}
                                  aria-hidden="true"
                                ></i>
                              </label>
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
                    <div className="tab-content" id="pills-tabContent vayu">
                      <div
                        className="tab-pane fade show active"
                        id="designer"
                        role="tabpanel"
                        aria-labelledby="designer-tab"
                      >
                        <section className="design-firm mt-3">
                          <div className="container">
                            {loading && designerListings.length !== 0 ? (
                              <center>
                                <Spinner animation="border" />
                              </center>
                            ) : componentsToRender === "contractor" ? (
                              designerListings.map((listing, i) => (
                                <>
                                  {i === 4 && (
                                    <div className="row mt-4">
                                      <div className="nsure blue row  w-100">
                                        <div className="col-lg-8 col-md-12 text-light p-lg-4 fd-ns">
                                          <p>Still not sure?</p>
                                          <h2>
                                            Let idesign send you instant
                                            recommendations.
                                          </h2>

                                          <button
                                            type="button"
                                            className="btn btn-light mt-3 blue-text"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              user
                                                ? "#successmodal"
                                                : "#getstartedmodal"
                                            }
                                          >
                                            <b>Get Started ⋙</b>
                                          </button>
                                        </div>
                                        <div className="col-lg-4 col-md-12 displayn">
                                          <img src={reco} alt="" />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <DesignerListing2
                                    id={listing._id}
                                    name={listing.companyName}
                                    experience={listing.workExperience}
                                    description={""}
                                    fee={
                                      listing.fees &&
                                      listing.fees["designRoomPrice"]
                                    }
                                    phoneNumber={listing.phoneNumber}
                                    city={listing.city}
                                    company={listing.companyName}
                                    pro={
                                      listing["planId"]["price"] === 0
                                        ? false
                                        : true
                                    }
                                    liked={false}
                                    listingName="designer"
                                  />
                                </>
                              ))
                            ) : componentsToRender === "oem" ? (
                              <div>
                                <OEMListing
                                  listingName={"oem"}
                                  city={"delhi"}
                                  company={"woodmac"}
                                  pricing={"12345"}
                                />
                                <OEMListing
                                  listingName={"oem"}
                                  city={"delhi"}
                                  company={"woodmac"}
                                  pricing={"12345"}
                                />
                                <OEMListing
                                  listingName={"oem"}
                                  city={"delhi"}
                                  company={"woodmac"}
                                  pricing={"12345"}
                                />
                                <OEMListing
                                  listingName={"oem"}
                                  city={"delhi"}
                                  company={"woodmac"}
                                  pricing={"12345"}
                                />
                              </div>
                            ) : componentsToRender === "designer" ? (
                              <div
                                className="tab-pane fade"
                                id="contractor"
                                role="tabpanel"
                                aria-labelledby="contractor-tab"
                                style={{ opacity: "1" }}
                              >
                                <section className="design-firm mt-3">
                                  <div className="container">
                                    {designerListings.map((listing) => {
                                      <>
                                        <DesignerListing2
                                          id={listing._id}
                                          name={listing.firstName}
                                          experience={listing.workExperience}
                                          description={""}
                                          fee={listing.fee}
                                          city={listing.city}
                                          company={listing.companyName}
                                          phoneNumber={listing.phoneNumber}
                                          pro={
                                            listing["planId"]["price"] === 0
                                              ? false
                                              : true
                                          }
                                          listingName="contractor"
                                        />
                                      </>;
                                    })}
                                  </div>
                                </section>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dont-know mb-5" id="dont-know">
                  <div className="">
                    <div className="mt-lg-5">
                      <div
                        className="row nsure w-100"
                        style={{
                          background:
                            "linear-gradient(74.77deg, #00E576 0.36%, #09BA64 0.37%, #18D87B 0.38%, #119D59 104.1%)",
                        }}
                      >
                        <div className="col-lg-8 col-md-12 text-light p-lg-4 fd-ns mt-3">
                          <p id="dontKnowHowToBegin">
                            Don’t Know How to begin?
                          </p>
                          <h2 id="selectYourSpace">
                            Select your space and see our hiring guide
                          </h2>

                          <button
                            type="button"
                            className="btn btn-light text-success mt-4"
                            data-bs-toggle="modal"
                            data-bs-target={
                              user ? "#successmodal" : "#getstartedmodal"
                            }
                          >
                            <b id="getStarted">Get Started ⋙</b>
                          </button>
                        </div>
                        <div
                          className="col-lg-4 col-md-12 displayn"
                          id="guideImage"
                        >
                          <img src={guide} alt="" id="guideImg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div id="io">
            <Pagination
              page={page}
              location={location}
              pageCount={pageCount}
              pageSize={2}
            />
          </div>

          <Footer />
        </>
      )}
      {screenWidth < 768 && (
        <>
          <Header />
          <DesignerModal />
          <FilterModal componentsToRender={componentsToRender}/>
          <section className="filters">
            <div className="container">
              <div className="pt-lg-5 ">
                <nav aria-label="breadcrumb" className="displayn">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/home" className="bred">
                        Home
                      </a>
                    </li>

                    <li className="breadcrumb-item" aria-current="page">
                      <a href="##">Find Professionals</a>
                    </li>
                  </ol>
                </nav>
                <div>
                  {/* <div>Search goes here</div> */}
                  <div className="displaydn mt-3 d-flex justify-content-between">
                    <span>
                      <img src={searchIcon} />
                    </span>
                    <p className="ManropeFont">Explore and Hire Designers</p>
                    <span className="float-end align-items-center">
                      <img
                        src={filter}
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-target="#mobiledesignersuccessmodal"
                      />
                    </span>
                  </div>

                  {/* <Filter /> */}

                  <div className="professional-filter">
                    <div className="row mtop">
                      <div className="col-lg-5 col-md-12 displayn">
                        <div className="container">
                          <div
                            className="btn-group btn-group-sm filter-btn"
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
                            {!designerIconShow && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={(e) => feePopover(e)}
                                // ref={domNode}
                              >
                                Designer Fee
                              </button>
                            )}

                            {designerIconShow && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={(e) => feePopover(e)}
                              >
                                Services
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={(e) => expPopover(e)}
                            >
                              Experience
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={(e) => afilterPopover(e)}
                            >
                              All Filters
                            </button>
                          </div>
                        </div>

                        <Filters
                          citytarget={citytarget}
                          cityshow={cityshow}
                          cityInit={cityInit}
                          feeshow={feeshow}
                          handleCityFilter={handleCityFilter}
                          afiltershow={afiltershow}
                          afiltertarget={afiltertarget}
                          feetarget={feetarget}
                          expshow={expshow}
                          exptarget={exptarget}
                          handleExpFilter={handleExpFilter}
                          handleDesignerFee={handleDesignerFee}
                          clearCheckBox={clearCityCheckBox}
                          handleRemoveCityFromFilter={
                            handleRemoveCityFromFilter
                          }
                        />
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
                              <label className="p-1 m-1 green-recon greenlight rounded-pill">
                                {filter} &nbsp;
                                <i
                                  className="fa fa-times"
                                  onClick={() => removeFromFilter(filter)}
                                  style={{ cursor: "pointer" }}
                                  aria-hidden="true"
                                ></i>
                              </label>
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
                    {/*  THIS IS WHERE THE OEM LISTING CARDS GO */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="">
            <div className="d-flex justify-content-evenly">
              {
                <div
                  style={{
                    position:
                      componentsToRender === "designer" ? "relative" : "",
                    top: componentsToRender === "designer" ? "12px" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => (window.location.href = "/findprofessionals2")}
                >
                  <p
                    className={
                      componentsToRender === "designer" ? "title" : "navTextMob"
                    }
                  >
                    Designer
                  </p>
                </div>
              }
              {
                <div
                  style={{
                    position:
                      componentsToRender === "contractor2" ? "relative" : "",
                    top: componentsToRender === "contractor2" ? "12px" : "",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    (window.location.href = "/findprofessionals2/contractor2")
                  }
                >
                  <p
                    className={
                      componentsToRender === "contractor2"
                        ? "title"
                        : "navTextMob"
                    }
                  >
                    Contractor
                  </p>
                </div>
              }
              {
                <div
                  style={{
                    position: componentsToRender === "oem" ? "relative" : "",
                    top: componentsToRender === "oem" ? "12px" : "",
                  }}
                  onClick={() =>
                    (window.location.href = "/findprofessionals/oem")
                  }
                >
                  <p
                    className={
                      componentsToRender === "oem" ? "title" : "navTextMob"
                    }
                  >
                    OEM
                  </p>
                </div>
              }
            </div>
            <hr style={{ position: "relative", bottom: "16px" }} />
            <div className="">
              <div className="col-md-7 ">
                {/****MAIN CONTENT HERE******/}
                <div className="" id="">
                  <div
                    className="tab-pane fade show active"
                    id="designer"
                    role="tabpanel"
                    aria-labelledby="designer-tab"
                  >
                    <section className="design-firm mt-3">
                      <div className="">
                        {loading && designerListings.length !== 0 ? (
                          <center>
                            <Spinner animation="border" />
                          </center>
                        ) : componentsToRender === "contractor2" ? (
                          designerListings.map((listing, i) => (
                            <>
                              {i === 4 && (
                                <div className="row mt-4">
                                  <div className="nsure blue row  w-100">
                                    <div className="col-lg-8 col-md-12 text-light p-lg-4 fd-ns">
                                      <p>Still not sure?</p>
                                      <h2>
                                        Let idesign send you instant
                                        recommendations.
                                      </h2>

                                      <button
                                        type="button"
                                        className="btn btn-light mt-3 blue-text"
                                        data-bs-toggle="modal"
                                        data-bs-target={
                                          user
                                            ? "#successmodal"
                                            : "#getstartedmodal"
                                        }
                                      >
                                        <b>Get Started ⋙</b>
                                      </button>
                                    </div>
                                    <div className="col-lg-4 col-md-12 displayn">
                                      <img src={reco} alt="" />
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DesignerListing2
                                id={listing._id}
                                name={listing.companyName}
                                address={listing.address}
                                experience={listing.workExperience}
                                description={""}
                                fee={
                                  listing.fees &&
                                  listing.fees["designRoomPrice"]
                                }
                                phoneNumber={listing.phoneNumber}
                                city={listing.city}
                                company={listing.companyName}
                                pro={
                                  listing["planId"]["price"] === 0
                                    ? false
                                    : true
                                }
                                liked={false}
                                listingName="designer"
                              />
                            </>
                          ))
                        ) : componentsToRender === "oem2" ? (
                          <div>
                            <OEMListing
                              listingName={"oem"}
                              city={"delhi"}
                              company={"woodmac"}
                              pricing={"12345"}
                            />
                            <OEMListing
                              listingName={"oem"}
                              city={"delhi"}
                              company={"woodmac"}
                              pricing={"12345"}
                            />
                            <OEMListing
                              listingName={"oem"}
                              city={"delhi"}
                              company={"woodmac"}
                              pricing={"12345"}
                            />
                            <OEMListing
                              listingName={"oem"}
                              city={"delhi"}
                              company={"woodmac"}
                              pricing={"12345"}
                            />
                          </div>
                        ) : componentsToRender === "designer" ? (
                          <div
                            className="tab-pane fade"
                            id="contractor"
                            role="tabpanel"
                            aria-labelledby="contractor-tab"
                            style={{ opacity: "1" }}
                          >
                            <section className="design-firm mt-3">
                              <div className="">
                                {designerListings.map((listing) => (
                                  <DesignerListing2
                                    id={listing._id}
                                    name={listing.firstName}
                                    address={listing.address}
                                    experience={listing.workExperience}
                                    description={""}
                                    fee={listing.fee}
                                    city={listing.city}
                                    company={listing.companyName}
                                    phoneNumber={listing.phoneNumber}
                                    pro={
                                      listing["planId"]["price"] === 0
                                        ? false
                                        : true
                                    }
                                    listingName="contractor"
                                  />
                                ))}
                              </div>
                            </section>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className="dont-know mb-5"
              id="dont-know"
              style={{ position: "relative" }}
            >
              <img
                src={blueCard}
                alt="..."
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <button
                type="button"
                className="btn btn-light text-success mt-4"
                data-bs-toggle="modal"
                data-bs-target={user ? "#successmodal" : "#getstartedmodal"}
                style={{ position: "absolute", bottom: "10px", left: "10px" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <b className="mx-2" id="" style={{ color: "#3B5998" }}>
                    Get Started
                  </b>
                  <img src={getStartedArrows} alt="..." />
                </div>
              </button>
            </div>
          </div>
          <div id="io">
            <Pagination
              page={page}
              location={location}
              pageCount={pageCount}
              pageSize={2}
            />
          </div>

          <Footer2 />
        </>
      )}
    </React.Fragment>
  );
};

export default FindProfessionals;
