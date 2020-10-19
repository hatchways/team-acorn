import React, { createContext, useReducer } from "react";

const initialState = {};
const UserContext = createContext(initialState);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "storeUserInfo": {
        return { user: { ...action.payload } };
      }
      case "sotreUserExperience": {
        return { ...state, ...state.user, ...{ experience: action.payload } };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { UserContext, UserProvider };
