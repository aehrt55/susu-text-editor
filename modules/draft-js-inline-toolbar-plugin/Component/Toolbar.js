import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getVisibleSelectionRect } from 'draft-js';
import styles from './Toolbar.css';

// todo: make toolbarHeight to be determined or a parameter
const toolbarHeight = 42;
const toolbarWidth = 300;

export default class Toolbar extends Component {
  static propTypes = {
    store: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      updateItem: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    }).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.func).isRequired,
  };
  componentWillMount() {
    this.props.store.subscribe('isVisible', this.onVisibilityChange);
    this.getEditorState = this.props.store.getItem('getEditorState');
    this.setEditorState = this.props.store.getItem('setEditorState');
  }
  shouldComponentUpdate() {
    const selectionRect = getVisibleSelectionRect(window);
    const onSelectionChange = () => {
      document.removeEventListener('selectionchange', onSelectionChange);
      this.forceUpdate();
    };
    if (selectionRect === null) {
      document.addEventListener('selectionchange', onSelectionChange);
      return false;
    } else {
      return true;
    }
  }
  onVisibilityChange = () => this.forceUpdate();
  render() {
    const { getItem, subscribe, unSubscribe } = this.props.store;
    const isVisible = getItem('isVisible');
    const toolbarStyle = {
      transform: `scale(${isVisible ? 1 : 0})`,
      visibility: `${isVisible ? 'visible' : 'hidden'}`,
    };
    if (isVisible) {
      const editorRect = getItem('getEditorRef')().refs.editor.getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);
      if (selectionRect.top - toolbarHeight < 0) {
        toolbarStyle.bottom = editorRect.bottom - selectionRect.bottom - toolbarHeight;
      } else {
        toolbarStyle.top = (selectionRect.top - editorRect.top) - toolbarHeight;
      }
      const isOverRightBound = (selectionRect.left + toolbarWidth) > editorRect.right;
      if (isOverRightBound) {
        toolbarStyle.right = 0;
      } else {
        toolbarStyle.left = selectionRect.left - editorRect.left;
      }
    }
    return (
      <div className={styles.toolbar} style={toolbarStyle}>
        {this.props.buttons.map((Button, index) => (
          <Button
            key={index}
            getEditorState={this.getEditorState}
            setEditorState={this.setEditorState}
            isVisible={isVisible}
            subscribeVisibilityChange={(callback) => subscribe('isVisible', callback)}
            unSubscribeVisibilityChange={(callback) => unSubscribe('isVisible', callback)}
          />
        ))}
      </div>
    );
  }
}
