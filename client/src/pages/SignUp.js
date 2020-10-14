import React, { useState, useMemo } from "react";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";

// Signup experience level dropdown options
const experienceOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Junior", label: "Junior" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Senior", label: "Senior" },
];

const SignUp = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js

  const experience_list = useMemo(
    () =>
      experienceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    []
  ); // memoization of options to save some computations on re-render

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: experienceOptions[0].value,
  });

  const [step, setStep] = useState("first"); // SignUp form has 2 steps, this triggers 2nd after first submission

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (step === "first") {
      if (form.password === form.confirmPassword) setStep((prev) => "last");
      else setError(true);
    } else {
      // Implement API call to send data to flask backend :: reminder
      alert(
        `name: ${form.name}\n email: ${form.email} \n password: ${form.password}\n re-password: ${form.password}\n experience: ${form.experience}`
      );
    }
  };
  return (
    <>
      <form action="" method="POST" autoComplete="off" onSubmit={handleLogin}>
        {/* First step of SignUp */}
        {step === "first" ? (
          <Grid container direction="column" className={classes.container}>
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
              className={classes.loginButon}
              type="submit"
            >
              Continue
            </Button>
            <Typography variant="body1" className={classes.bottomQuestion}>
              Already have an account? <Link href="/signin">Login</Link>
            </Typography>
          </Grid>
        ) : (
          // Second Step of SignUp
          <Grid container direction="column" className={classes.container}>
            <Typography
              className={classes.mainHeading}
              variant="h4"
              align="center"
              display="block"
            >
              Your experience:
            </Typography>
            <TextField
              select
              value={form.experience}
              name="experience"
              onChange={handleFormInput}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              className={classes.input}
            >
              {experience_list}
            </TextField>
            <Button
              variant="contained"
              className={classes.loginButon}
              type="submit"
            >
              Get Started
            </Button>
            <Typography variant="body1" className={classes.bottomQuestion}>
              Already have an account? <Link href="/signin">Login</Link>
            </Typography>
          </Grid>
        )}
      </form>
    </>
  );
};

export default SignUp;
