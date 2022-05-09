import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import b2bservice from '../../services/b2bservice';
import { useForm } from "react-hook-form";

function RegisterForm(props) {
  const InvalidClass = {
    borderColor: "#dc3545",
    paddingRight: "calc(1.5em + 0.75rem)",
    backgroundImage:
      "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right calc(0.375em + 0.1875rem) center",
    backgroundAize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)",
  };

  const [contractor, setContractor] = useState(false);
  const [designer, setDesigner] = useState(true);
  const [check, setCheck] = useState(true);
  const [secondForm, setsecondForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [userData, setUserData] = useState({});

  const onSubmit = (data) => {
    setUserData(data);
    setsecondForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber" && value) {
      if (value.length > 10) {
        return null;
      }
    }
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    // console.log(userData);
    const result = await authService.register(userData);


    // const response = await b2bservice.leadPush(userData);

    window.location.href = "/dashboard/home";
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body text-dark">
          <div className="">
            <h3 className="text-dark">
              {/* <b>Find Designers</b> */}
            </h3>
            <div className="row">
              {/* <div className="col-sm-12 mb-3 mt-3 form-group">
                    <input
                      style={errors.name && InvalidClass}
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      id="colFormLabelLg"
                      placeholder="Name"
                      onChange={handleChange}
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}
                  </div> */}

              <div className="col-sm-12 mb-3">
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
                  placeholder="Passsord"
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
              {/* <div className="col-sm-12 mb-3">
                    <input
                      style={errors.phoneNumber && InvalidClass}
                      name="phoneNumner"
                      type="text"
                      className="form-control form-control-lg"
                      id="colFormLabelLg"
                      placeholder="Phone Number"
                      {...register("phoneNumber", {
                        required: "Phone Number is Required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Invalid phone no",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("phoneNumber");
                      }}
                    />
                    {errors.phoneNumber && (
                      <small className="text-danger">
                        {errors.phoneNumber.message}
                      </small>
                    )}
                  </div> */}
              {/* <div className="col-sm-12 mb-3">
                    <input
                      style={errors.city && InvalidClass}
                      name="city"
                      type="text"
                      className="form-control form-control-lg"
                      id="colFormLabelLg"
                      placeholder="City"
                      {...register("city", {
                        required: "City is required",
                      })}
                    />
                    {errors.city && (
                      <small className="text-danger">
                        {errors.city.message}
                      </small>
                    )}
                  </div> */}
              {/* <p className="text-dark">I want to connect with</p>
                  <div>
                    <button
                      type="button"
                      value={designer}
                      onClick={() => setDesigner(!designer)}
                      className={
                        designer
                          ? "btn btn-light border pl-1 blue text-white"
                          : "btn btn-light border pl-1"
                      }
                      {...register("wantDesigner", {
                        required: false,
                      })}
                    >
                      Designer
                    </button> &nbsp;&nbsp;
                    <button
                      type="button"
                      value={contractor}
                      onClick={() =>
                        setContractor(!contractor)
                      }
                      className={
                        contractor
                          ? "btn btn-light border pl-1 blue text-white"
                          : "btn btn-light border pl-1"
                      }
                      {...register("wantContractor", {
                        required: false,
                      })}
                    >
                      Contractor
                    </button>
                  </div>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="defaultCheck1"
                      {...register("recommended", {
                        required: false,
                      })}
                      checked={check}
                      onClick={() => setCheck(!check)}
                       />
                    <p
                      className="form-check-label text-dark"
                      htmlFor="defaultCheck1"
                    >
                      I want iDesign to recommended designers
                    </p>
                  </div> */}

            </div>
          </div>
          {/* <span className="forgotPassword">Forgot Password?</span> */}
          <div className="text-center border-light">
                <div className="d-grid gap-2 col-12">
                  <button className="btn text-light mt-2 blue" type="submit" onClick={handleRegister}>
                    Create Free Account
                  </button>

                  {/* <button˛ */}
                </div>
                {/* <p className="text-center p-3 text-dark">
                  By clicking Next you agree to the
                  <Link to="#">
                    <u>Terms & Conditions</u>
                  </Link>
                </p> */}
                <p class="text-center p-3 text-dark">On signing you agree to our <a href="/">Terms of use</a> and <a href="/"><u> Privacy Policy</u></a></p>
              </div>
        </div>

      </form>



      {/* {secondForm && (
                    <div className="modal-body p-4 text-dark">
                    <h4 className="mb-3">A bit more about your dream home</h4>
                    <h5 className="mb-3">Property Type </h5>
                    <div>
                      <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active  ps-3 pe-3"
                            id="pills-apartment-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#apartment"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                            onClick={() =>
                              setUserData({ ...userData, propertyType: "apartment" })
                            }
                          >
                            Apartment
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-bungalow-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#banglow"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                            onClick={() =>
                              setUserData({ ...userData, propertyType: "bungalow" })
                            }
                          >
                            Bungalow
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="apartment"
                          role="tabpanel"
                          aria-labelledby="pills-apartment-tab"
                        >
                          <div className="budget-form">
                            <div className="mt-3">
                              <h5>
                                <b>Budget </b>
                              </h5>
                            </div>
                            <div className="row mt-3">
                              <div className="col">
                                <input
                                  name="budgetMin"
                                  value={userData.budgetMin}
                                  onChange={handleChange}
                                  type="number"
                                  className="form-control form-control-lg"
                                  placeholder="min"
                                  aria-label="min"
                                />
                              </div>
                              <div className="col">
                                <input
                                  name="budgetMax"
                                  value={userData.budgetMax}
                                  onChange={handleChange}
                                  type="number"
                                  className="form-control form-control-lg"
                                  placeholder="max"
                                  aria-label="max"
                                />
                              </div>
                            </div>
                            <p>Enter value in Lacs</p>
                          </div>
      
                          <div className="apartment-form">
                            <div className="mt-3">
                              <h5>
                                <b>Property size </b>
                              </h5>
                            </div>
                            <div className="col mt-3">
                              <input
                                name="propertySize"
                                value={userData.propertySize}
                                onChange={handleChange}
                                type="number"
                                className="form-control form-control-lg"
                                placeholder="Enter Area"
                                aria-label="Enter Area"
                              />
                            </div>
                          </div>
      
                          <div className="login-button mt-4">
                            <div className="d-grid gap-2">
                              <button
                                className="btn btn-light shadow p-3 bg-body rounded"
                                type="button"
                              >
                                Login with Google
                              </button>
                            </div>
                            <p className="text-center p-4 text-muted">OR</p>
                            <div className="d-grid gap-2">
                              <input
                                required
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                type="email"
                                className="form-control btn btn-light shadow p-3 bg-body rounded"
                                id="colFormLabelLg"
                                placeholder="Email"
                              />
                              <div className="input-group">
                                <input
                                  name="password"
                                  value={userData.password}
                                  onChange={handleChange}
                                  type="password"
                                  className="form-control btn btn-light shadow p-3 bg-body rounded"
                                  placeholder="Create Password"
                                  aria-label="Input group example"
                                  aria-describedby="btnGroupAddon"
                                />
                                <div
                                  className="input-group-text green ps-4 pe-4 text-light"
                                  id="btnGroupAddon"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleRegister}
                                >
                                  &gt;
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="banglow"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          <div className="budget-form">
                            <div className="mt-3">
                              <h5>
                                <b>Budget </b>
                              </h5>
                            </div>
                            <div className="row mt-3">
                              <div className="col">
                                <input
                                  name="budgetMin"
                                  value={userData.budgetMin}
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="min"
                                  aria-label="min"
                                />
                              </div>
                              <div className="col">
                                <input
                                  name="budgetMax"
                                  value={userData.budgetMax}
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="max"
                                  aria-label="max"
                                />
                              </div>
                            </div>
                            <p>Enter value in Lacs</p>
                          </div>
      
                          <div className="apartment-form">
                            <div className="mt-3">
                              <h5>
                                <b>Property size </b>
                              </h5>
                            </div>
                            <div className="col mt-3">
                              <input
                                name="propertySize"
                                value={userData.propertySize}
                                onChange={handleChange}
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Area"
                                aria-label="Enter Area"
                              />
                            </div>
                          </div>
      
                          <div className="login-button mt-4">
                            <div className="d-grid gap-2">
                              <button
                                className="btn btn-light shadow p-3 bg-body rounded"
                                type="button"
                              >
                                Login with Google
                              </button>
                              <button
                                className="btn btn-light shadow p-3 bg-body rounded"
                                type="button"
                              >
                                Login with Facebook
                              </button>
                            </div>
                            <p className="text-center p-4 text-muted">OR</p>
                            <div className="d-grid gap-2">
                              <input
                                required
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                type="email"
                                className="form-control btn btn-light shadow p-3 bg-body rounded"
                                id="colFormLabelLg"
                                placeholder="Email"
                              />
                              <div className="input-group">
                                <input
                                  name="password"
                                  value={userData.password}
                                  onChange={handleChange}
                                  type="password"
                                  className="form-control btn btn-light shadow p-3 bg-body rounded"
                                  placeholder="Create Password"
                                  aria-label="Input group example"
                                  aria-describedby="btnGroupAddon"
                                />
                                <div
                                  className="input-group-text green ps-4 pe-4 text-light"
                                  id="btnGroupAddon"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleRegister}
                                >
                                  &gt;
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
      
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className={
                            userData["propertytype"] === "bungalow"
                              ? "tab-pane fade show"
                              : "tab-pane"
                          }
                          id="apartment"
                          role="tabpanel"
                          aria-labelledby="pills-bungalow-tab"
                        >
                          <div className="budget-form">
                            <div className="mt-3">
                              <h5>
                                <b>Budget </b>
                              </h5>
                            </div>
                            <div className="row mt-3">
                              <div className="col">
                                <input
                                  name="budgetMin"
                                  value={userData.budgetMin}
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="min"
                                  aria-label="min"
                                />
                              </div>
                              <div className="col">
                                <input
                                  name="budgetMax"
                                  value={userData.budgetMax}
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="max"
                                  aria-label="max"
                                />
                              </div>
                            </div>
                            <p>Enter value in Lacs</p>
                          </div>
      
                          <div className="apartment-form">
                            <div className="mt-3">
                              <h5>
                                <b>Property size </b>
                              </h5>
                            </div>
                            <div className="col mt-3">
                              <input
                                name="propertySize"
                                value={userData.propertySize}
                                onChange={handleChange}
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Area"
                                aria-label="Enter Area"
                              />
                            </div>
                          </div>
      
                          <div className="login-button mt-4">
                            <div className="d-grid gap-2">
                              <button
                                className="btn btn-light shadow p-3 bg-body rounded"
                                type="button"
                              >
                                Login with Google
                              </button>
                              <button
                                className="btn btn-light shadow p-3 bg-body rounded"
                                type="button"
                              >
                                Login with Facebook
                              </button>
                            </div>
                            <p className="text-center p-4 text-muted">OR</p>
                            <div className="d-grid gap-2">
                              <input
                                required
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                type="email"
                                className="form-control btn btn-light shadow p-3 bg-body rounded"
                                id="colFormLabelLg"
                                placeholder="Email"
                              />
                              <div className="input-group">
                                <input
                                  name="password"
                                  value={userData.password}
                                  onChange={handleChange}
                                  type="password"
                                  className="form-control btn btn-light shadow p-3 bg-body rounded"
                                  placeholder="Create Password"
                                  aria-label="Input group example"
                                  aria-describedby="btnGroupAddon"
                                />
                                <div
                                  className="input-group-text green ps-4 pe-4 text-light"
                                  id="btnGroupAddon"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleRegister}
                                >
                                  &gt;
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="banglow"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
      )}
       */}
    </>
  );
}

export default RegisterForm;