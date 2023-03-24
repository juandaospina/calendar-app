import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage, CalendarPage } from "../pages";

export const AppRouter = () => {
  const authStatus = "authenticated";
  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      {/* Si se accede a otra ruta que no cumpla con las condicionadas se redirecciona a página Login */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
