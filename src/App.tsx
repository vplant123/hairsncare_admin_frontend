import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import PatientManagement from "./pages/PatientManagement";
import DoctorManagement from "./pages/DoctorManagement";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import ProductInventory from "./pages/ProductInventory";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import EditProduct from "./pages/EditProduct";
import OrdersInvoices from "./pages/OrdersInvoices";

import ManageWebsite from "./pages/ManageWebsite";

import Coupons from "./pages/Coupons";
import Logs from "./pages/Logs";
import Prescriptions from "./pages/Prescriptions";
import NotFound from "./pages/NotFound";
import HairTest from "./pages/HairTest";
import Admins from "./pages/Admins";
import Reviews from "./pages/Reviews";
import Blogs from "./pages/Blogs";
import SignIn from "./pages/Singin";
import Invoice from "./pages/Invoice";
import ContactUs from "./pages/ContactUs";
import AddDoctor from "./pages/AddDoctor";
import AddInvoices from "./pages/AddInvoices";
import AppointmentManagement from "./pages/AppointmentManagement";
import PatientTestResult from "./pages/PatientTestResult";
import GenerateReport from "./pages/GenerateReport";
import Report from "./pages/report/Report.jsx";
import DoctorAnalysis from "./pages/DoctorAnalysis/index.jsx";
import ManagementReport from "../src/managementReport";
import TestResults from "./pages/TestResults";
import HairTestPage from "./pages/HairTestPage";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.jsx";
const queryClient = new QueryClient();

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    requiredRoles={["admin", "subadmin", "doctor"]}
                  >
                    <Navigate to="/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/sign-in"
                element={<Navigate to="/signin" replace />}
              />
              <Route path="/test-result/:id" element={<TestResults />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    requiredRoles={["admin", "subadmin", "doctor"]}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin and Subadmin Access Only */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <PatientManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctors"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <DoctorManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add-doctor"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <AddDoctor />
                  </ProtectedRoute>
                }
              ></Route>

              {/* Admin and Doctor Access Only */}
              <Route
                path="/hair-test"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <HairTest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appoinment"
                element={
                  <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                    <AppointmentManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient-test-result/:userId/:hairTestId"
                element={
                  <ProtectedRoute>
                    <PatientTestResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generate-report/:userId/:hairTestId"
                element={
                  <ProtectedRoute>
                    <GenerateReport />
                  </ProtectedRoute>
                }
              />
              <Route path="/hair-test" element={<HairTestPage />} />
              <Route path="/doctor/report/:id" element={<Report />} />
              <Route
                path="/doctor-analyse-report/:id"
                element={<DoctorAnalysis />}
              />
              <Route
                path="management-report/:id"
                element={<ManagementReport />}
              />
              <Route
                path="/admins"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Admins />
                  </ProtectedRoute>
                }
              />

              {/* Admin Access Only */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <OrdersInvoices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/website"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <ManageWebsite />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Reviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Blogs />
                  </ProtectedRoute>
                }
              />

              {/* Product Routes */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <ProductInventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/add"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <AddProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/edit"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/delete"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <DeleteProduct />
                  </ProtectedRoute>
                }
              />

              {/* Other Routes */}
              <Route
                path="/coupons"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <Coupons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoice"
                element={
                  <ProtectedRoute
                    requiredRoles={["admin", "subadmin", "doctor"]}
                  >
                    <Invoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addinvoices"
                element={
                  <ProtectedRoute
                    requiredRoles={["admin", "subadmin", "doctor"]}
                  >
                    <AddInvoices />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                    <ContactUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute
                    requiredRoles={["admin", "subadmin", "doctor"]}
                  >
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logs"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Logs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prescriptions"
                element={
                  <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                    <Prescriptions />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
