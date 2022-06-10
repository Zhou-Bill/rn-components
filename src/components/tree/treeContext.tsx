import { createContext } from 'react';

export type TreeDataType = {
  key: string | number ,
  title: string,
  children?: TreeDataType[],
}

export type TreeLinkItem = TreeDataType & {
  level: number, 
  parentId: null | string | number,
  parentNode: null | TreeLinkItem
}


type CheckedEvent = {
  checked: boolean,
  node: any,
}

/**
 * treeData 转换成双向连表
 */
export type TreeLink = {
  [key: string]: TreeLinkItem
}

type TreeContextType = {
  onInnerCheckedChange?: (checkedKeys: Array<string | number>, event: CheckedEvent) => void;
  checkedKeys: Array<string | number>
  treeData: TreeDataType[],
  treeLink: TreeLink
}

const TreeContext = createContext<TreeContextType>(null);

export default TreeContext;