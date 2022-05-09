import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import { useState } from "react";
import styling from "./CalendatModal.module.css";
import DatePicker from "react-datepicker";
import ActualCalendar from "./ActualCalendar";

function CalendarModal() {
  const [show, setShow] = useState(false);
  const [showWhichModal, setShowWhichModal] = useState("wantcallback");
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => {
    setShow(false);
    setShowWhichModal("wantcallback");
  };
  const handleShow = () => setShow(true);

  const handleYesClick = () => {
    setShowWhichModal("callHasBeenConfirmed");
    setTimeout(() => {
      setShowWhichModal("wantcallback");
      setShow(false);
    }, 2000);
  };
  const scheduleCallBackButtonHandler = () => {
    setShowWhichModal("calendarModalShow");
  };
  const chooseTimeSlotModalHandler = () => {
    setShowWhichModal("chooseTimeSlotModalShow");
  };
  let content = "";
  if (showWhichModal === "callHasBeenConfirmed") {
    content = (
      <p
        className="modalBodyForConfirmCall"
        style={{
          textAlign: "center",
          fontSize: "1.8em",
          fontWeight: "600",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="green"
          class="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        &nbsp;&nbsp;&nbsp; Call has been confirmed
      </p>
    );
  } else if (showWhichModal === "wantcallback") {
    content = (
      <p
        className="modalBodyForConfirmCall"
        style={{
          textAlign: "center",
          fontSize: "1.8em",
          fontWeight: "600",
        }}
      >
        Want a call back now?
      </p>
    );
  } else if (showWhichModal === "calendarModalShow") {
    content = (
      <div
        style={{ padding: "16px", justifyContent: "center", display: "flex" }}
      >
        <ActualCalendar />
      </div>
    );
  } else if (showWhichModal === "chooseTimeSlotModalShow") {
    content = (
      <>
        <p
          className="modalBodyForConfirmCall"
          style={{
            textAlign: "left",
            fontSize: "1.8em",
            fontWeight: "600",
          }}
        >
          Select time
        </p>

        <div
          className={`btn-group ${styling["timing-slots"]}`}
          role="group"
          aria-label="Basic radio toggle button group"
          style={
            {
              // marginTop: "1em",
              // display: "flex",
              // justifyContent: "center",
            }
          }
        >
          <ul style={{ display: "flex" }}>
            <div class="row">
              <div className="column ">
                <li style={{ color: "#344e84" }}>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio1">
                    10:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio5"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio5">
                    12:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio9"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio9">
                    02:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio13"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio13">
                    04:00
                  </label>
                </li>
              </div>
            </div>
            <div class="row">
              <div className="column">
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio2">
                    10:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio6"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio6">
                    12:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradi10"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradi10">
                    02:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio14"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio14">
                    04:30
                  </label>
                </li>
              </div>
            </div>
            <div class="row">
              <div className="column">
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio3"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio3">
                    11:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio7"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio7">
                    01:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio11"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio11">
                    03:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio15"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio15">
                    05:00
                  </label>
                </li>
              </div>
            </div>
            <div class="row">
              <div className="column">
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio4"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio4">
                    11:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio8"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio8">
                    01:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio12"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio12">
                    03:30
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio16"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio16">
                    05:30
                  </label>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <Button
        variant=""
        onClick={handleShow}
        type="button"
        aria-labelledby="contained-modal-title-vcenter"
        center
        id="getCallBackButtonInFindProfessionals"
        style={{ boxShadow: "0 2px 4px #344e84", borderRadius: "5px" }}
      >
        Get call back in 2 minutes
      </Button>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal
        // {...props}
        show={show}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {showWhichModal === "wantcallback" ? (
          <Modal.Header closeButton style={{ border: "none" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {showWhichModal === "calendarModalShow" ||
              showWhichModal === "chooseTimeSlotModalShow" ? (
                <span
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "space-between",
                //   // border:"2px solid red",
                //   // width:"23vw"
                // }}
                >
                  <h1
                    style={{ display: "inline", cursor: "pointer" }}
                    onClick={() => setShowWhichModal("wantcallback")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      class="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                  </h1>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1em",
                      fontWeight: "600",
                      color: "black",
                      display: "inline",
                      position: "relative",
                      left: "4.7em",
                    }}
                  >
                    Schedule a callback
                  </p>
                </span>
              ) : (
                ""
              )}
            </Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header style={{ border: "none" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              {showWhichModal === "calendarModalShow" ||
              showWhichModal === "chooseTimeSlotModalShow" ? (
                <span
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "space-between",
                //   // border:"2px solid red",
                //   // width:"23vw"
                // }}
                >
                  <h1
                    style={{ display: "inline", cursor: "pointer" }}
                    onClick={() => setShowWhichModal("wantcallback")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      class="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                  </h1>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1em",
                      fontWeight: "600",
                      color: "black",
                      display: "inline",
                      position: "relative",
                      left: "4.7em",
                    }}
                  >
                    Schedule a callback
                  </p>
                </span>
              ) : (
                ""
              )}
            </Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body id="actualCalendar">
          {content}
          {/* {showWhichModal === "callHasBeenConfirmed" ? (
            <p
              className="modalBodyForConfirmCall"
              style={{
                textAlign: "center",
                fontSize: "1.8em",
                fontWeight: "600",
              }}
            >
              Call has been confirmed
            </p>
          ) : (
            <p
              className="modalBodyForConfirmCall"
              style={{
                textAlign: "center",
                fontSize: "1.8em",
                fontWeight: "600",
              }}
            >
              Want a call back now?
            </p>
          )} */}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
          {showWhichModal === "wantcallback" ? (
            <>
              <Button onClick={handleYesClick} id={styling[`yesButton`]}>
                Yes
              </Button>
              <Button
                onClick={scheduleCallBackButtonHandler}
                id={styling[`scheduleACallBackButton`]}
              >
                Schedule a callback
              </Button>
            </>
          ) : showWhichModal === "calendarModalShow" ? (
            <>
              <Button onClick={handleClose} id={styling[`cancelButton`]}>
                Cancel
              </Button>
              <Button
                onClick={chooseTimeSlotModalHandler}
                id={styling[`proceedToChooseTimeSlotBtn`]}
              >
                Next
              </Button>
            </>
          ) : showWhichModal === "chooseTimeSlotModalShow" ? (
            <>
              <Button onClick={handleClose} id={styling[`cancelButton`]}>
                Cancel
              </Button>
              <Button onClick={handleClose} id={styling[`saveTimeSlotBtn`]}>
                Save
              </Button>
            </>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalendarModal;
