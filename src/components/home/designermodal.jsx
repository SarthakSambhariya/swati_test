import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import b2bservice from "../../services/b2bservice";
import authservice from "../../services/authService";
import "./css/style.css";
import { useForm } from "react-hook-form";
import LoginModal from "../common/loginModal";
import LoginForm from "../common/loginForm";
import RegisterForm from "../common/registerForm";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import jwtDecode from "jwt-decode";
import { initializeApp } from "firebase/app";
import userservice from "../../services/userservice";
import { ToastContainer, toast } from "react-toastify";
import RFAForm from "./rfaForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function DesignerModal() {
  const [show, setShow] = useState(true);
  const [showLogin, setShowlogin] = useState(true);

  const provider = new GoogleAuthProvider();
  const firebaseConfig = {
    apiKey: "AIzaSyAhmIf3tw1qh49bXiGJYCrwdaw-lKMJj0w",
    authDomain: "idesign-1c137.firebaseapp.com",
    projectId: "idesign-1c137",
    storageBucket: "idesign-1c137.appspot.com",
    messagingSenderId: "102060250508",
    appId: "1:102060250508:web:ac531f549e6ca8d06932a9",
    measurementId: "G-X6WTKZD8C2",
  };
  initializeApp(firebaseConfig);

  const hanleGoogleSign = async () => {
    const auth = getAuth();
    const googleResult = await signInWithPopup(auth, provider);

    const googleToken = googleResult.user["accessToken"];

    const webToken = await userservice.googleAuth(googleToken);
    authservice.generate(webToken["token"]);
  };

  const handleLogin = async (data) => {
    try {
      const response = await authservice.login(data);
      // toast.success('🦄 Wow so easy!', {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   });
      window.location.reload(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <RFAForm />

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-2 animate-bottom tab-home">
            <div className="modal-header border-light border-0 text-center">
              <img src={{}} alt="" />
              <h5 className="modal-title  blue-text inter" id="exampleModalLabel">Start your interior journey</h5>
              <p
                className="text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faClose} size="2x" />
              </p>
            </div>
            {/* <div className="form-check form-switch p-0 text-center">
              <label
                className="form-check-label text-dark fs-2"
                for="flexSwitchCheckDefault"
              >
                Sign In
              </label>
              <label className="switch">
                <input type="checkbox" id="togBtn" />
                <div
                  className="slider round"
                  onClick={() => setShowlogin(!showLogin)}
                ></div>
              </label>
              <label
                className="form-check-label text-dark fs-2"
                for="flexSwitchCheckDefault"
              >
                Sign Up
              </label>
            </div> */}

            <div className="signuin">
              <ul
                className="nav nav-tabs"
                id="myTabss"
                role="tablist"
                style={{ width: "100%" }}
              >
                <li
                  className="nav-item"
                  role="presentation"
                  style={{ width: "50%" }}
                >
                  <button
                    className="nav-link active"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    onClick={() => setShowlogin(true)}
                  >
                    Sign In
                  </button>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  style={{ width: "50%" }}
                >
                  <button
                    className="nav-link"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    onClick={() => setShowlogin(false)}
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>

            {showLogin && (
              <LoginForm
                handleLogin={handleLogin}
                hanleGoogleSign={hanleGoogleSign}
                showLogin={showLogin}
              />
            )}
            {!showLogin && <RegisterForm />}
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignerModal;
