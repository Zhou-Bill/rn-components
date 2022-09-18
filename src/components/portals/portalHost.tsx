import React, { ReactElement, useCallback, useContext, useEffect, useImperativeHandle, useMemo } from 'react';
import { ADD_PORTAL, REGISTER_HOST, UNMOUNT_PORTAL, UNREGISTER_HOST, UPDATE_PORTAL } from '../../constants';
import { PortalStateContext, PortalDispatchContext } from './portalContext';

interface PortalHostProps {
  hostName?: string;
}

export interface PortalHostRef {
  addPortal: (name: string, children: React.ReactNode) => void;
  updatePortal: (name: string, children: React.ReactNode) => void;
  removePortal: (name: string) => void;
}

const PortalHost = React.forwardRef<PortalHostRef, PortalHostProps>((props: PortalHostProps, ref) => {
  const { hostName = 'rootHost' } = props;
  const state = useContext(PortalStateContext)
  const dispatch = useContext(PortalDispatchContext);
  const nodes = useMemo(() => state[hostName] || [], [hostName, state])

  useEffect(() => {
    dispatch({
      type: REGISTER_HOST,
      hostName: hostName
    })
    return () => {
      dispatch({
        type: UNREGISTER_HOST,
        hostName: hostName
      })
    }
  }, [])

  const addPortal = useCallback((name, children) => {
    dispatch({
      type: ADD_PORTAL,
      hostName: hostName,
      name: name,
      node: children
    })
  }, [dispatch])

  const updatePortal = useCallback((name, children) => {
    dispatch({
      type: UPDATE_PORTAL,
      hostName: hostName,
      name: name,
      node: children
    })
  }, [])

  const removePortal = useCallback((name) => {
    dispatch({
      type: UNMOUNT_PORTAL,
      hostName: hostName,
      name: name,
    })
  }, [])

  useImperativeHandle(ref, () => {
    return {
      addPortal: addPortal,
      updatePortal: updatePortal,
      removePortal: removePortal

    }
  })

  // console.log("length", nodes.length)

  return (
    <>
      {/* {nodes.map((_item) => _item.node)} */}
      {
        nodes.map((_item) => {
          const currentNode = React.cloneElement(_item.node, { key: _item.name})
          return currentNode
        })
      }
    </>
  )
})

export default React.memo(PortalHost);