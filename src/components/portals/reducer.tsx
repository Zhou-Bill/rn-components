import { ReactNode } from "react";
import { ADD_PORTAL, REGISTER_HOST, UNMOUNT_PORTAL, UNREGISTER_HOST, UPDATE_PORTAL } from "../../constants";

type PortalType = {
  name: string,
  node: ReactNode
}

type RegisterHostType = {
  type: 'REGISTER_HOST',
  hostName: string,
}

type UnregisterHostType = {
  type: 'UNREGISTER_HOST'
  hostName: string,
}

type AddPortalType = {
  type: 'ADD_PORTAL',
  hostName: string,
  name: string,
  node: ReactNode
}

type UpdatePortalType = {
  type: 'UPDATE_PORTAL',
  hostName: string,
  name: string,
  node: ReactNode
}

type UnmountPortalType = {
  type: 'UNMOUNT_PORTAL',
  hostName: string,
  name: string,
}

type ReducerAction = UpdatePortalType 
  | UnmountPortalType & { node?: ReactNode  } 
  | AddPortalType
  | RegisterHostType & PortalType 
  | UnregisterHostType & PortalType;


const reducer = (state: Record<string, Array<PortalType>>, action: ReducerAction) => {
  const { type } = action;

  switch (type) {
    case REGISTER_HOST: {
      if (!(action.hostName in state)) {
        state[action.hostName] = [];
      }
      return {...state}
    }
    case UNREGISTER_HOST: {
      delete state[action.hostName];
      return {...state};
    }
    case ADD_PORTAL: {
      if (!(action.hostName in state)) {
        state[action.hostName] = [];
      }
      state[action.hostName].push({
        name: action.name,
        node: action.node,
      });
      return {...state};
    }
    case UPDATE_PORTAL: {
      if (!(action.hostName in state)) {
        state[action.hostName] = [];
      }
      const list = state[action.hostName];
      const index = list.findIndex((_item) => _item.name === action.name)
      if (index !== -1) {
        state[action.hostName][index] = {
          name: action.name,
          node: action.node
        }
      }
      return {...state};
    }
    case UNMOUNT_PORTAL: {
      if (!(action.hostName in state)) {
        return {...state}
      }
      const list = state[action.hostName].filter((_item) => _item.name !== action.name);
      state[action.hostName] = list;
      return {...state}
    }
    default: 
      return state
  }
}

export default reducer;