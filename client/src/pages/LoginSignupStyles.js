import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      minHeight: "100vh",
      height: "auto",
    },
    background: "white",
    margin: "0px auto",
    padding: "2rem 0",
    [theme.breakpoints.up("sm")]: {
      minHeight: 300,
      width: 500,
      border: "1 solid black",
      borderRadius: 15,
      padding: "5rem",
      margin: "10vh auto",
    },
  },
  mainHeading: {
    margin: "0 1rem 3rem 1rem",
    fontWeight: 700,
    fontFamily: "Roboto",
  },
  input: {
    margin: "0.4rem",
  },
  forgetPassword: {
    color: "gray",
    fontSize: 14,
    marginRight: 15,
    marginLeft: -60,
  },
  loginButton: {
    backgroundColor: theme.turquoise,
    color: "#fff",
    borderRadius: 50,
    width: 175,
    padding: "1rem",
    margin: "2rem auto",
  },
  bottomQuestion: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: "2rem",
  },
  experienceRowText: {
    display: "inline-flex",
    flex: 0,
    fontWeight: "bold",
    marginLeft: 10,
  },
  experienceRowContainer: {
    margin: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    display: "flex",
    marginBottom: 10,
  },
  buttonAddRoot: {
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "transparent",
    },
  },
  addButtonText: {
    color: theme.turquoise,
    fontWeight: "bold",
    borderWidth: 0,
    marginLeft: 20,
  },
  buttonAddIcon: {
    color: theme.turquoise,
  },
  buttonDeleteRoot: {
    borderRadius: 50,
    backgroundColor: "rgba(255,0,0,0.1)",
    minWidth: 0,
    height: 30,
    width: 30,
  },
  expPickerContainer: {
    margin: 30,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  buttonDeleteIcon: {
    color: "red",
  },
  dropDown: {
    width: 100,
    marginLeft: 10,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    color: theme.purple,
    fontWeight: "bold",
    "&:focus": {
      backgroundColor: "transparent",
      borderColor: "rgba(0,0,0,0.3)",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 5,
    },
  },
  dropDownText: {
    marginLeft: 10,
    color: theme.purple,
    fontWeight: "bold",
    borderWidth: 0,
  },
  balance: {
    color: "#6E3ADB",
    fontWeight: 700,
    marginTop: "-2rem",
    marginBottom: "2rem",
  },
  topup: {
    fontWeight: 700,
    margin: "1rem",
  },
  topupButton: {
    color: "#6E3ADB",
    backgroundColor: "#E3EAFC",
    cursor: "pointer",
    borderRadius: 10,
    width: "2rem",
    height: "2rem",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "0.5rem",
    "&:hover": {
      color: "#E3EAFC",
      backgroundColor: "#6E3ADB",
    },
    userSelect: "none",
  },
}));

export default useStyles;
