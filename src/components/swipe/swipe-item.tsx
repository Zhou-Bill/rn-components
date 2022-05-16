import * as React from 'react';
import { View } from 'react-native';

export interface ISwipeItemProps {
  children: React.ReactNode
  width?: number
  height?: number
}

const SwipeItem: React.FC<ISwipeItemProps> = (props: ISwipeItemProps) => {
  const { children, width, height } = props;

  return (
    <View style={{ width: width, height: height }}>
      {children}
    </View>
  )
}

SwipeItem.displayName = 'SwipeItem'

export default SwipeItem;