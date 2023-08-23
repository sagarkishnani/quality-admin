import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./common/components/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#74C947",
      },
      secondary: {
        main: "#00A0DF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
