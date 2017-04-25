import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import styles from './ColorPicker.css';

const getPositionStyle = (buttonRect) => {
  const toBottom = window.innerHeight - buttonRect.bottom;
  const toRight = window.innerWidth - buttonRect.right;
  const positionStyle = {};
  if (toBottom < 301) {
    positionStyle.bottom = '42px';
  } else {
    positionStyle.top = '42px';
  }
  if (toRight < 202) {
    positionStyle.right = '0';
  } else {
    positionStyle.left = '0';
  }
  return positionStyle;
};

const ColorPicker = ({ setColor, getButtonRect, rgba: [r, g, b, a] }) => (
  <div className={styles.wrapper} style={getPositionStyle(getButtonRect())}>
    <ChromePicker
      color={{ r, g, b, a }}
      onChangeComplete={({ rgb: { r, g, b, a } }) => setColor([r, g, b, a])}
    />
  </div>
);
ColorPicker.propTypes = {
  setColor: PropTypes.func.isRequired,
  getButtonRect: PropTypes.func.isRequired,
  rgba: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ColorPicker;
