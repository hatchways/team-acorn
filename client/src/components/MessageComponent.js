import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Editor from "for-editor";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "100%",
    },
  },
  input: { ...theme.inputPlaceholder },
}));

export default function MultilineTextFields({ review_id, value, setValue }) {
  const handleChange = (event) => {
    setValue(event);
  };
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.length !== 0) {
      fetch("/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          review_id,
          message: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // handle error if we receive error from server
            alert(data.error);
          } else {
            setValue("");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Message can't be empty");
    }
  };
  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Editor
        value={value}
        toolbar={{
          lineNum: true,
          preview: true,
          h1: true,
          h2: true,
          h3: true,
          h4: true,
          code: true,
          undo: true,
          redo: true,
        }}
        language="en"
        placeholder=" "
        height={value.length > 100 ? "300px" : "150px"}
        onChange={handleChange}
        style={{
          marginBottom: "1rem",
        }}
      />

      <Button
        style={{ display: "flex", margin: "1rem 0 1rem auto" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </form>
  );
}
