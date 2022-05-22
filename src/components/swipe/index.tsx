import * as React from "react";
import { ReactElement, useMemo } from "react";
import { View, Dimensions } from 'react-native'
import SwipeItem, { ISwipeItemProps } from './swipe-item';
import Animated from "react-native-reanimated";
import styles from "./styles";
import useSwipe from "./useSwipe";

const screenWidth = Dimensions.get('screen').width;

export interface SwipeProps {
  /** 初始化位置 */
  defaultIndex?: number
  width?: number,
  height?: number, 
  direction: 'horizontal' | 'vertical',
  children: React.ReactNode,
  onChange?: (current: number) => void,
  /** 
   * 自定义显示指示器 
   * @current 当前激活的swipe-item
   * @count children 数量
   * */
  renderDots?: (current: number, count: number) => React.ReactNode
}

/**
 * 添加最后一个节点到头，和添加第一个节点到尾部
 */
const traverseChild = (children: React.ReactNode) => {
  let result: React.ReactNode[] = []
  React.Children.map(children as any, (child: React.FunctionComponentElement<ISwipeItemProps>, index) => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (child.type.displayName === 'SwipeItem') {
      result.push(child)
    }
  })
  const first = result[0];
  const last = result[result.length - 1];

  return [last, ...result, first]
}

const Swipe: React.FC<SwipeProps> & { SwipeItem: typeof SwipeItem } = (props: SwipeProps) => {
  const { width = screenWidth, height = 300, direction = 'horizontal', children, onChange, renderDots, defaultIndex = 0 } = props;
  const count = React.Children.count(children)
  const isHorizontal = direction === 'horizontal';
  const { 
    style, 
    current, 
    onTouchMove, 
    onTouchEnd, 
    onTouchStart 
  } = useSwipe({ 
    count,
    direction,
    width,
    height,
    onChange,
    defaultIndex
  })

  const dots = useMemo(() => Array(count).fill(1), [count])

  const renderDotsList = () => {
    return (
      <View style={styles['swiper-dots']}>
        {
          dots.map((_item, index) => {
            return (
              <View 
                key={index} 
                style={[
                  styles['swiper-dots-item'], 
                  current === index 
                  ? styles['swiper-dots-item-active']
                  : {}
                ]} />
            )
          })
        }
      </View>
    )
  }

  /**
   * 因为我们swipe 会循环播放，所以我们把 最后那个子节点放到头部，
   * 那么这个时候我们需要就行偏移一个视口宽度
   */
  const directionStyle = useMemo(() => {
    if (direction === 'horizontal') {
      return {
        marginLeft: -width
      }
    }
    return {
      width: '100%',
      marginTop: -height,
    }
  }, [direction, width, height])

  const renderChildren = React.useCallback(() => {
    const childrenArray = traverseChild(children);
    return (
      <>
        {
          childrenArray.map((child, index) => {
            return React.cloneElement(child as any, {
              ...(child as ReactElement).props,
              key: index,
              width: width,
              height: height
            })
          })
        }
      </>
    )
  }, [width, height])

  return (
    <View 
      style={[
        styles['swiper'],
        {
          width: width,
          height: height,
        }
      ]
    }>
      <>
        {/* @ts-ignore */}
        <Animated.View 
          style={[
            isHorizontal 
            ? styles['swiper-container'] 
            : styles['swiper-container-vertical'], 
            style,
            directionStyle
          ]} 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* 渲染每一个swipeItem */}
          {renderChildren()}
        </Animated.View>
        { renderDots?.(current, count) ||  renderDotsList() }
      </>
    </View>
  )
}

Swipe.SwipeItem = SwipeItem

export default Swipe;