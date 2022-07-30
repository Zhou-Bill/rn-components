import React, { useCallback, useMemo } from 'react';
import { View, Animated, Text } from 'react-native';
import useFadeAnimation from '../../hooks/useFadeAnimation';
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
  onMaskClick?: () => void
}

const Popup: React.FC<PopupProps> = (props: PopupProps) => {
  const { visible, inPortal = true, direction = 'right', height = 300, width = 220, onMaskClick, destroyOnClose = true  } = props;

  const { visibleStyle, transformStyle, isHorizontal, innerVisible, isMounted } =  useSlideAnimation({
    visible,
    direction,
    height,
    width
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
        <Animated.View style={[styles.content, transformStyle as any , otherStyle]} >
          <Text>dfa;sdfjkal;sdfjklasdjfklasjdflkajsdfkljsdlkfjalkdsfj</Text>
        </Animated.View>
      </>
    )
  }, [visible, visibleStyle, transformStyle, otherStyle])

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