import React, { useEffect, useState } from "react";
import Header from "../components/common/header";

import Kitchen from "../components/home/images/kitchen.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import "../components/blogs/css/blogs.css";
import Footer from "../components/common/footer";
import magazineservice from "../services/magazineservice";
import share from "../components/findprofessional/images/share.png"
import like from "../components/findprofessional/images/like.png"
import constants from "../services/constants";

function Blogs({ match }) {

  const [blog, setBlog] = useState({});
  const [designer, setDesigner] = useState({});

  const getInit = async () => {
    const result = await magazineservice.getBlogByTitle(match.params["title"]);
    setBlog(result);
    setDesigner(result["designer"]);
  }

  useEffect(() => {

    getInit();
  },[]);


  return (
    <>
      <Header />
      <section className="mt-lg-5 linking">
        <div className="container">
          <nav aria-label="breadcrumb" className="displayn">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <a href="/home" class="bred">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Sign up</li>
              <li className="breadcrumb-item active" aria-current="page">
              <a href="/magazines" class="bred">Magazine</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page"><a href="#">{blog.title}</a></li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="mt-lg-2 heading">

      </section>
      <section className="all mb-5">
        <div className="container">

          <div className="row childmargin">
            <div className="col-lg-9 col-sm-12">
              <div className="mb-4">
                <span className="float-start">
                  <h2> Magazine</h2>
                </span>
                <span className="float-end">
                  <button type="button" className="btn btn-sm border green-recon me-3 rounded-pill"><i> <FontAwesomeIcon icon={faArrowLeft} /></i> Previous</button>
                  <button type="button" className="btn btn-sm green text-light rounded-pill">Next Article &nbsp;<i><FontAwesomeIcon icon={faArrowRight} /></i></button>
                </span>
              </div>
              <div className="kitchen-image mt-5">
                <img src={constants.apiurl+blog.horizontalimage} alt="" className="w-100" />
              </div>

              <div className="flair-box mt-4 p-3">
                {/* <p className="green-recon border-0">FLAIR 1</p> */}
                {/* <div className="f-2">
                  <span><p className="card-title fs-4">{blog.title}</p></span>
                  
                  <span className="float-end">
                  <span><img src={share} alt=""  className="me-2"  /></span>
                  <span><img src={like} alt=""/></span>
                  
                  </span>
                </div> */}
                {/* <p className="text-muted">{blog.date}</p> */}
                {/* <p className="yellow p-2 mt-3 mb-3 text-center rounded">{designer && designer.name}</p> */}
                <p className="text-muted mt-2">
                  <div className="blogstyle">
                  <div dangerouslySetInnerHTML={{ __html: blog.rowhtml }}></div>
                  </div>
                </p>

                {/* <div className="para-kitchen mt-4">
                  <h4>How to renovate your kitchen</h4>
                  <p className="mb-3 text-muted mt-5">
                    <q>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </q>
                  </p>
                  <p className="text-muted ">
                    <q>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </q>
                  </p>
                </div> */}
              </div>
            </div>

            <div className="col-lg-3 col-sm-12 ">
              {/* <div>
                <p className="fs-5">About the Designer</p>
                <div className="author mt-3 p-3 text-center">
                  <img
                    src={constants.apiurl+designer.image}
                    alt=""
                    className="w-50"
                  />
                  <p className="mb-3 fs-5">{designer && designer.name}</p>
                  <p>
                    <q>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </q>
                  </p>
                </div>
              </div> */}

              <div className="relate-article mt-3">
                <h5>Related Articles</h5>
                <div className=" mt-3">
                  <img src={Kitchen} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="green-recon border-0">FLAIR 1</p>
                    <p className="card-title fs-4">{blog.title}</p>
                  </div>
                </div>
                <div className=" mt-3">
                  <img src={Kitchen} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="green-recon border-0">FLAIR 1</p>
                    <p className="card-title fs-4">{blog.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blogs;