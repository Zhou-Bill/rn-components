import React from 'react'
import { TouchableOpacity, View, Text, ViewStyle } from 'react-native'
import styles from './styles';
import { Icon } from '../..';

interface HeaderProps {
  title: string,
  extra?:  React.ReactNode
  viewStyle?: ViewStyle,
  onIconClick?: () => void
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, extra, viewStyle = {} } = props

  const onIconClick = () => {
    props.onIconClick?.()
  }

  return (
    <View style={[styles['header-container'], viewStyle]}>
      <TouchableOpacity onPress={onIconClick} style={styles['header-icon']}>
        <Icon name='left' size={16} />
      </TouchableOpacity>
      <View style={styles['header-title']}>
        <Text style={styles['header-title-text']} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles['header-extra']}>
        <>
          {extra}
        </>
      </View>
    </View>
  )
}

export default Header