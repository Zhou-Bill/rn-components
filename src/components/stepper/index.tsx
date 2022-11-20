import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

interface StepperProps {
  /**
   * 步长
   */
  step?: number,
  /** 
   * value 值
  */
  value?: number | string,
  /**
   * 默认值
   */
  defaultValue?: number,
  /**
   * 最大值
   */
  max?: number,
  /**
   * 最小值
   */
  min?: number,
  /**
   * 保留小数位
   */
  decimal?: number,
  onChange?: (value: number | string) => void
}

/**
 * 根据长度补0，或截取
 * 但好像还又问题
 */
const fillZero = (value: string, length: number): string => {
  const valueLength = value.length
  if (valueLength > length) {
    // 这里为了解决 0.7 + 0.1 != 0.8 问题
    // 思路是 0.7 + 0.1 = 0.7999， 当前value = 79999, length = 1 
    // 那么我没们的value 截取 79 (value.substring(0, length + 1))， 79 / 100 = 0.79, 然后toFixed(2) = 0.8, 0.8 + 10
    return (+((+value.substring(0, length + 1)) / Math.pow(10, length + 1)).toFixed(length)) * Math.pow(10, length) + '';
  }

  const zero = Array(length - valueLength).fill(0).join("");
  return `${value}${zero}`;
}

const toFixed = (value: number, decimal: number): string => {
  const toString = `${value}`;
  if (decimal === 0) {
    return toString.split(".")[0];
  }

  if (!toString.includes(".")) {
    return `${value}.${fillZero('0', decimal)}`;
  }

  const [integer, decimalNumber] = toString.split('.');

  return `${integer}.${fillZero(decimalNumber, decimal)}`
}

const Stepper = React.forwardRef<TextInput, StepperProps>(
  (props: StepperProps, ref) => {
    const { value, onChange, defaultValue, step = 1, min, max, decimal = 0 } = props
    const [innerValue, setInnerValue] = React.useState<string>(() => {
      if ('value' in props) {
        return toFixed(value! as number, decimal);
      }
      if ('defaultValue' in props) {
        return toFixed(defaultValue!, decimal);
      }
      return '';
    })

    React.useEffect(() => {
      if ('value' in props) {
        setInnerValue(`${value}`)
      }
    }, [value])
    
    const handleOnChange = (text: string) => {
      if (!('value' in props)) {
        setInnerValue(text);
      }
      
      onChange?.(text)
    }

    const handleReduce = () => {
      if (min && +innerValue <= min) {
        return;
      }

      const formatedRes = min 
        ? +innerValue - step <= min ? min : +innerValue - step 
        : +innerValue - step;

      const result = toFixed(formatedRes, decimal);
      if (!('value' in props)) {
        setInnerValue(result);
      }
      onChange?.(result)
    }

    const handleAdd = () => {
      if (max && +innerValue >= max) {
        return;
      }

      const formatedRes = max 
        ? +innerValue + step >= max ? max : +innerValue + step 
        : +innerValue + step;

      const result = toFixed(formatedRes, decimal);
      console.log(formatedRes)
      
      if (!('value' in props)) {
        setInnerValue(result);
      }
      onChange?.(result)
    }

    const handleOnBlur = () => {
      if (min && +innerValue <= min) {
        const result = toFixed(min, decimal);
        if (!('value' in props)) {
          setInnerValue(result);
        }
        onChange?.(result)
        return;
      }

      if (max && +innerValue >= max) {
        const result = toFixed(max, decimal);
        if (!('value' in props)) {
          setInnerValue(result);
        }
        onChange?.(result)
        return;
      }

      const result = toFixed(+innerValue, decimal);

      if (!('value' in props)) {
        setInnerValue(result);
      }
      onChange?.(result)
    }

    return (
      <View style={styles.stepper}>
        <TouchableOpacity 
          activeOpacity={0.95}
          style={styles['stepper-action']}
          onPress={handleReduce}
        >
          <Text 
            style={[ 
              min && +innerValue <= min 
              ? styles['stepper-action-disabled'] 
              : styles['stepper-action-text']
            ]}
          >
            —
          </Text>
        </TouchableOpacity>
        <View style={styles['stepper-input']}>
          <TextInput 
            ref={ref}
            style={styles['input']}
            value={innerValue} 
            onChangeText={handleOnChange}
            keyboardType="numeric"
            onBlur={handleOnBlur}
          />
        </View>
        <TouchableOpacity 
          activeOpacity={0.95}
          style={styles['stepper-action']}
          onPress={handleAdd}
        >
          <Text 
            style={[ 
              max && +innerValue >= max 
              ? styles['stepper-action-disabled'] 
              : styles['stepper-action-text']
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
)

export default Stepper;
