import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'pull-to-refresh': {
    height: '100%',
   
  },
  'pull-to-refresh-header': {
    position: 'relative',
    backgroundColor: 'red',
    overflow: 'hidden',
    // height: 60,
    //  transform: [{
    //   translateY: -60,
    // }]
    // height: 100,
    // // height: 0,
   
  },
  'pull-to-refresh-header-content': {
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    color: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    backgroundColor: 'blue',
  }
})