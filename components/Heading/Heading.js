import React from 'react';
import HeadingPropTypes from './propTypes';

function Heading({ variant, component, children }) {
  const Component = component || variant;

  return <Component>{children}</Component>;
}

Heading.propTypes = HeadingPropTypes;

export default Heading;
