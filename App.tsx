import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import Switch from './src/components/switch';
import NoticeBar from './src/components/notice-bar';
import CountDown from './src/components/count-down';
import Stepper from './src/components/stepper';
import Tree from './src/components/tree/tree';
import { PortalProvider } from './src';
import Mask from './src/components/mask';
import Popup from './src/components/popup';
import PullToRefresh from './src/components/pull-to-refresh';
import Radio from './src/components/radio/radio';
import { RadioGroup } from './src/components/radio';
import { Checkbox, CheckboxGroup } from './src/components/checkbox';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './src/pages'
import TabsPage from './src/pages/tabsPage';
import ToastPage from './src/pages/toastPage';
import SwipePage from './src/pages/swipePage';
import SwipeCellPage from './src/pages/swipeCellPage';
import CascaderPage from './src/pages/cascaderPage';

const routers = [
  {
    name: 'Home' as const,
    component: HomePage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Tabs' as const,
    component: TabsPage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Toast' as const,
    component: ToastPage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Swipe' as const,
    component: SwipePage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'SwipeCell' as const,
    component: SwipeCellPage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Cascader' as const,
    component: CascaderPage,
    options: {
      headerShown: false
    }
  }
]


type RouterName = typeof routers[number]['name']

// https://reactnavigation.org/docs/typescript
export type RootStackParamList = {
  Home: undefined,
  Tabs: undefined,
  Toast: undefined,
  Swipe: undefined,
  SwipeCell: undefined,
  Cascader: undefined,
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const tree = [
  {
    key: '0',
    title: '0',
    children: [
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
                children: [
                  {
                    key: '2-2-1-1',
                    title: '2-2-1-1',
                    children: [
                      {
                        key: '2-2-1-1-1',
                        title: '2-2-1-1-1',
                      }
                    ]
                  }
                ],
              },
              {
                key: '2-2-2',
                title: '2-2-2',
              }
            ]
          }
        ]
      }
    ]
  },
  
]

export default function App() {
  const [stepperValue, setStepperValue] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("123");
  const [checkboxValue, setCheckboxValue] = React.useState([]);

  const onRadioValueChange = (value) => {
    setRadioValue(value)
  }

  const onCheckBoxValueChange = (value) => {
    setCheckboxValue(value)
  } 

  const handleTabChange = (key: number | string) => {
    setTab(key as any);
  }

  const handleStepperChange = (text: number | string) => {
    console.log("change")
    setStepperValue(text as unknown as number)
  }

  const handleChange = (current: number) => {
    // console.log(current)
  }

  const onClick3 = () => {
    setVisible(true)
  }

  const onClick4 = () => {
    setPopupVisible(true);
  }
  const handleCascader = (value, extend) => {
    console.log(value);
    setPopupVisible(false);
  }

  return (
    <PortalProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {
              routers.map((_item: typeof routers[number]) => {
                return (
                  <Stack.Screen
                    key={_item.name}
                    name={_item.name as RouterName}
                    component={_item.component}
                    options={{ headerShown: false }}
                  /> 
                )
              })
            }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PortalProvider>
    // <PortalProvider>
    //   <View style={styles.box}>
    //     <CellGroup title='tabs'>
    //       <Cell title='基础设置' value={<Text>123</Text>} />
    //       <Cell title='带动画tab' value={<Text>123</Text>} />
    //       <Cell title='禁用动画' value={<Text>123</Text>} />
    //       <Cell title='受控组件' value={<Text>123</Text>} />
    //     </CellGroup>
    //     <PullToRefresh>
    //     <ScrollView style={styles.container}>
   
    //       <View style={styles.center}>
    //         <Swipe direction='horizontal' onChange={handleChange} width={300}  height={200} >
    //           <SwipeItem>
    //             <View style={[{ width: '100%', backgroundColor: '#fff' }]}>
    //               <Text style={styles['swiper-item-image']}>123123</Text>
    //             </View>
    //           </SwipeItem>
    //           <SwipeItem>
    //             <View style={[{ width: '100%', backgroundColor: '#fff' }]}>
    //               <Text style={styles['swiper-item-image']}>swipe2</Text>
    //             </View>
    //           </SwipeItem>
    //         </Swipe>
    //       </View>
    //       <View style={{marginTop: 20}}>
    //         <Switch />
    //       </View>
    //       <View style={{marginTop: 20}}>
    //         <NoticeBar content={"我是通知栏我是通知栏我是通知栏我是"} scrollable />
    //       </View>
    //       <View style={{marginTop: 20}}>
    //         <CountDown
    //           count={24 * 60 * 60}
    //           format="HH:mm:ss"
    //         >
    //           {(time, formatTime) => {
    //             return (
    //               <Text>{formatTime.formatTimeString}</Text>
    //             )
    //           }}
    //         </CountDown>
    //       </View>
    //       <View style={{margin: 20}}>
    //         <Stepper step={0.1} decimal={1} />
    //       </View>
    //       <View style={{margin: 20}}>
    //         <Stepper value={stepperValue} onChange={handleStepperChange} max={5} min={-5} step={3} decimal={2} />
    //       </View>

    //       <Tree treeData={tree} />
    //       <TouchableOpacity
    //         onPress={onClick}
    //       ><Text>123123</Text></TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={onClick3}
    //       >
    //         <Text>mask</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={onClick4}
    //       >
    //         <Text>popup</Text>
    //       </TouchableOpacity>
    //       <Radio>
    //         <Text>123123</Text>
    //       </Radio>
    //       <RadioGroup value={radioValue} onChange={onRadioValueChange}>
    //         <Radio name="123">
    //           <Text>123123</Text>
    //         </Radio>
    //         <Radio name="567">
    //           <Text>456456</Text>
    //         </Radio>
    //         <Radio name="hahha">
    //           <Text>456456</Text>
    //         </Radio>
    //       </RadioGroup>
    //       <Text>hhhhhhh</Text>
    //       <Text>hhhhhhh</Text>
    //       <Text>hhhhhhh</Text>
    //       <Checkbox>
    //         <Text>123123</Text>
    //       </Checkbox>
    //       <CheckboxGroup value={checkboxValue} onChange={onCheckBoxValueChange}>
    //         <Checkbox name="123">
    //           <Text>123123</Text>
    //         </Checkbox>
    //         <Checkbox name="567">
    //           <Text>456456</Text>
    //         </Checkbox>
    //         <Checkbox name="hahha">
    //           <Text>456456</Text>
    //         </Checkbox>
    //       </CheckboxGroup>
    //       <Mask visible={visible} inPortal onMaskClick={() => setVisible(false)}>
    //         <Text>123了；看到；福利卡；代理费卡；老师的反馈；阿里上岛咖啡是</Text>
    //       </Mask>
    //       <Popup visible={popupVisible} onMaskClick={() => setPopupVisible(false)}/>
    //     </ScrollView>
    //     </PullToRefresh>
    //   </View>
    // </PortalProvider>
  );
}
