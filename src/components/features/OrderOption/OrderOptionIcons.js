import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, setOptionValue, required, currentValue}) => {
  return (
    <div className={styles.icon}>
      {required ? '' : (
        <div className={styles.icon} onClick={setOptionValue('')}>
          <Icon name={'times-circle'}/>
        none
        </div>
      )}
      {values.map(value => {
        return (
          <div className={currentValue == value.id ? styles.icon + ' ' + styles.iconActive : styles.icon} key={value.id} onClick={event => {
            event.preventDefault();
            return (
              setOptionValue(value.id)
            );}}>
            <Icon name={value.icon}/>
            {value.name + ' ' + formatPrice(value.price)}
          </div>
        );})}
    </div>
  );
};

OrderOptionIcons.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.node,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  values: PropTypes.array,
};

export default OrderOptionIcons;
