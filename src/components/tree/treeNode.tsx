import React, { useContext, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TreeContext from './treeContext';

interface TreeNodeProps {
  title: string;
  treeNodeKey: string | number;
  children: React.ReactNode
}

const TreeNode: React.FC<TreeNodeProps> = (props: TreeNodeProps) => {
  const { title, treeNodeKey, children } = props;
  const { checkedKeys, onInnerCheckedChange, treeLink } = useContext(TreeContext);
  const isChecked = useMemo(() => checkedKeys.indexOf(treeNodeKey) !== -1, [checkedKeys])
  const level = treeLink[treeNodeKey]?.level || 0;
  const onClick = () => {
    const node = treeLink[treeNodeKey];
    
    onInnerCheckedChange?.(checkedKeys, { node: node, checked: !isChecked }); 
  }

  return (
    <View
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <TouchableOpacity onPress={onClick} style={{marginLeft: level * 20}}>
        <Text>{isChecked ? 'Check' : 'unchecked'}{title}</Text>
      </TouchableOpacity>
      <>
        {children}
      </>
    </View>
    
  )
}

export default TreeNode;