import React, { useContext } from 'react';
import { View } from 'react-native';
import { PortalStateContext, PortalDispatchContext } from './portalContext';

const PortalHost = () => {
  const state = useContext(PortalStateContext)

  return (
    <View />
  )
}

export default PortalHost;