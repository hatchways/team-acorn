import React from "react";
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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/reviews" component={ReviewsPage} />
          <Route path="/balance" component={BalancePage} />
          <Route path="/upload" component={UploadCodePage} />
          <Route exact path="/" component={SignUp} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/onboard" component={OnboardingExperience} />
          <Route path="*" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
