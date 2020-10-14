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
import useStyles from "./styles";

const SignIn = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js

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
    return false;
    // Implement API call to send data to flask backend :: reminder
  };

  return (
    <>
      <form action="" onSubmit={handleLogin} method="POST" autoComplete="off">
        <Grid container direction="column" className={classes.container}>
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
            className={classes.loginButon}
            type="submit"
          >
            Login
          </Button>
          <Typography variant="body1" className={classes.bottomQuestion}>
            Don't have an account? <Link href="/signup">Create</Link>
          </Typography>
        </Grid>
      </form>
    </>
  );
};

export default SignIn;
