import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, LayoutChangeEvent, Dimensions } from 'react-native'
import styles from './styles';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming }  from 'react-native-reanimated'
import Icon from '../icon';

interface Iprops {
  content: string,
  closable?: boolean,
  scrollable?: boolean
  /** 左边内容自定义 */
  leftIcon?: React.ReactNode,
  /** 右边内容自定义 */
  rightIcon?: React.ReactNode,
  /** 动画时间 */
  duration?: number,
  onClose?: () => void
}

const NoticeBar: React.FC<Iprops> = (props) => {
  const { content, closable = false, scrollable = true, leftIcon, rightIcon, onClose, duration = 6000 } = props;
  const containerWidth = Dimensions.get("window").width;
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(containerWidth);
  const [visible, setVisible] = useState<boolean>(true);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width)
  }

  useEffect(() => {
    if (!scrollable) {
      return;
    }

    translateX.value = withTiming(-textWidth, { duration: duration,  easing: Easing.bezier(0.75, 0.75, 0.75, 0.75),  }, (finished) => {
      if (finished) {
        translateX.value = textWidth;
        translateX.value = withDelay(100, withRepeat(withTiming(-textWidth, { duration: duration, easing: Easing.bezier(1, 1, 1, 1) }), -1, false))
      }
    })
  }, [scrollable, textWidth, translateX, duration]);

  const scrollStyle = useMemo(() => {
    return scrollable ? { position: 'absolute' as 'absolute' } : {}
  }, [scrollable])

  const handleClose = () => {
    if (!closable) {
      return;
    }
    setVisible(false)
    onClose?.()
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutWidth = event.nativeEvent.layout.width;
    setTextWidth(Math.max.call(null, layoutWidth, textWidth));
  }

  return (
    <View 
      onLayout={onLayout}
      style={[styles['notice-bar'], scrollable ? styles['scrollable-notice-bar'] : {}, !visible ? styles['notice-bar-hidden'] : {}]}
    >
      <View style={[styles['notice-bar-left-icon'], scrollable ? styles['scrollable-notice-bar-left-icon'] : {}]}>
        {
          (leftIcon) || (
            <Icon name="notification" color="#ed6a0c" />
          )
        }
      </View>
      <Animated.View
        style={[styles['notice-content-wrap'], scrollStyle, style]}
        onLayout={handleLayout}
      >
        <Text style={[styles['notice-content']]}>{content}</Text>
      </Animated.View>
      {
        closable && (
          <TouchableOpacity 
            onPress={handleClose}
            style={[styles['close-icon'], scrollable ? styles['scollable-close-icon'] : {}]}
          >
            {
              rightIcon || (
                <Icon name="close" color="#ed6a0c" />
              )
            }
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default NoticeBar