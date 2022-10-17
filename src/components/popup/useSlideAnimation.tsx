import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native'

type Options = {
  visible: boolean,
  direction: 'top' | 'bottom' | 'left' | 'right',
  width: number,
  height: number,
  onMaskClick: () => void,
  onAfterClose?: () => void
}

/**
 * TODO: 手势那块未完善
 */

const useSlideAnimation = (option: Options) => {
  const { visible, direction, onAfterClose, height, width, onMaskClick } = option
  const [innerVisible, setInnerVisible] = useState(false);
  const translateRef = useRef(new Animated.Value(0));
  const [isMounted, setIsMounted] = useState(false)
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0,
  })

  const isHorizontal = useMemo(() => {
    return ['left', 'right'].includes(direction)
  }, [direction])

  useEffect(() => {
    setIsMounted(true)
    if (visible) {
      setInnerVisible(visible)
      return;
    } 
    // 隐藏动画
    disappearAnimation()
  }, [visible])

  useEffect(() => {
    // 隐藏时
    if (!innerVisible) {
      onAfterClose?.()
      return;
    }
    
    // 显示动画
    showAnimation()
  }, [innerVisible])

  const showAnimation = () => {
    const value = {
      top: height,
      bottom: -height,
      left: width,
      right: -width
    }
    Animated.spring(translateRef.current, {
      toValue: value[direction],
      useNativeDriver: true
    }).start();
    return;
  }

  const disappearAnimation = () => {
    Animated.timing(translateRef.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(({finished}) => {
      if (finished === true) {
        setInnerVisible(false)
      }
    });
  }

  const transformStyle = useMemo(() => {
    const key = isHorizontal ? 'translateX' : 'translateY' as const;
    return {
      transform: [
        {
          [key]: translateRef.current 
        }
      ]
    }
  }, [isHorizontal])

  const visibleStyle = useMemo(() => {
    return {
      display: innerVisible ? undefined : 'none' as 'none',
    }
  }, [innerVisible])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,  
    onPanResponderGrant: (e) => { 
      setIsTouched(true);
      setStartPos({
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
      })
    },
    onPanResponderMove: (e) => {
      if (!isTouched) {
        return;
      }
      const { pageX, pageY } = e.nativeEvent;
      let offsetX = pageX - startPos.x;
      let offsetY = pageY - startPos.y;
      if (offsetX < 0) {
        return
      }
      Animated.timing(translateRef.current, {
        toValue: -(height - offsetX),
        duration: 0,
        useNativeDriver: true
      }).start();
    },
    onPanResponderRelease: (e) => {
      if (!isTouched) {
        return;
      }
      // 大于 0 向右移动
      const { pageX, pageY } = e.nativeEvent;
      let offsetX = pageX - startPos.x;
      if (offsetX < 150) {
        Animated.timing(translateRef.current, {
          toValue: -(height),
          duration: 500,
          useNativeDriver: true
        }).start();
        return
      }

      Animated.timing(translateRef.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(({finished}) => {
        if (finished) {
          onMaskClick?.()
        }
      });
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onPanResponderTerminationRequest: () => false
  })


  return { 
    innerVisible: innerVisible, 
    transformStyle: transformStyle,
    visibleStyle,
    isHorizontal,
    isMounted,
    panResponder
  }
  
}

export default useSlideAnimation