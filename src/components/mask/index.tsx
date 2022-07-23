import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

interface MaskProps {
  onMaskClick: () => void,
  children: React.ReactNode,
  visible: boolean,
}

const Mask: React.FC<MaskProps> = (props: MaskProps) => {
  const { children, visible, onMaskClick } = props;
  const [innerVisible, setInnerVisible] = useState(visible)

  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    if (visible) {
      setInnerVisible(true)
      setTimeout(() => {
        Animated.spring(opacity.current, {
          toValue: 1,
          useNativeDriver: true
        }).start();
      }, 350)
    } else {
      disappearAnimation()
    }
  }, [visible])

  const disappearAnimation = () => {
    Animated.spring(opacity.current, {
      toValue: 0,
      useNativeDriver: true
    }).start(({finished}) => {
      if (finished === true) {
        setInnerVisible(false)
      }
    });
  }

  const otherStyle = useMemo(() => {
    return {
      display: innerVisible ? undefined : 'none' as 'none',
    }
  }, [innerVisible])

  const onPress = () => {
    onMaskClick?.();
  }

  return (
    <TouchableOpacity onPress={onPress} style={[otherStyle]}>
      <Animated.View style={[styles.mask]}>
        <>
          { children }
        </>
      </Animated.View>
    </TouchableOpacity>
    
    
  )
}

export default Mask