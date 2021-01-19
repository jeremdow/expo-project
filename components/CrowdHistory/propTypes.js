import PropTypes from 'prop-types';

const CrowdHistoryPropTypes = {
  clubCapacity: PropTypes.shape({
    crowdHistory: PropTypes.object,
    maxCapacity: PropTypes.number,
    labels: PropTypes.array,
  }).isRequired,
};

export default CrowdHistoryPropTypes;
