import React, { useEffect, useState } from "react";
import Header from "../components/common/header";

import vector from "../components/home/images/vector.png";
import sofa from "../components/home/images/sofa.png";

import lamp from "../components/home/images/lamp.png";
import kichenicon from "../components/home/images/kichenicon.png";
import wm from "../components/home/images/wm.png";
import bath from "../components/home/images/bath.png";
import bed from "../components/home/images/bed.png";
import swe from "../components/home/images/swe.png";
import wall from "../components/home/images/wall.png";
import material from "../components/home/images/material.png";

import "../components/brands/css/brand.css";
import BrandsCards from "../components/brands/brandsCards";
import brandservice from "../services/brandservice";
import constants from "../services/constants";
import Footer from "../components/common/footer";
import { Spinner } from "react-bootstrap";
import { Popover, Overlay } from "react-bootstrap";
import main from "../mobile/css/main.css";
import FilterModal from "../components/findprofessional/filtermodal";
import Pagination from "../components/common/pagination";

const Brands = ({ location }) => {
  const [page, setPage] = useState(1);
  const [cityshow, setCityShow] = useState(false);
  const [citytarget, setCityTarget] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [brandCategory, setBrandCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("All Deals");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const getBrandsCategory = async () => {
    setLoading(true);
    let pageNo = 1;
    let params = "";
    try {
      pageNo = location.search.split("?")[1].split("=")[1];
      setPage(parseInt(pageNo));
    } catch (error) {}
    const skip = parseInt(pageNo - 1) * 5;
    if (skip) {
      params += `&skip=${skip}`;
    }

    const brandscategory = await brandservice.getBrandCategories();
    let count = 0;
    brandscategory.map((b) => (count += b.brands.length));
    setTotalCount(count);
    const brands = await brandservice.getBrands(skip);

    setBrandCategory(brandscategory);
    setBrands(brands);
    setLoading(false);
  };

  useEffect(() => {
    getBrandsCategory();
  }, []);

  const cityPopover = (event) => {
    setCityShow(!cityshow);
    setCityTarget(event.target);
  };
  const handleCityFilter = async (name) => {
    const elms = document.getElementsByClassName("sbtn");
    Object.entries(elms).map((elm) => {
      elm[1].classList.remove("blue");
    });

    const elm = document.getElementById(`id_${name}`);
    elm.classList.add("blue");
    const brand = await brandservice.getBrandsByCity(name);
    setBrands(brand);
  };

  const handleCategoryFilter = async (id, name, count) => {
    setCategoryName(`${name}(${count})`);
    const brand = await brandservice.getBrandsByCategory(id);
    setBrands(brand["brands"]);
  };

  return (
    <>
      <Header />
      <FilterModal />
      <section className="mt-lg-5 linking">
        <div className="container">
          <nav aria-label="breadcrumb" className="displayn">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home" className="bred">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="#">Brand Deals</a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="mt-lg-5 heading">
        <div className="container">
          <h2 className="mt-3"> Brand Deals</h2>
          <p className="mt-lg-3 text-muted fs-5 displayn">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>
        </div>
      </section>

      <section className="mt-4 cat">
        <div className="container">
          <p className="fs-4">
            <b>Categories</b>
          </p>
          <div className="city-filter mt-3 mb-2">
            <span
              className="displayn"
              onClick={(e) => cityPopover(e)}
              style={{ cursor: "pointer" }}
            >
              City
            </span>
            <span
              className="displaydn w-25"
              data-bs-toggle="modal"
              onClick={(e) => cityPopover(e)}
              data-bs-target="#mobilebrandmodal"
              style={{ cursor: "pointer" }}
            >
              City
            </span>
            <Overlay
              show={cityshow}
              target={citytarget}
              placement="bottom"
              containerPadding={20}
              rootClose={true}
              onHide={(e) => {
                setCityShow(false);
              }}
            >
              <Popover id="popover-contained">
                <Popover.Body>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search"
                      name="search"
                    />
                    <div className="input-group-btn"></div>
                    <div>
                      <p className="text-muted mt-2">Recent</p>
                    </div>
                    <div className="m-2">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm blue me-2 sbtn"
                        onClick={() => handleCityFilter("delhi")}
                        id="id_delhi"
                      >
                        Delhi
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm  me-2 sbtn"
                        onClick={() => handleCityFilter("gurgaon")}
                        id="id_gurgaon"
                      >
                        Gurgaon
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm me-2 sbtn"
                        onClick={() => handleCityFilter("chandigard")}
                        id="id_chandigard"
                      >
                        Chandigarh
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm me-2 sbtn"
                        onClick={() => handleCityFilter("noida")}
                        id="id_noida"
                      >
                        Noida
                      </button>
                    </div>
                  </div>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
          <div className>
            <div className="scrollmenu badge-button displaydn p-0">
              {brandCategory.map((b) => (
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() =>
                    handleCategoryFilter(b._id, b.name, b.brands.length)
                  }
                >
                  {b.name}
                  <span className="badge bg-danger rounded-circle">
                    {b.brands.length}
                  </span>
                </button>
              ))}
            </div>
            <div className="d-flex scrollmenu">
              <div
                className="bad col-1 displayn"
                // onClick={() => alert(`all`)}
                style={{ cursor: "pointer" }}
              >
                <img src={""} alt="" className="w-50" />

                <p>All</p>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-2">
                  {totalCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>

              {brandCategory.map((c) => (
                <button
                  className="col-1 bad displayn"
                  key={c._id}
                  onClick={() =>
                    handleCategoryFilter(c._id, c.name, c.brands.length)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={constants.apiurl + c.image}
                    alt=""
                    className="w-50"
                  />

                  <p>{c.name}</p>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-2">
                    {c.brands.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!loading && (
        <section className="all-deals mt-lg-5">
          <div className="container">
            <div className="deals ">
              <p className="fs-4">
                <b>{categoryName}</b>
              </p>
            </div>
            {loading ? (
              <center>
                <Spinner animation="border" />
              </center>
            ) : (
              brands.map((brand) => (
                <BrandsCards
                  key={brand._id}
                  id={brand._id}
                  company={brand.company}
                  // category={brand.brandcategory.name}
                  description={brand.product}
                  location={brand.location}
                  number={brand.number}
                />
              ))
            )}
          </div>
        </section>
      )}
      <br />
      <br />

      <Pagination page={page} location={location} pageCount={pageCount} pageSize={3} />

      <Footer />
    </>
  );
};

export default Brands;
