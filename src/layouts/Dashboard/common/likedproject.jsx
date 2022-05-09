import React, { useEffect, useState } from "react";
import b2bservice from "../../../services/b2bservice";

function LikedProject({project, active}) {
    const [projects, setProjects] = useState({});
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
    <>
        <div className={active ? "carousel-item active": "carousel-item"}>
          <img
            src={image}
            className="d-block w-100"
            alt="..."
          />
        </div>
    </>
  );
}

export default LikedProject;
