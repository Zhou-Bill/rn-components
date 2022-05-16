import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppState, View, Text, TouchableOpacity } from 'react-native';

type FormatTime = {
  formatTime: { day: number, hour: number, minute: number, second: number },
  formatTimeString: string,
}

interface Iprops {
  /**
   * 倒计时秒数, 单位为秒
   */
  count: number | null,
  min?: number,
  onFinish?: null | ((time: number) => void),
  onClick?: null | (() => void),
  children?: (time: number, formatTime: FormatTime) => React.ReactNode,
  format?: 'DD:HH:mm:ss' | 'HH:mm:ss' | 'mm:ss',
}

function fomatFloat(src: number, pos: number) {
  // eslint-disable-next-line no-restricted-properties
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

function padZero(data: number | string, length: number = 2) {
  const temp = data.toString();
  return temp.padStart(length, '0');
}

function parseTime(format: string, currentTime: FormatTime['formatTime']): string {
  const { day } = currentTime;
  let { hour, minute, second } = currentTime;
  let result = format;

  if (result.includes('DD')) {
    result = result.replace('DD', padZero(day));
  } else {
    hour += day * 24;
  }

  if (result.includes('HH')) {
    result = result.replace('HH', padZero(hour))
  } else {
    minute += minute * 60
  }

  if (result.includes('mm')) {
    result = result.replace('mm', padZero(minute))
  } else {
    second += minute * 60;
  }

  if (result.includes('ss')) {
    result = result.replace('ss', padZero(second))
  }

  return result;
}

const CountDown = (props: Iprops) => {
  const { count, onFinish, min, format, children, onClick } = props;
  const [time, setTime] = useState(count);
  const ref = useRef<null | ReturnType<typeof setInterval>>(null);
  const backgroundTime = useRef<number>(0);
  // const [appState, setAppState] = useState(AppState.currentState);
  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = (nextAppState: "active" | "background" | "inactive" | "unknown" | "extension") => {
    /** app 状态从active 状态 切换到 后台运行时，那么记录此时时间 */
    if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
      backgroundTime.current = new Date().getTime() / 1000;
      appState.current = "background";
    }
    /** app 状态从后台运行 切换到 active 时，那么记录此时时间， 在后台运行时间 = 此时时间 - 从active切换到background 时间 */
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      backgroundTime.current = fomatFloat(new Date().getTime() / 1000 - backgroundTime.current, 0);
      appState.current = "active";
      setTime((prev) => ((prev! - backgroundTime.current - 1) > min! ? (prev! - backgroundTime.current - 1) : min!))
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      subscription.remove();
    }
  }, [])

  useEffect(() => {
    if (typeof count !== 'number') {
      return () => {}
    }
    setTime(count);
    ref.current = setInterval(() => {
      setTime((prev: any) => prev - 1)
    }, 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current as ReturnType<typeof setInterval>)
      }
    }
  }, [count])


  useEffect(() => {
    if (time as number <= 0) {
      clearInterval(ref.current as ReturnType<typeof setInterval>);
    }
    if (onFinish && (time === min)) {
      onFinish(time as number);
    }
  }, [time])

  const handlePress = () => {
    if (onClick) {
      onClick()
    }
  }

  const formatedData = useMemo(() => {
    if (time! <= 0) {
      return {
        formatTime: {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
        },
        formatTimeString: "00:00:00",
      }
    }
    const day = Math.floor(time! / (24 * 60 * 60));
    const hour = Math.floor(time! / (60 * 60) % 24);
    const minute = Math.floor(time! / (60) % 60);
    const second = Math.floor(time! % 60)

    const restTime = {
      day,
      hour,
      minute,
      second,
    }
    return {
      formatTime: restTime,
      formatTimeString: parseTime(format!, restTime),
    }
  }, [format, time])

  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        {
          typeof children === 'function' && children(time as number, formatedData) || (
            <Text>{formatedData.formatTimeString}</Text>
          )
        }
      </>
    </TouchableOpacity>
  )
}

CountDown.defaultProps = {
  onFinish: null,
  onClick: null,
  min: 0,
  format: 'HH:mm:ss',
}

export default CountDown
