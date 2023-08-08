import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    brand: {
      main: "#22c55e",
      contrastText: "#FFF", // Set foreground text color to white
    },
    brandLight: {
      main: "#4ade80",
      contrastText: "#16a34a",
    },
    faded: {
      main: "#94a3b8",
      contrastText: "#334155",
    },
  },
});

export default theme;
