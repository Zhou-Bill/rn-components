import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { View, Text, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, scrollTo } from 'react-native-reanimated';
import TabsContext from './tabContext';
import styles from './styles';

type TabItemPositionType = {
  position: number,
  width: number,
  key: number| string
}

interface TabBarProps {
  scrollable: boolean
}

const tabItemPositionToKeyEntities = (data: any) => {
  const result: { [key in number | string]: TabItemPositionType } = {};
  data.forEach((_item: any) => {
    result[_item.key] = _item;
  })
  return result;
}


const TabBar: React.FC<TabBarProps> = (props: TabBarProps) => {
  const { scrollable } = props;
  const { nodes, current, onChange, containerWidth } = useContext(TabsContext);
  const translateX = useSharedValue(0);
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const scrollViewContentWidthRef = useRef(0)
  const tabItemPosition = useRef<TabItemPositionType[]>([]);
  const positionEntities = tabItemPositionToKeyEntities(tabItemPosition.current);

  const underlineStyle = useAnimatedStyle(() => {
    const currentItem = positionEntities[current]
    return {
      transform: [
        {
          translateX: translateX.value,
        }
      ],
      width: currentItem?.width || 0
    }
  })

  const tabItemOnLayout = (e: LayoutChangeEvent, params: { index: number, key: string }) => {
    const width = e.nativeEvent.layout.width;
    const { index, key } = params
    const previousItemPosition = tabItemPosition.current[index - 1]?.position || 0;

    tabItemPosition.current[index] = {
      position: previousItemPosition + width,
      width,
      key,
    };
  }

  useEffect(() => {
    if (Object.keys(positionEntities).length === 0) {
      return;
    }
    const currentItem = positionEntities[current]
    const { position, width, key } = currentItem;
    const offset = position - width / 2 - containerWidth / 2 - scrollX.value;
    if (offset < 0 && -offset > scrollX.value) {
      scrollX.value = 0;
    } else {
      // 如果向右偏移 比 整个scrollView - 视口宽度 都要场， 那么他最长的偏移值只能是他的差
      // scrollView 内容宽度 488， 容器宽度 只有 388， 那scrollView 滚动距离只有100
      // 你整个偏移比滚动距离还要大， 那只能偏移滚动距离
      scrollX.value += offset > scrollViewContentWidthRef.current - containerWidth 
        ? scrollViewContentWidthRef.current - containerWidth 
        : offset;
    }
    
    translateX.value = withTiming(position - width)
  }, [current, positionEntities])

  const handlePress = (index: number) => {
    onChange?.(index);
  }

  useDerivedValue(() => {
    scrollTo(aref, scrollX.value, 0, true);
  });

  const onScrollViewLayout = (contentWidth: number) => {
    scrollViewContentWidthRef.current = contentWidth;
  }

  const renderTabBar = () => {
    const element = scrollable ? Animated.ScrollView : React.Fragment
    const elementChildren = (
      <>
        {
          nodes.map((_item: any, index) => {
            const isActive = current === _item.index;
            return (
              <TouchableOpacity 
                activeOpacity={1}
                key={_item.index} 
                style={styles['tabs-header-item']} 
                onPress={() => handlePress(_item.index)}
              >
                <View
                  style={styles['tabs-header-item-content']} 
                  onLayout={(e) => tabItemOnLayout(e, { index, key: _item.index })}
                >
                  <Text style={[isActive ? {color: 'blue'} : {}]}>{_item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        {/* @ts-ignore */}
        <Animated.View style={[styles['underline'], underlineStyle]} />
      </>
    )

    const elementProps = scrollable 
      ? {
        horizontal: true,
        style: styles['tabs-scrollView'],
        showsHorizontalScrollIndicator: false,
        ref: aref,
        onContentSizeChange: onScrollViewLayout
      }
      : {}
    return React.createElement(element, elementProps, elementChildren )
  }

  return (
    <View style={styles['tabs-header']}>
      <>
        {renderTabBar()}
      </>
    </View>
  )
}

export default TabBar;