import React, { useEffect, useState } from "react";
import Header from "../components/common/header";

import flair from "../components/magazines/images/flair.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import magazineservice from "../services/magazineservice";
import Cards from "../components/magazines/cards";
import { Popover, Overlay, Spinner } from "react-bootstrap";
import filter from "../components/exploreprojects/images/filter.png";
import share from "../components/findprofessional/images/share.png";
import constants from "../services/constants";
import Footer from "../components/common/footer";
import main from "../mobile/css/main.css";
import FilterModal from "../components/magazines/filtermodal";
import Share from "../components/common/buttons/share";

const Magazines = () => {
  const [categoryshow, setCategoryShow] = useState(false);
  const [categorytarget, setCategoryTarget] = useState(null);

  const [popularityshow, setPopularityShow] = useState(false);
  const [popularitytarget, setPopularityTarget] = useState(null);

  const [categoriesByBlogs, setCategoriesByBlogs] = useState([]);
  const [sliderBlogs, setSliderBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [magazinesCategory, setMagazinesCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  const getInit = async () => {
    setLoading(true);
    const result = await magazineservice.getBlogsByCategory();
    const blogslimit = await magazineservice.getBlogsLimit();
    const magazinescategory = await magazineservice.getMagazinesCategory();

    setSliderBlogs(blogslimit);
    setCategoriesByBlogs(result);
    setMagazinesCategory(magazinescategory);

    setLoading(false);
  };

  useEffect(() => {
    getInit();
  }, []);

  const categoryPopover = (event) => {
    setCategoryShow(!categoryshow);
    setCategoryTarget(event.target);
  };

  const popularityPopover = (event) => {
    setPopularityShow(!popularityshow);
    setPopularityTarget(event.target);
  };

  const filterCategory = async (id) => {
    setLoading(true);
    const filterCategory = await magazineservice.getMagazinesCategoryFilterById(
      id
    );
    setCategoriesByBlogs([filterCategory]);
    setLoading(false);
  };

  const styleRoundClass = {
    borderRadius: "50%",
    width: "15px",
    height: "15px",
  };

  const handleSearch = async () => {
    setLoading(true);
    const searchblogs = await magazineservice.search(searchValue);
    // setProjects(searchblogs);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <FilterModal />
      <section className="mt-lg-5 linking displayn">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home" className="bred">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="#">Magazine</a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="mt-lg-2 heading">
        <div className="container">
          <div className="row">
            <div className="col-md-8 displayn">
              <h2> Magazine</h2>
              <p className="mt-lg-3 fs-6">
                Looking for a Design Fix ? Trends and Tips on how to make your
                space elegant and efficient
              </p>
              </div>
              <div className="col-md-8 mt-3 displaydn">
              <h2> <b>Magazine</b></h2>
              <p className="mt-lg-3 fs-6">
                <span className="float-end">
                  <img
                    src={filter}
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#mobilemagazinemodal"
                  />
                </span>
                <span>Looking for a Design Fix ? </span>
              </p>
            </div>
            <div className="col-md-4 mt-lg-4">
              <div className="float-end displayn">
                <div>
                  <img src={filter} alt="" /> Filters
                </div>
                <button
                  type="button"
                  className="btn  border btn-sm border-secondary me-2"
                >
                  <span
                    onClick={(e) => categoryPopover(e)}
                    style={{ cursor: "pointer" }}
                  >
                    Category
                  </span>
                  <Overlay
                    show={categoryshow}
                    target={categorytarget}
                    placement="bottom"
                    containerPadding={20}
                    rootClose={true}
                    onHide={(e) => {
                      setCategoryShow(false);
                    }}
                  >
                    <Popover id="popover-contained">
                      <Popover.Body>
                        <div className="w-100">
                          <div className="input-group-btn"></div>
                          {/* <div >
                          <p className="text-dark mt-2">Category</p>
                        </div> */}
                          <div className="m-2 text-muted">
                            {magazinesCategory.map((c) => (
                              <div
                                className="form-check"
                                key={c._id}
                                onClick={() => filterCategory(c._id)}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  {c.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </button>
                <button
                  type="button"
                  className="btn  border btn-sm border-secondary me-2"
                >
                  <span
                    onClick={(e) => popularityPopover(e)}
                    style={{ cursor: "pointer" }}
                  >
                    Popularity
                  </span>
                  <Overlay
                    show={popularityshow}
                    target={popularitytarget}
                    placement="bottom"
                    containerPadding={20}
                    rootClose={true}
                    onHide={(e) => {
                      setPopularityShow(false);
                    }}
                  >
                    <Popover id="popover-contained">
                      <Popover.Body>
                        <div className="w-100">
                          <div className="input-group-btn"></div>
                          <div>
                            <p className="text-dark mt-2">Category</p>
                          </div>
                          <div className="m-2 text-muted">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Most Viewed
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Most Liked
                              </label>
                            </div>
                          </div>
                        </div>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </button>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="btn-sm border-1"
                />
              </div>
            </div>
          </div>

          <div>
            <form className="row mt-3">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    onClick={handleSearch}
                    value={searchValue}
                  >
                    <i>
                      <FontAwesomeIcon icon={faSearch} />
                    </i>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {loading ? (
        <center>
          <Spinner animation="border" />
        </center>
      ) : (
        <>
          <section className="top-pics mt-lg-4">
            <div className="container">
              <p className="mb-3 fs-4">Our top picks</p>
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    className="active mobiledot dots"
                    aria-current="true"
                    aria-label="Slide 1"
                    
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    className="mobiledot dots"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                    // style={styleRoundClass}
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    className="mobiledot dots"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                    // style={styleRoundClass}
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    className="mobiledot dots"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                    // style={styleRoundClass}
                  ></button>
                </div>

                <div className="carousel-inner" style={{ cursor: "pointer" }}>
                  {sliderBlogs.map((limit, i) => (
                    <div
                      
                      key={i}
                      className={
                        i === 0 ? "carousel-item active" : "carousel-item"
                      }
                      data-bs-interval="2000"
                    >
                      <img
                        src={constants.apiurl + limit.horizontalimage}
                        className="d-block w-100"
                        alt="..."
                        onClick={() =>
                          (window.location.href = `blogs/${limit.title.replaceAll(
                            " ",
                            "-"
                          )}`)
                        }
                      />
                      <div className="flair">
                        <div>
                          <span className="green-recon border-0">
                            {limit.title}
                          </span>
                          <span className="float-end">
                            <Share />
                          </span>
                        </div>
                        <p className="fs-4">{limit.description}</p>
                        {/* <p>Author</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="categories mt-lg-4">
            <div className="container">
              {categoriesByBlogs.map((c) => (
                <>
                {c.blogs.length > 0 && (
                  <Cards category={c} />

                )}
                </>
              ))}
            </div>

            <div className="text-center">
              <button type="button" className="btn  text-success mt-lg-4">
                View More
              </button>
            </div>
          </section>
        </>
      )}

      {/* <div className="search_box_wrapper displaydn" id="search_box_wrapper">
        <form>
          <div className="close_slider"></div>

          <div className="search_box_inner">

            <div className="search_popup_heading_wrapper">
              <div className="search_popup_heading">Filters</div>
              <div className="search_popup_purge">CLEAR ALL</div>
            </div>

            <div className="search_popup_tags">
              <div className="search_filter_name">Delhi <img id="remove" src="images/cross.svg" /></div>
            </div>

            <div className="search_type_wrapper">
              <div className="search_tabs">
                <a data-toggle="#city" className="search_tag active">City</a>
                <a data-toggle="#fee" className="search_tag">Design Fee</a>
                <a data-toggle="#exp" className="search_tag">Experience</a>
              </div>

              <div className="search_tabs_content">

                <div id="city">
                  <input type="text" name="search" className="search_box" placeholder="Search Cities" />
                  <img className="search_btn" src="images/search.svg" />

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
                    <input type="radio" checked name="fee" id="room" value="1" className="form__radio-input" />
                    <label className="form__label-radio" for="room" className="form__radio-label">
                      <span className="form__radio-button"></span> Per Room
                    </label>

                    <span id="rangedata1" className="rangedesc">
                      <span className="price_slab">₹ <span id="slab1"></span></span>
                    </span>

                    <span id="range1" className="rangedesc">
                      <input type="range" min="3000" max="200000" name="roomprice" value="15000"
                        id="myRange1" className="range_slider" />
                      <table className="price_range_st_ed">
                        <td>3000</td>
                        <td align="right">200000</td>
                      </table>
                    </span>
                  </span>

                  <br /><br /><br />

                  <span className="form__radio-group">
                    <input type="radio" name="fee" id="sqft" value="2" className="form__radio-input" />
                    <label className="form__label-radio" for="sqft" className="form__radio-label">
                      <span className="form__radio-button"></span> Per sq.ft.
                    </label>

                  <span id="rangedata2" className="rangedesc" style={{display: "none"}}>
                      <span className="price_slab"> <span id="slab2"></span> sq.ft</span>
                    </span>

                    <span id="range2" className="rangedesc" style={{display: "none"}}>
                      <input type="range" min="1" max="200000" name="roomsize" value="7000" id="myRange2"
                        className="range_slider" />
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
      </div> */}

      <Footer />
    </>
  );
};

export default Magazines;
