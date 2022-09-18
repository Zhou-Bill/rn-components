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
  'header-title': {
    flex: 1,
    marginHorizontal: 12,
    textAlign: 'center',
  },
  'cancel-text': {
    color: '#1677ff',
  },
  'confirm-text': {
    color: '#1677ff',
  },
  'content': {
    // paddingHorizontal: 12,
  },
  'tab-content': {
    paddingHorizontal: 12,
    height: '100%',
  },
  'select-item': {
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'select-item-text-disabled': {
    color: '#909090'
  }
})