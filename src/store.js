import { createStore } from 'redux'
import React, {createContext, useContext, useMemo, useState} from "react";

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
//
// function Store() {
//   const context = createContext();
//
//   // We need to give the provider a way to take the initial state so that every
//   // time we have a different piece of state we can give it the initial value
//
//   const Provider = ({ children, initialState = {} }) => {
//     const [state, setState] = useState(initialState);
//
//     // Seen useReducer here -- but adds complexity that may not be needed
//     const contextValue = useMemo(() => [state, setState], [state]);
//
//     return <context.Provider value={contextValue}>{children}</context.Provider>
//   }
//
//   const useStore = () => useContext(context);
//
//   return{
//     Provider,
//     useStore,
//     store
//   }
// }
//
// const AppStore = Store();
//
// export default AppStore;
