import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import "./index.scss";

const CustomDatePickerInput = (props) => {
  return (
    <div className="customDatePickerInputWrapper">
      <input
        onClick={props.onClick}
        className="dateInput"
        value={props.value}
        type="text"
      />
      <CalendarOutlined onClick={props.onClick} />
    </div>
  );
};

export default CustomDatePickerInput;
