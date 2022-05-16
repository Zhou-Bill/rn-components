import * as React from 'react';
import { Dimensions, Text, View, TouchableOpacity, TouchableHighlight, GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles';
import useSwipe from './useSwipe';
const screenWidth = Dimensions.get('screen').width

export type ButtonType = "primary" | "default" | "warning" | "danger" | "success";

type ActionsType = {
  key: string,
  color: ButtonType | string,
  text: React.ReactNode,
  onClick: () => void
}

interface ISwipeCellProps {
  children: React.ReactNode,
  rightAction?: ActionsType[]
}


const SwipeCell: React.FC<ISwipeCellProps> = (props: ISwipeCellProps) => {
  const { children } = props;
  const { onTouchStart, onTouchMove, onTouchEnd, style, onLayout, handleActionClick } = useSwipe();

  const handleClick = (e: GestureResponderEvent) => {
    console.log("handleClick");
  }

  const rightAction = [
    {
      key: 'mute',
      type: 'primary' as 'primary',
      text: '免打扰',
      onClick: () => {
        console.log("免打扰")
      }
    }, 
    {
      key: 'cancel',
      text: '取消关注',
      type: 'danger' as 'danger',
      onClick: () => {
        console.log("取消关注")
      }
    }, 
    {
      key: 'delete',
      text: '删除',
      type: 'success' as 'success',
      onClick: () => {
        console.log("删除")
      }
    }
  ]

  return (
    <View style={{ overflow: 'hidden', width: screenWidth }}>
      <Animated.View 
        style={[
          styles['swipe-cell'],
          style
        ]}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <View
          style={[styles['swipe-cell-track']]} 
          onStartShouldSetResponder={(ev) => {return true}}
        >
          <View 
            onLayout={(e) => onLayout(e, "left")}
            style={[styles['swipe-cell-actions'], styles['swipe-cell-left-actions']]}
          >
            <View 
              style={[styles['swipe-cell-actions-item'], styles['swipe-cell-actions-primary']]}
            >
              <Text style={[styles['swipe-cell-actions-text']]}>置顶</Text>
            </View>
          </View>
          <View style={[styles['swipe-cell-children'], { width: '100%' }]}>
            {children}
          </View>
          <View 
            onLayout={(e) => onLayout(e, "right")}
            style={[styles['swipe-cell-actions'], styles['swipe-cell-right-actions']]}
            pointerEvents="box-none"
          >
            {
              rightAction.map((_item) => {
                return (
                  <TouchableOpacity 
                    key={_item.key}
                    onPress={() => handleActionClick({ key: _item.key, onClick: _item.onClick })}
                    style={[styles['swipe-cell-actions-item'], styles[`swipe-cell-actions-${_item.type}`]]}
                  >
                    <Text style={[styles['swipe-cell-actions-text']]}>{_item.text}</Text>
                  </TouchableOpacity>
                )
              })
            }
           
            {/* <TouchableHighlight 
              onPress={handleClick}
              style={[styles['swipe-cell-actions-item'], styles['swipe-cell-actions-danger']]}
            >
              <Text style={[styles['swipe-cell-actions-text']]}>取消关注</Text>
            </TouchableHighlight>
            <View style={[styles['swipe-cell-actions-item'], styles['swipe-cell-actions-warning']]}>
              <Text style={[styles['swipe-cell-actions-text']]}>删除</Text>
            </View> */}
          </View>
        </View>
      </Animated.View>
    </View>
 
  )
}

export default SwipeCell;