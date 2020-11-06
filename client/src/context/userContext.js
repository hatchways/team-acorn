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
  image: "http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png",
  hasNewNotification: false,
  notifications: [],
  reviewee_reviews: "",
  reviewer_reviews: "",
  update: false,
  messageUpdate: "",
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
          rating: action.payload.rating ? action.payload.rating : 0,
        };
      }
      case "storeUserExperience": {
        return { ...state, ...state.user, ...{ experience: action.payload } };
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
      case "setHasNewNotification": {
        return {
          ...state,
          ...{ hasNewNotification: action.payload },
          notifications: [...state.notifications, ...[action.payload]],
        };
      }
      case "clearHasNewNotification": {
        return {
          ...state,
          ...{ hasNewNotification: false },
        };
      }
      case "review": {
        return {
          ...state,
          ...action.payload,
        };
      }
      case "update": {
        return {
          ...state,
          update: !state.update,
        };
      }
      case "update_balance": {
        return {
          ...state,
          balance: action.payload,
        };
      }
      case "messageUpdate": {
        return {
          ...state,
          messageUpdate: action.payload,
        };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { UserContext, UserProvider };
