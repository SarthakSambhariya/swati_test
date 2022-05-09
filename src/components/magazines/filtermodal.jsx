import React, { useState } from "react";
import "../findprofessional/css/mobile/filter.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slider from "react-rangeslider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";




const FilterModal = ({ handleCityFilter, cityInit = [], }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [search, setSearch] = useState("");
  return (
    <div
      className="modal fade"
      id="mobilemagazinemodal"
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
            <div
              className="filterselected pt-3 pb-2"
              id="id_filters"
            >
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
              <FontAwesomeIcon
                icon={faClose}
              />
            </p>
          </div>
          <div className="definefilter">
          </div>
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
                id="v-pills-date-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-date"
                role="tab"
                aria-controls="v-pills-date"
                aria-selected="true"
              >
                Date
              </button>

              <button
                className="nav-link"
                id="v-pills-category-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-category"
                role="tab"
                aria-controls="v-pills-category"
                aria-selected="false"
              >
                Category
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
            </div>
            <div className="tab-content" id="v-pills-tabContent">
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
                id="v-pills-date"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="input-group">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="btn-sm border-1"
                />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-category"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fdesigner"
                  // onClick={() => handleExpFilter("0-1")}
                  />
                  <label className="form-check-label" for="fdesigner">
                    Category 1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fcontractor"
                  // onClick={() => handleExpFilter("1-2")}
                  />
                  <label className="form-check-label" for="fcontractor">
                    Category 2
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fcontractor"
                  // onClick={() => handleExpFilter("1-2")}
                  />
                  <label className="form-check-label" for="fcontractor">
                    Category 3
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fcontractor"
                  // onClick={() => handleExpFilter("1-2")}
                  />
                  <label className="form-check-label" for="fcontractor">
                    Category 4
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fcontractor"
                  // onClick={() => handleExpFilter("1-2")}
                  />
                  <label className="form-check-label" for="fcontractor">
                    Category 5
                  </label>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
