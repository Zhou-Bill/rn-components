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
  onMaskClick?: () => void
}

const Popup: React.FC<PopupProps> = (props: PopupProps) => {
  const { visible, inPortal = true, direction = 'top', height = 300, width = 250, onMaskClick  } = props;

  const { visibleStyle, transformStyle, isHorizontal, innerVisible } =  useSlideAnimation({
    visible,
    direction,
    height,
    width
  })
  // const { opacityStyle, } = useFadeAnimation({ visible: innerVisible  })

  const directionStyle = useMemo(() => {
    if (!isHorizontal) {
      const tempStyle = direction === 'top' 
        ? { top: -height }
        : { bottom: -height }
      return tempStyle
    }
    return {
      top: 0,
      bottom: 0,
      left: -width,
    }
  }, [isHorizontal])

  const otherStyle = {
    height: height,
    ...directionStyle
  }

  const handleMaskClick = () => {
    onMaskClick?.()
  }
  const elementChild = useMemo(() => {
    // 如果用View 包裹，子级是position 的情况下会 布局失效
    return (
      <Animated.View style={[styles.container, visibleStyle]}>
        <Mask visible={visible} onMaskClick={handleMaskClick} />
        <Animated.View style={[styles.content, transformStyle, otherStyle]} >
          <Text>dfa;sdfjkal;sdfjklasdjfklasjdflkajsdfkljsdlkfjalkdsfj</Text>
        </Animated.View>
      </Animated.View> 
    )
  }, [visible, visibleStyle, transformStyle, otherStyle])

  const renderElement = () => {
    const element = inPortal ? Portal : React.Fragment;
    
    return React.createElement(element, {} as any, elementChild)
  }

  return (
    <>
      {renderElement()}
    </>
  )
}

export default Popup