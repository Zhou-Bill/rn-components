## Swipe 组件实现

### 先看demo

```jsx
<Swipe direction='horizontal' onChange={handleChange} width={300}  height={200}>
  <SwipeItem>
    <View style={[{ width: '100%' }]}>
      <Image 
        source={{uri: 'https://static.wikia.nocookie.net/doraemon/images/c/c4/%E5%93%86%E5%95%A6A%E5%A4%A2-0.jpg/revision/latest?cb=20190218095749&path-prefix=zh-tw'}} 
        style={styles['swiper-item-image']} 
      />
    </View>
  </SwipeItem>
  <SwipeItem>
    <View style={[{ width: '100%' }]}>
      <Image 
        source={{uri: 'https://img2.baidu.com/it/u=2284805420,4155623739&fm=26&fmt=auto'}} 
        style={styles['swiper-item-image']} 
      />
    </View>
  </SwipeItem>
</Swipe>
```

### 实现过程


* 布局

![布局图片](https://s1.ax1x.com/2022/05/15/O2z726.png)

我们可以通过偏移值去实现`swipe` 的切换

所以我们的结构是

```jsx
<View 
  style={[
    styles['swiper'],
    {
      width: width,
      height: height,
    }
  ]}
>
  <>
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
      {/* 多个swipeItem */}
      {/*  <SwipeItem /> */}
      {/*  <SwipeItem /> */}
      {renderChildren()}
    </Animated.View>
    { renderDots?.(current, count) ||  renderDotsList() }
  </>
</View>
```

* 对React.Children 进行处理

我们在`React` 中的`props`拿到的`children` 其实是Swipe包裹的的东西，就是下面这一串， 那么我们要对它进行处理，如果是符合`SwipeItem` 的作为子节点的话就显示，如果用其他`element`作为子节点的话, 就不显示， 我们可以使用`React.Children.map` 做处理

```jsx
<SwipeItem>其余东西</SwipeItem>
<SwipeItem>其他东西</SwipeItem>
```

* 处理方法

举个例子， 注意: `SwipeItem` 组件需要给静态属性`displayName`

```jsx
const renderElement = () => {
  return (
    <>
    {
      React.Children.map(props.children, (child) => {
        if (child.type.displayName !== 'SwipeItem') {
          return null
        }
        return React.cloneElement(child)
      })
    }
    <>
  )
}
```

* 处理`swipe` 循环播放

为了解决`Swipe` 循环播放问题， 这里的处理方案是：**新增两个节点，一个第一个节点，另一个是 最后那个节点, 分别放入尾部和头部**， 因为在头部加了一个节点，那么`Animated.View` 需要向右偏移一个视口宽度

```jsx
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
// 渲染节点
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
```

* 自动切换图片

思路: 当`current` 改变时，重新执行`setTimeout`去显示下一张图片。 如果当前是最后一张图片的时候需要切回到第一张图片，**为了解决视觉问题，其实我们这里是切到了我们新增的那个尾节点中，然后动画结束后秒切回0**

**注意：动画是用`react-native-reanimated` 这个库去做的，使用了这个库会导致一些问题，不能远程debug**，具体看[这里](https://docs.swmansion.com/react-native-reanimated/docs/next/#known-problems-and-limitations)

```jsx
const offsetXorY = direction === 'horizontal' ? width : height
const translateX = useSharedValue(-defaultIndex * offsetXorY);

useEffect(() => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current)
  }

  if (count <= 1) {
    return 
  }
  // 如果点击了当前图片，那么取消setTimeout
  if (isTouched) {
    return;
  }
  timeoutRef.current = setTimeout(() => {
    if (current === count - 1) {
      setCurrent(0);
      translateX.value = withTiming(-count  * offsetXorY, {}, (finished) => {
        if (finished) {
          translateX.value = (0);
        }
      })
      onChange?.(0)
    }  else {
      setCurrent(current + 1);
      onChange?.(current + 1)
      translateX.value = withTiming(-(current + 1) * offsetXorY)
    }
  }, 3000)

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
}, [current, isTouched, offsetXorY])
```

* 添加手势滑动等

思路： `Animated.View` 添加 `onTouchStart` , `onTouchMove`, `onTouchEnd`,

* `onTouchStart时`: 记录当前坐标
* `onTouchMove`: 计算移动距离， 当前偏移值（Animated.View的便宜值） + 移动距离
* `onTouchEnd`: 松手距离 - start时的距离， 判断`向左移动`还是`向右移动`， 显示下一张还是上一张， 需要注意的是 **第一张向右移动的时候是到最后一张，最后一张向左移动的时候是去到第一张**

垂直方向上类似。

具体可以看代码实现


## 效果图

<a href="https://ibb.co/JvYcz9k">
  <img src="https://i.ibb.co/F5QhBF7/image.gif" alt="image" border="0" />
</a>