import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormInput = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; // Controlled form inputs implemented here

  const handleLogin = (e) => {
    e.preventDefault();
    alert("handleLogin triggered");
    fetch("/signin", {
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
        } else {
          // clear form
          setForm({ email: "", password: "" });
          // Saving token in localStorage
          localStorage.setItem("Token", data.token);
          // Redirect user to Home page..
          history.push("/onboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
