import React, { PureComponent } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import "./index.scss";

class CustomDatePickerInput extends PureComponent {
  render() {
    const { placeholder, onChange, onClick, value } = this.props;
    return (
      <div className="customDatePickerInputWrapper">
        <input
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          className="dateInput"
          value={value}
          type="text"
        />
        <CalendarOutlined onClick={onClick} />
      </div>
    );
  }
}

export default CustomDatePickerInput;
