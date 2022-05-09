import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import authService from "../../../services/authService";
import constants from "../../../services/constants";


function WhatsApp({phoneNumber}) {
    const [user, setUser] = useState(false);

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
  }, []);

  return (
    <button
      type="button"
      className="btn text-light btn-width whatsapp ms-1"
      data-bs-toggle="modal"
      data-bs-target={!user && "#staticBackdrop"}
      onClick={
        user
          ? () => (window.location.href = constants.whatsAppApi(phoneNumber))
          : ""
      }
    >
      <i className="me-1">
        <FontAwesomeIcon icon={faWhatsapp} />
      </i>
      Whatsapp
    </button>
  );
}

export default WhatsApp;
