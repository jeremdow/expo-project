import moment from 'moment';
import { groupBy, range } from 'lodash';

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

export const weekFromMondayToSunday = () => {
  const week = [...weekDays];
  week.push(week.shift());
  return week;
};

export const getDay = (date) => weekDays[date.getDay()];
export const getHours = (date) => date.getHours();

export function orderList(list) {
  const newList = [...list];
  newList.push(...newList.splice(0, 4));
  return newList;
}

export const labels = range(0, 24).map((hour) =>
  moment(hour, ['H']).format('hA'),
);

const crowdHistoryMapper = (data) => {
  const maxCapacity = getMaxCapacity(data.maxCapacity, data.crowdHistory);
  const crowdHistoryByWeek = groupBy(data.crowdHistory, (p) => p.weekDay);
  const weekData = {};
  weekDays.forEach((day) => {
    weekData[day] = getHourValuesByDay(crowdHistoryByWeek[day], maxCapacity);
  });

  // const labels = range(0, 24).map((hour) => moment(hour, ['H']).format('hA'));

  return {
    ...data,
    maxCapacity,
    crowdHistory: weekData,
    labels,
  };
};

export default crowdHistoryMapper;
