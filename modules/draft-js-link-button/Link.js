import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ contentState, entityKey, children, getEditorState }) => (
  <a
    href={contentState.getEntity(entityKey).getData().url}
    style={{
      backgroundColor: getEditorState().getSelection().getHasFocus() ? 'rgba(255,200,0, .4)' : 'transparent',
      textDecoration: 'none',
    }}
  >
    {children}
  </a>
);
Link.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getEditorState: PropTypes.func.isRequired,
};

export default Link;
