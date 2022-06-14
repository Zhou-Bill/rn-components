import React, { useContext, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { REGISTER_HOST, UNREGISTER_HOST } from '../../constants';
import { PortalStateContext, PortalDispatchContext } from './portalContext';

interface PortalHostProps {
  hostName: string;
}

const PortalHost: React.FC<PortalHostProps> = (props: PortalHostProps) => {
  const { hostName = 'rootHost' } = props;
  const state = useContext(PortalStateContext)
  const dispatch = useContext(PortalDispatchContext);
  const nodes = useMemo(() => state[hostName], [])

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
  
  return (
    <>
      {nodes.map((_item) => _item.node)}
    </>
  )
}

export default PortalHost;