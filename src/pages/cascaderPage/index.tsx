import React from "react";
import Cascader from "../../components/cascader";
import Cell from "../../components/cell/cell";
import CellGroup from "../../components/cell/cellGroup";
import BasePage from "../basePage";
import { options } from '../../components/cascader/data';

const CascaderPage = () => {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const handleCascader = (value, extend) => {
    console.log(value);
    setPopupVisible(false);
  }

  return (
    <BasePage title="级联选择">
      <CellGroup title="基础用法" >
        <Cell onClick={() => setPopupVisible(true)} title="居中通知"/>
      </CellGroup>

      <Cascader 
        visible={popupVisible} 
        onMaskClick={() => setPopupVisible(false)} 
        options={options} 
        onConfirm={handleCascader} 
      />
    </BasePage>
  )

}

export default CascaderPage