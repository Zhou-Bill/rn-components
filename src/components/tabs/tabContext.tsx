import * as React from 'react';

export type ElementNodeType = React.ReactNode & {
  index: string | number 
  title: string
}

type TabsContextProps = {
  nodes: ElementNodeType[],
  current: number | string, 
  containerWidth: number,
  onChange: (value: number | string) => void
}

const TabsContext = React.createContext<TabsContextProps>(null as unknown as TabsContextProps);

export default TabsContext;