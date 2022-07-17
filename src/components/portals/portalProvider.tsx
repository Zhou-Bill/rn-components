import React, { useReducer } from 'react';
import { INITIAL_STATE } from '../../constants';
import { PortalDispatchContext, PortalStateContext } from './portalContext';
import PortalHost, { PortalHostRef } from './portalHost';
import reducer from './reducer';

export const portalHostRef = React.createRef<PortalHostRef>();

const PortalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { children } = props;

  return (
    <PortalDispatchContext.Provider value={dispatch}>
      <PortalStateContext.Provider value={state}>
        {children}
        <>
          <PortalHost ref={portalHostRef} />
        </>
      </PortalStateContext.Provider>
    </PortalDispatchContext.Provider>
  )
}

export default PortalProvider