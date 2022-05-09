import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";

import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";
import "../../components/dashboard/css/style.css";
import constants from "../../services/constants";
import userservice from "../../services/userservice";
import { Popover, Overlay } from "react-bootstrap";
import filter from "../../components/exploreprojects/images/filter.png"
import authService from "../../services/authService";
import { Redirect } from "react-router-dom";
import b2bservice from "../../services/b2bservice";
import profileImage from "../../components/home/images/profile.png";
import CallButton from "../../components/common/buttons/callbutton";
import WhatsApp from "../../components/common/buttons/whatsapp";
import jwtDecode from "jwt-decode";

function Designers(props) {

  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cityshow, setCityShow] = useState(false);
  const [citytarget, setCityTarget] = useState(null);

  const [feeshow, setFeeShow] = useState(false);
  const [feetarget, setFeeTarget] = useState(null);

  const getInit = async (id) => {
    setLoading(true);
    const designerresult = await userservice.getDesignersByUser(id);
    
    let params = "";
    
    designerresult.map((m) => {
      params += `designerId=${m["designerId"]}&`
    })
    
    if (designerresult.length > 0 ){
      const des = await b2bservice.getlistDesignersFilter(params);
  
      setDesigners(des);

    }
    setLoading(false);
  };

  

  useEffect(() => {
    const user = jwtDecode(localStorage.getItem("itoken"));
    getInit(user["_id"]);
  }, []);

  const cityPopover = (event) => {
    setCityShow(!cityshow);
    setCityTarget(event.target);
    setFeeShow(false);
  };


  const feePopover = (event) => {
    setFeeShow(!feeshow);
    setFeeTarget(event.target);
    setCityShow(false);
  }

  if (authService.getToken() === null) return <Redirect to="/" />;
  return (
    <section id="container">
      <Header />
      <Sidemenu />

      <section id="main-content">
        <section className="wrapper">
          <div className="mt-4 p-lg-4">
            <div className="row">
              <div className="col-lg-6 col-xs-12">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link btn-sm prof-btn w-100 active"
                      id="liked"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-liked"
                      type="button"
                      role="tab"
                      aria-controls="pills-liked"
                      aria-selected="true"
                    >
                      Liked Designers
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link btn-sm prof-btn w-100"
                      id="design"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-design"
                      type="button"
                      role="tab"
                      aria-controls="pills-design"
                      aria-selected="false"
                    >
                      Liked Contractors
                    </button>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6 col-xs-12">
                <div>
                  <span><img src={filter} alt="" /> Filters</span>
                  <span className="float-end">Reset All</span>
                </div>
                <div className="city-filter explore-filter row gx-3 text-center">
                  <div className="col">
                    <div className="border p-1 rounded" onClick={(e) => cityPopover(e)} style={{ cursor: "pointer" }} >City</div>
                    <Overlay
                      show={cityshow}
                      target={citytarget}
                      placement="bottom"

                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Body>

                          <div className="w-100">
                            <input type="text" className="form-control form-control-sm" placeholder="Search" name="search" />
                            <div className="input-group-btn">
                            </div>
                            <div >
                              <p className="text-muted mt-2">Recent</p>
                            </div>
                            <div className="m-2">
                              <button type="button" className="btn btn-secondary btn-sm blue">Delhi</button>
                              <button type="button" className="btn btn-secondary btn-sm">Gurgaon</button>
                              <button type="button" className="btn btn-secondary btn-sm">Chandigarh</button>
                              <button type="button" className="btn btn-secondary btn-sm">Noida</button>
                            </div>
                          </div>

                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                  <div className="col">
                    <div className="active border p-1 rounded" style={{ cursor: "pointer" }} onClick={(e) => feePopover(e)}>
                      Design fee
                    </div>

                    <Overlay
                      show={feeshow}
                      target={feetarget}
                      placement="bottom"

                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Body>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault" >
                              Per room
                            </label>
                          </div>
                          <input type="range" className="form-range" id="customRange2" />
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault" >
                              Project 1%
                            </label>
                          </div>
                          <input type="range" className="form-range" id="customRange1" />
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault" >
                              per sq. ft.
                            </label>
                          </div>
                          <input type="range" className="form-range" id="customRange3" />
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                  <div className="col">
                    <div className="border p-1 rounded">Profesional</div>
                  </div>
                  <div className="col">
                    <div className="border p-1 rounded">Most Viewed</div>
                  </div>
                  <div className="col">
                    <div className="blue text-light border p-1 rounded">Most Liked</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-liked"
                role="tabpanel"
                aria-labelledby="liked"
              >
                <div className="row mt-lg-3">

                  {loading ? <center><Spinner animation="border" /></center> : designers.map(d => (
                    <div className="col-lg-6 col-xl-4 mb-4">
                      <div className="border shadow-lg rounded-3">
                        <div>
                          <div className="row g-0 p-3 text-start shadow">
                            <div className="col-md-3 align-self-center">
                              <img
                                src={d.imageUrl.original !== "" ? d.imageUrl.original : profileImage }
                                alt=""
                              />
                            </div>
                            <div className="col-md-8 ms-3">
                              <div className="card-body">
                                <h5 className="card-title">{d.firstName}</h5>
                                <p className="card-text">{"category"}</p>
                                <p>
                                  <span>
                                    Experience<b> {d.workExperience} </b>
                                  </span>
                                </p>
                              </div>
                            </div>
                            <p className="card-text">
                              <span className="star-icon yellow">
                                4.3 <i className="fa fa-star"></i>
                              </span>
                              <span>(23 Reviews)</span>
                            </p>
                            <p className="liked-ins float-start mt-4" style={{width:"auto"}}>
                              Design fee : ₹{d.fees && d.fees.zoomPrice}/room
                            </p>
                          </div>

                          <div className="bg-transparent border-success d-md-flex">
                            <div className="d-grid col-6 mx-auto">
                              <CallButton number={d.phoneNumber} listingName={"Designer"} />
                              </div>
                            <div className="d-grid col-6 mx-auto" >
                              <WhatsApp phoneNumber={d.phoneNumber} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Designers;
