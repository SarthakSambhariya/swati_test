import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import BrandDetailsCards from "../components/brands/branddetailscards";
import paint from "../components/brands/images/paint.png";
import "../components/magazines/css/magazine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faMapLocation,
  faStar,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../components/common/footer";
import brandservice from "../services/brandservice";
import { toast } from "react-toastify";
import authService from "../services/authService";
import brandreviewservice from "../services/brandreviewservice";

function BrandsDetails({ match, location }) {
  const [show, setShow] = useState(false);
  const [brands, setBrands] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [user, setUser] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [reviews, setReviews] = useState({
    brandId: "",
    userId: "",
    title: "",
    review: "",
    rating: "",
  });
  const getInit = async () => {
    const result = await brandservice.getBrandDetails(match.params["id"]);
    setBrands(result);
  };

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
    getInit();
  }, []);

  const handleReview = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authService.getLocalStorage("id")) {
    }

    reviews["userId"] = authService.getLocalStorage("id");
    reviews["brandId"] = match.params["id"];
    reviews["rating"] = ratingValue;

    
    try {
      const response = await brandreviewservice.review(reviews);
      toast.success('Thanks for Your Review', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('SomeThing wrong', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setShow(false);
    setReviews({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <section className="mt-lg-2 heading">
        <div className="container">
          <nav aria-label="" className="mt-4 displayn">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home" className="bred">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a href="/brands" className="bred">
                  Brand Deals
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="#">{brands.company}</a>
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="mt-4 mb-4 d-flex">
                <Link to="/brands" className="fs-3 text-dark border-0 pe-3">
                  ❮
                </Link>
                <h3 className="mt-1">{brands.company}</h3>
              </div>
              <div className="">
                <span>Address: </span> &nbsp; &nbsp;
                <span className="form-control-spanlaintext">
                  <q>{brands.address}</q>
                </span>
              </div>
              <br />
              <div className="">
                <span>Market: </span> &nbsp; &nbsp;
                <span className="form-control-spanlaintext">
                  <q>Lorem ipsum dolor sit amet,</q>
                </span>
              </div>
              <br />
              <div className="d-grid gap-1" id="displayn">
                <button className="btn green text-light" onClick={() => window.location.href=`https://www.google.com/maps/search/${brands.address}`} type="button">
                  <i>
                    {" "}
                    <FontAwesomeIcon icon={faLocation} />
                  </i>{" "}
                  Directions
                </button>
                <button
                  className="btn blue text-light"
                  type="button"
                  onClick={() => setShowNumber(!showNumber)}
                >
                  <i>
                    {" "}
                    <FontAwesomeIcon icon={faPhone} />
                  </i>{" "}
                  {showNumber ? brands.number : "Contact"}
                </button>
              </div>

              <div className="displaydn brand-btn">
                <button className="btn green text-light" type="button">
                  <i>
                    {" "}
                    <FontAwesomeIcon icon={faLocation} />
                  </i>{" "}
                  Directions
                </button>{" "}
                &nbsp;
                <button
                  className="btn blue text-light"
                  type="button"
                  onClick={() => alert(brands.phoneNumber)}
                >
                  <i>
                    {" "}
                    <FontAwesomeIcon icon={faPhone} />
                  </i>{" "}
                  Contact
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-sm-12 mt-3">
              <div className="row displayn">
                <div className="col-md-6">
                  <img src={paint} alt="" className="w-100" />
                </div>
                <div className="col-md-6">
                  <img src={paint} alt="" className="w-100" />
                </div>
              </div>
              <div className="displaydn">
                <div className="col-md-6 scrollmenu">
                  <img src={paint} alt="" className="w-75" />
                  <img src={paint} alt="" className="w-75" />
                </div>
              </div>
            </div>
          </div>

          <section className="mt-5">
            <div className="container">
              <p>All Deals</p>
              <br />
              <div className="row mt-3 displayn">
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
                <BrandDetailsCards />
              </div>

              <div className="mob-shadow mb-3 displaydn">
                <div className="row g-0">
                  <div className="w-75">
                    <div className="card-body p-4">
                      <p className="card-text text-danger fs-6">
                        15% off on basic paints jobs
                      </p>
                    </div>
                  </div>
                  <div className="w-25">
                    <img src={paint} alt="" className="w-100 h-100" />
                  </div>
                </div>
              </div>

              <section className="container displayn">
                <h4 className="mt-4">Review</h4>
                <div className="row ">
                  <div className="col-lg-8 form-enquiry p-4">
                    <div className="row justify-content-center">
                    {show && (
                      <div className="rating col-md-4">
                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input
                          type="radio"
                          id="star2"
                          name="rate"
                          value="2"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input
                          type="radio"
                          id="star1"
                          name="rate"
                          value="1"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star1" title="text">
                          1 star
                        </label>
                      </div>
                    )}
                    </div>
                    <div className="text-center">
                      <p
                        className="pt-5 fs-4"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target={!user && "#staticBackdrop"}
                        onClick={user && handleReview}
                      >
                        Write a Review
                      </p>
                    </div>
                  </div>

                  {show && (
              <div className="col-lg-8 form-enquiry mt-4">
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        id="id_title"
                        value={reviews.title}
                        placeholder="Add a title"
                        name="title"
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="id_review"
                      rows="3"
                      placeholder="Written review"
                      value={reviews.review}
                      name="review"
                      onChange={handleChange}
                      required={true}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <h4 className="p-1">
                      <button type="submit" className="btn blue text-light">
                        Submit
                      </button>
                    </h4>
                  </div>
                </form>
              </div>
            )}
                </div>
              </section>

              <section className="displaydn">
                <h4 className="mt-4">Review</h4>
                <div className="row ">
                  <div className="col-lg-8 form-enquiry p-4">
                    <div className="row justify-content-center">
                    {show && (
                      <div className="rating col-md-4">
                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input
                          type="radio"
                          id="star2"
                          name="rate"
                          value="2"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input
                          type="radio"
                          id="star1"
                          name="rate"
                          value="1"
                          onClick={(e) => setRatingValue(e.target.value)}
                        />
                        <label for="star1" title="text">
                          1 star
                        </label>
                      </div>
                    )}
                    </div>
                    <div className="text-center">
                      <p
                        className="pt-5 fs-4"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target={!user && "#staticBackdrop"}
                        onClick={user && handleReview}
                      >
                        Write a Review
                      </p>
                    </div>
                  </div>

                  {show && (
              <div className="col-lg-8 form-enquiry mt-4">
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        id="id_title"
                        value={reviews.title}
                        placeholder="Add a title"
                        name="title"
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="id_review"
                      rows="3"
                      placeholder="Written review"
                      value={reviews.review}
                      name="review"
                      onChange={handleChange}
                      required={true}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <h4 className="p-1">
                      <button type="submit" className="btn blue text-light">
                        Submit
                      </button>
                    </h4>
                  </div>
                </form>
              </div>
            )}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default BrandsDetails;
