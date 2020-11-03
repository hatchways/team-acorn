import React, { useState, useContext } from "react";
// MUI imports
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import { UserContext } from "../context/userContext";
import useStyles from "./LoginSignupStyles";
import OnboardingContainer from "../components/OnboardingContainer";
// Router imports
import { useHistory } from "react-router-dom";
// Snackbar
import Snackbar from "../components/SnackbarComponent";

const SignUp = () => {
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const history = useHistory(); // useHistory hook from router-dom
  // Local states..

  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  //  Event Handler functions

  const handleFormInput = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (form.password !== value) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === "password") {
      if (form.confirmPassword !== value && form.confirmPassword.length > 0) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }; // Controlled form inputs implemented here

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password === form.confirmPassword) {
      fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          password: form.password,
          experience: {},
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // handle error if we recieve error from server
            setSnackbar({
              open: true,
              message: data.error,
              error: true,
            });
          } else {
            // clear form
            setForm({ email: "", password: "", name: "", confirmPassword: "" });
            // Redirect user to Home page..
            // Saving token in localStorage
            localStorage.setItem("token", data.access_token);
            dispatch({
              type: "storeUserInfo",
              payload: {
                email: form.email,
                name: form.name,
                token: data.access_token,
                userId: data.userId,
              },
            });
            // Updating context
            // user.setIsLogged(true);
            // Redirect user to onboard page..
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        setOpen={setSnackbar}
        error={snackbar.error}
      />
      <OnboardingContainer>
        <form
          action=""
          method="POST"
          autoComplete="off"
          onSubmit={handleSignup}
        >
          <Grid container direction="column">
            <Typography
              className={classes.mainHeading}
              variant="h4"
              align="center"
              display="block"
            >
              Create an account
            </Typography>
            <FormControl>
              <TextField
                name="name"
                type="text"
                variant="outlined"
                placeholder={"Name"}
                className={classes.input}
                value={form.name}
                onChange={handleFormInput}
                required
              />
              <TextField
                name="email"
                type="email"
                variant="outlined"
                placeholder={"E-mail address"}
                className={classes.input}
                value={form.email}
                onChange={handleFormInput}
                required
              />
              <TextField
                name="password"
                variant="outlined"
                placeholder={"Password"}
                className={classes.input}
                type="password"
                value={form.password}
                onChange={handleFormInput}
                required
                inputProps={{ minLength: 6 }}
                error={error}
                helperText={error && "Password need to be matched !"}
              />
              <TextField
                name="confirmPassword"
                variant="outlined"
                placeholder={"Confirm Password"}
                className={classes.input}
                type="password"
                value={form.confirmPassword}
                onChange={handleFormInput}
                required
                inputProps={{ minLength: 6 }}
                error={error}
                helperText={error && "Password need to be matched !"}
              />
            </FormControl>
            <Button
              variant="contained"
              className={classes.loginButton}
              type="submit"
            >
              Continue
            </Button>
            <Typography variant="body1" className={classes.bottomQuestion}>
              Already have an account? <Link href="/signin">Login</Link>
            </Typography>
          </Grid>
        </form>
      </OnboardingContainer>
    </>
  );
};

export default SignUp;
