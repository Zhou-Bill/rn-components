import React, { useReducer } from 'react';
import { INITIAL_STATE } from '../../constants';
import { PortalDispatchContext, PortalStateContext } from './portalContext';
import reducer from './reducer';

const PortalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { children } = props;

  return (
    <PortalDispatchContext.Provider value={dispatch}>
      <PortalStateContext.Provider value={state}>
        {children}
        
      </PortalStateContext.Provider>
    </PortalDispatchContext.Provider>
  )
}

export default PortalProvider