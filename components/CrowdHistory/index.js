import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
// import styles from './styles';
import { groupBy, range } from 'lodash';
import moment from 'moment';

const getMaxCapacity = (maxCapacity, crowdHistory) => {
  if (!maxCapacity && crowdHistory && crowdHistory.length) {
    return crowdHistory.reduce((max, hour) => {
      let maxVisits;
      if (hour.visits > max) {
        maxVisits = hour.visits;
      }
      return maxVisits;
    }, 0);
  }
  return maxCapacity;
};

const getHourValuesByDay = (dayInfo, maxCapacity) => {
  const hourValues = [...Array(24)];
  if (dayInfo) {
    dayInfo.forEach((visit) => {
      hourValues[visit.hourOfDay] = (visit.visits / maxCapacity) * 100;
    });
  }

  return hourValues;
};

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const weekFromMondayToSunday = () => {
  const week = [...weekDays];
  week.push(week.shift());
  return week;
};

export const crowdHistoryMapper = (data) => {
  const maxCapacity = getMaxCapacity(data.maxCapacity, data.crowdHistory);
  const crowdHistoryByWeek = groupBy(data.crowdHistory, (p) => p.weekDay);
  const weekData = {};
  weekDays.forEach((day) => {
    weekData[day] = getHourValuesByDay(crowdHistoryByWeek[day], maxCapacity);
  });

  const labels = range(0, 24).map((hour) => moment(hour, ['H']).format('hA'));

  return {
    ...data,
    maxCapacity,
    crowdHistory: weekData,
    labels,
  };
};

const styles = StyleSheet.create({
  pfSubheadingSm: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 24, // 1.3 * 18
    textTransform: 'uppercase',
    color: '#231f20',
  },
  pfCrowdHistory: {
    display: 'flex',
    flexDirection: 'column',
    height: '25%',
    justifyContent: 'center',
  },
  pfChart: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-around',
    // flex: 1,
    // marginBottom: 32, // 2rem
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#9f1b96',
    // borderBottom: '1px dashed #adafaf',
    height: '100%',
  },
  pfBar: {
    display: 'flex',
    flexDirection: 'column-reverse',
    flexBasis: '3%',
    overflow: 'visible',
  },
  meter: {
    backgroundColor: '#5c2e85',
    marginTop: 'auto',
    // transition: 'height .3s',
  },
  current: {
    backgroundColor: '#9f1b96',
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    lineHeight: 21,
    // position: 'absolute',
    // bottom: -20,
  },
  pfTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // 1.25rem
    padding: 0,
  },
  button: {
    width: 36,
    alignItems: 'center',
  },
  buttonCurrent: {
    backgroundColor: '#5c2e85',
  },
  buttonText: {
    // width: 30,
    lineHeight: 22,
    padding: 0,
    textTransform: 'uppercase',
  },
  buttonTextCurrent: {
    color: '#fff',
  },
  buttonTextActive: {
    textDecorationLine: 'underline',
    textDecorationColor: '#5c2e85',
  },
});

function height(size) {
  return { height: `${size}%` };
}

function orderList(list) {
  const newList = [...list];
  newList.push(...newList.splice(0, 4));
  return newList;
}

const getDay = (date) => weekDays[date.getDay()];
const getHours = (date) => date.getHours();

function CrowdHistory({ clubCapacity: { crowdHistory, labels } }) {
  const [activeDay, setActiveDay] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [currentHour, setCurrentHour] = useState();

  useEffect(() => {
    const date = new Date();
    // @TODO: refactor this state {day, time}, selected
    setCurrentDay(getDay(date));
    setActiveDay(getDay(date));
    setCurrentHour(getHours(date));
  }, []);
  const currentData = crowdHistory[activeDay] || new Array(24).fill(0);

  return (
    <View style={styles.pfCrowdHistory} className="pf-crowd-history">
      <Text style={styles.pfSubheadingSm} className="pf-subheading-sm">
        Crowd History
      </Text>
      <View style={styles.pfTabs}>
        {weekFromMondayToSunday().map((day) => (
          <TouchableHighlight
            style={[
              styles.button,
              day === currentDay ? styles.buttonCurrent : null,
            ]}
            onPress={() => setActiveDay(day)}
          >
            <Text
              style={[
                styles.buttonText,
                day === currentDay ? styles.buttonTextCurrent : null,
                day === activeDay ? styles.buttonTextActive : null,
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
              currentData.map((size, index) => (
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
                      currentHour === index + 1 ? styles.current : null,
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
                  <Text key={index} style={styles.label}>
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

CrowdHistory.propTypes = {
  clubCapacity: PropTypes.shape({
    crowdHistory: PropTypes.object,
    maxCapacity: PropTypes.number,
    labels: PropTypes.array,
  }).isRequired,
};

export default CrowdHistory;
