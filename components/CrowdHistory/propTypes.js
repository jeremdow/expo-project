import PropTypes from 'prop-types';

const CrowdHistoryPropTypes = {
  visits: PropTypes.arrayOf(PropTypes.number),
  selectedTab: PropTypes.string,
  setSelectedTab: PropTypes.func,
  labels: PropTypes.arrayOf(PropTypes.string),
  now: PropTypes.shape({
    day: PropTypes.string,
    hours: PropTypes.number,
  }),
};

export default CrowdHistoryPropTypes;
