import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import child from "../components/home/images/child.png"
import main from "../mobile/css/main.css"
function Csr(props) {
  return (
    <>
      <Header />
      <section className="company-values">
        <div className="container pt-lg-5">
          <h2 className="p-lg-5 text-center">  <b>Corporate Social Responsibility</b> </h2>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-xs-12 p-lg-5 order-2">
              <h4>
                <b>Help the Homeless</b>
              </h4>
              <p className="mt-lg-5">
                As you aspire to build the house of your dreams, we aspire to
                help those who dream of a house. At iDesign, we value helping
                you create your homes as much as we value helping our community.
                We focus on joining hands with organizations who can help and on
                becoming an organization driven to help those in need to the
                best of our abilities.Every sign up with iDesign assists in
                contributing to help the homeless.Building the community while
                we build your home!
              </p>
            </div>
            <div className="col-lg-5 col-xs-12 p-lg-5 text-center order-1 childmargin">
              <img src={child} alt="" className="w-75" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Csr;
