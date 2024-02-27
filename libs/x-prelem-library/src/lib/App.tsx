import { Box } from "@mui/material";
import { PrelemTheme } from "@platformx/utilities";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import React from "react";
import "./App.css";
import ToastContainerHandle from "./components/ToastContainer/ToastContainerHandle";
// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

function App() {
  return (
    <div className='App'>
      <ToastContainerHandle />
      <ThemeProvider theme={PrelemTheme}>
        <Box sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}>
          <CssBaseline />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
