import * as React from 'react';
import { useContext } from 'react';
import { View } from 'react-native'
import Animated from 'react-native-reanimated';
import styles from './styles';
import TabsContext from './tabContext';
import useSwipe from './useSwipe';

interface TabContentProps {
  animated: boolean
}

const TabContent: React.FC<TabContentProps> = (props: TabContentProps) => {
  const { animated } = props;
  const { nodes, current, onChange, containerWidth } = useContext(TabsContext);
  const { panResponder, style } = useSwipe({ animated });
  const panResponderRes = animated ? { ...panResponder.panHandlers } : {}

  return (
    <View style={styles['tabs-content']} >
      {/* @ts-ignore */}
      <Animated.View 
        style={[styles['tabs-content-container'], style]}
        {...panResponderRes}
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