import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import inlineStyleButtonWrapper from './utils/inlineStyleButtonWrapper';

const style = 'UNDERLINE';

const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <path d="M20.0091408,26 C22.9890311,26 25,24.4552737 25,20.2897196 L25,13 L22.952468,13 L22.952468,20.4285714 C22.952468,23.3097463 21.7093236,24.246996 20.0091408,24.246996 C18.3272395,24.246996 17.1206581,23.3097463 17.1206581,20.4285714 L17.1206581,13 L15,13 L15,20.2897196 C15,24.4552737 17.0292505,26 20.0091408,26 Z"></path>
    <rect x="12" y="28" width="16" height="1"></rect>
  </svg>
);

const UnderlineButton = (props) => (
  <Button name="底線" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
UnderlineButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default inlineStyleButtonWrapper(UnderlineButton, { style });
