import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import Header from "../../components/header";
import Tabs from "../../components/tabs";
import Wrapper from "../../components/wrapper";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;

const TabsPage: React.FC<Props> = (props: Props) => {
  const { navigation } = props
  const [tab, setTab] = React.useState(3);
  const [tab2, setTab2] = React.useState('c');

  const handleTabChange = (key: number | string) => {
    setTab(key as any);
  }

  const handleOnBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={styles['container']}>
        <Header title="Tab" onIconClick={handleOnBack}  />
        <ScrollView style={styles['scrollView']}>
          <Wrapper name="基础用法">
            <Tabs animated>
              <Tabs.Pane title="标签1">
                <View style={styles['tab-view-content']}>
                  <Text>123</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="标签2">
                <View style={[{ backgroundColor: 'yellow', height: 88}, styles['tab-view-content']]}>
                  <Text>内容2</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="标签3">
                <View style={[{ backgroundColor: 'green'}, styles['tab-view-content']]}>
                  <Text>hahhahhahah1231231231231232111111111</Text>
                  <Text>水果</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="标签4">
                <View style={styles['tab-view-content']}>
                  <Text>菠萝</Text>
                </View>
              </Tabs.Pane>
            </Tabs>
          </Wrapper>

          <Wrapper name="受控组件默认key">
            <Tabs current={tab} onChange={handleTabChange} animated>
              <Tabs.Pane title="标签4"><Text>菠萝</Text></Tabs.Pane>
              <Tabs.Pane title="标签5" disabled><Text>榴莲</Text></Tabs.Pane>
              <Tabs.Pane title="标签6"><Text>榴莲</Text></Tabs.Pane>
              <Tabs.Pane title="我想吃KFC"><Text>我想吃KFC</Text></Tabs.Pane>
            </Tabs>
          </Wrapper>

          <Wrapper name="受控组件设置key">
            <Tabs current={tab2} animated onChange={(key) => setTab2(`${key}`)}>
              <Tabs.Pane index={"a"} title="标签1">
                <View style={styles['tab-view-content']}>
                  <Text>123</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane index={"b"} title="标签2">
                <View style={styles['tab-view-content']}>
                  <Text>内容2</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane index={"c"} title="标签3">
                <View style={styles['tab-view-content']}>
                  <Text>hahhahhahah1231231231231232111111111</Text>
                  <Text>水果</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane index={"d"} title="标签4">
                <View style={styles['tab-view-content']}>
                  <Text>菠萝</Text>
                </View>
              </Tabs.Pane>
            </Tabs>
          </Wrapper>

          <Wrapper name="超长Tabs，且切换无动画">
            <Tabs animated={false} scrollable>
              <Tabs.Pane title="标签1">
                <View style={styles['tab-view-content']}>
                  <Text>123</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="比较长的标签2">
                <View style={styles['tab-view-content']}>
                  <Text>内容2</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="比较长的标签3">
                <View style={styles['tab-view-content']}>
                  <Text>hahhahhahah1231231231231232111111111</Text>
                  <Text>水果</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="很长很长的标签4">
                <View style={styles['tab-view-content']}>
                  <Text>菠萝</Text>
                </View>
              </Tabs.Pane>
              <Tabs.Pane title="标签5">
                <View style={styles['tab-view-content']}>
                  <Text>菠萝</Text>
                </View>
              </Tabs.Pane>
            </Tabs>
          </Wrapper>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default TabsPage