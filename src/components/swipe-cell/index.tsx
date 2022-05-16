import * as React from 'react';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles';
import useSwipe from './useSwipe';
const screenWidth = Dimensions.get('screen').width

export type ButtonType = "primary" | "default" | "warning" | "danger" | "success";

type ActionsType = {
  key: string,
  type: ButtonType,
  text: React.ReactNode | string,
  onClick: () => void
}

export interface SwipeCellRef {
  close: () => void;
}

interface ISwipeCellProps {
  children: React.ReactNode,
  leftAction?: ActionsType[],
  rightAction?: ActionsType[],
}

const SwipeCell = React.forwardRef<SwipeCellRef, ISwipeCellProps>(
  (props: ISwipeCellProps, ref) => {
    const { children, rightAction, leftAction } = props;
    const { style, onLayout, handleActionClick, panResponder, resetToZero } = useSwipe();

    React.useImperativeHandle(ref, () => {
      return {
        close: resetToZero,
      };
    });
  
    return (
      <View style={{ overflow: 'hidden', width: screenWidth }}>
        <Animated.View 
          style={[
            styles['swipe-cell'],
            style,
          ]}
          {...panResponder.panHandlers}
        >
          <View 
            onLayout={(e) => onLayout(e, "left")}
            style={[styles['swipe-cell-actions'], styles['swipe-cell-left-actions']]}
          >

            {
              leftAction?.map((_item) => {
                return (
                  <TouchableOpacity 
                    activeOpacity={0.95}
                    key={_item.key}
                    onPress={() => handleActionClick({ key: _item.key, onClick: _item.onClick })}
                    style={[styles['swipe-cell-actions-item'], _item.type && styles[`swipe-cell-actions-${_item.type}`] || {}]}
                  >
                    {
                      typeof _item.text === 'string' ? (
                        <Text style={[styles['swipe-cell-actions-text']]}>{_item.text}</Text>
                      ) : _item.text as React.ReactElement
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <TouchableOpacity activeOpacity={1} style={[styles['swipe-cell-children']]} onPress={resetToZero}>
            {children}
          </TouchableOpacity>
          <View 
            onLayout={(e) => onLayout(e, "right")}
            style={[styles['swipe-cell-actions'], styles['swipe-cell-right-actions']]}
          >
            {
              rightAction?.map((_item) => {
                return (
                  <TouchableOpacity 
                    activeOpacity={0.95}
                    key={_item.key}
                    onPress={() => handleActionClick({ key: _item.key, onClick: _item.onClick })}
                    style={[styles['swipe-cell-actions-item'], _item.type && styles[`swipe-cell-actions-${_item.type}`] || {}]}
                  >
                    {
                      typeof _item.text === 'string' ? (
                        <Text style={[styles['swipe-cell-actions-text']]}>{_item.text}</Text>
                      ) : _item.text as React.ReactElement
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </Animated.View>
      </View>
    )
  }
)

export default SwipeCell;