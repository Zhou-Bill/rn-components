## Tabs 实现思路

## Tabs 使用方法

```jsx
<Tabs scrollable animated>
  <Tabs.Pane title="123"><Text>123</Text></Tabs.Pane>
  <Tabs.Pane title="哈哈哈">
    <View style={{ backgroundColor: 'blue', height: 88}}>
      <Text>hahhahhahah1231231231231232111111111</Text>
    </View>
  </Tabs.Pane>
  <Tabs.Pane title="水果">
    <View style={{ backgroundColor: 'green'}}>
      <Text>hahhahhahah1231231231231232111111111</Text>
      <Text>水果</Text>
    </View>
  </Tabs.Pane>
  <Tabs.Pane title="菠萝"><Text>菠萝</Text></Tabs.Pane>
  <Tabs.Pane title="榴莲"><Text>榴莲</Text></Tabs.Pane>
  <Tabs.Pane title="榴莲榴莲榴莲1"><Text>榴莲</Text></Tabs.Pane>
  <Tabs.Pane title="我想吃KFC"><Text>我想吃KFC</Text></Tabs.Pane>
</Tabs>

```

## 实现思路

* `Tabs` 分为 `TabBar` 与 `TabContent`，所以这里我们使用了 `Context`, 那么`Tab` 下的 `TabBar` 和 `TabContent` 都能共享到数据, 结构如下：

```jsx
const value = {
  current: innerValue,
  nodes: nodes,
  onChange: handleChange,
  containerWidth: containerWidth,
}
<TabsContext.Provider value={value}>
  <View style={styles.tabs} onLayout={handleOnLayout}>
    <TabBar scrollable={scrollable} />
    {
      containerWidth && (
        <TabContent animated={animated} />
      ) || null
    } 
  </View>
</TabsContext.Provider>
```

* 遍历`children` 节点，保存`title`, `index` 属性
```jsx
const traverseTree = (children: React.ReactNode) => {
  let result: ElementNodeType[] = []
  React.Children.map(children as any, (child: React.FunctionComponentElement<TabPaneProps>, index) => {
    if (child.type.displayName === 'TabPane') {
      result.push({
        title: child.props.title,
        index: child.props?.index || index,
        ...child,
      })
    }
  })
  return result
}
```

## TabBar 实现

* 从上面我们保存了`nodes` 所有`children` 节点, 那么我们只要遍历`node` 节点渲染就行了, 但这里我们需要接受属性`scrollable` 表示`tabBar` 是否可以滚动，所以我们需要使用`React.createElement()`

```jsx
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
      {/* 处理underline */}
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
```

* 我们还需要记录每个`TabItem` 的位置与宽度`tabItemOnLayout`

```jsx
const tabItemPositionToKeyEntities = (data: any) => {
  const result: { [key in number | string]: TabItemPositionType } = {};
  data.forEach((_item: any) => {
    result[_item.key] = _item;
  })
  return result;
}

const tabItemPosition = useRef<TabItemPositionType[]>([]);

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
/**
 * 转化 tabItemPosition.current
 * 将key 作为 主键
 */
const positionEntities = tabItemPositionToKeyEntities(tabItemPosition.current);
```

* 处理`underline`, 因为我们保存了 `所有节点`的 **位置** 与 **宽度**，那么`underline` 的偏移值就是当前节点的`position - width`

```jsx
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


useEffect(() => {
  if (Object.keys(positionEntities).length === 0) {
    return;
  }
  const currentItem = positionEntities[current]
  const { position, width, key } = currentItem;
  // 处理 underline
  translateX.value = withTiming(position - width)
}, [current, positionEntities])
```

* 当我们`TabBar` 是可以滚动的时候，我们需要做的是， 如果`点击了某个TabBarItem, 那么他应该居中在他的父容器`
**注意： 边界问题， 具体看代码**

![计算逻辑](https://i.ibb.co/YZxGtky/image.png)

## TabContent 的实现

* TabContent 的实现 跟 `Swipe` 差不多


## 最后看下效果图

![效果图](https://i.ibb.co/VV9wnTS/image.gif)