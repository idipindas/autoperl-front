// import { useState } from "react";

import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import Layout from "./components/Layout/Layout";
import AppRouter from "./routes/AppRouter";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
