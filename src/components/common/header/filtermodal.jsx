import React, {useState} from "react";
import "../../findprofessional/css/mobile/filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faClose } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "../loginForm";
import userservice from "../../../services/userservice";
import authservice from "../../../services/authService";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




const FilterModal = ({handleCityFilter, cityInit=[], }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [search, setSearch] = useState("");
  const provider = new GoogleAuthProvider();
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
      <div
        className="modal fade"
        id="mobilesignupinmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modalContent animate-bottom">
            <div className="modal-header border-light">
              <h5 className="modal-title text-dark" id="exampleModalLabel">Log in to Continue</h5>
              <p
                className="text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                    icon={faClose}
                    size="2x"
                  />
              </p>
            </div>
          <hr  className="mt-0" />
          <LoginForm handleLogin={handleLogin}
                hanleGoogleSign={hanleGoogleSign} />
           </div>
        </div>
      </div>
  );
};

export default FilterModal;
