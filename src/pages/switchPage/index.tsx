import React, { useState } from "react";
import { Text } from 'react-native';
import Switch from "../../components/switch";
import Wrapper from "../../components/wrapper";
import BasePage from "../basePage";

const SwitchPage = () => {
  const [checked, setChecked] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  return (
    <BasePage title="switch" viewStyles={{paddingHorizontal: 12}}>
      <Wrapper name='基础用法'>
        <Switch />
      </Wrapper>
      <Wrapper name='受控组件'>
        <Switch checked={checked} onChange={(isChecked) => setChecked(isChecked)} />
      </Wrapper>
      <Wrapper name='禁用'>
        <Switch disabled />
      </Wrapper>
      <Wrapper name='开关内容'>
        <Switch openNode={<Text>123123</Text>} closeNode={<Text>关</Text>}/>
      </Wrapper>
    </BasePage>
  )
}

export default SwitchPage;