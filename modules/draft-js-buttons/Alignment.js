import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import blockStyleButtonWrapper from './utils/blockStyleButtonWrapper';

const styleType = 'ALIGN_CENTER';

const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <path d="M30,28 C30,27.44775 29.5295261,27 28.9492487,27 L11.0507513,27 C10.4704739,27 10,27.44775 10,28 C10,28.55225 10.4704739,29 11.0507513,29 L28.9492487,29 C29.5295261,29 30,28.55225 30,28 M28,23 C28,22.44775 27.5348203,22 26.9610727,22 L13.0389273,22 C12.4651797,22 12,22.44775 12,23 C12,23.55225 12.4651797,24 13.0389273,24 L26.9610727,24 C27.5348203,24 28,23.55225 28,23 M26,18 C26,17.44775 25.5648512,17 25.0281433,17 L14.9718566,17 C14.4351488,17 14,17.44775 14,18 C14,18.55225 14.4351488,19 14.9718566,19 L25.0281433,19 C25.5648512,19 26,18.55225 26,18 M29,14 L11,14 C10.44775,14 10,13.55225 10,13 C10,12.44775 10.44775,12 11,12 L29,12 C29.55225,12 30,12.44775 30,13 C30,13.55225 29.55225,14 29,14"></path>
  </svg>
);

const AlignmentButton = (props) => (
  <Button name="置中" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
AlignmentButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default blockStyleButtonWrapper(AlignmentButton, { styleType })
