import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import PatientManagement from "./pages/PatientManagement";
import DoctorManagement from "./pages/DoctorManagement";
import Appointments from "./pages/Appointments.js";
import Reports from "./pages/Reports";
import ProductInventory from "./pages/ProductInventory";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import EditProduct from "./pages/EditProduct";
import OrdersInvoices from "./pages/OrdersInvoices";
import FollowUp from "./pages/FollowUp";
import ManageWebsite from "./pages/ManageWebsite";

import Coupons from "./pages/Coupons";
import Logs from "./pages/Logs";
import Prescriptions from "./pages/Prescriptions";
import NotFound from "./pages/NotFound";
import HairTest from "./pages/HairTest";
import Admins from "./pages/Admins";
import Reviews from "./pages/Reviews";
import SignIn from "./pages/Singin";
import Invoice from "./pages/Invoice";
import ContactUs from "./pages/ContactUs";
import AddDoctor from "./pages/AddDoctor";
import AddInvoices from "./pages/AddInvoices";
import AppointmentManagement from "./pages/AppointmentManagement";
import DoctorFollowUp from "./pages/DoctorFollowUp";
import DoctorOrdeerReport from "./pages/DoctorOrderReport";
import PatientTestResult from "./pages/PatientTestResult";
import GenerateReport from "./pages/GenerateReport";
import Report from "./pages/report/Report.jsx";
import DoctorAnalysis from "./pages/DoctorAnalysis/index.jsx";
import ManagementReport from "../src/managementReport";
import TestResults from "./pages/TestResults";
import HairTestPage from "./pages/HairTestPage";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.jsx";
import Blogs from "./pages/Blogs";

import HairTestsCopy from "./pages/HairTestsCopy";

// Updated ProtectedRoute component
const ProtectedRoute = ({
  requiredRoles,
  requiredPermissionKey = null,
  children,
}) => {
  const { isAuthenticated, role, permissions } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/signin" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    // Redirect based on role
    if (role === "doctor") {
      return <Navigate to="/appointment" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // For subadmin role, check specific permissions if requiredPermissionKey is provided
  if (role === "subadmin" && requiredPermissionKey) {
    if (!permissions || !permissions[requiredPermissionKey]) {
      // Redirect if subadmin doesn't have the required permission
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated, role is allowed, and for subadmin, permission is granted (if required)
  return children ? children : <Outlet />;
};

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter basename="/">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/sign-in"
              element={<Navigate to="/signin" replace />}
            />
            {/* TestResults might not need protection or specific roles/permissions */}
            <Route path="/test-result/:id" element={<TestResults />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRoles={["admin", "subadmin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin and Subadmin Access Only with specific permissions for subadmin */}
            <Route
              path="/users"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="patient"
                >
                  <PatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="doctor"
                >
                  <DoctorManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-doctor"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="doctor"
                >
                  <AddDoctor />
                </ProtectedRoute>
              }
            ></Route>

            {/* Admin and Doctor Access Only */}
            {/* HairTest route needs clarification - is it for admin/subadmin or doctor? Assuming admin for now based on sidebar */}
            <Route
              path="/hair-test"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="hairTest"
                >
                  {/* <HairTest /> */}
                  <HairTestsCopy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/followup"
              element={
                <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                  <FollowUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment" // Note: Typo in path, should likely be /appointment
              element={
                <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                  <AppointmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-followup"
              element={
                <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                  <DoctorFollowUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prescription-orders"
              element={
                <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                  <DoctorOrdeerReport />
                </ProtectedRoute>
              }
            />
            {/* PatientTestResult and related report routes might need more granular permission/role checks */}
            <Route
              path="/patient-test-result/:userId/:hairTestId/:testId"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin", "doctor"]}
                  requiredPermissionKey="hairTest"
                >
                  <PatientTestResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Prescription-Only/:userId/:appointmentId/:orderId"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin", "doctor"]}
                  requiredPermissionKey="orders"
                >
                  <PatientTestResult />{" "}
                  {/* Assuming this page also handles Prescription-Only view */}
                </ProtectedRoute>
              }
            />
            {/* These report generation routes likely need specific permissions */}
            <Route
              path="/generate-report/:userId/:hairTestId"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "doctor"]}
                  requiredPermissionKey="reports"
                >
                  <GenerateReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/report/:id"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin", "doctor"]}
                  requiredPermissionKey="reports"
                >
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-analyse-report/:id"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "doctor"]}
                  requiredPermissionKey="reports"
                >
                  <DoctorAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="management-report/:id"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "doctor"]}
                  requiredPermissionKey="reports"
                >
                  <ManagementReport />
                </ProtectedRoute>
              }
            />

            {/* Admin Access Only with specific permissions for subadmin */}
            <Route
              path="/admins"
              element={
                <ProtectedRoute
                  requiredRoles={["admin"]}
                  requiredPermissionKey="admin"
                >
                  <Admins />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="orders"
                >
                  <OrdersInvoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/website"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="website"
                >
                  <ManageWebsite />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="reviews"
                >
                  <Reviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="website"
                >
                  <Blogs />
                </ProtectedRoute>
              }
            />

            {/* Product Routes with specific permissions for subadmin */}
            <Route
              path="/products"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="product"
                >
                  <ProductInventory />
                </ProtectedRoute>
              }
            />
            {/* Add, Edit, Delete Product routes also need product permission */}
            <Route
              path="/products/add"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="product"
                >
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/edit"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="product"
                >
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/delete"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="product"
                >
                  <DeleteProduct />
                </ProtectedRoute>
              }
            />

            {/* Other Routes with specific permissions for subadmin */}
            <Route
              path="/coupons"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="coupon"
                >
                  <Coupons />
                </ProtectedRoute>
              }
            />
            {/* Invoice and AddInvoices likely need orders permission or a separate invoice permission */}
            <Route
              path="/invoice"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="orders"
                >
                  <Invoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addinvoices"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="orders"
                >
                  <AddInvoices />
                </ProtectedRoute>
              }
            />
            {/* AdminDashboard - Assuming this is a general dashboard for admins/subadmins/doctors? Need clarification. Protecting for all roles for now. */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRoles={["admin", "subadmin", "doctor"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute
                  requiredRoles={["admin", "subadmin"]}
                  requiredPermissionKey="contactus"
                >
                  <ContactUs />
                </ProtectedRoute>
              }
            />
            {/* Appointments route needs clarification - is it for admin/subadmin or doctor? Assuming doctor for now based on sidebar. */}
            <Route
              path="/appointments"
              element={
                <ProtectedRoute requiredRoles={["admin", "doctor"]}>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            {/* New Route for Doctors to view Orders */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute requiredRoles={["doctor"]}>
                  <OrdersInvoices />
                </ProtectedRoute>
              }
            />
            {/* Reports route needs clarification - Assuming it's linked to hair test/appointments? */}

            {/* Logs route likely for admin only */}
            <Route
              path="/logs"
              element={
                <ProtectedRoute requiredRoles={["admin"]}>
                  <Logs />
                </ProtectedRoute>
              }
            />
            {/* Prescriptions route likely for doctor/admin */}
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
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
