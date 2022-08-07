import { StyleSheet } from "react-native";

export default StyleSheet.create({
  'radio': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'radio-icon-container': {
    width: 32,
    height: 32,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  'radio-icon-container-checked': {
    backgroundColor: '#1677ff'
  }
})