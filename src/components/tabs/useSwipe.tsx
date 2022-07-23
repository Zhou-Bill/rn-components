import { useState, useEffect, useRef, useContext } from "react";
import { PanResponder } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import TabsContext from "./tabContext";

type Options = {
  animated: boolean
}

function useSwipe(options: Options) {
  const { animated } = options;
  const { nodes, current, onChange, containerWidth } = useContext(TabsContext);
  const [isTouched, setIsTouched] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0,
  });
  const currentIndex = nodes.findIndex((_item: any) => _item.index === current);
  const translateX = useSharedValue(-currentIndex * containerWidth);
  const count = nodes.length;

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  });

  useEffect(() => {
    const index = nodes.findIndex((_item: any) => _item.index === current);
    translateX.value = animated ?  withTiming(-containerWidth * index) : -containerWidth * index
  }, [current])

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
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    // http://t.zoukankan.com/foxNike-p-11119204.html
    onPanResponderTerminationRequest: () => false
  })

  return { style, panResponder, containerWidth }
}

export default useSwipe