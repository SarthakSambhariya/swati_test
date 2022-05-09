import React from "react";
import "./Pricingtabs.css";
import Card from "react-bootstrap/Card";
const PricingTabs = () => {
  return (
    <React.Fragment>
      <div class="mx-3">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#tab1" data-toggle="tab">
              Wardrobe
            </a>
          </li>
          <li>
            <a href="#tab2" data-toggle="tab">
              Kitchen
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane active" id="tab1">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    data-toggle="collapse"
                    data-parent=".tab-pane"
                    href="#collapseOne"
                  >
                    Wardrobe Prices
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in">
                <div class="panel-body">
                  <p className="mb-3 fs-5 my-3">Wardrobe Prices</p>
                  <Card
                    className="mb-3 fs-5 "
                    style={{
                      width: "28em",
                      backgroundColor: "#F6F6F6",
                      boxShadow: "none",
                      border: "none",
                    }}
                  >
                    <div className=" mb-3 fs-5 my-4">
                      <p className="mx-4" style={{ fontSize: "0.9em" }}>
                        Prices on per sqft basis of the elevation - front
                        surface
                      </p>
                      <p className="my-3 mx-4" style={{ fontSize: "0.6em" }}>
                        -inner surfaces to be finished in liner laminate
                      </p>
                      <div className="mx-4">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>Normal SF laminated</p>
                          <b style={{ fontSize: "0.8em" }}>₹ 150 per/sqft</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>High gloss laminated</p>
                          <b style={{ fontSize: "0.8em" }}>₹ 150 per/sqft</b>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="tab2">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    data-toggle="collapse"
                    data-parent=".tab-pane"
                    href="#collapseTwo"
                  >
                    Kitchen Prices
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse">
                <div class="panel-body">
                  <p className="mb-3 fs-5 my-3">Kitchen Prices</p>
                  <Card
                    className="mb-3 fs-5 "
                    style={{
                      width: "28em",
                      backgroundColor: "#F6F6F6",
                      boxShadow: "none",
                      border: "none",
                    }}
                  >
                    <div className=" mb-3 fs-5 my-4">
                      <p className="mx-4" style={{ fontSize: "0.9em" }}>
                        Prices on per sqft basis of the elevation - front
                        surface
                      </p>
                      <p className="my-3 mx-4" style={{ fontSize: "0.6em" }}>
                        -inner surfaces to be finished in liner laminate
                      </p>
                      <div className="mx-4">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>Normal SF laminated</p>
                          <b style={{ fontSize: "0.8em" }}>₹ 150 per/sqft</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>High gloss laminated</p>
                          <b style={{ fontSize: "0.8em" }}>₹ 150 per/sqft</b>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          {/* <div className=" mb-3 fs-5 my-4">
            <p className="" style={{ fontSize: "1em" }}>
              Images
            </p>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PricingTabs;
