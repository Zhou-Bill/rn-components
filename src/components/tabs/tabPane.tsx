import * as React from 'react';
import { View, Text } from 'react-native';

export interface TabPaneProps {
  title: string,
  index?: number | string,
  children: React.ReactNode,
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const TabPane: React.FC<TabPaneProps> = (props: TabPaneProps) => {
  const { title, index, children } = props
  return (
    <View>
      <>{children}</>
    </View>
  );
}

TabPane.displayName = "TabPane"

export default TabPane