import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getVisibleSelectionRect } from 'draft-js';
import styles from './Toolbar.css';

export default class Toolbar extends Component {
  static propTypes = {
    store: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      updateItem: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    }).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.func).isRequired,
    toolbarHeight: PropTypes.number,
    toolbarWidth: PropTypes.number,
  };
  componentWillMount() {
    this.props.store.subscribe('isVisible', this.onVisibilityChange);
    this.props.store.subscribe('forceVisible', this.onVisibilityChange);
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
    const { getItem, updateItem } = this.props.store;
    const isVisible = getItem('isVisible');
    const forceVisible = getItem('forceVisible');
    const toolbarStyle = {};
    const toolbarWidth = this.props.toolbarWidth || (this.props.buttons.length * 40);
    const toolbarHeight = this.props.toolbarHeight || 40;
    if (isVisible || forceVisible) {
      toolbarStyle.transform = 'scale(1)';
      toolbarStyle.visibility = 'visible';
      const editorRect = getItem('getEditorRef')().refs.editor.getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window) || getItem('selectionRect');
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
            getEditorRef={getItem('getEditorRef')}
            isVisible={isVisible}
            forceVisible={() => {
              updateItem('forceVisible', true);
              updateItem('selectionRect', getVisibleSelectionRect(window));
            }}
            resumeVisible={() => {
              updateItem('forceVisible', false);
            }}
          />
        ))}
      </div>
    );
  }
}
