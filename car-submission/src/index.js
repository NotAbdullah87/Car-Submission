import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import LoginPage from "./pages/loginPage/LoginPage";
import CarSubmissionForm from "./pages/carSubmissionPage/CarSubmissionPage";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import { AuthProvider } from "./context/authContext/AuthContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/submissions" element={<CarSubmissionForm />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      
    </Routes>
  </BrowserRouter>
  </AuthProvider>
);
