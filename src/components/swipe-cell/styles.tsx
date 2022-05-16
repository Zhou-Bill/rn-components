import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'swipe-cell': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  'swipe-cell-track': {
    position: 'relative',
    width: '100%',
  },
  'swipe-cell-children': {
    backgroundColor: 'red',
    width: '100%',
  },
  'swipe-cell-actions': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'swipe-cell-actions-item': {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'blue',
  },
  'swipe-cell-left-actions': {
    position: 'absolute',
    right: '100%',
    top: 0,
    backgroundColor: 'blue',
    height: '100%',
  },
  'swipe-cell-right-actions': {
    position: 'absolute',
    top: 0,
    left: '100%',
    height: '100%',
  },
  'swipe-cell-actions-primary': {
    backgroundColor: '#1890ff',
  },
  'swipe-cell-actions-success': {
    backgroundColor: '#52c41a',
  },
  'swipe-cell-actions-danger': {
    backgroundColor: '#ff4d4f',
  },
  'swipe-cell-actions-warning': {
    backgroundColor: '#faad14',
  },
  'swipe-cell-actions-default': {
    backgroundColor: '#ccc'
  },
  'swipe-cell-actions-text': {
    color: '#fff',
  }
})