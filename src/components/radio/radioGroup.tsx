import React, { useEffect, useState } from "react";
import { View } from 'react-native'
import type { RadioProps } from './radio'

interface RadioGroupProps { 
  value: string | number,
  onChange: (val: string | number) => void
  children: React.ReactNode,
}

const RadioGroup: React.FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const { value, onChange, children } = props;
  const [innerValue, setInnerValue] = useState<string | number>(value);

  useEffect(() => {
    if ('value' in props) {
      setInnerValue(value)
    }
  }, [value])

  const handleOnChange = (checked: boolean, text: string | number) => {
    if (!('value' in props)) {
      setInnerValue(text);
    }
    
    onChange?.(text)
  }

  const renderElement = () => {
    return React.Children.map(children, (child: React.FunctionComponentElement<RadioProps>, index) => {
      if (child.type.displayName === 'radio') {
        const name = child.props.name || index;
        return React.cloneElement(child, {
          ...child.props,
          name: name,
          checked: innerValue === name,
          onChange: handleOnChange
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

export default RadioGroup