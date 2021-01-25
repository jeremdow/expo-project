import React from 'react';
import HeadingView from './Heading';
import HeadingPropTypes from './propTypes';

function Heading({ variant, component, children }) {
  return (
    <HeadingView variant={variant} component={component}>
      {children}
    </HeadingView>
  );
}

Heading.propTypes = HeadingPropTypes;

export default Heading;
