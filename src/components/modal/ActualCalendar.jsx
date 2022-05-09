import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ActualCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div style={{ padding: "16px", justifyContent: "center", display: "flex" }}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default ActualCalendar;
