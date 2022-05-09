import React, { useEffect, useState } from "react";
import b2bservice from "../../../services/b2bservice";

function LikedPhoto({ project, active }) {
    const [image, setImage] = useState("");
    const getInit = async (params) =>{
        const project = await b2bservice.getlistProjectsFilter(params);        
        setImage(project[0]["data"][0]["images"][0]["original"]);
    }

    useEffect(() =>{
        const params = `projectId=${project["projectId"]}`;
        getInit(params);
    },[]);

  return (
    <div className="col-lg-4 col-md-6">
      <a href="liked-inspriation.html">
        <div className="carousel-item active">
          <img src={image} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <div className="d-flex flex-row-reverse bd-highlight">
              <div className="p-2 bd-highlight">
                <i
                  className="fa fa-heart-o text-dark bg-white p-2 rounded-circle"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="p-2 bd-highlight">
                <i
                  className="fa fa-share text-dark bg-white p-2 rounded-circle"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default LikedPhoto;
