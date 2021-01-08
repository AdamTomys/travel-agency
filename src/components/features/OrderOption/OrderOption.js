import React from 'react';
import styles from './OrderOption.scss';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionNumber from './OrderOptionNumber';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
};

const OrderOption = ({name, type, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if(!OptionComponent) {
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent {...otherProps} />
      </div>
    );
  }
};

OrderOption.propTypes = {

};

export default OrderOption;
