import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Swipe from './src/components/swipe';
import SwipeCell, { SwipeCellRef } from './src/components/swipe-cell';
import Switch from './src/components/switch';
import NoticeBar from './src/components/notice-bar';
import CountDown from './src/components/count-down';
import Stepper from './src/components/stepper';
import Tabs from './src/components/tabs';

const SwipeItem = Swipe.SwipeItem;

export default function App() {
  const ref = useRef<SwipeCellRef>(null);
  const [stepperValue, setStepperValue] = React.useState(0);
  const [tab, setTab] = React.useState(3);

  const handleTabChange = (key: number | string) => {
    setTab(key);
  }

  const handleStepperChange = (text: number | string) => {
    console.log("change")
    setStepperValue(text as unknown as number)
  }

  const handleChange = (current: number) => {
    // console.log(current)
  }

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
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <Swipe direction='horizontal' onChange={handleChange} width={300}  height={200} >
          <SwipeItem>
            <View style={[{ width: '100%' }]}>
              <Image source={{uri: 'https://static.wikia.nocookie.net/doraemon/images/c/c4/%E5%93%86%E5%95%A6A%E5%A4%A2-0.jpg/revision/latest?cb=20190218095749&path-prefix=zh-tw'}} style={styles['swiper-item-image']} />
            </View>
          </SwipeItem>
          <SwipeItem>
            <View style={[{ width: '100%' }]}>
              <Image source={{uri: 'https://img2.baidu.com/it/u=2284805420,4155623739&fm=26&fmt=auto'}} style={styles['swiper-item-image']} />
            </View>
          </SwipeItem>
        </Swipe>
      </View>
      <View style={{marginTop: 50}}>
        <SwipeCell rightAction={rightAction} ref={ref} leftAction={leftAction}>
          <View style={{ padding: 12 }}>
            <Text>Text</Text>
          </View>
        </SwipeCell>
      </View>
      <View style={{marginTop: 20}}>
        <Switch />
      </View>
      <View style={{marginTop: 20}}>
        <NoticeBar content={"我是通知栏我是通知栏我是通知栏我是"} scrollable />
      </View>
      <View style={{marginTop: 20}}>
        <CountDown
          count={24 * 60 * 60}
          format="HH:mm:ss"
        >
          {(time, formatTime) => {
            return (
              <Text>{formatTime.formatTimeString}</Text>
            )
          }}
        </CountDown>
      </View>
      <View style={{margin: 20}}>
        <Stepper step={0.1} decimal={1} />
      </View>
      <View style={{margin: 20}}>
        <Stepper value={stepperValue} onChange={handleStepperChange} max={5} min={-5} step={3} decimal={2} />
      </View>
      <Tabs scrollable current={tab} onChange={handleTabChange}>
        <Tabs.Pane title="123"><Text>123</Text></Tabs.Pane>
        <Tabs.Pane title="哈哈哈">
          <View style={{ backgroundColor: 'blue', height: 88}}>
            <Text>hahhahhahah1231231231231232111111111</Text>
          </View>
        </Tabs.Pane>
        <Tabs.Pane title="水果">
          <View style={{ backgroundColor: 'green'}}>
            <Text>hahhahhahah1231231231231232111111111</Text>
            <Text>水果</Text>
          </View>
        </Tabs.Pane>
        <Tabs.Pane title="菠萝"><Text>菠萝</Text></Tabs.Pane>
        <Tabs.Pane title="榴莲"><Text>榴莲</Text></Tabs.Pane>
        <Tabs.Pane title="榴莲榴莲榴莲1"><Text>榴莲</Text></Tabs.Pane>
        <Tabs.Pane title="我想吃KFC"><Text>我想吃KFC</Text></Tabs.Pane>

      </Tabs>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  'swiper-item-image': {
    width: '100%',
    height: '100%',
  }
});
