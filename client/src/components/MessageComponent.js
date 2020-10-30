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
export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event);
  };

  const handleSubmit = (event) => {
    const id = 3; //placeholder id
    event.preventDefault();
    console.log("inside handleSubmit");
    console.log(value);

    fetch("/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        review_id: id,
        message: value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we recieve error from server
          alert(data.error);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
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
          code: true,
        }}
        language="en"
        placeholder=" "
        height="150px"
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
