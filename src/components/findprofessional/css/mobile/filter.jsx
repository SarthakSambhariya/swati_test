import React from "react";
import "../mobile/style.css";

import img5 from "./images/img5.svg";
import cross from "./images/cross.svg";
import search from "./images/search.svg";

function Filter(props) {
  return (
    <>
      <div className="filter_wrapper displaydn">
        <div id="search_box" className="fiter_one" align="center">
          <img src={img5} valign="bottom" />
        </div>
        <div id="search_box" className="filter_type fiter_two">
          City
        </div>
        <div id="search_box" className="filter_type fiter_three">
          Design Fees
        </div>
        <div id="search_box" className="filter_type fiter_four">
          Experience
        </div>
      </div>
      <div className="search_filter_wrapper displaydn">
        <div className="search_heading_wrapper">
          <div className="search_head_name">Applied filters</div>
          <div className="search_purge">Clear All</div>
        </div>

        <div className="search_result_wrapper">
          <div className="search_filter_name">
            Delhi
            <img id="remove" src={cross} />
          </div>
          <div className="search_filter_name">
            Rs 7000 <img id="remove" src={cross} />
          </div>
        </div>
        <div className="clr"></div>
      </div>

      <div className="search_box_wrapper displaydn" id="search_box_wrapper">
        <form>
          <div className="close_slider"></div>

          <div className="search_box_inner">
            <div className="search_popup_heading_wrapper">
              <div className="search_popup_heading">Filters</div>
              <div className="search_popup_purge">CLEAR ALL</div>
            </div>

            <div className="search_popup_tags">
              <div className="search_filter_name">
                Delhi <img id="remove" src={cross} />
              </div>
            </div>

            <div className="search_type_wrapper">
              <div className="search_tabs">
                <a data-toggle="#city" className="search_tag active">
                  City
                </a>
                <a data-toggle="#fee" className="search_tag">
                  Design Fee
                </a>
                <a data-toggle="#exp" className="search_tag">
                  Experience
                </a>
              </div>

              <div className="search_tabs_content">
                <div id="city">
                  <input
                    type="text"
                    name="search"
                    className="search_box"
                    placeholder="Search Cities"
                  />
                  <img className="search_btn" src={search} />

                  <span className="form-group">
                    <input type="checkbox" name="place" id="Delhi" />
                    <label for="Delhi">Delhi</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="place" id="Gurgaon" />
                    <label for="Gurgaon">Gurgaon</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="place" id="Noida" />
                    <label for="Noida">Noida</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="place" id="Chandigarh" />
                    <label for="Chandigarh">Chandigarh</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="place" id="Faridabad" />
                    <label for="Faridabad">Faridabad</label>
                  </span>
                </div>

                <div id="fee">
                  <span className="form__radio-group">
                    <input
                      type="radio"
                      checked
                      name="fee"
                      id="room"
                      value="1"
                      className="form__radio-input"
                    />
                    <label
                      className="form__label-radio form__radio-label"
                      for="room"
                    >
                      <span className="form__radio-button"></span> Per Room
                    </label>

                    <span id="rangedata1" className="rangedesc">
                      <span className="price_slab">
                        ₹ <span id="slab1"></span>
                      </span>
                    </span>

                    <span id="range1" className="rangedesc">
                      <input
                        type="range"
                        min="3000"
                        max="200000"
                        name="roomprice"
                        value="15000"
                        id="myRange1"
                        className="range_slider"
                      />
                      <table className="price_range_st_ed">
                        <td>3000</td>
                        <td align="right">200000</td>
                      </table>
                    </span>
                  </span>

                  <br />
                  <br />
                  <br />

                  <span className="form__radio-group">
                    <input
                      type="radio"
                      name="fee"
                      id="sqft"
                      value="2"
                      className="form__radio-input"
                    />
                    <label
                      className="form__label-radio form__radio-label"
                      for="sqft"
                    >
                      <span className="form__radio-button"></span> Per sq.ft.
                    </label>

                    <span
                      id="rangedata2"
                      className="rangedesc"
                      style={{ display: "none" }}
                    >
                      <span className="price_slab">
                        {" "}
                        <span id="slab2"></span> sq.ft
                      </span>
                    </span>

                    <span
                      id="range2"
                      className="rangedesc"
                      style={{ display: "none" }}
                    >
                      <input
                        type="range"
                        min="1"
                        max="200000"
                        name="roomsize"
                        value="7000"
                        id="myRange2"
                        className="range_slider"
                      />
                      <table className="price_range_st_ed">
                        <td>1 sq.ft</td>
                        <td align="right">200000 sq.ft</td>
                      </table>
                    </span>
                  </span>
                </div>

                <div id="exp">
                  <span className="form-group">
                    <input type="checkbox" name="classyear" id="class1yr" />
                    <label for="class1yr">0-1 Years</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="classyear" id="class2yr" />
                    <label for="class2yr">1-2 Years</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="classyear" id="class3yr" />
                    <label for="class3yr">2-3 Years</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="classyear" id="class4yr" />
                    <label for="class4yr">3-4 Years</label>
                  </span>

                  <span className="form-group">
                    <input type="checkbox" name="classyear" id="class5yr" />
                    <label for="class5yr">5+ Years</label>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="search_apply_btn">Apply</div>
        </form>
      </div>
    </>
  );
}

export default Filter;
