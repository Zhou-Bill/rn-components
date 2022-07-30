import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import useFadeAnimation from "../../hooks/useFadeAnimation";
import Portal from "../portals/portal";
import styles from "./styles";

interface MaskProps {
  visible: boolean,
  inPortal?: boolean,
  duration?: number
  children?: React.ReactNode,
  onMaskClick?: () => void,
  onAfterClose?: () => void
}

const Mask: React.FC<MaskProps> = (props: MaskProps) => {
  const { children, visible, inPortal = false, onAfterClose = null, onMaskClick, duration = 500 } = props;
  const { opacityStyle, innerVisible } = useFadeAnimation({ visible, onAfterClose, duration  })

  const viewStyles = [
    {
      display: (innerVisible ? undefined : "none") as 'none',
    },
    opacityStyle,
  ]

  const onPress = () => {
    console.log("Press")
    onMaskClick?.();
  }

  const renderView = () => {
    const element = inPortal ? Portal : React.Fragment
    const elementChild = (
      <Animated.View style={[styles.mask, viewStyles]}>
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ flex: 1 }} />
        <>
          { children }
        </>
      </Animated.View>
    )
    
    const elementProps = {}
    return React.createElement(element, elementProps as any, elementChild)
  }

  return (
    <>
      {renderView()}
    </>
  )
}

export default React.memo(Mask)