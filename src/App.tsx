import { useState } from "react";

import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Checkbox } from "@mui/material";
import Test from "./Test";
import Layout from "./components/Layout/Layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <main>This app is using the dark mode</main>
        <Checkbox /> check
        <Test /> */}
        <Layout/>
      </ThemeProvider>
    </>
  );
}

export default App;
