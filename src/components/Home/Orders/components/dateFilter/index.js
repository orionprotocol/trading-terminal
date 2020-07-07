import React, { memo } from 'react';
import DatePicker from 'react-datepicker';
import { Col } from 'antd';
import CustomDatePickerInput from '../../../../CustomDatePickerInput';
import 'react-datepicker/dist/react-datepicker.min.css';
import './date.scss';
const index = memo(
  ({ startDateA, setStartDateA, startDateB, setStartDateB, handleDateChangeRaw }) => {
    return (
      <Col xs={24} md={8}>
        <div className="orders-dates">
          <DatePicker
            selected={startDateA}
            onChange={(date) => setStartDateA(date)}
            maxDate={new Date()}
            calendarClassName="date"
            dateFormat="dd.MM.Y"
            onChangeRaw={handleDateChangeRaw}
            placeholderText="Start Date"
            showDisabledMonthNavigation
            customInput={<CustomDatePickerInput />}
            popperPlacement="bottom-center"
          />
          <span className="price-card-date-line"></span>
          <DatePicker
            selected={startDateB}
            onChange={(date) => setStartDateB(date)}
            maxDate={new Date()}
            calendarClassName="date"
            dateFormat="dd.MM.Y"
            onChangeRaw={handleDateChangeRaw}
            customInput={<CustomDatePickerInput />}
            placeholderText="End Date"
            showDisabledMonthNavigation
            popperPlacement="bottom-center"
          />
        </div>
      </Col>
    );
  }
);

export default index;
