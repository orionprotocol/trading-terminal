import React, { memo } from 'react';
import DatePicker from 'react-datepicker';
import { Col } from 'antd';
import CustomDatePickerInput from '../../../../CustomDatePickerInput';
import 'react-datepicker/dist/react-datepicker.min.css';
import './date.scss';
const index = memo(
  ({ startDateA, setStartDateA, startDateB, setStartDateB, handleDateChangeRaw, mode }) => {
    return (
      <Col xs={24} md={8}>
        <div className={`container-filter-date ${mode}`}>
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
          <div className="line-container">
            <i className="fas fa-minus"></i>
          </div>

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
