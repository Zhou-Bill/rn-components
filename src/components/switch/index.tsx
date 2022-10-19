import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Animated, Text, Easing, LayoutChangeEvent } from 'react-native'
import styles from './styles';

interface Iprops {
  checked?: boolean,
  disabled?: boolean,
  onChange?: ((checked: boolean) => void) | null,
  openNode?: React.ReactNode,
  closeNode?: React.ReactNode,
}

const HANDLER_WIDTH = 22
const DEFAULT_WIDTH = 48

const Switch: React.FC<Iprops> = (props: Iprops) => {
  const { checked = false, disabled, onChange, openNode = null, closeNode = null } = props;
  const [innerState, setInnerState] = useState<boolean>(true);
  // 默认最小长度48
  const [trackWidth, setTrackWidth] = useState(DEFAULT_WIDTH);
  const offset = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const handleChange = () => {
    if (disabled) {
      return;
    }
    const current = !innerState;
    Animated.timing(offset, {
      toValue: current ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (!("checked" in props)) {
      setInnerState(current);
    }

    if (onChange) {
      onChange(current)
    }
  }

  useEffect(() => {
    setInnerState(checked);
  }, [checked])

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    // trackRef.current = width;
    setTrackWidth(width || 12)
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleChange}>
      <View style={[styles.switch, { width: DEFAULT_WIDTH + trackWidth - HANDLER_WIDTH / 2 - 6}]}>
        <Animated.View style={[styles.track, innerState ? styles.isActive : {}]}>
          <Animated.View
            onLayout={onLayout}
            style={{
              borderRadius: 100,
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
              innerState ? openNode : closeNode
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
                  outputRange: [0, trackWidth + HANDLER_WIDTH / 2 - 2],
                }),
              }],
            }
          ]} 
        />
      </View>
    </TouchableOpacity>
  )
}

export default Switch