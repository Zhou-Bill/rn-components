import React, { useState } from 'react';
import Stepper from '../../components/stepper';
import Wrapper from '../../components/wrapper';
import BasePage from '../basePage';

const StepperPage = () => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState("0.00");
  const [value3, setValue3] = useState("0.00");


  return (
    <BasePage title='stepper' viewStyles={{paddingHorizontal: 12}}>
      <Wrapper name='基础用法'>
        <Stepper />
      </Wrapper>

      <Wrapper name='受控组件'>
        <Stepper value={value} onChange={(val) => setValue(+val)} />
      </Wrapper>

      <Wrapper name='最大最小值'>
        <Stepper value={value1} max={10} min={-5} onChange={(val) => setValue1(+val)} />
      </Wrapper>

      <Wrapper name='最大最小值'>
        <Stepper value={value2}  decimal={2}  max={10} min={-5} onChange={(val) => setValue2(`${val}`)} />
      </Wrapper>

      <Wrapper name='步长'>
        <Stepper value={value3}  decimal={2} step={0.01}  max={10} min={-5} onChange={(val) => setValue3(`${val}`)} />
      </Wrapper>
    </BasePage>
  )
}

export default StepperPage