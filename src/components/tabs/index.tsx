import * as React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import TabsContext, { ElementNodeType } from './tabContext';
import styles from './styles'
import TabPane, { TabPaneProps } from './tabPane';
import TabBar from './tabBar';
import TabContent from './tabContent';
import { useEffect, useMemo, useState } from 'react';

interface ITabsProps {
  current?: string | number,
  /**
   * tabBar 是否有scrollView
   */
  scrollable?: boolean,
  /** 
   * 切换动画
   */
  animated?: boolean,
  children?: React.ReactNode
  onChange?: (vaule: string | number) => void
}

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

const Tabs: React.FC<ITabsProps> & { Pane: typeof TabPane } = (props: ITabsProps) => {
  const { children, current = 0, onChange, scrollable = false, animated = false } = props
  const [innerValue, setInnerValue] = useState(current)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const nodes = useMemo(() => traverseTree(children), [children]);

  useEffect(() => {
    if ("current" in props) {
      setInnerValue(current);
    }
  }, [current])

  const handleChange = (value: number | string) => {
    if (!('current' in props)) {
      setInnerValue(value);
    }
    
    onChange?.(value)
  }

  const handleOnLayout = React.useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }, [])


  const value = {
    current: innerValue,
    nodes: nodes,
    onChange: handleChange,
    containerWidth: containerWidth,
  }

  return (
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
  )
}

Tabs.Pane = TabPane

export default Tabs;