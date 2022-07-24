import React, { FC } from "react";
import { Text } from "react-native";
import { Icon } from "../..";
import Spinning from "../animation/spinning";
import Portal from "../portals/portal";
import ToastContainer, { ToastProps } from "./toast";
import renderToast, { ImperativeHandler } from "./wrapToast";
interface ToastConfigProps extends ToastProps  {
  duration?: number;
}

type PartialPick<T extends Object, U extends keyof T> = Partial<Pick<T, U>>  & Omit<T, U>

type FuncType = (props: PartialPick<ToastConfigProps, "visible">) => ImperativeHandler

type StaticFunc = {
  show: FuncType,
  success: FuncType,
  loading: FuncType,
  error: FuncType,
  enhance: FuncType,
  clear: () => void
}

let currentHandler: any | null = null
let currentTimeout: ReturnType<typeof setTimeout> | null = null

const Toast: FC<ToastConfigProps> & StaticFunc = (props: ToastConfigProps) => {
  return (
    <Portal>
      <ToastContainer {...props} />
    </Portal>
  )
}

function show(props: PartialPick<ToastConfigProps, "visible">) {
  const mergeProps = {
    duration: 3000,
    ...props,
  }
  const element = (
    <ToastContainer
      {...mergeProps}
      onClose={() => {
        currentHandler = null
      }}
    />
  )
  if (currentHandler) {
    currentHandler.replace(element)
  } else {
    currentHandler = renderToast(element)
  }

  if (currentTimeout) {
    window.clearTimeout(currentTimeout)
  }
  if (mergeProps.duration !== 0) {
    currentTimeout = setTimeout(() => {
      clear()
    }, mergeProps.duration)
  }

  return currentHandler
}

function success(props: PartialPick<ToastProps, "visible">) {
  return show({
    isBase: true,
    content: "保存成功",
    icon: <Icon name="check" color="#fff" size={48} />,
    duration: 3000,
    ...props,
  })
}

function loading(props: PartialPick<ToastProps, "visible">) {
  return show({
    isBase: true,
    content: '正在加载',
    icon: <Spinning />,
    duration: 3000,
    ...props,
  })
}

function error(props: PartialPick<ToastProps, "visible">) {
  return show({
    isBase: true,
    content: "操作失败",
    icon: <Icon name="close" color="#fff" size={48} />,
    duration: 3000,
    ...props,
  })
}

function enhance(props: PartialPick<ToastProps, "visible">) {
  return show({
    isBase: false,
    content: '12312',
    ...props,
  })
}

function clear() {
  currentHandler?.close()
  currentHandler = null
  if (currentTimeout) {
    window.clearTimeout(currentTimeout)
    currentTimeout = null
  }
}

Toast.show = show;
Toast.clear = clear
Toast.success = success
Toast.loading = loading
Toast.error = error
Toast.enhance = enhance


export default Toast;