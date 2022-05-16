import * as React from 'react';
import { View, Text } from 'react-native';
import TabsContext from './tabContext';
import styles from './styles'
import TabPane, { TabPaneProps } from './tabPane';
import TabBar from './tabBar';
import TabContent from './tabContent';
import { useEffect, useState } from 'react';

interface ITabsProps {
  current?: string | number,
  scrollable?: boolean,
  children?: React.ReactNode
  onChange?: (vaule: string | number) => void
}

const traverseTree = (children: React.ReactNode) => {
  let result: React.ReactNode[] = []
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
  const { children, current = 0, onChange, scrollable = false } = props
  const [innerValue, setInnerValue] = useState(current)
  const nodes = traverseTree(children);
  console.log(current, "current");

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

  const value = {
    current: innerValue,
    scrollable: scrollable,
    nodes: nodes,
    onChange: handleChange
  }

  return (
    <TabsContext.Provider value={value}>
      <View style={styles.tabs}>
        <TabBar />
        <TabContent />
      </View>
    </TabsContext.Provider>
  )
}

Tabs.Pane = TabPane

export default Tabs;