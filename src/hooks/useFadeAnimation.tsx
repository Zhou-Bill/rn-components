import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native'

type Options = {
  visible: boolean,
  onAfterClose?: () => void
}

const useFadeAnimation = (option: Options) => {
  const { visible, onAfterClose } = option
  const [innerVisible, setInnerVisible] = useState(false);
  const opacityAnimatedRef = useRef(new Animated.Value(0));

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
    Animated.timing(opacityAnimatedRef.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
    return;

  }

  const disappearAnimation = () => {
    Animated.timing(opacityAnimatedRef.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(({finished}) => {
      if (finished === true) {
        setInnerVisible(false)
      }
    });
  }

  const opacityStyle = useMemo(() => {
    return {
      opacity: opacityAnimatedRef.current,
    }
  }, [])

  return { 
    innerVisible: innerVisible, 
    opacityStyle: opacityStyle
  }
  
}

export default useFadeAnimation