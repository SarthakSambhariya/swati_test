import React, { useState, useEffect } from "react";
import { Popover, Overlay } from "react-bootstrap";

import MultiRangeSlider from "./slider/MultiRangeSlider";

function DesignerFeeFilter({ feeshow, feetarget, handleDesignerFee }) {
  const [showSlider, setShowSlider] = useState(true);
  const [perRoom, setPerRoom] = useState("");
  const [perSqr, setperSqr] = useState("");
  const [show1, setShow] = useState(false);

  useEffect(() => {
    setShow(feeshow);
  }, [feeshow]);


  return (
    <Overlay
      show={show1}
      target={feetarget}
      placement="bottom"
      containerPadding={20}
      rootClose={true}
      onHide={() => setShow(false)}
    >
      <Popover id="popover-contained" className="w-25">
        <Popover.Body>
          <div className="form-check">
            <span>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={showSlider}
                onClick={() => setShowSlider(true)}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Per room
              </label>
            </span>
            {/* <span className="float-end">
                <label className="" for="">
                  <b>Rs 1500</b>
                </label>
              </span> */}
          </div>
          {showSlider && (
            <>
              <MultiRangeSlider
                min={1000}
                max={2000393}
                onChange={({ min, max }) => setPerRoom(`${min}-${max}`)}
              />
              <br />
              <br />
            </>
          )}
          <div className="form-check">
            <span>
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={!showSlider}
                onClick={() => setShowSlider(false)}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Per sq. ft.
              </label>
            </span>
          </div>
          {!showSlider && (
            <>
              <MultiRangeSlider
                min={1000}
                max={2000393}
                onChange={({ min, max }) => setperSqr(`${min}-${max}`)}
              />

              <br />
              <br />
            </>
          )}
          <button
            type="button"
            className="btn blue btn-sm text-light ps-4 pe-4"
            onClick={() => handleDesignerFee(perRoom, perSqr)}
          >
            Apply
          </button>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
}

export default DesignerFeeFilter;
