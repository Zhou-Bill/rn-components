import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../icon';
import styles from './radioStyle'


export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  children: React.ReactNode,
  /** Radio Group 时有用 */
  name?: string | number
  onChange?: (val: boolean, name?: string | number) => void,
}

const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  const { checked, onChange, children, name } = props;
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
    <TouchableOpacity style={styles.radio} activeOpacity={1} onPress={handleOnChange}>
      <View style={[styles['radio-icon-container'], innerChecked ? styles['radio-icon-container-checked'] : {}]}>
        <Icon name="check" size={16} color="white" />
      </View>
      <>
        {children}
      </>
    </TouchableOpacity>
  )
}

Radio.displayName = 'radio'

export default Radio