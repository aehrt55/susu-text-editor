import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import preventBubblingUp from './utils/preventBubblingUp';
import styles from './Button.css';

const Button = ({ name, children, onClick, isActive }) => (
  <div className={styles.buttonWrapper} onMouseDown={preventBubblingUp} data-name={name}>
    <div
      className={classNames(styles.button, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  </div>
);
Button.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
};

export default Button;
