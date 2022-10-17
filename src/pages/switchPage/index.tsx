import React, { useState } from "react";
import Switch from "../../components/switch";
import Wrapper from "../../components/wrapper";
import BasePage from "../basePage";

const SwitchPage = () => {
  const [checked, setChecked] = useState(true);

  return (
    <BasePage title="switch" viewStyles={{paddingHorizontal: 12}}>
      <Wrapper name='基础用法'>
        <Switch />
      </Wrapper>
      <Wrapper name='基础用法'>
        <Switch checked={checked} onChange={(isChecked) => setChecked(isChecked)} />
      </Wrapper>
      <Wrapper name='基础用法'>
        <Switch />
      </Wrapper>
    </BasePage>
  )
}

export default SwitchPage;