import { StyleSheet } from "react-native";

export default StyleSheet.create({
  'header-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  'header-icon': {
    width: 60,
  },
  'header-title': {
    flex: 1,
    marginHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'header-title-text': {
    fontSize: 18,
  },
  'header-extra': {
    width: 60,
  }
})