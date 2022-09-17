import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from '../icon';
import styles from './checkboxStyle'


export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  children: React.ReactNode,
  /** Checkbox Group 时有用 */
  name?: string | number
  onChange?: (val: boolean, name?: string | number) => void,
  wrapStyles?: ViewStyle
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const { checked, onChange, children, name, wrapStyles = {} } = props;
  const [innerChecked, setInnerChecked] = useState(checked);

  useEffect(() => {
    if ("checked" in props) {
      setInnerChecked(checked)
    }
  }, [checked])

  const handleOnChange = () => {
    if (!("checked" in props)) {
      setInnerChecked(!innerChecked)
    }
    onChange?.(!innerChecked, name)
  }

  return (
    <TouchableOpacity style={[styles.checkbox, wrapStyles]} activeOpacity={1} onPress={handleOnChange}>
      <View style={[styles['checkbox-icon-container'], innerChecked ? styles['checkbox-icon-container-checked'] : {}]}>
        <Icon name="check" size={16} color="white" />
      </View>
      <>
        {children}
      </>
    </TouchableOpacity>
  )
}

Checkbox.displayName = 'checkbox'

export default Checkbox