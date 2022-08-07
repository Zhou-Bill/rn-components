import React, { useMemo, useRef, useState } from 'react';
import { Animated, View, Text, PanResponder } from 'react-native';
import styles from './styles';

type StatusType = 'pulling' | 'canRelease' | 'refreshing' | 'complete';

const PullToRefresh = (props) => {
  const {
    disableRefresh = false,
    children,
    onRefresh,
    pullingText = '下拉刷新',
    canReleaseText = '松开刷新',
    refreshingText = '加载中',
    completeText = '刷新成功',
    threshold = 100,
    hasMore = false,
    finishedText = '没有更多了',
    onLoadMore,
    loading = false,
  } = props
  const [status, setStatus] = useState<StatusType>('pulling');
  const [innerLoading, setInnerLoading] = useState<boolean>(false);
  const translateRef = useRef(new Animated.Value(0));
  const [isTouched, setIsTouched] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0
  })

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,  
    onPanResponderGrant: (e) => { 
      setIsTouched(true);
      setStartPos({
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
      })
    },
    onPanResponderMove: (e) => {
      if (!isTouched) {
        return;
      }
      const { pageX, pageY } = e.nativeEvent;
      const offsetY = pageY - startPos.y;
      if (offsetY < 0) {
        return
      }
      Animated.timing(translateRef.current, {
        toValue: offsetY > 100 ? 100 : offsetY,
        duration: 0,
        useNativeDriver: true
      }).start();
    },
    onPanResponderRelease: (e) => {
      if (!isTouched) {
        return;
      }
      // 大于 0 向右移动
      const { pageX, pageY } = e.nativeEvent;
      const offsetY = pageY - startPos.y;
      if (offsetY < 40) {
        Animated.timing(translateRef.current, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
        return
      }

      Animated.timing(translateRef.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(({finished}) => {
        if (finished) {
          // onMaskClick?.()
        }
      });
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onPanResponderTerminationRequest: () => false
  })

  const renderStatusTitle = () => {
    if (status === 'refreshing') {
      return <Text>{refreshingText}</Text>
    }
    if (status === 'canRelease') {
      return <Text>{canReleaseText}</Text>
    }
    if (status === 'complete') {
      return <Text>{completeText}</Text>
    }

    return <Text style={styles.text}>{pullingText}</Text>
  }

  const transformStyle = useMemo(() => {
    return {
      transform: [
        {
          translateY: translateRef.current 
        }
      ]
    }
  }, [])
  
  return (
    <Animated.View style={[styles['pull-to-refresh'], transformStyle]} >
      <Animated.View style={[styles['pull-to-refresh-header']]}>
        <View style={styles['pull-to-refresh-header-content']}>
          {renderStatusTitle()}
        </View>
      </Animated.View>
      <>
        {children}
      </>
      {hasMore && (innerLoading || loading) && (
        <Text>加载中</Text>
      )}
      {!hasMore && (
        <Text>{finishedText}</Text>
      )}
    </Animated.View>
  )

}

export default PullToRefresh