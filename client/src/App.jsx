import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardPage from "./pages/DashboardPage";
import ActivityPage from "./pages/ActivityPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import SessionTimeoutModal from "./components/SessionTimeoutModal";
function ProtectedRoute({ children }) { const { isAuthenticated } = useAuth(); return isAuthenticated ? children : <Navigate to="/login" replace />; }
function PublicOnlyRoute({ children }) { const { isAuthenticated } = useAuth(); return isAuthenticated ? <Navigate to="/dashboard" replace /> : children; }
function AppRoutes() { return <><Routes><Route path="/" element={<Navigate to="/login" replace />} /><Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} /><Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} /><Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} /><Route path="/reset-password" element={<PublicOnlyRoute><ResetPasswordPage /></PublicOnlyRoute>} /><Route path="/verify-email" element={<VerifyEmailPage />} /><Route path="/verify-otp" element={<VerifyOtpPage />} /><Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /><Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /><Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} /><Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /><Route path="*" element={<NotFoundPage />} /></Routes><SessionTimeoutModal /></>; }
export default function App() { return <BrowserRouter><ThemeProvider><AuthProvider><AppRoutes /></AuthProvider></ThemeProvider></BrowserRouter>; }
