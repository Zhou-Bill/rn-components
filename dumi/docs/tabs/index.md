## Tab 组件

基础用法

```jsx | pure
import React from 'react';
import { Tabs } from 'rn-components-zzb';

const Demo = () => {
  return (
    <Tabs animated>
      <Tabs.Pane title="标签1">
        <Text>123</Text>
      </Tabs.Pane>
      <Tabs.Pane title="标签2">
        <Text>内容2</Text>
      </Tabs.Pane>
      <Tabs.Pane title="标签3">
        <View>
          <Text>hahhahhahah1231231231231232111111111</Text>
          <Text>水果</Text>
        </View>
      </Tabs.Pane>
    </Tabs>
  )
}
export default Demo
```