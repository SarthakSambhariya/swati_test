import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import authService from "../../../services/authService";


function CallButton({number, listingName}) {
    const [user, setUser] = useState(false);
    const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
  }, []);

  return (
    <button
      type="button"
      className="btn text-light btn-width designer"
      data-bs-toggle="modal"
      data-bs-target={!user && "#staticBackdrop"}
      onClick={() => user && setShowNumber(!showNumber) }
    >
      <i className="me-1">
        <FontAwesomeIcon icon={faPhone} />
      </i>

        <span style={{textTransform:"capitalize"}}>{showNumber ? number : `Call ${listingName}`}</span> 
      
    </button> 
  );
}

export default CallButton;
