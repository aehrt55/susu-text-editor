import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import inlineStyleButtonWrapper from './utils/inlineStyleButtonWrapper';

const style = 'ITALIC';

const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <polygon id="I" points="16.9835963 27.3012535 18.924908 27.8947721 23.6028553 12.593896 21.6615436 12.0003774"></polygon>
  </svg>
);

const ItalicButton = (props) => (
  <Button name="斜體" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
ItalicButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default inlineStyleButtonWrapper(ItalicButton, { style });
