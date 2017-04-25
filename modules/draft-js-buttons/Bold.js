import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import inlineStyleButtonWrapper from './utils/inlineStyleButtonWrapper';

const style = 'BOLD';

const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <path d="M14,28 L19.5909091,28 C23.2954546,28 26,26.4782609 26,23.3043478 C26,21.1304348 24.6136364,19.8913043 22.7045454,19.5 L22.7045454,19.3913043 C24.2045455,18.9130435 25.0909091,17.4565217 25.0909091,15.9347826 C25.0909091,13.0434783 22.6136364,12 19.1818182,12 L14,12 L14,28 Z M16.6363636,18.673913 L16.6363636,13.9565217 L18.9545454,13.9565217 C21.3181818,13.9565217 22.5,14.5869565 22.5,16.2608696 C22.5,17.7608696 21.4318182,18.673913 18.8863636,18.673913 L16.6363636,18.673913 Z M16.6363636,26.0217391 L16.6363636,20.5869565 L19.2954546,20.5869565 C21.9545455,20.5869565 23.4090909,21.3695652 23.4090909,23.173913 C23.4090909,25.1304348 21.9090909,26.0217391 19.2954546,26.0217391 L16.6363636,26.0217391 Z"></path>
  </svg>
);

const BoldButton = (props) => (
  <Button name="粗體" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
BoldButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default inlineStyleButtonWrapper(BoldButton, { style });
