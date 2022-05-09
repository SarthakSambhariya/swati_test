import React, {useState, useEffect} from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import BrandsCards from "../../components/brands/brandsCards";
import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";
import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";
import "../../components/dashboard/css/style.css";
import authService from "../../services/authService";
import brandservice from "../../services/brandservice";
import constants from "../../services/constants";

import BrandPage from "../../layouts/Brands";

function Dbrands(props) {
  const [brandCategory, setBrandCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBrandsCategory = async () => {

    const brandscategory = await brandservice.getBrandCategories();
    const brands = await brandservice.getBrands();

    setBrandCategory(brandscategory);
    setBrands(brands);
    setLoading(false);

  }

  useEffect(() =>{
    getBrandsCategory();
  },[]);

  if (authService.getToken() === null) return <Redirect to="/" />;
  return (
    <section id="container">
      <Header />
      <Sidemenu />

      <section id="main-content">
        <section className="wrapper">
            
          <section className="mt-5 heading">
            <div className="container">
              <h2> Brand Deals</h2>
              <p className="mt-lg-3 fs-5">Featured Deals</p>
            </div>
          </section>

          <section className="mt-5 cat">
            <div className="container">
              <button
                type="button"
                className="btn btn-light border border-secondary pl-2"
              >
                City
              </button>
              <div className="cities-deal">
                <br />
              {brandCategory.map(c =>(
            <span key={c._id} onClick={() => alert(`${c.name} filter`) } style={{cursor: "pointer"}} className="active">
              <img src={constants.apiurl+c.image  } alt="" className="w-25 h-25"/>
              <p>{c.name}</p>
            </span>
            ))}
              </div>

            </div>
          </section>

          <section className="all-deals mt-lg-5">
            <div className="container">
              <div className="deals">
                <h3>All Deals</h3>
              </div>
              {loading ? <center><Spinner animation="border" /></center> : (
            brands.map(brand=> <BrandsCards key={brand._id} name={brand.name} category={brand.brandcategory.name} description={brand.description} /> )
            
          ) }
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Dbrands;
