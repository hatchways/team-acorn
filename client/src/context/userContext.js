import React, { createContext, useReducer } from "react";

const initialState = { update_info: false };
const UserContext = createContext(initialState);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "storeUserInfo": {
        return { ...state, ...action.payload };
      }
      case "storeUserExperience": {
        return { ...state, ...{ experience: action.payload } };
      }
      case "logout": {
        return { ...initialState };
      }
      case "update_info": {
        return { ...state, ...{ update_info: !state.update_info } };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { UserContext, UserProvider };
