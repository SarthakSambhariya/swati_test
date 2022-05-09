import React, { useState } from "react";
import "./css/mobile/filter.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slider from "react-rangeslider";
import AllFilters from "./filters/allFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import MultiRangeSlider from "./filters/slider/MultiRangeSlider";

const FilterModal = ({
  handleCityFilter,
  componentsToRender,
  cityInit = [],
}) => {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [search, setSearch] = useState("");
  console.log(componentsToRender);
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="mobiledesignersuccessmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modalContent animate-bottom">
            <div className="modal-header border-light">
              <h5
                className="modal-title text-dark"
                id="exampleModalLabel"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "20px",
                  fontWeight: " 500",
                  lineHeight: "27px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                Filters
              </h5>
              <p
                style={{
                  cursor: "pointer",
                  fontFamily: "Public Sans",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  lineHeight: "1rem",
                  color: "#174E86",
                }}
              >
                Clear All{" "}
              </p>
            </div>
            <div className="definefilter"></div>
            <div
              className="mb-3"
              style={{ borderBottom: "1px solid #E1E1E1", width: "100vw" }}
            ></div>

            {/* <hr className="mt-0" /> */}
            <div className="d-flex align-items-start">
              <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "1rem",
                  fontWeight: " 700",
                  lineHeight: "1.36625rem",
                  textAlign: "left",
                }}
              >
                <button
                  className="nav-link active"
                  id="v-pills-city-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-city"
                  role="tab"
                  aria-controls="v-pills-city"
                  aria-selected="true"
                >
                  City
                </button>
                {componentsToRender === "designer" && (
                  <button
                    className="nav-link"
                    id="v-pills-fee-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-fee"
                    role="tab"
                    aria-controls="v-pills-fee"
                    aria-selected="false"
                  >
                    Design Fee
                  </button>
                )}
                {componentsToRender === "contractor2" && (
                  <button
                    className="nav-link"
                    id="v-pills-services-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-services"
                    role="tab"
                    aria-controls="v-pills-services"
                    aria-selected="false"
                  >
                    Services
                  </button>
                )}
                <button
                  className="nav-link"
                  id="v-pills-experience-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-experience"
                  role="tab"
                  aria-controls="v-pills-experience"
                  aria-selected="false"
                >
                  Experience
                </button>
              </div>
              <div
                className="me-3"
                style={{ borderRight: "1px solid #E1E1E1", height: "100vh" }}
              ></div>
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-city"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="input-group">
                    <input
                      className="form-control border-end-0 border"
                      type="search"
                      placeholder="Search Cities"
                      id="example-search-input"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      onClick={() => handleCityFilter(search)}
                      className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                    />
                  </div>
                  <div
                    className="mt-3"
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "0.875rem",
                      fontWeight: " 300",
                      lineHeight: "1.36625rem",
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        // onClick={() => handleExpFilter("0-1")}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Delhi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        // onClick={() => handleExpFilter("1-2")}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Gurgaon
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        // onClick={() => handleExpFilter("2-3")}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Bhopal
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        // onClick={() => handleExpFilter("3-4")}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Chandigarh
                      </label>
                    </div>
                  </div>
                  <br />

                  {cityInit.map((c) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onClick={() => handleCityFilter(c.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
                {/*<div
                className="tab-pane fade"
                id="v-pills-fee"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                
                 <div className="form-check">
                  <span>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked={showSlider}
                      onClick={() => setShowSlider(true)}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Per room
                    </label>
                  </span>
                  
                </div>
                {showSlider && (
                  <>
                    <MultiRangeSlider
                      min={1000}
                      max={2000393}
                      onChange={({ min, max }) => setPerRoom(`${min}-${max}`)}
                    />
                    <br />
                    <br />
                  </>
                )}
                <div className="form-check">
                  <span>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked={!showSlider}
                      onClick={() => setShowSlider(false)}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Per sq. ft.
                    </label>
                  </span>
                </div>
                {!showSlider && (
                  <>
                    <MultiRangeSlider
                      min={1000}
                      max={2000393}
                      onChange={({ min, max }) => setperSqr(`${min}-${max}`)}
                    />

                    <br />
                    <br />
                  </>
                )}
                <button
                  type="button"
                  className="btn blue btn-sm text-light ps-4 pe-4"
                // onClick={() => handleDesignerFee(perRoom, perSqr)}
                >
                  Apply
                </button> 
              </div>*/}
                <div
                  className="tab-pane fade"
                  id="v-pills-services"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.875rem",
                    fontWeight: " 400",
                    lineHeight: "1.36625rem",
                  }}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("0-1")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Service 1
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("1-2")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Service 2
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("2-3")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Service 3
                    </label>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-fee"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "0.875rem",
                    fontWeight: " 400",
                    lineHeight: "1.36625rem",
                  }}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("0-1")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      5,000 - 10,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("1-2")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      10,000 - 20,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("2-3")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      20,000 - 40,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("3-4")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      40,000 - 60,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("5+")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      60,000 - 80,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("5+")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      80,000 - 1,00,000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("5+")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      1,00,000 & above
                    </label>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-experience"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.875rem",
                    fontWeight: " 400",
                    lineHeight: "1.05875rem",
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "1rem",
                      fontWeight: " 400",
                      lineHeight: "1.21rem",
                    }}
                  >
                    In Years
                  </p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("0-1")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      1 - 2
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("1-2")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      2 - 3
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("2-3")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      3 - 4
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("3-4")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      4 - 5
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("5+")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      5 - 6
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      // onClick={() => handleExpFilter("5+")}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      6 & above
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="tab-content" id="v-pills-tabContent">
              <div className="all-filters">
                <CityFilter
                  cityshow={cityshow}
                  citytarget={citytarget}
                  handleCityFilter={handleCityFilter}
                  cityInit={cityInit}
                />
                <DesignerFeeFilter
                  feeshow={feeshow}
                  feetarget={feetarget}
                  handleDesignerFee={handleDesignerFee}
                />
                <ExperianceFilter
                  expshow={expshow}
                  exptarget={exptarget}
                  handleExpFilter={handleExpFilter}
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            className="shadow d-flex justify-content-evenly align-items-center"
            style={{
              zIndex: "10",
              backgroundColor: "white",
              height: "4rem",
              width: "100vw",
            }}
          >
            <div
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{
                fontFamily: "Public Sans",
                fontSize: "0.875rem",
                fontWeight: "300",
                lineHeight: "1rem",
                cursor: "pointer",
              }}
            >
              Close
            </div>
            <div
              style={{ height: "1.375rem", borderLeft: "1px solid #E1E1E1" }}
            ></div>
            <div
              style={{
                fontFamily: "Public Sans",
                fontSize: "0.875rem",
                fontWeight: "600",
                lineHeight: "1.028125rem",
                color: "#174E86",
              }}
            >
              Apply
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterModal;
