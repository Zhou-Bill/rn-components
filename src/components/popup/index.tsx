import React, { useCallback, useMemo } from 'react';
import { View, Animated, Text, ScrollView } from 'react-native';
import Mask from '../mask';
import Portal from '../portals/portal';
import styles from './styles';
import useSlideAnimation from './useSlideAnimation';

interface PopupProps {
  visible: boolean,
  inPortal?: boolean,
  direction?: 'top' | 'bottom' | 'left' | 'right',
  height?: number,
  width?: number,
  /**
   * 当visible 为false 时卸载组件
   */
  destroyOnClose?: boolean,
  children: React.ReactNode,
  scrollable?: boolean
  onMaskClick?: () => void,

}

const Popup: React.FC<PopupProps> = (props: PopupProps) => {
  const { 
    visible, 
    inPortal = true, 
    direction = 'bottom', 
    height = 300, 
    width = 220, 
    onMaskClick, 
    destroyOnClose = true, 
    children, 
    scrollable = true,
  } = props;

  const { visibleStyle, transformStyle, isHorizontal, innerVisible, isMounted, panResponder } =  useSlideAnimation({
    visible,
    direction,
    height,
    width,
    onMaskClick
  })

  const directionStyle = useMemo(() => {
    if (!isHorizontal) {
      const common = { left: 0, right: 0, height }
      const tempStyle = direction === 'top' 
        ? { top: -height }
        : { bottom: -height }
      return {...tempStyle, ...common}
    }
    const leftStyle = direction === 'left' ? { left: -width } : { right: -width}
    return {
      top: 0,
      bottom: 0,
      width: width,
      ...leftStyle
    }
  }, [isHorizontal])

  const otherStyle = {
    ...directionStyle
  }

  const handleMaskClick = () => {
    onMaskClick?.()
  }
  const elementChild = useMemo(() => {
    // 如果用View 包裹，子级是position 的情况下会 布局失效
    return (
      <>
        <Mask visible={visible} onMaskClick={handleMaskClick} />
        {
          scrollable ? (
            <Animated.ScrollView {...panResponder.panHandlers}  style={[styles.content, transformStyle as any , otherStyle]} >
              <>
                {children}
              </>
            </Animated.ScrollView>
          ) : <Animated.View style={[styles.content, transformStyle as any, otherStyle]}><>{children}</></Animated.View>
        }
    
      </>
    )
  }, [visible, visibleStyle, transformStyle, otherStyle, panResponder, children, scrollable])

  const renderElement = () => {
    const element = inPortal ? Portal : React.Fragment;
    const elementProps: any = inPortal ? { name: 'portal' } : {}
    return React.createElement(element, elementProps, elementChild)
  }

  if ((!innerVisible && destroyOnClose) || !isMounted) {
    return null
  }

  return (
    <Animated.View style={[styles.container, visibleStyle]}>
      {renderElement()}
    </Animated.View> 
  )
}

export default Popup