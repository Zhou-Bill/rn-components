import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  'notice-bar-hidden': {
    display: 'none',
  },
  'scrollable-notice-bar': {
    position: 'relative',
    height: 40
  },
  'notice-bar': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fffbe8',
    paddingVertical: 8,
    overflow: 'hidden',
  },
  'scrollable-notice-bar-left-icon': {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 40,
    zIndex: 99,
    backgroundColor: '#fffbe8',
  },
  'notice-bar-left-icon': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#fffbe8',
    height: '100%',
  },
  'notice-content-wrap': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1,
  },
  'notice-content': {
    lineHeight: 24,
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    color: '#ed6a0c',
  },
  'scollable-close-icon': {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    height: 40,
  },
  'close-icon': {
    height: '100%',
    backgroundColor: '#fffbe8',
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})