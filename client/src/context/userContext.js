import React, { createContext, useReducer } from "react";
import { languages } from "../utils/Constants";

const buildInitExp = () => {
  let tempObj = {};
  languages.forEach((lang) => {
    tempObj[lang] = null;
  });
  return tempObj;
};
const initialState = {
  experience: buildInitExp(),
  image:
    "http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png",
};
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
          image: action.payload.image ? action.payload.image : state.image,
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
