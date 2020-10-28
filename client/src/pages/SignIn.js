import React, { useState, useEffect, useContext } from "react";
// MUI imports
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Link,
  Button,
} from "@material-ui/core";
import useStyles from "./LoginSignupStyles";
import OnboardingContainer from "../components/OnboardingContainer";
// Router imports
import { useLocation } from "react-router-dom";
// Snackbar
import Snackbar from "../components/SnackbarComponent";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const location = useLocation(); // useLocation hook from router-dom

  useEffect(() => {
    if (location.state) setSnackbar(location.state);
    window.history.replaceState(null, document.title, "/signin");
    // eslint-disable-next-line
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //  Event Handler functions

  const handleFormInput = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; // Controlled form inputs implemented here

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we recieve error from server
          // clear form
          setForm({ email: "", password: "" });
          // Display snackbar
          setSnackbar({
            open: true,
            message: data.error,
            error: true,
          });
        } else {
          // Saving token in localStorage
          localStorage.setItem("token", data.access_token);
          dispatch({
            type: "storeUserInfo",
            payload: { ...data, ...{ name: data.full_name } },
          });
        }
      })
      .catch((err) => console.log(err));
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
        <form action="" onSubmit={handleLogin} method="POST" autoComplete="off">
          <Grid container direction="column">
            <Typography
              className={classes.mainHeading}
              variant="h4"
              align="center"
              display="block"
            >
              Welcome back!
            </Typography>
            <FormControl>
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
                inputProps={{ minLength: 6 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <Link
                        href="#"
                        variant="caption"
                        className={classes.forgetPassword}
                      >
                        Forget?
                      </Link>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </FormControl>
            <Button
              variant="contained"
              className={classes.loginButton}
              type="submit"
            >
              Login
            </Button>
            <Typography variant="body1" className={classes.bottomQuestion}>
              Don't have an account? <Link href="/signup">Create</Link>
            </Typography>
          </Grid>
        </form>
      </OnboardingContainer>
    </>
  );
};

export default SignIn;
