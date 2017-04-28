import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ contentState, entityKey, children, style }) => (
  <a
    href={contentState.getEntity(entityKey).getData().url}
    style={{ textDecoration: 'none', ...style }}
  >
    {children}
  </a>
);
Link.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object.isRequired,
};
Link.defaultProps = {
  style: {},
};

export default Link;
