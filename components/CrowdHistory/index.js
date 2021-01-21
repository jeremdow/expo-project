import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDay, getHours } from './utils';
import CrowdHistoryView from './CrowdHistory';

function CrowdHistory({ clubCapacity: { crowdHistory, labels } }) {
  const [activeDay, setActiveDay] = useState('');
  const [dateTime, setDateTime] = useState({});

  useEffect(() => {
    const date = new Date();
    setActiveDay(getDay(date));
    setDateTime({ day: getDay(date), hours: getHours(date) });
  }, []);
  const currentData = crowdHistory[activeDay] || new Array(24).fill(0);

  return (
    <CrowdHistoryView
      visits={currentData}
      selectedTab={activeDay}
      setSelectedTab={setActiveDay}
      labels={labels}
      now={dateTime}
    />
  );
}

CrowdHistory.propTypes = {
  clubCapacity: PropTypes.shape({
    crowdHistory: PropTypes.shape({
      day: PropTypes.arrayOf(PropTypes.number),
    }),
    maxCapacity: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CrowdHistory;
