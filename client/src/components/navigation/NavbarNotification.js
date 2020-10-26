import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
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
  notificationContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    outline: "none",
    display: "flex",
    flexDirection: "column",
  },
  notificationTitle: {
    ...theme.typography,
  },
  notificationTime: {
    color: "gray",
    fontSize: 13,
    marginTop: 5,
  },
}));

const NavbarNotification = () => {
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const { notifications } = userContext.state;
  const { userId } = userContext.state;
  const { hasNewNotification } = userContext.state;
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    subscribeToNotifications({
      callback: dispatch,
      userId: userId,
    });
  }, []);
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch({ type: "clearHasNewNotification" });
  };

  const handleClose = (option) => {
    if (option === "logout") {
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Button
        classes={{
          root: classes.buttonRoot,
        }}
        onClick={handleClick}
      >
        <NotificationsNoneIcon className={classes.icon} />
        {hasNewNotification && <div className={classes.newNotification} />}
      </Button>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((notification) => (
          <div class={classes.notificationContainer}>
            {/* {formatTime(notification.timeStamp)} */}
            <div>{notification.message}</div>
            <div class={classes.notificationTime}>
              {formatTime(notification.timeStamp)}
            </div>
          </div>
        ))}
      </Menu>
    </>
  );
};

var periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

function formatTime(timeCreated) {
  var diff = Date.now() - timeCreated;

  if (diff > periods.month) {
    // it was at least a month ago
    return Math.floor(diff / periods.month) + "m";
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + "w";
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + "d";
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + "h";
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + "m";
  }
  return "Just now";
}
export default NavbarNotification;
