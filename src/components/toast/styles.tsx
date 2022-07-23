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
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: screenWidth - 160,
    height: screenWidth - 160,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  'base-content': {
    textAlign: 'center',
    padding: 8,
  }

})