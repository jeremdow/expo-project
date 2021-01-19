import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles, { height } from './styles';
import { orderList, weekFromMondayToSunday } from './utils';

function CrowdHistory(props) {
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
              day === props.currentDay ? styles.buttonCurrent : null,
            ]}
            onPress={() => props.setActiveDay(day)}
          >
            <Text
              style={[
                styles.buttonText,
                day === props.currentDay ? styles.buttonTextCurrent : null,
                day === props.activeDay ? styles.buttonTextActive : null,
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
              props.currentData.map((size, index) => (
                <View
                  key={props.labels[index]}
                  style={styles.pfBar}
                  className="pf-bar"
                >
                  <View
                    id={props.labels[index]}
                    style={[
                      styles.meter,
                      height(size),
                      props.currentHour === index + 1 ? styles.current : null,
                    ]}
                  />
                </View>
              )),
            )}
          </View>
          <View style={styles.labels}>
            {orderList(props.labels).map(
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

export default CrowdHistory;
