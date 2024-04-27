import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Roboto Mono", "monospace"].join(","),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
