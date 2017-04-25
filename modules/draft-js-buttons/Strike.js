import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import styles from './Button.css';
import inlineStyleButtonWrapper from './utils/inlineStyleButtonWrapper';

const style = 'STRIKETHROUGH';

const Svg = (props) => (
  <svg width="40px" height="41px" viewBox="0 0 40 41" {...props}>
    <path d="M19.5316699,29 C22.9309021,29 25,26.9868938 25,24.5124509 C25,22.2477064 23.6698656,21.1153342 21.8330134,20.3394495 L19.7005758,19.4377457 C18.4337812,18.9344692 17.1880998,18.4311927 17.1880998,17.1100917 C17.1880998,15.8728703 18.2226488,15.1179554 19.806142,15.1179554 C21.1785029,15.1179554 22.2552783,15.6422018 23.2264875,16.5019659 L24.5143954,14.9501966 C23.3320537,13.7549148 21.621881,13 19.806142,13 C16.8502879,13 14.696737,14.8243775 14.696737,17.2568807 C14.696737,19.5006553 16.3646833,20.6749672 17.8637236,21.3040629 L20.0172745,22.2267366 C21.452975,22.8558322 22.5086372,23.2961992 22.5086372,24.7011796 C22.5086372,26.0013106 21.452975,26.8820446 19.5738963,26.8820446 C18.0748561,26.8820446 16.5547025,26.1690695 15.4357006,25.0576671 L14,26.7352556 C15.4145873,28.1612058 17.3992323,29 19.5316699,29 Z" id="S"></path>
    <rect id="Rectangle-15" x="11" y="21" width="18" height="1"></rect>
  </svg>
);

const StrikeButton = (props) => (
  <Button name="刪除線" {...props}>
    <Svg
      className={classNames(styles.svg, {
        [styles.activeSvg]: props.isActive,
      })}
    />
  </Button>
);
StrikeButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default inlineStyleButtonWrapper(StrikeButton, { style });
