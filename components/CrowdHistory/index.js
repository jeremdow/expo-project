import React, { useEffect, useState } from 'react';
import { getDay, getHours } from './utils';
import CrowdHistoryView from './CrowdHistory';
import CrowdHistoryPropTypes from './propTypes';

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
    <CrowdHistoryView
      currentData={currentData}
      activeDay={activeDay}
      setActiveDay={setActiveDay}
      currentDay={currentDay}
      currentHour={currentHour}
      labels={labels}
    />
  );
}

CrowdHistory.propTypes = CrowdHistoryPropTypes;

export default CrowdHistory;
