import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import NavbarNotification from "../components/NavbarNotification";
import NavbarProfile from "../components/NavbarProfile";

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    backgroundColor: theme.darkPurple,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 60,
    padding: "0 20px",
  },
  navbarLink: {
    margin: 25,
    color: "white",
    textDecoration: "none",
    ...theme.typography,
  },
  buttonRoot: {
    background: "transparent",
    height: 40,
    borderRadius: 50,
    border: 1,
    borderColor: theme.turquoise,
    borderStyle: "solid",
    margin: 25,
    padding: "0 15px",
  },
  buttonLabel: {
    ...theme.typography,
    textTransform: "capitalize",
    color: theme.turquoise,
    "&:visited": {
      textDecoration: "none",
    },
    "$:active": {
      color: "#0000FF",
    },
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div class={classes.navbarContainer}>
      <NavLink exact to="/reviews" className={classes.navbarLink}>
        Reviews
      </NavLink>
      <NavLink exact to="/balance" className={classes.navbarLink}>
        Balance
      </NavLink>
      <NavbarNotification />

      <NavLink exact to="/upload">
        <Button
          classes={{
            root: classes.buttonRoot,
            label: classes.buttonLabel,
          }}
        >
          Upload Code
        </Button>
      </NavLink>
      <NavLink exact to="/profile">
        <NavbarProfile />
      </NavLink>
    </div>
  );
};

export default NavBar;
