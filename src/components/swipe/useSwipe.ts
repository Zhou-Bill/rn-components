import { useState, useEffect, useRef } from "react";
import { Dimensions, GestureResponderEvent, PanResponder } from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

type Options = {
  /** swipe 宽高 */
  width: number,
  height: number,
  /** swiper 数量 */
  count: number,
  /** 动画方向， 垂直 | 横向 */
  direction: 'horizontal' | 'vertical',
  /** 初始化索引值 */
  defaultIndex: number
  onChange?: (current: number) => void,
}


function useSwiper(options: Options) {
  const {
    count,
    width,
    height,
    direction,
    defaultIndex,
    onChange
  } = options;
  const [current, setCurrent] = useState(defaultIndex % count);
  const [isTouched, setIsTouched] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetXorY = direction === 'horizontal' ? width : height
  const translateX = useSharedValue(-defaultIndex * offsetXorY);
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (count <= 1) {
      return 
    }
    // 如果点击了当前图片，那么取消setTimeout
    if (isTouched) {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      if (current === count - 1) {
        setCurrent(0);
        translateX.value = withTiming(-count  * offsetXorY, {}, (finished) => {
          if (finished) {
            translateX.value = (0);
          }
        })
        onChange?.(0)
      }  else {
        setCurrent(current + 1);
        onChange?.(current + 1)
        translateX.value = withTiming(-(current + 1) * offsetXorY)
      }
    }, 3000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [current, isTouched, offsetXorY])

  const style = useAnimatedStyle(() => {
    if (direction === 'horizontal') {
      return {
        transform: [{ translateX: translateX.value }],
        width: width * count
      }
    } 
    return { 
      transform: [{ translateY: translateX.value }],
      height: height * count
    }
    
  });
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => { 
      if (count <= 1) {
        return;
      }
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
  
      const offset = direction === 'horizontal' 
        ? e.nativeEvent.pageX - startPos.x 
        : e.nativeEvent.pageY - startPos.y;
      
      translateX.value = (-current * offsetXorY) + offset
    },
    onPanResponderRelease: (e) => {
      if (!isTouched) {
        return;
      }
      // 大于 0 向右移动
      const isRight = direction === 'horizontal' 
        ? e.nativeEvent.pageX - startPos.x > 0 
        : e.nativeEvent.pageY - startPos.y > 0;
      
      if (!isRight) {
        if (current === count - 1) {
          setCurrent(0)
          translateX.value = withTiming(-(current + 1)  * offsetXorY, {}, (finished) => {
            if (finished) {
              translateX.value = (0);
            }
          })
          onChange?.(0)
        } else {
          setCurrent(current + 1);
          translateX.value = withTiming(-(current + 1) * offsetXorY);
          onChange?.(current + 1)
        }
      } else {
        // 如果是向右滑动， 那么如果当前active 是第0张图片，那么他应该回到第三张图片
        if (current === 0) {
          setCurrent(count - 1);
          translateX.value = withTiming(-(current - 1) * offsetXorY, {}, (finished) => {
            if (finished) {
              translateX.value = -(count - 1) * offsetXorY
            }
          })
          onChange?.(count - 1)
        } else {
          setCurrent(current - 1)
          translateX.value = withTiming(-(current - 1) * offsetXorY)
          onChange?.(current - 1)
  
        }
      }
      setIsTouched(false);
      setStartPos({
        x: 0,
        y: 0,
      })
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    // http://t.zoukankan.com/foxNike-p-11119204.html
    onPanResponderTerminationRequest: () => false
  })

  return { current, style, panResponder }
}

export default useSwiper