import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import CalendarContent from './calendarContent'
import CalendarHeader from './calendarHeader'

interface CalendarProps {
  value?: Date | null,
  onChange?: (val: Date | null) => void
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const { value, onChange } = props
  const [innerValue, setInnerValue] = useState<Date | null>(null)

  React.useEffect(() => {
    if ('value' in props) {
      setInnerValue(value)
    }
  }, [value])


  return (
    <View>
      <CalendarHeader />
      <CalendarContent value={innerValue} />
    </View>
  )
}

export default Calendar