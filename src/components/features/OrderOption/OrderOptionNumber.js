import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionNumber = ({currentValue, limits, setOptionValue}) => (
  <div className={styles.number}>
    <input 
      className={styles.inputSmall} 
      type='number' value={currentValue} 
      min={limits.min} 
      max={limits.max} 
      onChange={event => setOptionValue(event.currentTarget.value)} />
  </div>
);

OrderOptionNumber.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.node,
  currentValue: PropTypes.node,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};

export default OrderOptionNumber;
