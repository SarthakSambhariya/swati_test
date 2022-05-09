import React, { useState, useEffect } from "react";
import { Popover, Overlay } from "react-bootstrap";

function Professions({ professionshow, professiontarget }) {
  const [show1, setShow] = useState(false);

  useEffect(() => {
    setShow(professionshow);
  }, [professionshow]);
  return (
    <Overlay
      show={show1}
      target={professiontarget}
      placement="bottom"
      containerPadding={20}
      rootClose={true}
      onHide={() => setShow(false)}
    >
      <Popover id="popover-contained">
        <Popover.Body>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="profession"
              id="profession1"
            />
            <label className="form-check-label" htmlFor="profession1">
              projects
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="profession"
              id="profession2"
            />
            <label className="form-check-label" htmlFor="profession2">
              Contractors
            </label>
          </div>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
}

export default Professions;
