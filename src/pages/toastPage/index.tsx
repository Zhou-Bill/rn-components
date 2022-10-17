import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../../App";
import Cell from '../../components/cell/cell'
import CellGroup from "../../components/cell/cellGroup";
import Toast from "../../components/toast";
import BasePage from '../basePage'

type Props = NativeStackScreenProps<RootStackParamList, 'Toast'>;

const ToastPage = (props: Props) => {
  const onClick1 = () => {
    Toast.show({
      content: '加载中',
      isBase: true,
      style: {
        borderLeftColor: 'red',
      }
    })
  }

  const onClick = () => {
    Toast.enhance({
      content: '失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了',
      isBase: false,
      icon: null,
      position: 'bottom',
      title: '操作1',
      onAfterClose: () => {
        console.log("afterClose")
      }
    })
  }


  const onClick2 = () => {
    Toast.enhance({
      content: '失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了失败了',
      isBase: false,
      icon: null,
      position: 'top',
      title: '操作1',
      onAfterClose: () => {
        console.log("afterClose")
      }
    })
  }

  return (
    <BasePage title="Toast">
      <CellGroup title="toast" >
        <Cell onClick={onClick1} title="居中通知"/>
        <Cell onClick={onClick} title="底部显示"  />
        <Cell onClick={onClick2} title="顶部通知"  />
      </CellGroup>
    </BasePage>
  )
}

export default ToastPage