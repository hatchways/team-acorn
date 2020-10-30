import React, { createContext, useReducer } from "react";

const initialState = {};
const UserContext = createContext(initialState);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "storeUserInfo": {
        return { ...action.payload };
      }
      case "storeUserExperience": {
        return { ...state, ...{ experience: action.payload } };
      }
      case "updateProfileImage": {
        return { ...state, ...{ image: action.payload } };
      }
      case "logout": {
        return { ...initialState };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { UserContext, UserProvider };
