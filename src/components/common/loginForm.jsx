import React from 'react';
import google from "../home/images/google.png";
import { useForm } from "react-hook-form";


function LoginForm({ handleLogin, hanleGoogleSign }) {

  const InvalidClass = {
    borderColor: "#dc3545",
    paddingRight: "calc(1.5em + 0.75rem)",
    backgroundImage:
      "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right calc(0.375em + 0.1875rem) center",
    backgroundAize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();


  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="modal-body text-dark">
        <div className="">
          <div className="row">
            <div className="col-sm-12 mb-3 mt-3">
              {/* <input
                  type="email"
                  className="form-control form-control-lg"
                  id="colFormLabelLg"
                  placeholder="Email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                /> */}

              <input
                style={errors.email && InvalidClass}
                name="email"
                type="text"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="Email"
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="col-sm-12 mb-3">

              <input
                style={errors.password && InvalidClass}
                name="password"
                type="password"
                className="form-control form-control-lg"
                id="colFormLabelLg"
                placeholder="Password (7+ Characters)"
                {...register("password", {
                  required: "Password is Required",
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <small className="text-danger">
                  {errors.password.message}
                </small>
              )}

            </div>
          </div>

          <span className="forgotPassword">Forgot Password?</span>

          <div className="">
            <button
              type="submit"
              className="btn btn-secondary blue w-100 mt-2"
            // data-bs-dismiss="modal"
            >
              Login
            </button>
          </div>
          <div className="or"><span>OR</span></div>


          <button type='button' className="btn btn-create sign-google" onClick={() => hanleGoogleSign()}
            style={{ cursor: "pointer" }}>
            <img src={google} alt="" /> &nbsp; Sign in with Google</button>
          {/* <div className="text-center">
              <p className="p-3">Sign in with Google</p>
              <div className="row justify-content-center">
                <div
                  className="col-2"
                  onClick={() => hanleGoogleSign()}
                  style={{ cursor: "pointer" }}
                >
                  <img src={google} alt="" className="w-50" />
                </div>
                <div className="col-2">
                  <img src={facebook} alt="" className="w-50" />
                </div>
              </div>
            </div> */}
        </div>
      </div>
      <p class="text-center p-3 text-dark">On signing you agree to our <a href="/">Terms of use</a> and <a href="/"><u> Privacy Policy</u></a></p>
    
    </form>
  );
}

export default LoginForm;