import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { ADD_PORTAL, UNMOUNT_PORTAL, UPDATE_PORTAL } from '../../constants';
import { PortalDispatchContext } from './portalContext';

export interface PortalProps {
  hostName?: string,
  name?: string,
  children: ReactNode,
  onMount?: (cb: () => void) => void,
  onUnmount?: (cb: () => void) => void,
  onUpdate?: (cb: () => void) => void,
}

const generateKey = (length: number): string => {
  const str = Math.random().toString();
  const [, result] = str.split(".");
  return result.slice(0, length) 
}

const Portal: React.FC<PortalProps> = (props: PortalProps) => {
  const { hostName = 'rootHost', name, onMount, onUnmount, onUpdate, children } = props;;
  const dispatch = useContext(PortalDispatchContext);
  const primaryKey = useMemo(() => name || generateKey(6), [name])

  const handleOnMountRef = useRef<Function>(null);
  const handleOnUnMountRef = useRef<Function>(null);
  const handleOnUpdateRef = useRef<Function>(null);

  const addPortal = useCallback((name, children) => {
    dispatch({
      type: ADD_PORTAL,
      hostName: hostName,
      name: name,
      node: children
    })
  }, [dispatch])

  const unMountPortal = useCallback((name) => {
    dispatch({
      type: UNMOUNT_PORTAL,
      hostName: hostName,
      name: name
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

  const handleOnMount = useCallback(() => {
    if (onMount) {
      onMount(() => addPortal(primaryKey, children));
    } else {
      addPortal(primaryKey, children);
    }
  }, [primaryKey, onMount, addPortal]);
  handleOnMountRef.current = handleOnMount;

  const handleOnUnMount = useCallback(() => {
    console.log("onUnmount")
    if (onUnmount) {
      onUnmount(() => unMountPortal(primaryKey));
    } else {
      unMountPortal(primaryKey);
    }
  }, [unMountPortal, primaryKey, onUnmount])
  handleOnUnMountRef.current = handleOnUnMount;

  const handleUpdatePortal = useCallback(() => {
    if (onUpdate) {
      onUpdate(() => updatePortal(primaryKey, children));
    } else {
      updatePortal(primaryKey, children);
    }
  }, [primaryKey, children, onUpdate, updatePortal])
  handleOnUpdateRef.current = handleUpdatePortal

  useEffect(() => {
    handleOnMountRef.current?.();

    return () => {
      handleOnUnMountRef.current?.()

      handleOnMountRef.current = null;
      handleOnUnMountRef.current = null;
      handleOnUpdateRef.current = null;
    }
  }, [])
  
  useEffect(() => {
    handleOnUpdateRef.current?.();
  }, [children])

  return null
}

export default Portal;