import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles, { height } from './styles';
import { orderList, weekFromMondayToSunday } from './utils';
import CrowdHistoryPropTypes from './propTypes';

function CrowdHistory({ visits, selectedTab, setSelectedTab, labels, now }) {
  return (
    <View style={styles.pfCrowdHistory} className="pf-crowd-history">
      <Text style={styles.pfSubheadingSm} className="pf-subheading-sm">
        Crowd History
      </Text>
      <View style={styles.pfTabs}>
        {weekFromMondayToSunday().map((day) => (
          <TouchableHighlight
            key={day}
            style={[
              styles.button,
              day === now.day ? styles.buttonCurrent : null,
            ]}
            onPress={() => setSelectedTab(day)}
          >
            <Text
              style={[
                styles.buttonText,
                day === now.day ? styles.buttonTextCurrent : null,
                day === selectedTab ? styles.buttonTextActive : null,
              ]}
            >
              {day.substring(0, 3)}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
      <View role="tabpanel" id="thursday-tab" aria-labelledby="thursday">
        <View>
          <View style={styles.pfChart} className="pf-chart">
            {orderList(
              visits.map((size, index) => (
                <View
                  key={labels[index]}
                  style={styles.pfBar}
                  className="pf-bar"
                >
                  <View
                    id={labels[index]}
                    style={[
                      styles.meter,
                      height(size),
                      now.hours === index + 1 ? styles.current : null,
                    ]}
                  />
                </View>
              )),
            )}
          </View>
          <View style={styles.labels}>
            {orderList(labels).map(
              (label, index) =>
                (index + 1) % 3 === 0 && (
                  <Text key={label} style={styles.label}>
                    {label}
                  </Text>
                ),
            )}
          </View>
          <Text>
            Meter based on prior 4 weeks activity. May vary on holidays.
          </Text>
        </View>
      </View>
    </View>
  );
}

CrowdHistory.propTypes = CrowdHistoryPropTypes;

export default CrowdHistory;
