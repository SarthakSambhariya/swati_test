import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faCheck } from "@fortawesome/free-solid-svg-icons";
import share from "../findprofessional/images/share.png";
import like from "../findprofessional/images/like.png";
import { Carousel } from "react-bootstrap";
import authService from "../../services/authService";
import projectservice from "../../services/projectservice";
import heartO from "../home/images/heart-o.png";
import Share from "../common/buttons/share";
import heartIcon from "../findprofessional/images/blankHeart.svg"
import noimage from "../../components/home/images/noimage.png";
function getScreenWidth() {
  const width = window.innerWidth;
  return width;
}
const ProjectsCards = ({
  id,
  pname,
  dname,
  bname,
  likes,
  imagepath,
  onlyImages = false,
  city,
}) => {
  const [user, setUser] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

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
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ProjectNameStyle = {
    fontFamily: "Manrope",
fontSize: "0.875rem",
fontWeight: "500",
lineHeight: "1.1875rem",

  }
  const ProjectDesignerStyle = {
    fontFamily: "Public Sans",
fontSize: "0.75rem",
fontWeight: "300",
lineHeight: "0.88125rem",
color:"#7F8790"

  }
  const AddressStyle = {
    fontFamily: "Public Sans",
fontSize: "0.875rem",
fontWeight: "300",
lineHeight: "1.028125rem",
color:"#383F45"

  }

  return (
    <>
      <React.Fragment>
        {screenWidth > 767 && (
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
                        <span className="fs-5" >{pname}</span> <br />
                        <span >{dname}</span>
                        <p>{bname}</p>
                      </div>
                      <div className="col-lg-4 text-end mthirty">
                        <table className="explorelist">
                          <tr>
                            <th style={{ cursor: "pointer" }}>
                              <Share />
                            </th>
                            <th style={{ cursor: "pointer" }}>
                              {/* <img src={like} alt="" className="me-2 " /> */}

                              {user ? (
                                showHeart ? (
                                  <FontAwesomeIcon
                                    icon={faHeart}
                                    size="lg"
                                    className="fs-3 ms-3"
                                    onClick={handleLike}
                                    style={{
                                      cursor: "pointer",
                                      color: "red",
                                      margin: "-2px 15px",
                                    }}
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
                            <td className="pt-2">
                              {likes} {likeCount} k
                            </td>
                            <td className="pt-2">
                              {likes} {shareCount}k
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <span className=""></span>
                </div>
              )}
              {onlyImages && (
                <div className="edit" style={{ color: "white" }}>
                  <table>
                    <tr>
                      <span
                        className="border rounded-circle p-3 bg-light text-dark"
                        style={{ cursor: "pointer" }}
                      >
                        <Share />
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        className="border rounded-circle p-3 bg-light text-dark"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <img src={like} alt="" className="me-2 " /> */}

                        {user ? (
                          showHeart ? (
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="fs-5"
                              onClick={handleLike}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          ) : (
                            <img
                              src={heartO}
                              style={{ width: "1.25rem" }}
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
        )}
        {screenWidth < 767 && (
          <div className="mt-1 d-inline" key={id} style={{transform:"translateX(-1.5rem)"}}>
            <Carousel
              interval={null}
              indicators={false}style={{ width: "112%"}}
              id="projectsCarousel"
            >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={imagepath}
                  alt="First slide"
                  style={{ height: "13.5rem", objectFit: "cover" }}
                />
                {!onlyImages && (
                  <div className="card-body">
                    <div className="">
                      <div className="row">
                        <div className="col-lg-8 mseventy">
                          <span className="fs-5" style={ProjectNameStyle} >{pname}</span> <br />
                          <span style={ProjectDesignerStyle}>{dname}</span>
                          <p style={AddressStyle}>{bname}</p>
                        </div>
                        <div className="col-lg-4 text-end mthirty">
                          <table className="explorelist">
                            <tr>
                              
                              <th style={{ cursor: "pointer" }}>
                                {/* <img src={like} alt="" className="me-2 " /> */}

                                {user ? (
                                  showHeart ? (
                                    <FontAwesomeIcon
                                      icon={faHeart}
                                      size="sm"
                                      className="fs-3 ms-3"
                                      onClick={handleLike}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                        width:"1.5rem",margin: "0 0.5rem",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={heartIcon}
                                      style={{ margin: "0 0.5rem",width:"1.5rem" }}
                                      alt=""
                                      srcset=""
                                      onClick={handleLike}
                                    />
                                  )
                                ) : (
                                  <img
                                    src={heartIcon}
                                    style={{margin: "0 0.5rem",width:"1.5rem" }}
                                    alt=""
                                    srcset=""
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                  />
                                )}
                              </th><th style={{ cursor: "pointer" }}>
                                <Share />
                              </th>
                            </tr>
                            
                          </table>
                        </div>
                      </div>
                    </div>
                    <span className=""></span>
                  </div>
                )}
                {onlyImages && (
                  <div className="edit" style={{ color: "white" }}>
                    <table>
                      <tr>
                        <span
                          className="border rounded-circle p-3 bg-light text-dark"
                          style={{ cursor: "pointer" }}
                        >
                          <Share />
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span
                          className="border rounded-circle p-3 bg-light text-dark"
                          style={{ cursor: "pointer" }}
                        >
                          {/* <img src={like} alt="" className="me-2 " /> */}

                          {user ? (
                            showHeart ? (
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="fs-5"
                                onClick={handleLike}
                                style={{ cursor: "pointer", color: "red" }}
                              />
                            ) : (
                              <img
                                src={heartO}
                                style={{ width: "1.25rem" }}
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
              </Carousel.Item>
            </Carousel>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

export default ProjectsCards;
