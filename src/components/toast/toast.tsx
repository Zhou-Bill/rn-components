import React from "react";
import { Text, Animated, View, ViewStyle } from "react-native";
import styles from "./styles";
import Animation from "../animation";

export interface ToastProps {
  /**
   * Toast title
   */
  title?: string;
  /**
   * 内容区
   */
  content: string;
  /**
   * 控制显示位置，
   */
  position?: 'top' | 'bottom' | 'center',
  /**
   * 控制显示隐藏
   */
  visible?: boolean;
  /** icon */
  icon?: React.ReactNode;
  /**
   * 控制显示基本样式
   */
  isBase?: boolean;
  style?: ViewStyle
  onClose?: () => void;
  onAfterClose?: () => void;
}

const ToastContainer: React.FC<ToastProps> = (props: ToastProps) => {
  const { 
    content, 
    position = 'center', 
    visible, 
    title = '', 
    icon = null,
    isBase = false, 
    onAfterClose, 
  } = props

  return (
    <Animation
      position={position}
      visible={visible}
      onAfterClose={onAfterClose}
    >
      <Animated.View 
        style={[
          styles.toast, 
          isBase && styles.base,
        ]} 
      >
        {
          title && (
            <Text>{title}</Text>
          ) || null
        }
        {
          icon && (
            <View style={styles.icon}>
              <>
                {icon}
              </>
            </View>
          )
        }
        <Text style={[styles.content, isBase && styles['base-content']]}>{content}</Text>
      </Animated.View>
    </Animation>
  )
}

export default React.memo(ToastContainer);