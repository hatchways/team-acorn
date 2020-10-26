import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Button from "@material-ui/core/Button";
import { subscribeToNotifications } from "../../utils/SocketConfig";
import { UserContext } from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.3)",
    minWidth: 0,
    height: 40,
    width: 40,
  },
  icon: { color: "white" },
  newNotification: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    backgroundColor: theme.turquoise,
    borderColor: theme.darkPurple,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 50,
  },
}));

const NavbarNotification = () => {
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const { userId } = userContext.state;
  const { hasNewNotification } = userContext.state;

  useEffect(() => {
    subscribeToNotifications({
      callback: dispatch,
      userId: userId,
    });
  }, []);
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Button
      classes={{
        root: classes.buttonRoot,
      }}
    >
      <NotificationsNoneIcon className={classes.icon} />
      {hasNewNotification && <div className={classes.newNotification} />}
    </Button>
  );
};
export default NavbarNotification;
