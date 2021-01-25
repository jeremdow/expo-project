import React from 'react';
import ButtonView from './Button';
import ButtonPropTypes from './propTypes';

function Button({ children }) {
  return <ButtonView>{children}</ButtonView>;
}

Button.propTypes = ButtonPropTypes;

export default Button;
