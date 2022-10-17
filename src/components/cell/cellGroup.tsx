import React, { Children } from 'react';
import { Text, View } from 'react-native';
import { CellProps } from './cell';
import styles from './cellGroupStyles';

interface CellGroupProps {
  title: string,
  children: React.ReactNode
}

const CellGroup: React.FC<CellGroupProps> = (props: CellGroupProps) => {
  const { title, children } = props
  const count = React.Children.count(children);

  return (
    <View style={styles['cell-group']}>
      <Text style={styles['cell-group-title']}>{title}</Text>
      <View style={styles['cell-group-list']}>
        {
          React.Children.map(children, (child: React.FunctionComponentElement<CellProps>, index) => {
            if (child.type.displayName === 'Cell') {
              return React.cloneElement(child, {
                ...child.props,
                border: index < count - 1,
              })
            }
            return child
          })
        }
      </View>
     
    </View>
  )
}

export default CellGroup;