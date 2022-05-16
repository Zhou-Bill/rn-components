import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'stepper': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'stepper-action': {
    width: 28,
    height: 28,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'stepper-action-text': {
    color: '#1677ff',
  },
  'stepper-action-disabled': {
    color: '#999',
  },
  'stepper-input': {
    width: 44,
    height: 28,
    marginHorizontal: 2,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
  },
  'input': {
    textAlign: 'center',
  }
})