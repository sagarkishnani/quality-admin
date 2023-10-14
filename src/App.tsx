import "./App.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { AuthProvider, useAuth } from "./common/contexts/AuthContext"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import AppRouter from "./common/routers/AppRouter"
import { LocalizationProvider } from "@mui/x-date-pickers"

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
  })

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
