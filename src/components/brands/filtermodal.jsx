import React, {useState} from "react";
import "./../findprofessional/css/mobile/filter.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slider from "react-rangeslider";
import AllFilters from "./filters/allFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faClose } from "@fortawesome/free-solid-svg-icons";
import MultiRangeSlider from "./filters/slider/MultiRangeSlider";




const FilterModal = ({handleCityFilter, cityInit=[], }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [search, setSearch] = useState("");
  return (
      <div
        className="modal fade"
        id="mobilebrandmodal"
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
              <h5 className="modal-title text-dark" id="exampleModalLabel">Filter</h5>
              <p
                className="text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                    icon={faClose}
                  />
              </p>
            </div>
            <div className="definefilter">
          </div>
          <hr  className="mt-0" />
          <div className="d-flex align-items-start">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
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
                id="v-pills-experience-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-experience"
                role="tab"
                aria-controls="v-pills-experience"
                aria-selected="false"
              >
                Experience
              </button>
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
            </div>
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
                    <label className="form-check-label" for="flexCheckDefault">
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
                    <label className="form-check-label" for="flexRadioDefault1">
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
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-experience"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
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
                    0-1 Years
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
                    1-2 Years
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
                    2-3 Years
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
                    3-4 Years
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
                    5+ Years
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
  );
};

export default FilterModal;
