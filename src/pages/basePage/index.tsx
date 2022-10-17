import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, View, ViewStyle } from "react-native";
import Header from "../../components/header";

type Props = {
  title: string,
  viewStyles?: ViewStyle,
  children: React.ReactNode
}

const BasePage = (props: Props) => {
  const { children, title, viewStyles = {} } = props;
  const navigation = useNavigation()
  const handleOnBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={[{flex: 1}, viewStyles]}>
        <Header title={title} onIconClick={handleOnBack}  />
        <ScrollView style={{backgroundColor: '#f7f8fa'}}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default BasePage;