import { StyleSheet } from 'react-native';

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
  },
  pfBar: {
    display: 'flex',
    flexDirection: 'column-reverse',
    flexBasis: '3%',
  },
  meter: {
    backgroundColor: '#5c2e85',
    marginTop: 'auto',
    // transition: 'height .3s',
  },
  current: {
    backgroundColor: '#9f1b96',
  },
  label: {
    fontSize: 4,
  },
});

export default styles;
