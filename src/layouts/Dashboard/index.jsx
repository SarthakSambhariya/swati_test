import React, { useEffect, useState } from "react";
import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";

import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";
import userservice from "../../services/userservice";
import Idesign from "./components/home/idesign";
import brandservice from "../../services/brandservice";
import constants from "../../services/constants";
import { Spinner } from "react-bootstrap";
import BrandsCards from "../../components/brands/brandsCards";
import authService from "../../services/authService";
import { Redirect } from "react-router-dom";
import designerservice from "../../services/designerservice";
import projectservice from "../../services/projectservice";
import b2bservice from "../../services/b2bservice";
import LikedProject from "./common/likedproject";
import jwtDecode from "jwt-decode";

function Dashboard(props) {
  const [blogs, setBlogs] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingDesigner, setLoadingDesigner] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loading, setLoading] = useState(false);

  const getInit = async (id) => {
    setLoading(false)
    // const blogresult = await userservice.getBlogsByUser(id);
    const designerresult = await designerservice.getlikedDesignerByUserId(id);
    console.log(designerresult);
    let params = "";
    designerresult.map((m) => {
      if (m["designerId"]) {
        params += `designerId=${m["designerId"]}&`;
      }
    });

    if (params) {
      const des = await b2bservice.getlistDesignersFilter(params);
      setDesigners(des);
    }

    const projectresult = await projectservice.getlikedProjectsByUserId(id);
    const brandsresult = await brandservice.getBrands();

    // if (blogresult.length > 0) {
    //   setBlogs(blogresult[0]);
    // }

    setLoadingDesigner(false);
    setProjects(projectresult);
    setLoadingProjects(false);
    setBrands(brandsresult);
    setLoading(true);
  };

  useEffect(() => {
    const user = jwtDecode(localStorage.getItem("itoken"));
    getInit(user["_id"]);
  }, []);

  if (authService.getToken() === null) return <Redirect to="/" />;
  return (
    <>
      <section id="container">
        <Header />

        <Sidemenu />

        {!loading ? (
                <center>
                  <Spinner animation="border" />
                </center>
              ) : (

        <section id="main-content">
          <section className="wrapper">
            <div className="container">
              <div className="pros row">
                <div className="d-flex flex-row bd-highlight mt-3">
                  <div className="p-2 bd-highlight interfont">
                    <h3>iDesign Pros you like</h3>
                  </div>
                  {/* <div className="p-2 bd-highlight">
                    <button
                      type="button"
                      className="btn btn-sm float-end imphome rounded-pill"
                    >
                      View All
                    </button>
                  </div> */}
                </div>
              </div>

              {loadingDesigner ? (
                <center>
                  <Spinner animation="border" />
                </center>
              ) : (
                designers.map((d) => <Idesign design={d} />)
              )}

              <div className="liked-fav">
                <div className="container overflow-hidden">
                  <div className="row gx-5">
                  {projects.length > 0 && (

                    <div className="col-lg-4 col-xs-12">
                      <div className="interfont">
                        <h4>Liked Photos and Projects</h4>
                        <div
                          id="carouselExampleIndicators"
                          className="carousel slide mt-4"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-indicators">
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators"
                              data-bs-slide-to="0"
                              className="active"
                              aria-current="true"
                              aria-label="Slide 1"
                            ></button>
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators"
                              data-bs-slide-to="1"
                              aria-label="Slide 2"
                            ></button>
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators"
                              data-bs-slide-to="2"
                              aria-label="Slide 3"
                            ></button>
                          </div>
                          <div className="carousel-inner">
                            {projects.length > 0 && projects.map((project, index) => (
                              <LikedProject active={index === 0 ? true: false }  project={project} />
                            )) }
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                    <div className="col-lg-8 col-xs-12">
                      <div className="p-3">
                        <h3 className="interfont">Favorite reads</h3>
                        <div className="card">
                          <img
                            src={constants.apiurl + blogs.image}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <h4 className="card-text">{blogs.title}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                
                  </div>
                </div>
              </div>

              <div className="best-deals mt-5">
                <h3 className="interfont">
                  We have got some of the best deals for you
                </h3>
                {loading ? (
                  <center>
                    <Spinner animation="border" />
                  </center>
                ) : (
                  brands.map((brand) => (
                    <BrandsCards
                      key={brand._id}
                      id={brand._id}
                      name={brand.name}
                      category={brand.brandcategory.name}
                      description={brand.description}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        </section>

              )}      
      </section>
    </>
  );
}

export default Dashboard;
