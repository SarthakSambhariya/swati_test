import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faShare, faCheck } from '@fortawesome/free-solid-svg-icons';
import share from "../findprofessional/images/share.png"
import like from "../findprofessional/images/like.png"

const ProjectsCards = ({ id, pname, dname, bname, likes, imagepath, onlyImages=false }) => {
  return (
    <>
     <div
        className="col-lg-4 col-md-6"
        onClick={() => (window.location.href = `/exploreprojects`)}
        style={{ cursor: "pointer" }}

      >
          <div className="card">
            <img
              src={imagepath}
              className="card-img-top"
              alt=""
            />
            {!onlyImages && (
               <div className="card-body">
               <span className="">
                 <span><h4>{pname}</h4></span> <span className="float-end"> <img src={share} alt="" className="me-2 w-25" /><img src={like} alt="" className="w-25" /></span>
                 <span><p>{dname}</p></span> <span className="float-end"> <p className="float-end">{likes}k</p> <p className="float-end">{likes}k</p></span>
                 <p>{bname}</p>
               </span>
               <span className="">
                
               </span>
             </div>
            ) }
          </div>
      </div>
    </>
  );
};

export default ProjectsCards;
