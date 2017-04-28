import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ contentState, entityKey, children }) => (
  <a
    href={contentState.getEntity(entityKey).getData().url}
    style={{
      borderBottom: '1px dotted #666',
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
};

export default Link;
