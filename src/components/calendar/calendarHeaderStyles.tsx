import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  'calendar-header-text': {
    fontSize: 14,
    color: '#1677ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  yearAndMonth: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  }
})