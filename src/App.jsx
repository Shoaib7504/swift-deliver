import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/main-layout';
import DashboardLayout from './layouts/dashboard-layout';
import LandingPage from './pages/landing-page';
import DashboardPage from './pages/dashboard-page';
import CreatePage from './pages/dashboard/create-page';
import ShipmentsPage from './pages/dashboard/shipments-page';
import CoveragePage from './pages/dashboard/coverage-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import { AuthProvider } from './context/auth-context';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Routes>
          {/* Public landing routes */}
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* Customer dashboard portal routes */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route
            path="/dashboard/create"
            element={
              <DashboardLayout>
                <CreatePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/shipments"
            element={
              <DashboardLayout>
                <ShipmentsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/coverage"
            element={
              <DashboardLayout>
                <CoveragePage />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
