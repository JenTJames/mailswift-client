import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";

import Page from "./components/Page";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import theme from "./utils/theme-config";
import InboxPage from "./pages/InboxPage";
import Restricted from "./components/Restricted";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/inbox"
            element={<Restricted component={<InboxPage />} />}
          />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Page>
    </ThemeProvider>
  );
}

export default App;
