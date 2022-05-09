import React from "react";

import asianback from "../brands/images/asian-back.png";

function BrandDetailsCards(props) {
  return (
    <>
      <div className="col-md-4 col position-relative ">
        <div className="m-2">
        <img src={asianback} alt="" className="w-100" />
        <div className="main-deal">
          <div className="deal-fade">
            <p>Wall Paint</p>
            <h4>15 -20 % off</h4>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default BrandDetailsCards;
