import React from "react";
import Cell from "../../components/cell/cell";
import CellGroup from "../../components/cell/cellGroup";
import BasePage from "../basePage";
import Calendar from "../../components/calendar";

const CalendarPage = () => {
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

      {/* <Cascader 
        visible={popupVisible} 
        onMaskClick={() => setPopupVisible(false)} 
        options={options} 
        onConfirm={handleCascader} 
      /> */}
      <Calendar />
    </BasePage>
  )

}

export default CalendarPage