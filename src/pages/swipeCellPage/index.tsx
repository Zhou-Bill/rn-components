import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import Cell from '../../components/cell/cell'
import CellGroup from "../../components/cell/cellGroup";
import Toast from "../../components/toast";
import Wrapper from "../../components/wrapper";
import BasePage from '../basePage'
import SwipeCell, { SwipeCellRef } from "../../components/swipe-cell";

type Props = NativeStackScreenProps<RootStackParamList, 'Toast'>;

const SwipeCellPage = (props: Props) => {
  const ref = useRef<SwipeCellRef>(null);

  const leftAction = [
    { 
      key: 'mute1',
      type: 'primary' as 'primary',
      text: '123123',
      onClick: () => {
      }
    }
  ]
  const rightAction = [
    {
      key: 'mute',
      type: 'primary' as 'primary',
      text: '免打扰',
      onClick: () => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            reject("fuck")
          }, 3000)
        }).catch((e) => {
          console.log("error", e);
          // ref.current?.close();
        })
      }
    }, 
    {
      key: 'cancel',
      text: '取消关注',
      type: 'danger' as 'danger',
      onClick: () => {
        console.log("取消关注")
      }
    }, 
    {
      key: 'delete',
      text: '删除',
      type: 'success' as 'success',
      onClick: () => {
        console.log("删除")
      }
    }
  ]

  return (
    <BasePage title="SwipeCell">
      <Wrapper name='基础用法'>
        <SwipeCell rightAction={rightAction} ref={ref} leftAction={leftAction}>
          <View style={{ padding: 12 }}>
            <Text>123</Text>
            <Text>456</Text>
            <Text>789</Text>
          </View>
        </SwipeCell>
      </Wrapper>
    </BasePage>
  )
}

export default SwipeCellPage