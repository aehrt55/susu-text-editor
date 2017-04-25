import React from 'react';
import { toggleBlockType, getCurrentBlockType } from 'draft-js/lib/RichTextEditorUtil';
import preventBubblingUp from './preventBubblingUp';
import toggleBlockData from './toggleBlockData';

const getCurrentBlockData = (editorState) => editorState
.getCurrentContent()
.getBlockForKey(editorState.getSelection().getStartKey())
.getData();

const isActive = (editorState, { blockType, styleType }) => {
  if (blockType) {
    return (getCurrentBlockType(editorState) === blockType);
  } else if (styleType) {
    return (getCurrentBlockData(editorState).get(styleType, false))
  }
  return false;
};

export default (WrappedComponent, { blockType, styleType }) => ({
  getEditorState,
  setEditorState,
  ...props,
}) => (
  <WrappedComponent
    isActive={isActive(getEditorState(), { blockType, styleType })}
    onClick={(event) => {
      preventBubblingUp(event);
      if (blockType) {
        setEditorState(toggleBlockType(getEditorState(), blockType));
      } else if (styleType) {
        setEditorState(toggleBlockData(getEditorState(), styleType));
      }
    }}
    {...props}
  />
);
