import React from "react";
import { Popover, Overlay } from "react-bootstrap";
import CityFilter from "./filters/cityFilter";
import DesignerFeeFilter from "./filters/designerFeeFilter";
import Professions from "./filters/professions";

function Filter({
  cityshow,
  cityInit,
  handleCityFilter,
  feeshow,
  feetarget,
  professionshow,
  professiontarget,
  citytarget,
  handleDesignerFee,
}) {
  return (
    <>
      <CityFilter
        cityshow={cityshow}
        citytarget={citytarget}
        handleCityFilter={handleCityFilter}
        cityInit={cityInit}
      />
      <DesignerFeeFilter
        feeshow={feeshow}
        feetarget={feetarget}
        handleDesignerFee={handleDesignerFee}
      />

      <Professions
        professionshow={professionshow}
        professiontarget={professiontarget}
      />
    </>
  );
}

export default Filter;
