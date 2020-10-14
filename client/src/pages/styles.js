import { makeStyles, TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      minHeight: "100vh",
      height: TextareaAutosize,
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
  loginButon: {
    backgroundColor: "#43DDC1",
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
}));

export default useStyles;
