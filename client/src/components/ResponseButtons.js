import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  responseButtonWrapper: {
    position: "absolute",
    top: 26,
    right: 45,
  },
  acceptButton: {
    backgroundColor: theme.turquoise,
    color: "#fff",
    borderRadius: 25,
    padding: "0.5rem 1rem",
    margin: "0 0.5rem",
  },
  rejectButton: {
    backgroundColor: theme.primary,
    color: "#fff",
    borderRadius: 25,
    padding: "0.5rem 1rem",
    margin: "0 0.5rem",
  },
}));

export default function ResponseButtons({ fn: setSelectedReview, review_id, dispatch }) {
  const classes = useStyles();
  const history = useHistory();
  const handleResponse = (e, option) => {
    fetch("/review_respond", {
      method: option === "accept" ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        review_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we receive error from server
          alert(data.error);
        } else {
          if(data.rejected){
            history.go();
          }
          else {
            setSelectedReview(prev => {
              return {
                ...prev,
                status: "in_review"
              }
            })
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.responseButtonWrapper}>
      {/*only show this when review hasn't been accepted yet */}
      <Button
        variant="contained"
        className={classes.acceptButton}
        onClick={(e) => handleResponse(e, "accept")}
      >
        <CheckIcon />
        Accept
      </Button>
      <Button
        variant="contained"
        className={classes.rejectButton}
        onClick={(e) => handleResponse(e, "reject")}
      >
        <ClearIcon />
        Reject
      </Button>
    </div>
  );
}
