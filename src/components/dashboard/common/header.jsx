import React, {useState} from "react";
import idesignlogo from "../../../components/dashboard/images/idesignlogo.png";
import { Link } from "react-router-dom";
import Profile from "../../common/header/profile";
import bellicon from "../../home/images/bell.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShare } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const [showShareEmail, setShowShareEmail] = useState(true);
  const [showShareWhatsApp, setShowShareWhatsApp] = useState(false);
  return (
    <>
      <header className="header black-bg">
        <div className="sidebar-toggle-box">
          <div
            className="fa fa-bars tooltips"
            data-placement="right"
            data-original-title="Toggle Navigation"
          ></div>
        </div>

        <Link to="/" className="logo">
          <img src={idesignlogo} alt="" width="100" className="w-75" />
        </Link>

        <div className="top-menu">
          <ul className="nav position-absolute top-0 end-0 top-menu mt-2 me-3">
            <li
              className="idesign-exclusive me-2"
              onClick={() => (window.location.href = "/idesignexclusive")}
              style={{ cursor: "pointer" }}
            >
              iDesign Exclusive
            </li>
            {/* <li>
              <Profile imagepath={bellicon} showarrow={false} />
            </li> */}
            <li>
              <Profile
                imagepath={"https://github.com/mdo.png"}
                showarrow={true}
                path="/dashboard/home"
              />
            </li>
          </ul>
        </div>
      </header>
      <div
        className="modal fade"
        id="share"
        tabindex="-1"
        aria-labelledby="shareLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div className="share-link">
                <div className="d-flex">
                  <span>
                    <FontAwesomeIcon
                      icon={faShare}
                      size="lg"
                      className="me-2 border rounded-circle p-2 blue text-light"
                    />
                  </span>
                  <span>
                    <p className="fs-4">Share via</p>
                  </span>
                </div>
                <div className="share-form mt-3">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="email"
                        value={showShareEmail}
                        onClick={() => {
                          setShowShareWhatsApp(false);
                          setShowShareEmail(true);
                        }}
                      />
                      <label className="form-check-label" for="email">
                        Email
                      </label>
                    </div>
                    {showShareEmail && (
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter email address"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="whatsapp"
                        checked={showShareWhatsApp}
                        onClick={() => {
                          setShowShareWhatsApp(true);
                          setShowShareEmail(false);
                        }}
                      />
                      <label className="form-check-label" for="whatsapp">
                        Whatsapp
                      </label>
                    </div>
                    {showShareWhatsApp && (
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary blue text-light"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#getlink"
              >
                Share
              </button>
            </div>
          </div>
          <div className="modal-content mt-3">
            <div className="modal-body">
              <div className="share-link">
                <div className="d-flex">
                  <span>
                    <FontAwesomeIcon
                      icon={faLink}
                      size="lg"
                      className="me-2 border rounded-circle p-2 green text-light"
                    />
                  </span>
                  <span>
                    <p className="fs-4">Get Link</p>
                  </span>
                </div>
                <div className="share-form mt-3">
                  <div className="mb-1">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={window.location}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary green border-0 text-light"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#getlink"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
