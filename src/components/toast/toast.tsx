import React, { useMemo, useState } from "react";
import { View, Text, LayoutChangeEvent, Animated } from "react-native";
import styles from "./styles";
import Animation from "../animation";

export interface ToastProps {
  content: string;
  position?: 'top' | 'bottom' | 'center',
  visible?: boolean;
}

const ToastContainer: React.FC<ToastProps> = (props: ToastProps) => {
  const { content, position = 'center', visible } = props

  return (
    <Animation
      position={position}
      visible={visible}
    >
      <Animated.View 
        style={[
          styles.toast, 
          // verticalStyle,
        ]} 
        // onLayout={onLayout}
      >
        <Text style={styles.content}>{content}</Text>
      </Animated.View>
    </Animation>
  )
}

export default ToastContainer;