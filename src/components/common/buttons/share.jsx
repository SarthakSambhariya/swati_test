import { faShare, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState } from "react";

function Share(props) {
  return (
    <>
      <FontAwesomeIcon
        icon={faShare}
        size={props.size ? props.size : "lg"}
        className=""
        data-bs-toggle="modal"
        data-bs-target="#share"
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default Share;
