import React, {useEffect, useState} from "react";
import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";
import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";
import "../../components/dashboard/css/style.css";
import constants from "../../services/constants";
import userservice from "../../services/userservice";
import _ from "lodash";
import { Spinner } from "react-bootstrap";
import authService from "../../services/authService";
import { Redirect } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Magazines(props) {

  const [blogs, setBlogs ] = useState([]);

  const [first, setFirst ] = useState([]);
  const [second, setSecond ] = useState([]);
  const [third, setThird ] = useState([]);
  const [final, setFinal ] = useState([]);

  const [loading, setLoading] = useState(true);

  const getInit = async (id) => {
    const blogresult = await userservice.getBlogsByUser(id);
    setBlogs(blogresult);
    setLoading(false);

  }

  useEffect(() => {
    getInit(localStorage.getItem("id"));
    
  },[]);
  
  if (authService.getToken() === null) return <Redirect to="/" />;
  return (
    <section id="container">
      <Header />
      <Sidemenu />
    {loading ? <center> <Spinner animation="border" /> </center> : (

      <section id="main-content">
        <section className="wrapper">

          <section className="filters mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-12">
                  <h2>Magazine</h2>
                  <h4>Your Favourite reads</h4>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div className="city-filter explore-filter">
                    <span>City</span>
                    <span>Design fee</span>
                    <span>Profesional</span>
                    <span>Most Viewed</span>
                    <span>Most Liked</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="project-details mt-5">
            <div className="container">
              <div className="row">

                {blogs.length > 0 && (
                  <div className="col-lg-7 col-xs-12">
                    <div className="card card-des">
                      <img
                        className="card-img-top"
                        src={constants.apiurl+blogs[0].image}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p className="card-text fs-6">
                        { blogs.length > 0 ? blogs[0].title : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                )}

                {blogs.length >= 2 && (
                  <div className="col-lg-5 col-xs-12">
                    <div className="card card-des">
                      <img
                        src={constants.apiurl+blogs[1].image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text fs-6">
                        {blogs[1].title}
                        </p>
                      </div>
                    </div>
                  </div>

                )}
              </div>

              <div className="row">
                { blogs.length >= 3 && (
                  <div className="col-lg-5 col-xs-12">
                    <div className="card card-des">
                      <img
                        src={constants.apiurl+blogs[2].image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text fs-6">
                        {blogs[2].title}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {blogs.length >= 4 && (
                  <div className="col-lg-7 col-xs-12">
                    <div className="card card-des">
                      <img
                        className="card-img-top"
                        src={constants.apiurl+blogs[3].image}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p className="card-text fs-6">
                        {blogs[3].title}
                        </p>
                      </div>
                    </div>
                  </div>

                )}
              </div>

              <div className="row mt-lg-3">
                {blogs.map(b => (
                <div className="col-lg-4">
                  <div className="card card-des">
                    <img
                      src={constants.apiurl+b.image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-text fs-6">
                        {b.title}
                      </p>
                    </div>
                  </div>
                </div>

                ))}
                
              </div>
            </div>
          </section>
        </section>
      </section>
    )}
    </section>
  );
}

export default Magazines;
