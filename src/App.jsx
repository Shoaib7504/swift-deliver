import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import AuthProvider from "./context/AuthProvider";

import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

import DashboardLayout from "./layouts/dashboard-layout";

import DashboardPage from "./pages/dashboard-page";
import ShipmentsPage from "./pages/dashboard/shipments-page";
import CoveragePage from "./pages/dashboard/coverage-page";
import SendParcel from "./pages/sendParcel";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import MyParcels from "./pages/dashboard/MyParcels";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import ErrorPage from "./pages/dashboard/Error-Page";
import ParcelDetailsPage from "./pages/ParcelDetais";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster richColors position="top-right" />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="send-parcel" element={<SendParcel />} />
              <Route path="my-parcels" element={<MyParcels />} />
              <Route path="parcel/:id" element={<ParcelDetailsPage />} />
            </Route>

            <Route path="*" element={
              <ErrorPage
                code="404"
                title="Package Lost"
                description="We couldn't find the page you're looking for. It might have been rerouted to an unknown destination."
              />
            } />
          </Routes>


        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;