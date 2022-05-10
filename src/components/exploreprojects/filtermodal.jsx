import React, { useEffect, useState } from "react";
import "../findprofessional/css/mobile/filter.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slider from "react-rangeslider";
import AllFilters from "./filters/allFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import MultiRangeSlider from "./filters/slider/MultiRangeSlider";
import { Form } from "react-bootstrap";
function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}

const FilterModal = ({ handleCityFilter, cityInit = [] }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [search, setSearch] = useState("");
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  const DesignFeeCheckBoxStyles = {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17px",
  };
  const FilterCategories = {
    fontFamily: "Manrope",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
  };

  useEffect(() => {
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      {screenWidth > 767 && (
        <div
          className="modal fade"
          id="mobileexploremodal"
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
                <h5 className="modal-title text-dark" id="exampleModalLabel">
                  Filter
                </h5>
                <div className="filterselected pt-3 pb-2" id="id_filters">
                  <span className="p-2 m-1 green-recon greenlight rounded-pill">
                    Delhi
                    <i className="fa fa-times ms-1" aria-hidden="true"></i>
                  </span>
                </div>
                <p
                  className="text-dark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faClose} />
                </p>
              </div>
              <div className="definefilter"></div>
              <hr className="mt-0" />
              <div className="d-flex align-items-start">
                <div
                  className="nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
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

                  <button
                    className="nav-link"
                    id="v-pills-fee-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-fee"
                    role="tab"
                    aria-controls="v-pills-fee"
                    aria-selected="false"
                  >
                    Designer Fee
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-popularity-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-popularity"
                    role="tab"
                    aria-controls="v-pills-popularity"
                    aria-selected="false"
                  >
                    Popularity
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-professionals-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-professionals"
                    role="tab"
                    aria-controls="v-pills-professionals"
                    aria-selected="false"
                  >
                    Professionals
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent" >
                  <div
                    className="tab-pane fade"
                    id="v-pills-popularity"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="mostviewed"
                        // onClick={() => handleExpFilter("0-1")}
                      />
                      <label className="form-check-label" for="mostviewed">
                        Most Viwed
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="mostliked"
                        // onClick={() => handleExpFilter("1-2")}
                      />
                      <label className="form-check-label" for="mostliked">
                        Most Liked
                      </label>
                    </div>
                  </div>

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
                        placeholder="search"
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
                  <div
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
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Per room
                        </label>
                      </span>
                      {/* <span className="float-end">
                <label className="" for="">
                  <b>Rs 1500</b>
                </label>
              </span> */}
                    </div>
                    {showSlider && (
                      <>
                        <MultiRangeSlider
                          min={1000}
                          max={2000393}
                          onChange={({ min, max }) =>
                            setPerRoom(`${min}-${max}`)
                          }
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
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Per sq. ft.
                        </label>
                      </span>
                    </div>
                    {!showSlider && (
                      <>
                        <MultiRangeSlider
                          min={1000}
                          max={2000393}
                          onChange={({ min, max }) =>
                            setperSqr(`${min}-${max}`)
                          }
                        />

                        <br />
                        <br />
                      </>
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-professionals"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="fdesigner"
                        // onClick={() => handleExpFilter("0-1")}
                      />
                      <label className="form-check-label" for="fdesigner">
                        Designer
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="fcontractor"
                        // onClick={() => handleExpFilter("1-2")}
                      />
                      <label className="form-check-label" for="fcontractor">
                        Contractor
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
        </div>
      )}
      {screenWidth < 767 && (
        <div
          className="modal fade"
          id="mobileexploremodal"
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
                <h5 className="modal-title text-dark" id="exampleModalLabel" style={{
                  fontFamily: "Manrope",
                  fontSize: "20px",
                  fontWeight: " 500",
                  lineHeight: "27px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}>
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
              <hr className="mt-0" />
              <div className="d-flex align-items-start">
                <div
                  className="nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"                  style={FilterCategories}

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

                  <button
                    className="nav-link"
                    id="v-pills-fee-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-fee"
                    role="tab"
                    aria-controls="v-pills-fee"
                    aria-selected="false"
                  >
                    Designer Fee
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-popularity-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-popularity"
                    role="tab"
                    aria-controls="v-pills-popularity"
                    aria-selected="false"
                  >
                    Popularity
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-professionals-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-professionals"
                    role="tab"
                    aria-controls="v-pills-professionals"
                    aria-selected="false"
                  >
                    Professionals
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade"
                    id="v-pills-popularity"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"style={{
                      fontFamily: "Manrope",
                      fontSize: "0.875rem",
                      fontWeight: " 400",
                      lineHeight: "1.36625rem",
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="mostviewed"
                        // onClick={() => handleExpFilter("0-1")}
                      />
                      <label className="form-check-label" for="mostviewed">
                        Most Viewed
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="mostliked"
                        // onClick={() => handleExpFilter("1-2")}
                      />
                      <label className="form-check-label" for="mostliked">
                        Most Liked
                      </label>
                    </div>
                  </div>

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
                  <div
                    className="tab-pane fade"
                    id="v-pills-fee"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="form-check" style={{
                    fontFamily: "Manrope",
                    fontSize: "0.875rem",
                    fontWeight: " 400",
                    lineHeight: "1.36625rem",
                  }}>
                      <span>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`5,000 - 10,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`10,000 - 20,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`20,000 - 40,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`40,000 - 60,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`60,000 - 80,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`80,000 - 1,00,000`}
                            />
                          </div>
                        </Form>
                        <Form>
                          <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                              type={"checkbox"}
                              id={`default-checkbox`}
                              label={`1,00,000 & above`}
                            />
                          </div>
                        </Form>
                      </span>
                      {/* <span className="float-end">
                <label className="" for="">
                  <b>Rs 1500</b>
                </label>
              </span> */}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-professionals"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"style={{
                      fontFamily: "Manrope",
                      fontSize: "0.875rem",
                      fontWeight: " 400",
                      lineHeight: "1.36625rem",
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="fdesigner"
                        // onClick={() => handleExpFilter("0-1")}
                      />
                      <label className="form-check-label" for="fdesigner">
                        Designers
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value=""
                        id="fcontractor"
                        // onClick={() => handleExpFilter("1-2")}
                      />
                      <label className="form-check-label" for="fcontractor">
                        Contractors
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
      )}
    </React.Fragment>
  );
};

export default FilterModal;
