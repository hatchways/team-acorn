import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import useStyles from "./LoginSignupStyles";
import OnboardingContainer from "../components/OnboardingContainer";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

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
      fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // handle error if we recieve error from server
          } else {
            // clear form
            setForm({ email: "", password: "", name: "", confirmPassword: "" });
            // Saving token in localStorage
            localStorage.setItem("Token", data.token);
            // Redirect user to Home page..
            history.push("/onboard");
          }
        })
        .catch((err) => console.log(err));
      alert(
        `name: ${form.name}\n email: ${form.email} \n password: ${form.password}\n re-password: ${form.password}`
      );
    }
  };
  return (
    <>
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
