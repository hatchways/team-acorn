import React, { useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  Grid,
  makeStyles,
  TextField,
  Typography,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Editor from "for-editor";
import { languages } from "../utils/Constants";
import Snackbar from "./SnackbarComponent";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    background: "transparent",
    height: 40,
    borderRadius: 50,
    border: 1,
    borderColor: theme.turquoise,
    borderStyle: "solid",
    margin: 25,
    padding: "0 15px",
  },
  buttonLabel: {
    ...theme.typography,
    textTransform: "capitalize",
    color: theme.turquoise,
  },
  paper: {
    borderRadius: 15,
    padding: "18px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "75vh",
      height: "auto",
      padding: "30px 15px",
      width: "100vw",
      margin: "-0.05rem",
    },

    [theme.breakpoints.up("sm")]: {
      minHeight: 300,
      maxWidth: 600,
      padding: "2rem",
      margin: "10vh auto",
    },
  },
  closeButton: {
    color: theme.turquoise,
    fontWeight: 700,
    cursor: "pointer",
    position: "absolute",
    top: 30,
    right: 25,
    "&:hover": {
      color: "tomato",
    },
  },
  mainHeading: {
    margin: "0 1rem 3rem 1rem",
    fontWeight: 700,
    fontFamily: "Roboto",
  },
  submitButton: {
    backgroundColor: theme.turquoise,
    color: "#fff",
    borderRadius: 50,
    width: "175px",
    padding: "1rem",
    margin: "2rem",
  },
  submitButtonWrapper: {
    textAlign: "center",
  },
  codeStyling: {
    border: "1 solid grey",
    borderRadius: 5,
    backgroundColor: "black",
    color: "white",
    padding: "1rem",
  },
  input: {
    width: "100%",
    lineHeight: 2,
    marginBottom: "1rem",
    fontWeight: 600,
  },
  select: {
    border: 0,
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const UploadCodeDialog = ({ open, setOpen, form, setForm }) => {
  const { title, code, language } = form; // destructuring the form object for easy use.
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  // backdrop state
  const [backdrop, setBackdrop] = React.useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });

  // languages list
  const languages_list = useMemo(
    () =>
      languages.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      )),
    []
  );

  // Dialog handlers
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handle title and language select
  const handleCodeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle editor input only
  const handleEditor = (e) => {
    const value = e;
    setForm((prev) => {
      return {
        ...prev,
        code: value,
      };
    });
  };

  // Onsubmit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || code === "") {
      setSnackbar({
        open: true,
        message: "Please enter all fields.",
        error: true,
      });
    } else {
      setBackdrop(true);
      const response = await fetch("/new_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          code,
          language,
        }),
      });
      setBackdrop(false);
      setRedirect(true);
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.message);
        setOpen(false);
      }
    }
  };

  // side effect to navigate to reviews page
  useEffect(() => {
    if (redirect) {
      history.push("/reviews");
      setOpen(false);
    }
    //eslint-disable-next-line
  }, [redirect]);

  return (
    <div>
      <Button
        classes={{
          root: classes.buttonRoot,
          label: classes.buttonLabel,
        }}
        onClick={handleOpen}
      >
        Upload Code
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <CloseIcon
          className={classes.closeButton}
          onClick={handleClose}
          fontSize="large"
        >
          X
        </CloseIcon>
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          setOpen={setSnackbar}
          error={snackbar.error}
        />
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography
          className={classes.mainHeading}
          variant="h5"
          align="center"
          display="block"
        >
          Request a code review
        </Typography>
        <form action="" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={7} classes={{ root: classes.input }}>
              Title:
              <TextField
                variant="outlined"
                value={title}
                onChange={handleCodeForm}
                autoComplete="off"
                name="title"
                className={`${classes.textFieldStyling} ${classes.input}`}
                inputProps={{
                  style: {
                    height: 3,
                    fontWeight: 700,
                  },
                }}
              />
            </Grid>
            <Grid item xs={5} classes={{ root: classes.input }}>
              Language:
              <TextField
                select
                value={language}
                name="language"
                onChange={handleCodeForm}
                variant="outlined"
                className={classes.input}
                SelectProps={{
                  native: true,
                  style: {
                    fontSize: 18,
                    height: 40,
                    fontWeight: 700,
                  },
                }}
              >
                {languages_list}
              </TextField>
            </Grid>
          </Grid>
          <Editor
            value={code}
            toolbar={{
              h1: true,
              h2: true,
              h3: true,
              h4: true,
              link: true,
              code: true,
              preview: true,
              expand: true,
              lineNum: true,
            }}
            language="en"
            placeholder=" "
            height="300px"
            onChange={handleEditor}
          />
          <div className={classes.submitButtonWrapper}>
            <Button
              variant="contained"
              className={classes.submitButton}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default UploadCodeDialog;
