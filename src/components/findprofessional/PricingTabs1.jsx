import React from "react";
// import "./Pricingtabs.css";
import "./Pricingtabs1.css";
import Card from "react-bootstrap/Card";
const PricingTabs1 = () => {
  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  return (
    <React.Fragment>
      <div class="tab">
        <button
          class="tablinks "
          onClick={(evt) => openCity(evt, "wardrobe-prices")}
        >
          <p
            style={{ fontFamily: "Inter", fontSize: "1em", fontWeight: "600" }}
          >
            Wardrobe
          </p>
        </button>
        <button
          class="tablinks"
          onClick={(evt) => openCity(evt, "kitchen-prices")}
        >
          <p
            style={{ fontFamily: "Inter", fontSize: "1em", fontWeight: "600" }}
          >
            Kitchen
          </p>
        </button>
      </div>
      <div id="wardrobe-prices" class="tabcontent">
        <p
          class="panel-title my-3"
          style={{ fontFamily: "Inter", fontSize: "1.5em", fontWeight: "600" }}
        >
          Wardrobe Prices
        </p>
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
              Prices on per sqft basis of the elevation - front surface
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

      <div id="kitchen-prices" class="tabcontent">
        <p
          class="panel-title my-3"
          style={{ fontFamily: "Inter", fontSize: "1.5em", fontWeight: "600" }}
        >
          Kitchen Prices
        </p>
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
              Prices on per sqft basis of the elevation - front surface
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

      <div id="Tokyo" class="tabcontent">
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
    </React.Fragment>
  );
};

export default PricingTabs1;
