import React, { useState, useMemo } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, makeStyles, TextField, Typography } from "@material-ui/core";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

//modes ==> tells the codemirror library about the kind of
//file we are opening so that respective syntax highlighting can be achieved.

const modes = [
  { label: "JavaScript", value: "jsx" },
  { label: "CSS", value: "css" },
  { label: "JAVA", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "c++" },
  { label: "C#", value: "csharp" },
  { label: "Python", value: "python" },
  { label: "HTML", value: "html" },
];

const useStyles = makeStyles((theme) => ({
  buttonColor: {
    borderColor: theme.focusColor,
    color: theme.focusColor,
    borderRadius: 25,
    boxShadow: `1px solid ${theme.focusColor}`,
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
      width: 400,
      padding: "2rem",
      margin: "10vh auto",
    },
  },
  closeButton: {
    color: theme.focusColor,
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    position: "absolute",
    top: 5,
    right: 25,
    "&:hover": {
      color: "tomato",
    },
  },
  mainHeading: {
    margin: "0 1rem 3rem 1rem",
    fontWeight: 500,
    fontFamily: "Roboto",
  },
  submitButton: {
    backgroundColor: theme.focusColor,
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
    overflow: "auto auto",
    maxHeight: 250,
    overflowX: "auto",
  },
  commentDiv: {
    wordWrap: "break-word",
  },
  textFieldStyling: {
    width: "100%",
  },
}));

export default function UploadCodeDailog() {
  const classes = useStyles();

  // Modal/Dailog states & friends
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setForm({
      code: "",
      comment: "",
    });
    setOpen(false);
  };

  // form states and controlled inputs
  const [form, setForm] = React.useState({
    code: "const exp = `Hello World`;",
    comment: "",
  });
  const { code, comment } = form; // destructuring the form object for easy use.

  const handleCodeForm = (e) => {
    if (e.target) {
      const name = e.target.name;
      const value = e.target.value;
      setForm((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else {
      const editorValue = e.getValue();
      setForm((prev) => {
        return {
          ...prev,
          code: editorValue,
        };
      });
    }
  };

  // Mode selection state & related functions
  const [mode, setMode] = useState("jsx");
  const mode_list = useMemo(
    () =>
      modes.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    []
  );
  const handleMode = (e) => {
    setMode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Some API calls to server to upload code and comment.
    alert(`${code.substr(0, 20)} + ${mode} + ${comment}`);
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.buttonColor}
        onClick={handleClickOpen}
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
        <div className={classes.closeButton} onClick={handleClose}>
          X
        </div>
        <Typography
          className={classes.mainHeading}
          variant="h4"
          align="center"
          display="block"
        >
          Upload code
        </Typography>
        <TextField
          select
          value={mode}
          name="mode"
          onChange={handleMode}
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          className={classes.input}
        >
          {mode_list}
        </TextField>
        <form action="" method="get" onSubmit={handleSubmit}>
          <CodeMirror
            value={code}
            height={400}
            name="code"
            onChange={handleCodeForm}
            options={{
              theme: "monokai",
              keyMap: "sublime",
              mode: mode,
            }}
          />
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={comment}
            placeholder="Write a comment or ask a question here..."
            onChange={handleCodeForm}
            name="comment"
            className={classes.textFieldStyling}
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
        <div className={classes.commentDiv}>
          <CodeMirror
            value={code}
            height={400}
            options={{
              theme: "monokai",
              keyMap: "sublime",
              mode: mode,
              readOnly: true,
            }}
          />
          {comment}
        </div>
      </Dialog>
    </div>
  );
}
