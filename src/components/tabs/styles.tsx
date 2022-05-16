import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  tabs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  'tabs-header': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  'tabs-scrollView': {
    display: 'flex',
    flexDirection: 'row',
  },
  'tabs-header-item': {
    flex: 1,
  },
  'tabs-header-item-content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 12,
  },
  'underline': {
    height: 4,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  'tabs-content': {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    // backgroundColor: 'yellow',
  },
  'tabs-content-container': {
    display: 'flex',
    flexDirection: 'row',
    // transform: [
    //   {
    //     translateX: -166
    //   }
    // ]
  },
  'tabs-content-item': {
    // width: '100%',    
  }
})