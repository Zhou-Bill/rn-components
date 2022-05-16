## Swipe-Cell 实现

## 效果图

![效果图](https://i.ibb.co/JjQhtCq/QQ-20220516174639.gif)

## 布局

![布局图片](https://i.ibb.co/RTWzcYt/image.png)

所以结构如下: 

```jsx
<View style={{ overflow: 'hidden' }}>
  {/* @ts-ignore */}
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
      左边内容
    </View>
    <TouchableOpacity activeOpacity={1} style={[styles['swipe-cell-children']]} onPress={resetToZero}>
      <>
        {children}
      </>
    </TouchableOpacity>
    <View 
      onLayout={(e) => onLayout(e, "right")}
      style={[styles['swipe-cell-actions'], styles['swipe-cell-right-actions']]}
    >
      右边内容
    </View>
  </Animated.View>
</View>
```

说明：

* 最外层`View` 设置`overflow: hidden`， 溢出隐藏, 下面的`Animated.View` 通过设置偏移值，我们就能看到左右两边的内容了
* 整个 `Animated.View` 可以做手势动画， 向左向右移动, 同时设置`position: relative`
* `swipe-cell-left-actions` 这个`View` 为左边内容，设置绝对定位，
`left: 100%`, 右边内容同理
* `swipe-cell-children` 沾满父级容器 `width: 100%`


## 接下来做手势

思路： 

* 这里使用原生的`panResponder` 手势， 配合 `react-native-reanimated`
* 首先需要算出 `左边内容的宽度` 与`右边内容的宽度`
* 在`onPanResponderGrant`, `onPanResponderMove`, `onPanResponderRelease` 三个事件中做逻辑处理， 大致逻辑跟`Swipe` 差不大
* 点击时记录当前位置`startPos`， 移动时将`event.pageX - startPost.x`, 移动时还需要加上 上次的距离（比如当时已经是展开的，即显示了左边内容）为`distance`， 最后松手的时候 重置`startPos`, 记录当前偏移值 `distance`, 他的值要么为 `0` 要么为左边内容宽度，或者右边内容宽度
* 最后 点击`swipe-cell-action` 触发`onClick` 函数，如果返回`promise` 那么then 之后 `reset` 为0， 
* 同时用`forwardRef`, `useImperativeHandle` 向外暴露`reset`方法