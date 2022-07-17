import React from "react";
import Portal from "../portals/portal";
import ToastContainer from "./toast";
import renderToast from "./wrapToast";

interface ToastProps {
  content: string;
  position?: 'top' | 'bottom' | 'center',
  visible: boolean;
}

type PartialPick<T extends Object, U extends keyof T> = Partial<Pick<T, U>>  & Omit<T, U>

let currentHandler: any | null = null

const Toast = React.forwardRef((props: ToastProps, ref) => {
  return (
    <Portal>
      <ToastContainer {...props} />
    </Portal>
  )
})

export function show(props: PartialPick<ToastProps, "visible">) {

  const element = (
    <ToastContainer
      {...props}
    />
  )
  if (currentHandler) {
    currentHandler.replace(element)
  } else {
    currentHandler = renderToast(element)
  }

  return currentHandler
}
export default Toast;