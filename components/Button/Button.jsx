import React from 'react';
import ButtonPropTypes from './propTypes';

function Button({ children }) {
  return <button type="button">{children}</button>;
}

Button.propTypes = ButtonPropTypes;

export default Button;
