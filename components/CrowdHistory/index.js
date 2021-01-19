import React, { useEffect, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { groupBy, range } from 'lodash';
import moment from 'moment';
import CrowdHistoryPropTypes from './propTypes';
import styles from './styles';

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
            key={day}
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
