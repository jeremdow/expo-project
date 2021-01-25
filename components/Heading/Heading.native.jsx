import React from 'react';
import { StyleSheet, Text } from 'react-native';
import HeadingPropTypes from './propTypes';

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

function Heading({ variant, children }) {
  return <Text style={variant === 'h1' ? styles.h1 : null}>{children}</Text>;
}

Heading.propTypes = HeadingPropTypes;

export default Heading;
