import React, { useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements,
} from "react-stripe-elements";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    fontWeight: 100,
    textTransform: "capitalize",
    fontSize: "1.2rem",
  },
  wrapper: {
    textAlign: "center",
  },
  input: {
    width: "70%",
    margin: "0 15%",
  },
  expiryInput: {
    width: "60%",
    margin: "0 30%",
  },
  label: {
    display: "flex",
    color: "#000",
    fontWeight: 700,
    padding: "5px",
    marginLeft: "15%",
  },
  expiryLabel: {
    display: "flex",
    color: "#000",
    fontWeight: 700,
    padding: "5px",
    marginLeft: "30%",
  },
  cvvLabel: {
    display: "flex",
    color: "#000",
    fontWeight: 700,
    padding: "5px",
    marginLeft: "10%",
  },
  cvvInput: {
    width: "60%",
    marginLeft: "10%",
  },
}));

const _SplitFieldsForm = ({ stripe, topup }) => {
  const [state, setState] = useState({ errorMessage: "" });
  const classes = useStyles();
  const history = useHistory();
  const handleChange = ({ error }) => {
    if (error) {
      setState({ errorMessage: error.message });
      console.log(state);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stripe) {
      stripe.createToken().then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
          fetch("/charge", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ token: result.token, credits: topup }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message) {
                history.go(0);
              } else {
                console.log(data);
              }
            })
            .catch((err) => console.log(err));
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <div className={classes.wrapper}>
          <Typography
            className={classes.mainHeading}
            variant="h4"
            align="center"
            display="block"
          >
            Checkout
          </Typography>
          <label className={classes.label}>Card number</label>
          <CardNumberElement
            className={classes.input}
            onChange={handleChange}
          />
          <Grid container>
            <Grid item container xs={6} direction="column">
              <label className={classes.expiryLabel}>Expiry date</label>
              <CardExpiryElement
                className={classes.expiryInput}
                onChange={handleChange}
              />
            </Grid>
            <Grid item container xs={6} direction="column">
              <label className={classes.cvvLabel}>CVC</label>
              <CardCVCElement
                className={classes.cvvInput}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            className={classes.submitButton}
          >
            Pay ${topup * 10}
          </Button>
        </div>
      </Grid>
    </form>
  );
};

const SplitFieldsForm = injectStripe(_SplitFieldsForm);

const SplitFieldsDemo = ({ stripePublicKey, topup }) => {
  return (
    <StripeProvider apiKey={stripePublicKey}>
      <Elements>
        <SplitFieldsForm topup={topup} />
      </Elements>
    </StripeProvider>
  );
};

export default SplitFieldsDemo;
