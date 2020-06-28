import React, { Component } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import "./index.scss";

class CustomDatePickerInput extends Component {
  render() {
    return (
      <div className="customDatePickerInputWrapper">
        <input
          onClick={this.props.onClick}
          onChange={this.props.onChange}
          className="dateInput"
          value={this.props.value}
          type="text"
        />
        <CalendarOutlined onClick={this.props.onClick} />
      </div>
    );
  }
}

export default CustomDatePickerInput;
