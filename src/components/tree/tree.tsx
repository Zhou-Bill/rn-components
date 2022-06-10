import React from 'react';
import TreeContext, { TreeDataType } from './treeContext';
import useTreeHandler from './useTreeHandler';
import NodeList from './nodeList';

interface TreeProps {
  treeData: TreeDataType[],
}

const Tree: React.FC<TreeProps> = (props: TreeProps) => {
  const { treeData = [] } = props;
  const { treeLink, checkedKeys,  onInnerCheckedChange } = useTreeHandler({treeData});

  const providerValue = {
    treeData: treeData,
    checkedKeys: checkedKeys,
    onInnerCheckedChange: onInnerCheckedChange,
    treeLink: treeLink
  } as any
  
  return (
    <TreeContext.Provider value={providerValue}>
      <NodeList />
    </TreeContext.Provider>
  )

}

export default Tree;