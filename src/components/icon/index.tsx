import React, { useMemo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export interface IconProps {
  /** 字体类型 */
  type?: "antdesign" | 'fontawesome'
  /** icon */
  name: string,
  /** 大小 */
  size?: number,
  /** 颜色 */
  color?: string,
}


const CustomIcon: React.FC<IconProps> = (props: IconProps) => {
  const { type = 'antdesign', name, size = 14, color = "#000" } = props

  const Icon = useMemo(() => {
    switch (type) {
      case 'antdesign': {
        return AntDesign
      }
      case 'fontawesome': 
        return FontAwesome
    }
  }, [type])

  return (
    <Icon name={name} size={size} color={color}  />
  )
}

export default CustomIcon