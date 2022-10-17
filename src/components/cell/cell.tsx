import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './cellStyles';


export interface CellProps {
  title: string,
  value?: React.ReactNode,
  border?: boolean,
  onClick?: () => void
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const { title, value, border = false } = props

  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <TouchableOpacity 
      onPress={handleClick} 
      style={[styles['cell'], border ? styles['cell-border-bottom'] : {}]} 
      activeOpacity={1}
    >
      <View style={styles['cell-container']}>
        <Text style={styles['cell-label']}>{title}</Text>
        <>
          {value}
        </>
      </View>
    </TouchableOpacity>
  )
}

Cell.displayName = 'Cell'

export default Cell;