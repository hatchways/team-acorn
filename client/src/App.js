import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import ReviewsPage from "./pages/Reviews";
import BalancePage from "./pages/Balance";
import UploadCodePage from "./pages/UplodeCode";

import "./App.css";

import NavBar from "./navigation/NavBar";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Route path="/" component={LandingPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/balance" component={BalancePage} />
        <Route path="/upload" component={UploadCodePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
