import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CrowdHistory, { crowdHistoryMapper } from './components/CrowdHistory';
import clubCapacity from './mockdata/clubCapacity.js';

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
      <CrowdHistory clubCapacity={crowdHistoryMapper(clubCapacity)} />
      <StatusBar style="auto" />
    </View>
  );
}
