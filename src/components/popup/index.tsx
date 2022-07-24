import React from 'react';
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
  const { visible, inPortal = true, direction = 'top', height = 360, width, onMaskClick  } = props;
  const { opacityStyle } = useFadeAnimation({ visible  })
  
  const { visibleStyle, transformStyle, innerVisible } =  useSlideAnimation({
    visible,
    direction,
    height,
    width
  })

  const otherStyle = {
    height: height,
    top: -height,
  }

  const handleMaskClick = () => {
    onMaskClick?.()
  }

  const renderElement = () => {
    const element = inPortal ? Portal : React.Fragment;

    // 如果用View 包裹，子级是position 的情况下会 布局失效
    const elementChild = (
      <Animated.View style={[styles.container, opacityStyle, visibleStyle, ]}>
        <Mask visible={visible} onMaskClick={handleMaskClick}/>
        <Animated.View style={[styles.content, transformStyle, otherStyle]} >
          <Text>dfa;sdfjkal;sdfjklasdjfklasjdflkajsdfkljsdlkfjalkdsfj</Text>
        </Animated.View>
      </Animated.View> 
    )
    return React.createElement(element, {} as any, elementChild)
  }

  return (
    <>
      {renderElement()}
    </>
  )
}

export default Popup