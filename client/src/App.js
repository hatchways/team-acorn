import React, { createContext, useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { theme } from "./themes/theme";
import ReviewsPage from "./pages/Reviews";
import BalancePage from "./pages/Balance";
import UploadCodePage from "./pages/UplodeCode";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OnboardingExperience from "./pages/OnboardingExperience";

import NavBar from "./components/navigation/NavBar";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(false);
  // const [user, setUser] = useState(localStorage.getItem("Token") != null);
  //Need To Fetch user Data and setUser Here. User info will be avalable in all children of Context.Provider
  // raw context created for testing intergration of FE/BE
  // Future will be in seperate file with reducers
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();
  useEffect(() => {
    fetch("/user", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.user && !data.error) {
          setIsLogged(true);
          history.push("/");
        } else {
          // clears the localstorage token if token is invalid or expires
          localStorage.removeItem("token");
        }
      })
      .catch((er) => console.log(er));
    // eslint-disable-next-line
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <UserContext.Provider value={{ isLogged, setIsLogged }}>
            {isLogged ? <AuthStack /> : <DefaultStack />}
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
const DefaultStack = () => (
  <Switch>
    <Route exact path="/" component={SignUp} />
    <Route exact path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="*" component={SignUp} />
  </Switch>
);

const AuthStack = () => (
  <>
    <NavBar />
    <Switch>
      <Route path="/onboard" component={OnboardingExperience} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/balance" component={BalancePage} />
      <Route path="/upload" component={UploadCodePage} />
      <Route path="*" component={OnboardingExperience} />
    </Switch>
  </>
);

export default App;
