import React, { useState } from "react";
import constants from "../../../../services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import tick from "../../../../components/findprofessional/images/tick.png";
import profile from "../../../../components/designer-profile/aliciascott.png";
import CallButton from "../../../../components/common/buttons/callbutton";
import WhatsApp from "../../../../components/common/buttons/whatsapp";

function Idesign({ design }) {
  return (
    <>
      <div className="pros-details shadow p-3 mb-3 bg-body rounded">
        <div className=" row g-0">
          <div className="col-6 col-md-3">
            <div className="row g-0">
              <div className="col-md-2 align-self-center">
                <img
                  src={
                    design.imageUrl["original"]
                      ? design.imageUrl["original"]
                      : profile
                  }
                  alt=""
                  className="w-100"
                />
              </div>
              <div className="col-md-9 ms-3">
                <div className="d-flex flex-row bd-highlight  ">
                  <div className="p-2 bd-highlight">
                    <b>{design.firstName}</b>
                  </div>
                  <div className="p-2 bd-highlight">
                    <div className="">
                      {design.planId["price"] !== 0 && (
                        <img src={tick} alt="" />
                      )}
                    </div>
                  </div>
                  <div className="p-2 bd-highlight">
                    <p className="card-text">
                      <span className="star-icon">
                        4.3
                        <i>
                          <FontAwesomeIcon icon={faStar} />
                        </i>
                      </span>
                    </p>
                  </div>
                </div>
                <p>{design.designercategory && design.designercategory.name}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-9">
            <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
              <div className="col">
                <div className="p-3">
                  <p>
                    Experience : <b>{design.workExperience} </b>
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="p-2 rounded">
                  <p>
                    Design fee :{" "}
                    <b>₹{design.fees && design.fees["designRoomPrice"]}/room</b>
                  </p>
                </div>
              </div>
              <div className="col" style={{ cursor: "pointer" }}>
                <CallButton
                  number={design.phoneNumber}
                  listingName={"Designer"}
                />
              </div>
              <div
                className="col"
              >
                <WhatsApp  phoneNumber={design.phoneNumber} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Idesign;
