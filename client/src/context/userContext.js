import React, { createContext, useReducer } from "react";
import { languages } from "../utils/Constants";

const buildInitExp = () => {
  let tempObj = {};
  languages.forEach((lang) => {
    tempObj[lang] = null;
  });
  return tempObj;
};
const initialState = { experience: buildInitExp() };
const UserContext = createContext(initialState);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "storeUserInfo": {
        return {
          ...state,
          ...action.payload,
          experience: {
            ...state.experience,
            ...action.payload.experience,
          },
        };
      }
      case "storeUserExperience": {
        return { ...state, ...{ experience: action.payload } };
      }
      case "updateProfileImage": {
        return { ...state, ...{ image: action.payload } };
      }
      case "updateName": {
        return { ...state, ...{ name: action.payload } };
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
