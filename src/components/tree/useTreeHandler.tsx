import React, { useEffect, useState } from "react";
import { TreeDataType, TreeLink, TreeLinkItem } from "./treeContext";

type CheckedEvent = {
  checked: boolean,
  node: TreeLinkItem,
}

type Options = {
  treeData: TreeDataType[]
  onCheckedChange?: (checkedKeys: number[] | string[], event: CheckedEvent) => void
}

const tree = [
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-1',
        title: '1-1',
        children: [
          {
            key: '1-1-1',
            title: '1-1-1',
          }
        ]
      },
      {
        key: '1-2',
        title: '1-2',
        children: [
          {
            key: '1-2-1',
            title: '1-2-1',
          }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '2',
    children: [
      {
        key: '2-1',
        title: '2-1',
        children: [
          {
            key: '2-1-1',
            title: '2-1-1',
          }
        ]
      },
      {
        key: '2-2',
        title: '2-2',
        children: [
          {
            key: '2-2-1',
            title: '2-2-1',
          }
        ]
      }
    ]
  }
]

function useTreeHandler(options: Options) {
  const { treeData } = options;
  const [treeLink, setTreeLink] = useState<TreeLink>({});
  const [checkedKeys, setCheckedKeys] = useState<string[] | number[]>([]);

  useEffect(() => {
    function init() {
      let result = {};
      /** 
       * 递归平铺treeData
       */
      const deepFlatTreeData = (data: TreeDataType[], level: number, parentId) => {
        data.forEach((_item) => {
          const parentNode = parentId ? result[parentId] : null;
          result[_item.key] = {
            ..._item,
            level,
            parentId,
            parentNode,
          }
          if (_item.children && _item.children.length > 0) {
            deepFlatTreeData(_item.children, level + 1, _item.key)
          }
        })
      }
      deepFlatTreeData(treeData, 0, null)
      return result
    }
    
    const result = init();
    setTreeLink(result);
  }, [treeData]);

  /**
   * 内部点击事件
   */
  const onInnerCheckedChange = (checkedKeys, event: CheckedEvent) => {
    // 需要遍历 event.node 向下遍历他的children，然后勾选
    const { checked, node } = event;
    const tempCheckedKeys = new Set([...checkedKeys]);
    checkedChildrenNodes(node, tempCheckedKeys, checked)
    checkedParentNodes(node.parentNode, tempCheckedKeys, checked)
    const unique = Array.from(tempCheckedKeys)
    setCheckedKeys(unique)
  }

  /**
   * 递归勾选，但这里有可能会出现爆栈，因为层级比较多的时候
   */
  const checkedChildrenNodes = (node: TreeDataType, checkedKeys: Set<string | number>, checked) => {
    let tempCheckedKeys = checkedKeys;
    const nodeInLink = treeLink[node.key];
    if (!nodeInLink) {
      return;
    }
    if (checked) {
      checkedKeys.add(node.key)
    } else {
      checkedKeys.delete(node.key)
    }
    if (nodeInLink?.children) {
      for (let i = 0; i < nodeInLink?.children?.length; i++) {
        checkedChildrenNodes(nodeInLink.children![i], tempCheckedKeys, checked)
      }
    }
  }

  /**
   * 向上勾选他的父节点
   */
  const checkedParentNodes = (node: TreeLinkItem, checkedKeys: Set<string | number>, checked: boolean) => {
    const tempCheckedKeys = checkedKeys;
    if (!node) {
      return;
    }
    const children = node?.children || [];
  
    let shouldCheckedParent = true;
    for (let i = 0; i < children.length; i++) {
      if (!checkedKeys.has(children[i].key)) {
        shouldCheckedParent = false;
        break;
      }
    }
    if (shouldCheckedParent && checked) {
      tempCheckedKeys.add(node.key);
      checkedParentNodes(node.parentNode, tempCheckedKeys, checked)
    } else if (!checked) {
      tempCheckedKeys.delete(node.key);
      checkedParentNodes(node.parentNode, tempCheckedKeys, checked)
    }
  }

  // /** 取消勾选他的下级children */
  // const unCheckedNodes = (node, checkedKeys: Set<string | number>) => {
  //   const nodeInLink = treeLink[node.key];
  //   if (nodeInLink || !nodeInLink.children || nodeInLink.children.length === 0) {
  //     return;
  //   }
  //   checkedKeys.delete(node.key);
  //   for (let i = 0; i < nodeInLink?.children?.length; i++) {
  //     unCheckedNodes(nodeInLink.children![i], checkedKeys)
  //   }
  // }


  return { treeLink, onInnerCheckedChange, checkedKeys };
}

export default useTreeHandler;