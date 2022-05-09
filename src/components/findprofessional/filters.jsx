import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faCall,
  faFilter,
  faL,
  faArrowRight,
  faGreaterThan,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import CityFilter from "./filters/cityFilter";
import DesignerFeeFilter from "./filters/designerFeeFilter";
import ExperianceFilter from "./filters/experianceFilter";
import AllFilters from "./filters/allFilters";

function filters({
  citytarget,
  cityshow,
  cityInit,
  feeshow,
  handleCityFilter,
  afiltershow,
  afiltertarget,
  feetarget,
  expshow,
  exptarget,
  handleExpFilter,
  handleDesignerFee,
  clearCheckBox,
  handleRemoveCityFromFilter
}) {
  return (
    <>
      <CityFilter
        cityshow={cityshow}
        citytarget={citytarget}
        handleCityFilter={handleCityFilter}
        cityInit={cityInit}
        clearCheckBox={clearCheckBox}
        handleRemoveCityFromFilter={handleRemoveCityFromFilter}
      />
      <DesignerFeeFilter
        feeshow={feeshow}
        feetarget={feetarget}
        handleDesignerFee={handleDesignerFee}
      />
      <ExperianceFilter
        expshow={expshow}
        exptarget={exptarget}
        handleExpFilter={handleExpFilter}
      />
      <AllFilters
        afiltershow={afiltershow}
        afiltertarget={afiltertarget}
        cityInit={cityInit}
        handleCityFilter={handleCityFilter}
        handleExpFilter={handleExpFilter}
        cityshow={cityshow}
        citytarget={citytarget}
        feeshow={feeshow}
        feetarget={feetarget}
        handleDesignerFee={handleDesignerFee}
        expshow={expshow}
        exptarget={exptarget}
      />
    </>
  );
}

export default filters;
