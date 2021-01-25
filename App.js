import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import CrowdHistory from './components/CrowdHistory';
import Heading from './components/Heading';
import crowdHistoryMapper from './components/CrowdHistory/utils';
import clubCapacity from './mockdata/clubCapacity';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Heading variant="h1" component="h2">
        Hello!
      </Heading>
      <Button>
        <Text>Test</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}
