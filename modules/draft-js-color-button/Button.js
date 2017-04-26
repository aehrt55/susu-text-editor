import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RichUtils } from '@sususite/draft-js-utils';
import convertToStyle from './utils/convertToStyle';
import convertFromStyle from './utils/convertFromStyle';
import toRgbaString from './utils/toRgbaString';
import buttonStyles from '../draft-js-buttons/Button.css';
import styles from './Button.css';
import ColorPicker from './ColorPicker';

/* eslint-disable */
const Svg = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
    <path d="M18.0128617,20.2744565 L18.5916399,18.3913043 C19.0546624,16.8695652 19.4983923,15.3288043 19.903537,13.7309783 L19.9807074,13.7309783 C20.4244373,15.3097826 20.8488746,16.8695652 21.3311897,18.3913043 L21.8906752,20.2744565 L18.0128617,20.2744565 Z M23.6270096,26 L26,26 L21.2926045,12 L18.7073955,12 L14,26 L16.2765273,26 L17.4919614,22.0054348 L22.4308682,22.0054348 L23.6270096,26 Z"></path>
  </svg>
);
/* eslint-enable */

const getCurrentColorStyle = (editorState, notSetValue) => editorState
.getCurrentInlineStyle()
.find((style) => /^Color-/.test(style)) || notSetValue;

export default class Button extends Component {
  static propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    defaultStyle: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    defaultStyle: convertToStyle([0, 0, 0, 1]),
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
    if (event.target !== this.button) {
      return;
    }
    this.setState((prevState) => ({ ...prevState, toggle: !prevState.toggle }));
  };
  onDidMount = (button) => { this.button = button };
  render() {
    const { getEditorState, setEditorState, defaultStyle } = this.props;
    const getButtonRect = () => this.button.getBoundingClientRect();
    const setColor = (rgba) => {
      const newStyle = convertToStyle(rgba);
      const updater = (inlineStyleSet) => {
        return inlineStyleSet
        .filterNot((style) => /^Color-/.test(style))
        .add(newStyle);
      };
      setEditorState(RichUtils.updateInlineStyle(getEditorState(), updater));
    };
    const rgba = convertFromStyle(getCurrentColorStyle(getEditorState(), defaultStyle));
    return (
      <div
        className={classNames(buttonStyles.wrapper, styles.wrapper)}
        onMouseDown={this.handleToggleButton}
        ref={this.onDidMount}
        data-name="文字色彩"
      >
        <Svg className={classNames(buttonStyles.svg, styles.svg)} />
        <span
          className={styles.colorDisplay}
          style={{
            backgroundColor: toRgbaString(rgba),
          }}
        />
        {this.state.toggle && <ColorPicker
          setColor={setColor}
          getButtonRect={getButtonRect}
          rgba={rgba}
        />}
      </div>
    );
  }
}
