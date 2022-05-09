import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faCheck } from "@fortawesome/free-solid-svg-icons";
import share from "../../findprofessional/images/share.png";

import authService from "../../../services/authService";
import b2bservice from "../../../services/b2bservice";
import noimage from "../../../components/home/images/noimage.png";
import Share from "../../common/buttons/share";


const ProjectsCards = ({
  id,
  projectId,
  likes
}) => {
  const [user, setUser] = useState(false);
  const [project, setProject] = useState({});
  const [images, setImages] = useState({});

  const getProjectsDetails = async (id) =>{
      const parms = `projectId=${id}`;
      const result = await b2bservice.getlistProjectsFilter(parms);
      if (result.length > 0){
          setProject(result[0]);
          setImages(result[0].data[0]["images"][0]);

      }
  }


  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
    getProjectsDetails(projectId);
  }, []);

  return (
    <>
      <div className="col-lg-4 col-md-6" key={id}>
        <div className="card">
          <img
            style={{ cursor: "pointer" }}
            src={images["original"] ? images["original"] : noimage}
            className="card-img-top custom-card"
            alt=""
            onClick={() =>
            (window.location.href = `/projects/${project.name
              .replaceAll(" ", "-")
              .toLowerCase()}`)
            }
          />
          
            <div className="card-body">
              <div className="">
                <div className="row">
                  <div className="col-lg-8">
                    <span className="fs-5">{project.name}</span>
                    {/* <p>{bname}</p> */}
                    {/* <span>{dname}</span> */}
                  </div>
                  <div className="col-lg-4 text-end">
                    <table>
                      <tr>
                        <th>
                          <Share  />
                        </th>
                        <th
                          style={{ cursor: "pointer" }}
                        >
                          {/* <img src={like} alt="" className="me-2 " /> */}

                              <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                className=""
                              // style={{ cursor: "pointer" }}
                              />
                        </th>
                      </tr>
                      <tr className="pt-2 text-center">
                        <td className="pt-2">{likes}k</td>
                        <td className="pt-2">{likes}k</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <span className=""></span>
            </div>

        </div>
      </div>
    </>
  );
};

export default ProjectsCards;
