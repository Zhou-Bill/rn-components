import { useState, useEffect, useRef } from "react";
import { LayoutChangeEvent, PanResponder } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Options = {
  current: number | string, 
  nodes: any,
  onChange: any
}

function useSwipe(options: Options) {
  const { current, nodes, onChange } = options;
  const [isTouched, setIsTouched] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0,
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);
  const count = nodes.length;
  const currentIndex = nodes.findIndex((_item: any) => _item.index === current);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  });

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  useEffect(() => {
    if (containerWidth === 0) {
      return
    }
    const index = nodes.findIndex((_item: any) => _item.index === current);
    translateX.value = withTiming(-containerWidth * index)
  }, [current, containerWidth])

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
      const offset = e.nativeEvent.pageX - startPos.x
      const isRight = offset > 0 ;
      if (isRight && currentIndex === 0) {
        return;
      }  
      if (!isRight && currentIndex === count - 1) {
        return;
      }   
      translateX.value = -currentIndex * containerWidth + offset;
    },
    onPanResponderRelease: (e) => {
      if (!isTouched) {
        return;
      }
      // 大于 0 向右移动
      const distance = e.nativeEvent.pageX - startPos.x
      const isRight = distance > 0;
     
      if (isRight && currentIndex === 0) {
        return;
      }  
      if (!isRight && currentIndex === count - 1) {
        return;
      }   

      if (isRight) {
        translateX.value =withTiming(-(currentIndex - 1) * containerWidth);
      } else {
        translateX.value = withTiming(-(currentIndex + 1) * containerWidth);
      }
      const next = isRight ? currentIndex - 1 : currentIndex + 1;
      const key = nodes[next].index
      onChange?.(key)
      setStartPos({
        x: 0,
        y: 0,
      })
      setIsTouched(false);
    }
  })


  return { style, onLayout, panResponder, containerWidth }
}

export default useSwipe