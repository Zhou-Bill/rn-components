import { StyleSheet } from "react-native";

export default StyleSheet.create({
  'checkbox': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'checkbox-icon-container': {
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
  'checkbox-icon-container-checked': {
    backgroundColor: '#1677ff'
  },
  'checkbox-group-item': {
    marginTop: 8,
  },
})