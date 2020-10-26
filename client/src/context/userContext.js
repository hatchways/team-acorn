import React, { createContext, useReducer } from "react";

const initialState = { hasNewNotification: false };
const UserContext = createContext(initialState);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "storeUserInfo": {
        return { ...state, ...action.payload };
      }
      case "storeUserExperience": {
        return { ...state, ...state.user, ...{ experience: action.payload } };
      }
      case "logout": {
        return { ...initialState };
      }
      case "setHasNewNotification": {
        return { ...state, ...{ hasNewNotification: action.payload } };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { UserContext, UserProvider };
