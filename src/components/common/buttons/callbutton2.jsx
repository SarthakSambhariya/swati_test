import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import authService from "../../../services/authService";
import callButton2 from "../../findprofessional/images/callButton2.svg";

function CallButton2({ number, listingName }) {
  const [user, setUser] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
  }, []);

  return (

    <button
      type="button"
      className="btn text-light2 btn-width d-flex align-items-center justify-content-center"
      data-bs-toggle="modal"
      data-bs-target={!user && "#staticBackdrop"}
      onClick={() => user && setShowNumber(!showNumber)}
    >
      <i className="me-2">
        <img src={callButton2} />
      </i>

      <span style={{ textTransform: "capitalize", color:"#174E86" }}>
        {showNumber ? number : `Call ${listingName}`}
      </span>
    </button>
  );
}

export default CallButton2;
