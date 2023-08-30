import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./common/components/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Login } from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./common/contexts/AuthContext";
import PrivateRoute from "./common/guards/PrivateRoute";
import { useEffect } from "react";
import AppRouter from "./common/routers/AppRouter";

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
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
