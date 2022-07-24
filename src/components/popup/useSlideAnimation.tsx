import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native'

type Options = {
  visible: boolean,
  direction: 'top' | 'bottom' | 'left' | 'right',
  width: number,
  height: number,
  onAfterClose?: () => void
}

const useSlideAnimation = (option: Options) => {
  const { visible, direction, onAfterClose, height } = option
  const [innerVisible, setInnerVisible] = useState(false);
  const translateRef = useRef(new Animated.Value(0));

  const isHorizontal = useMemo(() => {
    return ['left', 'right'].includes(direction)
  }, [direction])

  useEffect(() => {
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
    Animated.timing(translateRef.current, {
      toValue: height,
      duration: 500,
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
          translateY: translateRef.current 
        }
      ]
    }
  }, [isHorizontal])

  const visibleStyle = useMemo(() => {
    return {
      display: innerVisible ? undefined : 'none' as 'none',
    }
  }, [innerVisible])


  return { 
    innerVisible: innerVisible, 
    transformStyle: transformStyle,
    visibleStyle
  }
  
}

export default useSlideAnimation