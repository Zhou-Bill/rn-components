import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, View, Animated, Text, Easing, LayoutChangeEvent } from 'react-native'
import styles from './styles';

interface Iprops {
  checked?: boolean,
  disabled?: boolean,
  onChange?: ((checked: boolean) => void) | null,
  openNode?: React.ReactNode,
  closeNode?: React.ReactNode,
}

const HANDLER_WIDTH = 22

const Switch: React.FC<Iprops> = (props: Iprops) => {
  const { checked = false, disabled, onChange, openNode = null, closeNode = null } = props;
  const [innerState, setInnerState] = useState<boolean>(true);
  // 默认最小长度48
  const [trackWidth, setTrackWidth] = useState(48);
  const offset = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const handleChange = () => {
    if (disabled) {
      return;
    }
    const current = !innerState;
    Animated.timing(offset, {
      toValue: current ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();

    if (!("checked" in props)) {
      setInnerState(current);
    }

    if (onChange) {
      onChange(current)
    }
  }

  useEffect(() => {
    setInnerState(checked)
  }, [checked])

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    // trackRef.current = width;
    setTrackWidth(width)
  }

  return (
    <TouchableWithoutFeedback onPress={handleChange}>
      <View style={[styles.switch]} onLayout={onLayout}>
        <Animated.View style={[styles.track, innerState ? styles.isActive : {}]}>
          <Animated.View
            style={{
              marginLeft: offset.interpolate({
                inputRange: [0, 1],
                outputRange: [HANDLER_WIDTH, 8],
              }),
              marginRight: offset.interpolate({
                inputRange: [0, 1],
                outputRange: [8, HANDLER_WIDTH],
              }),
            }}
          >
            {
              checked ? openNode : closeNode
            }
          </Animated.View>
        </Animated.View>
        <Animated.View 
          style={[
            styles.handler,
            {
              transform: [{
                translateX: offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, trackWidth - HANDLER_WIDTH],
                }),
              }],
            }
          ]} 
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Switch