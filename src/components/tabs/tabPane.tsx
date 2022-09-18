import * as React from 'react';
import { View, Text } from 'react-native';

export interface TabPaneProps {
  title: string,
  index?: number,
  children: React.ReactNode
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