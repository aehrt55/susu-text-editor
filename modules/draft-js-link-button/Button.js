import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, RichUtils } from 'draft-js';
import buttonStyles from '../draft-js-buttons/Button.css';
import styles from './Button.css';

/* eslint-disable */
const HyperLink = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 24 24" {...props}>
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fillRule="evenodd" />
  </svg>
);
const Check = (props)=> (
  <svg width="30px" height="30px" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);
const X = (props) => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.7823775,19.5889483 L39.5075349,3.26559715 C40.2567278,2.53440285 40.2567278,1.34901961 39.5075349,0.617825312 C38.7583419,-0.113368984 37.54378,-0.113368984 36.794587,0.617825312 L20.0694296,16.9411765 L3.34427218,0.620320856 C2.59507922,-0.11087344 1.38051726,-0.11087344 0.631324307,0.620320856 C-0.117868649,1.35151515 -0.117868649,2.5368984 0.631324307,3.26809269 L17.3564817,19.5914439 L0.633881279,35.9122995 C-0.115311676,36.6434938 -0.115311676,37.828877 0.633881279,38.5600713 C1.00975624,38.9244207 1.498138,39.1090909 1.98907673,39.1090909 C2.48001546,39.1090909 2.97095418,38.9269162 3.34427218,38.5600713 L20.0694296,22.2367201 L36.794587,38.5600713 C37.170462,38.9244207 37.6588437,39.1090909 38.1497825,39.1090909 C38.6407212,39.1090909 39.1316599,38.9269162 39.5049779,38.5600713 C40.2541709,37.828877 40.2541709,36.6434938 39.5049779,35.9122995 L22.7823775,19.5889483 Z" />
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
          <HyperLink className={classNames(buttonStyles.svg, styles.hyperLink)} />
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
