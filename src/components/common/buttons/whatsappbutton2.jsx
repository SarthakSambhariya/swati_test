import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import authService from "../../../services/authService";
import constants from "../../../services/constants";
import whatsappImage from "../../findprofessional/images/whatsappButton2.svg";

function WhatsApp2({ phoneNumber }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
  }, []);

  return (
    <button
      type="button"
      className="btn text-light2 btn-width"
      data-bs-toggle="modal"
      data-bs-target={!user && "#staticBackdrop"}
      onClick={
        user
          ? () => (window.location.href = constants.whatsAppApi(phoneNumber))
          : ""
      }
      style={{ color: "#174E86" }}
    >
      <i className="me-1">
        <img src={whatsappImage} />
      </i>
      Whatsapp
    </button>
  );
}

export default WhatsApp2;
