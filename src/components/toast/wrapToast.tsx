import React, { useImperativeHandle, useRef, useState } from "react";
import Portal from "../portals/portal";
import { portalHostRef } from '../portals/portalProvider'
import { ToastProps } from "./toast";

export type ImperativeHandler = {
  close: () => void,
  replace: (element: React.FunctionComponentElement<ToastProps>) => void
}

const renderToast = (element: React.FunctionComponentElement<ToastProps>) => {
  const Wrapper = React.forwardRef<ImperativeHandler, any>((_, ref) => {
    const [visible, setVisible] = useState(true)
    const [elementToRender, setElementToRender] = useState(element)
    const keyRef = useRef(0);

    function afterClose() {
      portalHostRef.current?.removePortal('toast')
      elementToRender.props.onAfterClose?.()
    }

    function onClose() {
      setVisible(false)
      elementToRender.props.onClose?.()
    }

    useImperativeHandle(ref, () => ({
      close: onClose,
      replace: (ele: React.FunctionComponentElement<ToastProps>) => {
        keyRef.current++
        elementToRender.props.onAfterClose?.()
        setElementToRender(ele)
      },
    }))
   
    const currentElement = React.cloneElement(elementToRender, {
      ...elementToRender.props,
      key: keyRef.current,
      visible,
      onClose,
      onAfterClose: afterClose,
    })

    return currentElement

  })
  const wrapperRef = React.createRef<ImperativeHandler>()
  portalHostRef.current.addPortal('toast', <Wrapper ref={wrapperRef} /> )
  return {
    close: () => { wrapperRef.current?.close() },
    replace: element => {
      wrapperRef.current?.replace(element)
    },
  }
}

export default renderToast;
