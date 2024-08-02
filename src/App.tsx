// import { useState } from "react";

import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Layout from "./components/Layout/Layout";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
       
        <Layout/>
      </ThemeProvider>
    </>
  );
}

export default App;
