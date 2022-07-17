import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated, Text, LayoutChangeEvent, Dimensions } from 'react-native'
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('screen').height;


interface AnimationProps {
  children: React.ReactNode,
  visible: boolean,
  /**
   * 设定动画效果
   */
  // animation?: 'slide' | 'fade' | 'slideUp',
  position: 'top' | 'bottom' | 'center',
}

/**
 * 显示时 设置display: 'block', 然后运行动画
 * 消失时，运行消失动画， 然后设置 display: 'none'
 */

const Animation = (props: AnimationProps) => {
  const { children, visible, position = "bottom" } = props;
  const [innerVisible, setInnerVisible] = useState(false);
  const [layout, setLayout] = useState(null)

  const animatedRef = useRef(new Animated.Value(0));
  const opacityAnimatedRef = useRef(new Animated.Value(0))
  const animation = ["top", "left", "right", "bottom"].includes(position) 
    ? 'slide'
    : 'fade'

  useEffect(() => {
    if (visible) {
      setInnerVisible(visible)
      return;
    } 
    // 隐藏动画
    disappearAnimation()
  }, [visible])

  useEffect(() => {
    // 显示动画
    if (!innerVisible || layout === null) {
      return
    } 
    showAnimation()
  }, [innerVisible, layout])

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({
      width: width,
      height: height
    })
  }

  const showAnimation = () => {
    const offset = {
      "top": 80,
      "center": -(layout?.height) / 2,
      "bottom":-(80 + layout?.height),
    }
    if (animation === 'fade') {
      Animated.spring(opacityAnimatedRef.current, {
        toValue: 1,
        useNativeDriver: true
      }).start();
      return;
    }

    if (animation === 'slide') {
      Animated.spring(animatedRef.current, {
        toValue: offset[position],
        useNativeDriver: true
      }).start();
      return;
    }
  }

  const disappearAnimation = () => {
    const animationContainer = animation === 'fade' 
      ? opacityAnimatedRef.current
      : animatedRef.current
 
    Animated.timing(animationContainer, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(({finished}) => {
      if (finished === true) {
        setInnerVisible(false)
      }
    });
  }

  const animatedStyle = useMemo(() => {
    return {
      transform: [{
        translateY: animatedRef.current 
      }]
    }
    
  }, [])

  const opacityStyle = useMemo(() => {
    return {
      opacity: opacityAnimatedRef.current
    }
  }, [])

  const viewStyles =  [
      styles.position,
      styles[position],
      {
        display: (innerVisible ? undefined : "none") as 'none',
      },
      animation === 'slide' ? animatedStyle : opacityStyle,
    ]

  return (
    <Animated.View
      style={viewStyles}
      onLayout={handleOnLayout}
    >
      <>
        {children}
      </>
    </Animated.View>
  )
}

export default Animation