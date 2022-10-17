import { StyleSheet } from "react-native";

export default StyleSheet.create({
  'cell': {
    padding: 12,
    backgroundColor: '#FFF',
  },
  'cell-border-bottom': {
    borderBottomColor: '#ebedf0',
    borderBottomWidth: 1,
  },
  'cell-container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'cell-label': {
    fontSize: 14,
  }
})