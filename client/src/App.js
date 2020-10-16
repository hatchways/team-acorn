import React, { createContext, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import ReviewsPage from "./pages/Reviews";
import BalancePage from "./pages/Balance";
import UploadCodePage from "./pages/UplodeCode";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OnboardingExperience from "./pages/OnboardingExperience";

import NavBar from "./components/navigation/NavBar";

const Context = createContext(null);
function App() {
  const [user, setUser] = useState(true);
  //Need To Fetch user Data and setUser Here. User info will be avalable in all children of Context.Provider

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {!user && AuthStack()}
          {user && (
            <Context.Provider value={{ user, setUser }}>
              <NavBar />
              {DefaultStack()}
            </Context.Provider>
          )}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
const AuthStack = () => (
  <Switch>
    <Route exact path="/" component={SignUp} />
    <Route exact path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/onboard" component={OnboardingExperience} />
    <Route path="*" component={SignUp} />
  </Switch>
);

const DefaultStack = () => (
  <Switch>
    <Route path="/reviews" component={ReviewsPage} />
    <Route path="/balance" component={BalancePage} />
    <Route path="/upload" component={UploadCodePage} />
  </Switch>
);

export default App;
