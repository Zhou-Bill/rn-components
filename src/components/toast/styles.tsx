import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  toast: {
    zIndex: 99,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginHorizontal: 24,
    borderRadius: 8,
  },
  'toast-title': {
    fontSize: 14,
    marginBottom: 8,
  },
  enhance: {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#69C779',
    display: 'flex',
    flexDirection: 'column',
    width: '90%'
  },
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  'base-container': {
    width: undefined,
    height: undefined,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  content: {
    color: '#fff',
  },
  'base-content': {
    textAlign: 'center',
    padding: 8,
    fontSize: 24,
  },
  'enhance-content': {
    fontSize: 12,
    color: '#979797',
  }
})