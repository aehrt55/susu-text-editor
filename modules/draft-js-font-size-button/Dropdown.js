import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.css';

const getPositionStyle = (buttonRect) => {
  const toBottom = window.innerHeight - buttonRect.bottom;
  return (toBottom < 310) ? { bottom: '42px' } : { top: '42px' };
};

const Dropdown = ({ options, setFontSize, getButtonRect }) => (
  <div className={styles.dropdown} style={getPositionStyle(getButtonRect())}>
    {options.map(({ label, value }) => (
      <div
        key={value}
        className={styles.option}
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setFontSize(value);
        }}
      >
        {label}
      </div>
    ))}
  </div>
);
Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  setFontSize: PropTypes.func.isRequired,
  getButtonRect: PropTypes.func.isRequired,
};

export default Dropdown;
