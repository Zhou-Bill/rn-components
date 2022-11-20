import { StyleSheet } from "react-native";

export default StyleSheet.create({
  'calendar-list': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  'calendar-list-item': {
    flexBasis: '14.28%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  }
})