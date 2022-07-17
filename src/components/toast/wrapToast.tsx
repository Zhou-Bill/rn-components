import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import Portal from "../portals/portal";
import { portalHostRef } from '../portals/portalProvider'


const renderToast = (element) => {
  const Wrapper = React.forwardRef((_, ref) => {
    const [visible, setVisible] = useState(false)
    const [elementToRender, setElementToRender] = useState(element)
    const closedRef = useRef(false)
    const keyRef = useRef(0);

    useEffect(() => {
      if (!closedRef.current) {
        setVisible(true)
      } else {
        // afterClose()
      }
    }, [])

    function onClose() {
      closedRef.current = true
      setVisible(false)
      elementToRender.props.onClose?.()
    }

    useImperativeHandle(ref, () => ({
      close: onClose,
      replace: element => {
        keyRef.current++
        elementToRender.props.afterClose?.()
        setElementToRender(element)
      },
    }))
   
    const currentElement = React.cloneElement(elementToRender, {
      ...elementToRender.props,
      key: keyRef.current,
      visible,
    })

    return currentElement

  })
  const wrapperRef = React.createRef<any>()
  portalHostRef.current.addPortal('toast', <Wrapper ref={wrapperRef} /> )
  return {
    close: wrapperRef.current?.close(),
    replace: element => {
      wrapperRef.current?.replace(element)
    },
  }
  // return Wrapper
  
}

export default renderToast;
