import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import blockStyleButtonWrapper from './utils/blockStyleButtonWrapper';

const blockType = 'header-one';

const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <polygon points="14 28 16 28 16 21 24 21 24 28 26 28 26 12 24 12 24 19 16 19 16 12 14 12"></polygon>
  </svg>
);

const HeadingButton = (props) => (
  <Button name="設為標題" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
HeadingButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default blockStyleButtonWrapper(HeadingButton, { blockType })
