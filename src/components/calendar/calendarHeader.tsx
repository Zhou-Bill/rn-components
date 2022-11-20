import React from 'react';
import { View, Text } from 'react-native';
import  styles from './calendarHeaderStyles';

const CalendarHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles['calendar-header-text']}>上一年</Text>
      <Text style={styles['calendar-header-text']}>上一月</Text>
      <Text style={styles.yearAndMonth}>2022年3月</Text>
      <Text style={styles['calendar-header-text']}>下一月</Text>
      <Text style={styles['calendar-header-text']}>下一年</Text>
    </View>
  )
}

export default CalendarHeader