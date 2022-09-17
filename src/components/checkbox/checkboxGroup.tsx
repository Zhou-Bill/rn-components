import React, { useEffect, useState } from "react";
import { View } from 'react-native'
import type { CheckboxProps } from './Checkbox'
import styles from './checkboxStyle'

interface CheckboxGroupProps { 
  value: Array<string | number>,
  onChange: (val: Array<string | number>) => void
  children: React.ReactNode,
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props: CheckboxGroupProps) => {
  const { value, onChange, children } = props;
  const [innerValue, setInnerValue] = useState<Array<string | number>>(value);

  useEffect(() => {
    if ('value' in props) {
      setInnerValue(value)
    }
  }, [value])

  const handleOnChange = (checked: boolean, text: string | number) => {
    let newCheckeds = [...innerValue]
    if (checked) {
      newCheckeds.push(text)
    } else {
      newCheckeds = newCheckeds.filter((_item) => _item !== text)
    }

    if (!('value' in props)) {
      setInnerValue(newCheckeds);
    }
    
    onChange?.(newCheckeds)
  }

  const renderElement = () => {
    return React.Children.map(children, (child: React.FunctionComponentElement<CheckboxProps>, index) => {
      if (child.type.displayName === 'checkbox') {
        const name = child.props.name || index;
        return React.cloneElement(child, {
          ...child.props,
          name: name,
          checked: innerValue.includes(name),
          onChange: handleOnChange,
          wrapStyles: index === 0 ? {} : styles["checkbox-group-item"]
        })
      }
      return child
    })
  }
 
  return (
    <View>
      {renderElement()}
    </View>
  )
}

export default CheckboxGroup