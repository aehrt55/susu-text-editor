import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RichUtils } from '@sususite/draft-js-utils';
import defaultOptions from './options';
import convertToStyle from './utils/convertToStyle';
import convertFromStyle from './utils/convertFromStyle';
import buttonStyles from '../draft-js-buttons/Button.css';
import styles from './Button.css';
import Dropdown from './Dropdown';

/* eslint-disable */
const Svg = (props) => (
  <svg width="15px" height="6px" viewBox="0 0 15 6" {...props}>
    <path d="M12,0.625 C12,0.79427083 11.938151,0.940755205 11.8144531,1.06445312 L7.43945313,5.43945312 C7.31575521,5.56315104 7.16927083,5.625 7,5.625 C6.83072917,5.625 6.68424479,5.56315104 6.56054688,5.43945312 L2.18554688,1.06445312 C2.06184896,0.940755205 2,0.79427083 2,0.625 C2,0.45572917 2.06184896,0.309244795 2.18554688,0.185546875 C2.30924479,0.0618489551 2.45572917,0 2.625,0 L11.375,0 C11.5442708,0 11.6907552,0.0618489551 11.8144531,0.185546875 C11.938151,0.309244795 12,0.45572917 12,0.625 Z"></path>
  </svg>
);
/* eslint-enable */

const getCurrentFontSizeStyle = (editorState, notSetValue) => editorState
.getCurrentInlineStyle()
.find((style) => /^FontSize-/.test(style)) || notSetValue;

export default class Button extends Component {
  static propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    defaultStyle: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    isVisible: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    defaultStyle: 'FontSize-16',
    options: defaultOptions,
  };
  state = {
    toggle: false,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible === true && nextProps.isVisible === false) {
      this.setState((prevState) => ({ ...prevState, toggle: false }));
    }
  }
  handleToggleButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState((prevState) => ({ ...prevState, toggle: !prevState.toggle }));
  };
  onDidMount = (button) => { this.button = button };
  render() {
    const { getEditorState, setEditorState, options, defaultStyle } = this.props;
    const getButtonRect = () => this.button.getBoundingClientRect();
    const setFontSize = (fontSize) => {
      const newStyle = convertToStyle(fontSize);
      const updater = (inlineStyleSet) => {
        return inlineStyleSet
        .filterNot((style) => /^FontSize-/.test(style))
        .add(newStyle);
      };
      setEditorState(RichUtils.updateInlineStyle(getEditorState(), updater));
      this.setState((prevState) => ({ ...prevState, toggle: false }));
    };
    return (
      <div
        className={classNames(buttonStyles.wrapper, styles.wrapper)}
        onMouseDown={this.handleToggleButton}
        ref={this.onDidMount}
        data-name="文字大小"
      >
        <div className={styles.fontSizeDisplay}>
          {convertFromStyle(getCurrentFontSizeStyle(getEditorState(), defaultStyle))}
        </div>
        <Svg className={styles.arrow} />
        {this.state.toggle && <Dropdown
          options={options}
          getButtonRect={getButtonRect}
          setFontSize={setFontSize}
        />}
      </div>
    );
  }
}
