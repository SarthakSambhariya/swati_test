import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";
import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";
import "../../components/dashboard/css/style.css";
import filter from "../../components/exploreprojects/images/filter.png"
import ProjectsCards from "../../components/dashboard/projects/projectscard";
import constants from "../../services/constants";
import projectservice from "../../services/projectservice";
import { Popover, Overlay } from "react-bootstrap";
import authService from "../../services/authService";
import { Redirect } from "react-router-dom";


function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cityshow, setCityShow] = useState(false);
  const [citytarget, setCityTarget] = useState(null);

  const [feeshow, setFeeShow] = useState(false);
  const [feetarget, setFeeTarget] = useState(null);

  const getInit = async () => {
    const result = await projectservice.getExploreProjects();
    setProjects(result);
    setLoading(false);
  };

  useEffect(() => {
    getInit();
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
    <>
      <section id="container">
        <Header />
        <Sidemenu />

        <section id="main-content">
          <section className="wrapper">
            <section className="filters mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 col-md-12">
                    <h2>My Inspiration</h2>
                  </div>
                  <div className="col-lg-7 col-md-12">
                    <div>
                      <span><img src={filter} alt="" /> Filters</span>
                      <span className="float-end text-primary">Reset All</span>
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
              </div>
            </section>

            <section className="project-details mt-5">
              <div className="container">
                <div className="row">
                  {loading ? <center><Spinner animation="border" /></center> : projects.map((p) => (
                    <ProjectsCards
                      id={p._id}
                      projectId={p.projectId}
                      likes={12}
                      key={p._id}
                    />
                  ))}
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="get-started p-2">
                      <p className="mt-4 mb-5">
                        Still not sure?
                        <br />
                        Let idesign send you instant recommendations
                      </p>
                      <button
                        type="button"
                        className="btn me-2 start text-light"
                      >
                        Get Started
                      </button>
                      <p className="mt-5 mb-5">
                        Select your space, answer a few questions and we will
                        connect you to the best iDesign pros out here.
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Projects;
