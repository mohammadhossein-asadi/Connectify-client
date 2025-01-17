import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Loader from "components/Loader";

// Lazy load components
const LoginPage = lazy(() => import("scenes/loginPage"));
const HomePage = lazy(() => import("scenes/homePage"));
const ProfilePage = lazy(() => import("scenes/profilePage"));
const PublicHomePage = lazy(() => import("scenes/publicHomePage"));

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={isAuth ? <Navigate to="/home" /> : <PublicHomePage />}
              />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
              />
              <Route
                path="/register"
                element={
                  isAuth ? <Navigate to="/home" /> : <LoginPage register />
                }
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
