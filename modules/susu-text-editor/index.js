import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import DraftJsPluginsEditor from '@sususite/draft-js-plugins-editor';
import { blockStyleFn } from '../draft-js-blocks';
import createInlineToolbarPlugin from '../draft-js-inline-toolbar-plugin';
import Buttons from '../draft-js-buttons';
import FontSizeButton, { customStyleFn as fontSizeStyleFn } from '../draft-js-font-size-button';
import ColorButton, { customStyleFn as colorStyleFn } from '../draft-js-color-button';

const customStyleFn = (inlineStyle) => Object.assign(
  {},
  colorStyleFn(inlineStyle),
  fontSizeStyleFn(inlineStyle)
);

export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    const buttons = [
      FontSizeButton,
      ColorButton,
      Buttons.Alignment,
      Buttons.Bold,
      Buttons.Italic,
      Buttons.Underline,
      Buttons.Strike,
      Buttons.Heading,
    ];
    const inlineToolbarPlugin = createInlineToolbarPlugin({ buttons });
    this.plugins = {
      inlineToolbarPlugin,
    };
    if (props.data) {
      this.state = {
        editorState: EditorState.createWithContent(convertFromRaw(props.data)),
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  handleChange = (editorState) => {
    if (this.unmounted) return;
    let newEditorState = editorState;
    const selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      newEditorState = EditorState.acceptSelection(editorState, selection.merge({
        focusKey: selection.getAnchorKey(),
        focusOffset: selection.getAnchorOffset(),
      }));
    }
    this.setState({ editorState: newEditorState });
  };
  handleBlur = () => {
    if (this.props.onChange) {
      this.props.onChange(convertToRaw(this.state.editorState.getCurrentContent()));
    }
  }
  render() {
    const { InlineToolbar } = this.plugins.inlineToolbarPlugin;
    const plugins = Object.values(this.plugins);
    return (
      <div style={{ position: 'relative' }}>
        <DraftJsPluginsEditor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          readOnly={this.props.readOnly}
          ref={(editor) => { this.editor = editor; }}
          plugins={plugins}
          blockStyleFn={blockStyleFn}
          customStyleFn={customStyleFn}
        />
        <InlineToolbar />
      </div>
    );
  }
}
