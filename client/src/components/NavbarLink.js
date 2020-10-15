import React from "react";

import { NavLink } from "react-router-dom";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  navlinkLabel: {
    color: "white",
    ...theme.typography,
    textTransform: "capitalize",
  },
  navlinkRoot: {
    margin: 20,
  },
}));
const NavbarLink = ({ path, text }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <NavLink exact to={path}>
      <Button
        disableRipple={true}
        classes={{
          root: classes.navlinkRoot,
          label: classes.navlinkLabel,
        }}
      >
        {text}
      </Button>
    </NavLink>
  );
};

export default NavbarLink;
