import React, { memo } from 'react';
import DatePicker from 'react-datepicker';
import { Col, Icon } from 'antd';
import './date.scss'
const index = memo(({startDateA,setStartDateA, startDateB,setStartDateB, handleDateChangeRaw}) => {
    return (
        <Col
            xs={24}
            md={8}
            style={{ marginTop: '3px' }}
        >
            <div className="orders-dates">
                <DatePicker
                    selected={startDateA}
                    onChange={date =>
                        setStartDateA(date)
                    }
                    maxDate={new Date()}
                    calendarClassName="date"
                    dateFormat="dd.MM.Y"
                    onChangeRaw={handleDateChangeRaw}
                    placeholderText="Start Date"
                    showDisabledMonthNavigation
                />
                
                <span className="date-icon">
                    <Icon type="calendar" />
                </span>
                <span className="price-card-date-line">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                <DatePicker
                    selected={startDateB} 
                    onChange={date =>
                        setStartDateB(date)
                    }
                    minDate={new Date()}
                    calendarClassName="date"
                    dateFormat="dd.MM.Y"
                    onChangeRaw={handleDateChangeRaw}
                    placeholderText="End Date"
                    showDisabledMonthNavigation
                />
                <span className="date-icon">
                    <Icon type="calendar" />
                </span>
            </div>
        </Col>
    );
});

export default index;