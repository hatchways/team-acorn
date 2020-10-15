import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import NavbarLink from "../components/NavbarLink";
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
  },
  navlinkButton: {
    "&:active": {
      textDecoration: "none",
    },
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div class={classes.navbarContainer}>
      <NavbarLink path={"/reviews"} text={"Reviews"} />
      <NavbarLink path={"/balance"} text={"Balance"} />
      <NavbarNotification />

      <NavbarLink path={"/upload"}>
        <Button
          classes={{
            root: classes.buttonRoot,
            label: classes.buttonLabel,
          }}
        >
          Upload Code
        </Button>
      </NavbarLink>
      <NavbarProfile />
    </div>
  );
};

export default NavBar;
