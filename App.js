import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CrowdHistory from './components/CrowdHistory';
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
      <CrowdHistory clubCapacity={crowdHistoryMapper(clubCapacity)} />
      <StatusBar style="auto" />
    </View>
  );
}
