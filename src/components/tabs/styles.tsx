import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  tabs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  'tabs-header': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
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
    overflow: 'hidden',
  },
  'tabs-content-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  'tabs-content-item': {
    // width: '100%',    
  }
})