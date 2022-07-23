import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text } from 'react-native';
import Icon, { IconProps } from '../icon';

interface SpinningProps extends Omit<IconProps, 'name'> {}

const Spinning: React.FC<SpinningProps> = (props: SpinningProps) => {
  const { color = '#fff', size = 48, ...rest } = props;
  const animatedRef = useRef(new Animated.Value(0));
  const loopRef = useRef(null);

  useEffect(() => {
    loopRef.current = Animated.loop(
      Animated.timing(animatedRef.current, {
        toValue: 360,
        easing: Easing.linear,
        useNativeDriver: true,  
      })
    ).start()

    return () => {
      loopRef.current?.stop();
    }
  }, [])

  const styles = {
    transform: [{
      rotate: animatedRef.current.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
      })
    }]
  }
  return (
    <Animated.View style={styles}>
      <Icon name="loading2" color={color} size={size}  {...rest} />
    </Animated.View>
  )
}

export default Spinning