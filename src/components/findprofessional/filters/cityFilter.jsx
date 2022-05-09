import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Popover, Overlay } from "react-bootstrap";

function CityFilter({ cityshow, citytarget, handleCityFilter, cityInit, clearCheckBox=false, handleRemoveCityFromFilter }) {
  const [show1, setShow] = useState(false);
  const [search, setSearch] = useState("");
  
  const [checkedState, setCheckedState] = useState(
    new Array(cityInit.length).fill(false)
);



useEffect(() => {
setCheckedState(new Array(cityInit.length).fill(false));
},[clearCheckBox]);

const handleOnChange = (position) => {
  const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );

  setCheckedState(updatedCheckedState);
  // handleCityFilter(updatedCheckedState);
  
  let cityObj = {}
  Object.entries(updatedCheckedState).map((m, index)=>{
    cityObj[cityInit[index].value] = updatedCheckedState[index];
  })

  console.log(cityObj);

  handleCityFilter(cityObj)

};


  useEffect(() => {
    setShow(cityshow);
  }, [cityshow]);

  return (
    <div>
      <Overlay
        show={show1}
        target={citytarget}
        placement="bottom"
        containerPadding={40}
        rootClose={true}
        onHide={(e) => {
          setShow(false);
        }}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <div className="input-group">
              <input
                className="form-control border-end-0 border"
                type="search"
                placeholder="search"
                id="example-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                onClick={() => handleCityFilter(search)}
                className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
              />
            </div>
            <br />

            {cityInit.map((city, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input city-check-box"
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={city.name}
                  value={city.name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  {city.name}
                </label>
              </div>
            ))}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default CityFilter;
