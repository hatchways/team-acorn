import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    zIndex: -999,
    width: "100%",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      minHeight: "calc(100% - 60px)",
      backgroundColor: "#ECF0FA",
    },
  },
  paper: {
    borderRadius: 7,
    marginTop: "10rem",
    padding: "3rem 0",
    [theme.breakpoints.up("md")]: {
      minWidth: 650,
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(75vh - 36px - 60px)",
      height: "auto",
      margin: "1rem",
      width: "100%",
    },
  },
}));

const LoginSignupContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {props.hasOwnProperty("containerOnly") ? (
        props.children
      ) : (
        <Paper elevation={10} className={classes.paper}>
          {props.children}
        </Paper>
      )}
    </div>
  );
};

export default LoginSignupContainer;
