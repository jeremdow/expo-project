import React from 'react';
import { TouchableHighlight } from 'react-native';
import ButtonPropTypes from './propTypes';

function Button({ children }) {
  return (
    <TouchableHighlight onPress={() => alert("click!")}>
      {children}
    </TouchableHighlight>
  );
}

Button.propTypes = ButtonPropTypes;

export default Button;
