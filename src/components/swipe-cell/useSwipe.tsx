import { useState, useEffect, useRef } from "react";
import { LayoutChangeEvent, PanResponder } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


function useSwipe() {
  const leftRef = useRef(0);
  const rightRef = useRef(0);
  const distanceRef = useRef(0);
  const [isTouched, setIsTouched] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0,
  });
  const translateX = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  });

  const onLayout = (event: LayoutChangeEvent, type: 'left' | 'right') => {
    const layoutWidth = event.nativeEvent.layout.width;
    if (type === 'left') {
      leftRef.current = layoutWidth
    } else {
      rightRef.current = layoutWidth
    }
  }

  const handleActionClick = (params: { key: string, onClick: () => void | Promise<void> }) => {
    const result = params.onClick?.();
    if (result && typeof result.then === 'function') {
      result.then((...args) => {
        resetToZero()
      })
    } else {
      resetToZero()
    }
  }

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
      // 需要加上上次距离
      const offset = e.nativeEvent.pageX - startPos.x + distanceRef.current;
      if (offset > 0 && offset > leftRef.current) {
        return;
      }
      if (offset < 0 && (-offset) > rightRef.current) {
        return;
      }
      
      translateX.value = offset
    },
    onPanResponderRelease: (e) => {
      if (!isTouched) {
        return;
      }
      // 大于 0 向右移动
      const distance = e.nativeEvent.pageX - startPos.x
      const isRight = distance > 0;
      let offset = 0;
      if (isRight) {
        offset = distance >= leftRef.current / 2 ? leftRef.current : 0
      } else {
        offset = -distance >= rightRef.current / 2 ? -rightRef.current : 0
      }
    
      translateX.value = withTiming(offset);
      setIsTouched(false);
      setStartPos({
        x: 0,
        y: 0,
      })

      distanceRef.current = offset;
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onPanResponderTerminationRequest: () => false
  })

  const resetToZero = () => {
    if (distanceRef.current !== 0) {
      translateX.value = withTiming(0);
      distanceRef.current = 0;
      setIsTouched(false);
      setStartPos({
        x: 0,
        y: 0,
      })
    }
  }

  return { style, onLayout, handleActionClick, panResponder, resetToZero }
}

export default useSwipe