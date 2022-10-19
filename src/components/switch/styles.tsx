import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  switch: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 100,
    height: 22,
  },
  track: {
    backgroundColor: '#ccc',
    // width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    minWidth: 44,
  },
  handler: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 2,
    top: 2,
    // left: 0,
    // top: 0
  },
  isActive: {
    backgroundColor: '#1890ff',
  }
  
})