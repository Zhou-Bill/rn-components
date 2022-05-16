import * as React from 'react';

type TabsContextProps = {
  nodes: React.ReactNode[],
  current: number | string, 
  scrollable: boolean,
  onChange: (value: number | string) => void
}

const TabsContext = React.createContext<TabsContextProps>(null as unknown as TabsContextProps);

export default TabsContext;