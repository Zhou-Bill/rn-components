import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styles from './styles';
import TabsContext from './tabContext';
import useSwipe from './useSwipe';

const TabContent = () => {
  const { nodes, current, onChange } = useContext(TabsContext);
  const { panResponder, style, onLayout, containerWidth } = useSwipe({ 
    current: current,
    nodes: nodes,
    onChange: onChange
  });

  return (
    <View style={styles['tabs-content']} onLayout={onLayout} >
      <Animated.View 
        style={[styles['tabs-content-container'], style]}
        {...panResponder.panHandlers}
      >
        {
          nodes.map((_item: any) => {
            return (
              <View 
                key={_item.index} 
                style={[styles['tabs-content-item'], { width: containerWidth }]}
              >
                {_item}
              </View>
            )
          })
        }
      </Animated.View>
    </View>
  )
}

export default TabContent;