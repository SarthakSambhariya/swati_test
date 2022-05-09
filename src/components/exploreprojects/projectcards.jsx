import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faCheck } from "@fortawesome/free-solid-svg-icons";
import share from "../findprofessional/images/share.png";
import like from "../findprofessional/images/like.png";

import authService from "../../services/authService";
import projectservice from "../../services/projectservice";
import heartO from "../home/images/heart-o.png";
import Share from "../common/buttons/share";

import noimage from "../../components/home/images/noimage.png";

const ProjectsCards = ({
  id,
  pname,
  dname,
  bname,
  likes,
  imagepath,
  onlyImages = false,
  city
}) => {
  const [user, setUser] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);


  const handleLike = async () => {
    const params = {
      projectId: id,
      userId: authService.getLocalStorage("id"),
    };
    const project = await projectservice.likedProjects(params);
    setShowHeart(!showHeart);
  };

  const getlikedProjects = async () => {
    const parms = {
      userId: authService.getLocalStorage("id"),
      projectId: id,
    };

    const responser = await projectservice.getLikedProjects(parms);
    if (responser) {
      setShowHeart(true);
    }
  };

  useEffect(() => {
    authService.getToken() ? setUser(true) : setUser(false);
    getlikedProjects();
  }, []);

return (
    <>
      <div className="col-lg-4 col-md-6 mt-3" key={id}>
        <div className="card imagehover">
          <img
            style={{ cursor: "pointer" }}
            src={imagepath ? imagepath : noimage}
            className="card-img-top custom-card "
            alt=""
            onClick={() =>
            (window.location.href = `/projects/${city.toLowerCase()}/${pname
              .replaceAll(" ", "-")
              .toLowerCase()}`)
            }
          />
          {!onlyImages && (
            <div className="card-body">
              <div className="">
                <div className="row">
                  <div className="col-lg-8 mseventy">
                    <span className="fs-5">{pname}</span> <br />
                    <span>{dname}</span>
                    <p>{bname}</p>
                    
                  </div>
                  <div className="col-lg-4 text-end mthirty">
                    <table className="explorelist">
                      <tr>
                        <th
                          style={{ cursor: "pointer" }}
                        >
                          
                          <Share />
                        </th>
                        <th
                          style={{ cursor: "pointer" }}
                        >
                          {/* <img src={like} alt="" className="me-2 " /> */}

                          {user ? (
                            showHeart ? (
                              <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                className="fs-3 ms-3"
                                onClick={handleLike}
                                style={{ cursor: "pointer", color: "red", margin:"-2px 15px" }}
                              />
                            ) : (
                              <img
                                src={heartO}
                                style={{ margin: "0px 15px" }}
                                alt=""
                                srcset=""
                                onClick={handleLike}
                              />
                            )
                          ) : (
                            <img
                              src={heartO}
                              style={{}}
                              alt=""
                              srcset=""
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            />
                          )}
                        </th>
                      </tr>
                      <tr className="pt-2 text-center">
                        <td className="pt-2">{likes} {likeCount} k</td>
                        <td className="pt-2">{likes} {shareCount}k</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <span className=""></span>
            </div>
          )}
          {onlyImages && (
            <div className="edit" style={{color:"white"}}>
            <table>
              <tr>
                <span className="border rounded-circle p-3 bg-light text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <Share />
                </span>&nbsp;&nbsp;&nbsp;
                <span className="border rounded-circle p-3 bg-light text-dark"
                  style={{ cursor: "pointer" }}
                >
                  {/* <img src={like} alt="" className="me-2 " /> */}

                  {user ? (
                    showHeart ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="fs-5"
                        onClick={handleLike}
                        style={{ cursor: "pointer", color: "red"}}
                      />
                    ) : (
                      <img
                        src={heartO}
                        style={{width:"1.25rem"}}
                        className=""
                        alt=""
                        srcset=""
                        onClick={handleLike}
                      />
                    )
                  ) : (
                    <img
                      src={heartO}
                      style={{}}
                      className=""
                      alt=""
                      srcset=""
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    />
                  )}
                </span>
              </tr>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsCards;
