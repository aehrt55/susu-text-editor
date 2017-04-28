import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ contentState, entityKey, children }) => (
  <a
    href={contentState.getEntity(entityKey).getData().url}
    style={{ textDecoration: 'none' }}
  >
    {children}
  </a>
);
Link.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
