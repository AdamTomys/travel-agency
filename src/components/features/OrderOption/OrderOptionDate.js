import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({setOptionValue, currentValue}) => {
  return (
    <div>
      <DatePicker 
        dateFormat='dd/MM/yyyy'
        selected={currentValue} 
        minDate={new Date()} 
        onChange={value => (setOptionValue(value))}
        placeholderText='Pick a date'
        isClearable
      />
    </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionDate;