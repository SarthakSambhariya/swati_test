import React, { useState } from "react";
import authService from "../../services/authService";
import b2bservice from "../../services/b2bservice";
import { ToastContainer, toast } from "react-toastify";

function RFAForm(props) {
  const [userData, setUserData] = useState({});
  const onSubmit = (data) => {
    setUserData(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const finalData = {...userData}
    // const result = await authService.register(userData);
    // delete userData.recommended;
    // delete userData.password;

    // const response = await b2bservice.leadPush(userData);

    toast.success("Thanks", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    
    setUserData({});
    document.getElementById("closeSuccesModal").click();
  };

  return (
    <div
      className="modal fade"
      style={{ color: "black" }}
      id="successmodal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0">
          <h4 className="text-center">A bit more about your dream home</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form action="" onSubmit={handleSubmit} id="successForm">
            <div className="modal-body">
              <div className="modal-body p-2 text-dark">
                
                <h5 className="mb-3">Property Type </h5>
                <div>
                  <ul
                    className="nav nav-pills mb-3 w-100"
                    id="pills-tab"
                    role="tablist"
                    style={{maxWidth:"none"}}
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-sm prof-btn w-100 active"
                        id="pills-apartment-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#apartment"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                        onClick={() =>
                          setUserData({
                            ...userData,
                            propertyType: "apartment",
                          })
                        }
                      >
                        Apartment
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-sm prof-btn w-100"
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
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
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
                              required
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
                              required
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
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeSuccesModal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RFAForm;
