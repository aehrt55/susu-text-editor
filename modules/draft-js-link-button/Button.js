import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, RichUtils } from 'draft-js';
import buttonStyles from '../draft-js-buttons/Button.css';
import styles from './Button.css';

/* eslint-disable */
const HyperLink = (props) => (
  <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
    <path fillRule="evenodd" d="M17.8596,24.6942 L17.05,25.4982 C16.3482,26.1938 15.2068,26.1944 14.5054,25.4982 C14.1682,25.1636 13.983,24.7192 13.983,24.2468 C13.983,23.7744 14.1684,23.3298 14.5052,22.9952 L17.4852,20.0386 C18.1028,19.4262 19.2646,18.5244 20.1114,19.3642 C20.5,19.7502 21.1276,19.7476 21.5134,19.3592 C21.8994,18.9708 21.897,18.343 21.5084,17.9574 C20.069,16.529 17.9416,16.793 16.0888,18.6314 L13.1086,21.5882 C12.3936,22.298 12,23.242 12,24.2468 C12,25.2516 12.3936,26.1954 13.1088,26.9052 C13.8446,27.6352 14.8108,28 15.7774,28 C16.7442,28 17.7108,27.6352 18.447,26.9048 L19.2572,26.1006 C19.6456,25.715 19.6478,25.0874 19.2618,24.6988 C18.8764,24.3106 18.2482,24.3084 17.8596,24.6942 Z M26.8908,13.2088 C25.3448,11.6748 23.1832,11.5916 21.752,13.0116 L20.7428,14.0134 C20.3542,14.3992 20.3518,15.0266 20.7378,15.4152 C21.1238,15.8038 21.7514,15.806 22.14,15.4202 L23.1488,14.419 C23.8902,13.6828 24.861,13.988 25.4942,14.6162 C25.8318,14.9508 26.0172,15.3954 26.0172,15.8678 C26.0172,16.3404 25.8316,16.785 25.4946,17.1196 L22.3152,20.2736 C20.8614,21.716 20.1794,21.039 19.8884,20.7502 C19.4998,20.3644 18.8724,20.3668 18.4864,20.7552 C18.1004,21.1436 18.1028,21.7714 18.4914,22.157 C19.1588,22.8194 19.9206,23.1478 20.7192,23.1478 C21.697,23.1478 22.7298,22.6554 23.7118,21.6804 L26.8912,18.5264 C27.606,17.8166 28,16.8724 28,15.8676 C28,14.8632 27.606,13.919 26.8908,13.2088 Z" />
  </svg>

);
const Check = (props)=> (
  <svg viewBox="0 0 26 26" {...props}>
    <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z" />
  </svg>
);
const X = (props) => (
  <svg viewBox="0 0 22 22" {...props}>
    <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z" />
  </svg>
);
/* eslint-enable */

export default class Button extends Component {
  static propTypes = {
    forceVisible: PropTypes.func.isRequired,
    resumeVisible: PropTypes.func.isRequired,
  };
  state = {
    toggle: false,
  };
  closeInput = (event, isClose) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isClose && this.inputWrapper.contains(event.target)) {
      return;
    }
    document.querySelector('body').removeEventListener('click', this.closeInput, true);
    this.props.resumeVisible();
    this.setState((prevState) => ({ ...prevState, toggle: false }));
    this.props.getEditorRef().focus();
    const editorState = EditorState.forceSelection(this.props.getEditorState(), this.state.selection);
    this.props.setEditorState(editorState);
  };
  openInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.forceVisible();
    document.querySelector('body').addEventListener('click', this.closeInput, true);
    const selection = this.props.getEditorState().getSelection();
    this.setState((prevState) => ({ ...prevState, toggle: true, selection }));
  };
  onInputWrapperMount = (inputWrapper) => { this.inputWrapper = inputWrapper; };
  onInputMount = (input) => { this.input = input; };
  render() {
    const { getEditorState, setEditorState } = this.props;
    const setLink = () => {
      const url = this.input.value.trim();
      this.input.value = '';
      if (!url) {
        return;
      }
      const editorState = EditorState.forceSelection(getEditorState(), this.state.selection);
      const content = editorState.getCurrentContent();
      const newContent = content.createEntity(
        'LINK',
        'IMMUTABLE',
        { url }
      );
      const newEditorState = EditorState.set(editorState, { currentContent: newContent });
      const entityKey = newContent.getLastCreatedEntityKey();
      const _newEditorState = RichUtils.toggleLink(
        newEditorState,
        this.state.selection,
        entityKey
      );
      setEditorState(_newEditorState);
    };
    return (
      <div className={styles.group}>
        <div
          className={classNames(buttonStyles.wrapper, styles.wrapper)}
          onMouseDown={this.openInput}
          data-name="超鏈結"
        >
          <HyperLink className={buttonStyles.svg} />
        </div>
        <div
          className={classNames(styles.inputWrapper, {
            [styles.activeInputWrapper]: this.state.toggle,
          })}
          ref={this.onInputWrapperMount}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          <input
            className={styles.input}
            ref={this.onInputMount}
            placeholder="例如：https://sususite.com"
          />
          <div
            className={styles.checkWrap}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setLink();
              this.closeInput(event, true);
            }}
          >
            <Check className={styles.check} />
          </div>
          <div className={styles.xWrap} onMouseDown={(event) => this.closeInput(event, true)}>
            <X className={styles.x} />
          </div>
        </div>
      </div>
    );
  }
}
