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

export default styles;
