import React, { useState } from "react";
import Popup from "../popup";

import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'
import Tabs from "../tabs";
import { options } from './data';
import Icon from "../icon";
import { useMemo } from "react";

type CascaderValue = string | null

type CascaderOption = {
  label: string
  value: string
  disabled?: boolean
  children?: CascaderOption[]
}

type CascaderValueExtend = {
  items: (CascaderOption | null)[]
  isLeaf: boolean
}

interface CascaderProps {
  options: CascaderOption[],
  visible: boolean, 
  onMaskClick?: () => void,
  onConfirm?: (value: Array<number | string>,  extend: CascaderValueExtend) => void,
  onSelect?: (value: CascaderValue[], extend: CascaderValueExtend) => void
}

const Cascader: React.FC<CascaderProps> = (props: CascaderProps) => {
  const { visible, onMaskClick, options, onConfirm, onSelect} = props;
  const [innerValue, setInnerValue] = useState([]); 
  const [innerSelectOptions, setInnerSelectOptions] = useState<CascaderOption[][]>([options])
  const [level, setLevel] = useState(0); 

  const optionValueMap = useMemo(() => {
    let result = {};
    const deepFlatTreeData = (data: CascaderOption[], level: number, parentId) => {
      data.forEach((_item) => {
        const parentNode = parentId ? result[parentId] : null;
        result[_item.value] = {
          ..._item,
          level,
          parentId,
          parentNode,
        }
        if (_item.children && _item.children.length > 0) {
          deepFlatTreeData(_item.children, level + 1, _item.value)
        }
      })
    }
    deepFlatTreeData(options, 0, null)
    return result
  }, [options])

  const handleSelectItem = (data: CascaderOption) => {
    if (data.disabled) {
      return;
    }
    if (innerValue.includes(data.value)) {
      const newInnerValue = innerValue.slice(0, level)
      const newInnerSelectOptions = innerSelectOptions.slice(0, level + 1);
      setInnerValue(newInnerValue)
      setInnerSelectOptions(newInnerSelectOptions)
      const items = newInnerValue.map((_item) => {
        return optionValueMap[_item];
      })
      onSelect?.(newInnerValue, { items: items, isLeaf: true })
      return;
    }
   
    const nextLevel = level + 1;
    const isAdd = nextLevel >= innerSelectOptions.length;
    const oldInnerValue = innerValue.slice(0, level)

    const newInnerValue = [...oldInnerValue, data.value]
    setInnerValue(newInnerValue)
    const items = newInnerValue.map((_item) => {
      return optionValueMap[_item];
    })
    onSelect?.(newInnerValue, { items: items, isLeaf: true })
    
    if (!data.children) {
      return;
    }
    const sourceData = isAdd ? innerSelectOptions : innerSelectOptions.slice(0, nextLevel)
    const newSelectOptions = [...sourceData, data.children];

    setInnerSelectOptions(newSelectOptions)
    setLevel(nextLevel)
   
  }

  const handleTabChange = (currentLevel: number) => {
    setLevel(currentLevel)
  }

  const handleConfirm = () => {
    const items = innerValue.map((_item) => {
      return optionValueMap[_item];
    })
    
    onConfirm?.(innerValue, { items: items, isLeaf: true });
  }

  return (
    <Popup 
      visible={visible} 
      onMaskClick={() => onMaskClick?.()}
      scrollable={false}
    >
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={() => onMaskClick?.()}>
          <Text style={styles['cancel-text']}>取消</Text>
        </TouchableOpacity>
        <Text style={styles['header-title']}>选择地址</Text>
        <TouchableOpacity activeOpacity={1} onPress={handleConfirm}>
          <Text style={styles['confirm-text']}>确定 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Tabs scrollable animated={false} current={level} onChange={handleTabChange}>
          {
            innerSelectOptions.map((_item, _index) => {
              return (
                <Tabs.Pane key={_index} title={innerValue[_index] || '未选择'}>
                  <ScrollView style={styles['tab-content']}>
                    {
                      _item.map((_child) => {
                        const isChecked = innerValue.includes(_child.value)
                        return (
                          <TouchableOpacity 
                            key={_child.value} 
                            activeOpacity={0.95}
                            style={[styles['select-item']]}
                            onPress={() => handleSelectItem(_child)}
                          >
                            <Text style={[_child.disabled ? styles['select-item-text-disabled'] : {}]}>{_child.label}</Text>
                            {
                              isChecked && (
                                <Icon name="check" size={16} color="#1677ff" />
                              ) || null
                            }
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </Tabs.Pane>
              )
            })
          }
        </Tabs>
      </View>
    </Popup>
  )

}

export default Cascader