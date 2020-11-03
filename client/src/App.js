import React, { useState, useEffect, useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { theme } from "./themes/theme";
import ReviewsPage from "./pages/Reviews";
import BalancePage from "./pages/Balance";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/Profile";
import OnboardingExperience from "./pages/OnboardingExperience";

import NavBar from "./components/navigation/NavBar";

const fetchUserData = ({ token, dispatch, setIsFetchingUser }) => {
  if (token) {
    fetch("/user", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.user && !data.error) {
          dispatch({
            type: "storeUserInfo",
            payload: { ...data.user, ...{ name: data.user.full_name } },
          });
        } else {
          dispatch({
            type: "storeUserInfo",
            payload: {},
          });
          // clears the localstorage token if token is invalid or expires
          localStorage.removeItem("token");
        }
        setIsFetchingUser(false);
      })
      .catch((er) => console.log(er));
    // eslint-disable-next-line
  } else {
    setIsFetchingUser(false);
  }
};
function App() {
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const userData = userContext.state;
  const { update_info } = userContext.state;
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchUserData({ token, dispatch, setIsFetchingUser });
    // eslint-disable-next-line
  }, [isFetchingUser, update_info]);

  if (!isFetchingUser) {
    return (
      <MuiThemeProvider theme={theme}>
        {token ? (
          <AuthStack experience={userData.experience} />
        ) : (
          <DefaultStack />
        )}
      </MuiThemeProvider>
    );
  } else {
    return null;
  }
}
const DefaultStack = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/" component={SignUp} />
      <Route path="/*" component={SignUp} />
    </Switch>
  );
};

const AuthStack = ({ experience }) => {
  const hasExperience = (experience) => {
    let ans = false;
    Object.values(experience).forEach((value) => {
      if (value != null) {
        ans = true;
      }
    });

    return ans;
  };
  return (
    <>
      {hasExperience(experience) && <NavBar />}
      <Switch>
        <Route exact path="/onboard" component={OnboardingExperience} />
        <Route exact path="/reviews" component={ReviewsPage} />
        <Route exact path="/balance" component={BalancePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route
          exact
          path="/*"
          component={
            !hasExperience(experience) ? OnboardingExperience : ReviewsPage
          }
        />
      </Switch>
    </>
  );
};

export default App;
