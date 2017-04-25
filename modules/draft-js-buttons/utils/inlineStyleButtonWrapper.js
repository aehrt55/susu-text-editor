import React from 'react';
import { toggleInlineStyle } from 'draft-js/lib/RichTextEditorUtil';
import preventBubblingUp from './preventBubblingUp';

const isActive = (editorState, style) => editorState.getCurrentInlineStyle().has(style);

export default (WrappedComponent, { style }) => ({
  getEditorState,
  setEditorState,
  ...props,
}) => (
  <WrappedComponent
    isActive={isActive(getEditorState(), style)}
    onClick={(event) => {
      preventBubblingUp(event);
      setEditorState(toggleInlineStyle(getEditorState(), style));
    }}
    {...props}
  />
);
