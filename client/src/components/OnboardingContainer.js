import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -999,
    width: "100%",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      minHeight: "100vh",
      background: "linear-gradient(#788be0, #6e3bdb)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
  },
  paper: {
    display: "flex",
    borderRadius: 15,
    padding: "5rem",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 36px)",
      height: "auto",
    },
  },
}));

const OnboardingContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper elevation="10" className={classes.paper}>
        {props.children}
      </Paper>
    </div>
  );
};

export default OnboardingContainer;
