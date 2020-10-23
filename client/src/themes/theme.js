import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Avenir"',
  },
  primary: "#f04040",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6",
  darkPurple: "#501CBD",
  purple: "#6E3ADB",
  turquoise: "#43DDC1",
  yellow: "#F7B500",
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiInput: {
      input: {
        "&:active": {
          backgroundColor: "transparent",
        },
      },
    },
  },
});
