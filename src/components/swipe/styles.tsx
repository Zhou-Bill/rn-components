import { StyleSheet } from "react-native";

export default StyleSheet.create({
  swiper: {
    width: '100%',
    // height: 300,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative'
  },
  'swiper-container': {
    display: 'flex',
    flexDirection: 'row',
  },
  'swiper-container-vertical': {
    display: 'flex',
    flexDirection: 'column',
  },
  'swiper-dots': {
    minWidth: 60,
    // height: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: [
      {
        translateX: -30,
      }
    ]
  },
  'swiper-dots-item': {
    width: 6,
    height: 6,
    backgroundColor: '#ebedf0',
    borderRadius: 6,
    marginRight: 6,
    // border-radius: 100%;
  },
  'swiper-dots-item-active': {
    backgroundColor: 'red'
  }
})