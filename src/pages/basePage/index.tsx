import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { RootStackParamList } from "../../../App";
import CellGroup from "../../components/cell/cellGroup";
import Header from "../../components/header";

type Props = {
  title: string,
  children: React.ReactNode
}

const BasePage = (props: Props) => {
  const { children, title } = props;
  const navigation = useNavigation()
  const handleOnBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={{flex: 1}}>
        <Header title={title} onIconClick={handleOnBack}  />
        <ScrollView style={{backgroundColor: '#f7f8fa'}}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default BasePage;