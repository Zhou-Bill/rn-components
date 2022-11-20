import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import styles from './calendarContentStyle';

interface CalendarContentProps {
  value: Date | null
}

const CalendarContent: React.FC<CalendarContentProps> = (props: CalendarContentProps) => {
  const { value } = props 

  const calendarList = useMemo(()  => {
    const moment = dayjs().startOf('month')
    const prevMonth = dayjs().subtract(1, 'month').endOf('month')
    const prevMonthLastDay = prevMonth.get('date')
    // 获取星期几， 如果星期6 就在前面补充 上个月的 倒数 6日到数组中
    const monthStartDay = moment.get('day')
    const momentEndDate = dayjs().endOf('month').get('date')
    const nextMonthList = Array(42 - monthStartDay - momentEndDate).fill(1).map((_item, _index) => _index + 1)
    const prevMonthList = Array(monthStartDay).fill(1).map((_item, _index) => prevMonthLastDay - _index).reverse()
    const currentMonthList = Array(momentEndDate).fill(1).map((_item, _index) => _index + 1);
    return [...prevMonthList, ...currentMonthList, ...nextMonthList, ]
  }, [])

  return (
    <View style={styles['calendar-list']}> 
    {
      calendarList.map((_item, _rowIndex) => {
        return (
          <View  style={styles['calendar-list-item']} key={_rowIndex}>
            <Text key={`${_rowIndex}-${_item}`}>{_item}</Text>
          </View>
        )
      })
    }
    </View>
  )
}

export default CalendarContent