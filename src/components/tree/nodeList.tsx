import React, { useContext } from 'react';
import TreeContext from './treeContext';
import { View, ScrollView, Text } from 'react-native';
import TreeNode from './treeNode';

const NodeList = () => {
  const { treeData } = useContext(TreeContext);

  const renderNodeList = (nodeList) => {
    return (
      <>
        {
          nodeList?.map((_item) => {
            const { children: childrenNode = [], key, ...rest } = _item;
            return (
              <View key={key}>
                <TreeNode title={rest.title} treeNodeKey={key}>
                  {renderNodeList(childrenNode)}
                </TreeNode>
              </View>
              
            )
          })
        }
      </>
    )
  }

  return (
    <ScrollView>
      {renderNodeList(treeData)}
    </ScrollView>
  )
}

export default NodeList;