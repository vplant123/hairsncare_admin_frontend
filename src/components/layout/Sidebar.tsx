 import React, { useState, useEffect, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // utility for conditional classes
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  FilePlus,
  Tag,
  UserCog,
  ShoppingCart,
  Star,
  FileText,
  Globe,
  ShoppingBag,
  FileCheck,
  Phone,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const routesByRole = {
  admin: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/admins", label: "Admins" },
    { path: "/users", label: "Patient" },
    { path: "/doctors", label: "Doctors" },
    { path: "/hair-test", label: "Hair Tests" },
    // { path: "/appoinment", label: "Appointments" },
    { path: "/orders", label: "Orders" },
    { path: "/products", label: "Products" },
    { path: "/website", label: "Manage Website" },
    { path: "/coupons", label: "Coupons" },
    // { path: "/appointments", label: "Appointments" },
    // { path: "/reports", label: "Reports" },
    // { path: "/prescriptions", label: "Prescriptions" },
    { path: "/reviews", label: "Reviews" },
    { path: "/invoice", label: "Invoice" },
    { path: "/contact", label: "Contact Us" },
  ],
  doctor: [
    // { path: "/dashboard", label: "Dashboard" },
    { path: "/appoinment", label: "Appointment Management" },
    // { path: "/hair-test", label: "Hair Test" },
    // { path: "/invoice", label: "Invoice" },
    { path: "/appointments", label: "Appointments" },
    // { path: "/reports", label: "Reports" },
    // { path: "/prescriptions", label: "Prescriptions" },
  ],
  subadmin: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/users", label: "Patient Management", permissionKey: "patient" },
    { path: "/doctors", label: "Doctor Management", permissionKey: "doctor" },
    { path: "/orders", label: "Orders", permissionKey: "orders" },
    { path: "/products", label: "Products", permissionKey: "product" },
    { path: "/website", label: "Manage Website", permissionKey: "website" },
    { path: "/coupons", label: "Coupons", permissionKey: "coupon" },
    { path: "/contact", label: "Contact Us", permissionKey: "contactus" },
    { path: "/hair-test", label: "Hair Tests", permissionKey: "hairTest" },
    { path: "/reviews", label: "Reviews", permissionKey: "reviews" },
  ],
};

const icons = {
  "/dashboard": LayoutDashboard,
  "/users": Users,
  "/doctors": UserCircle2,
  "/hair-test": FilePlus,
  "/appoinment": Tag,
  "/admins": UserCog,
  "/orders": ShoppingCart,
  "/reviews": Star,

  "/website": Globe,
  "/products": ShoppingBag,
  "/coupons": Tag,
  "/invoice": FileCheck,
  "/contact": Phone,
  "/appointments": Tag,
  "/reports": FileText,
  "/prescriptions": FileCheck,
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isMobileOpen = false, onMobileClose }, ref) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role, permissions } = useAuth();

  // Filter routes based on role and permissions
  const filteredRoutes = React.useMemo(() => {
    if (!role) return [];
    return (routesByRole[role] || []).filter((route) => {
      return !route.permissionKey || permissions[route.permissionKey];
    });
  }, [role, permissions]);

  // Determine if route is active
  const isActiveRoute = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    if (path === "/products") {
      return location.pathname.startsWith("/products");
    }
    if (path === "/invoice") {
      return (
        location.pathname === "/invoice" || location.pathname === "/addinvoices"
      );
    }
    return location.pathname === path;
  };

  // Lock scroll on mobile open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen fixed md:relative flex flex-col transition-all duration-300",
          "hidden md:flex",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-1 flex items-center justify-between border-b border-sidebar-border sticky top-0 bg-sidebar z-10">
          <div
            className={cn(
              "flex items-center gap-2",
              collapsed && "justify-center"
            )}
          >
            {!collapsed ? (
              <img
                src="/lovable-uploads/logo.png"
                alt="Logo"
                className="h-12 ms-4"
              />
            ) : (
              <Stethoscope className="h-8 w-8 text-health-primary" />
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent rounded-full p-1"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-1">
          {filteredRoutes.map(({ path, label }) => {
            const active = isActiveRoute(path);
            const Icon = icons[path] || LayoutDashboard;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "group flex items-center px-2 py-2 rounded-md relative",
                  active
                    ? "bg-[#209FD9] text-white font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md" />
                )}
                <Icon
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    collapsed && "mx-auto",
                    active && "text-white"
                  )}
                />
                {!collapsed && (
                  <span className={cn("ml-3 text-sm", active && "font-medium")}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
      />
      {/* Mobile sidebar */}
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-transform duration-300 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border sticky top-0 bg-white z-10">
          <img
            src="/lovable-uploads/logo.png"
            alt="Logo"
            className="h-10 w-[70%]"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto bg-white p-4 space-y-1">
          {filteredRoutes.map(({ path, label }) => {
            const active = isActiveRoute(path);
            const Icon = icons[path] || LayoutDashboard;
            return (
              <Link
                key={path}
                to={path}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center px-2 py-2 rounded-md relative",
                  active
                    ? "bg-[#007bff] text-white font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md" />
                )}
                <Icon
                  className={cn(
                    "flex-shrink-0 h-6 w-6",
                    active && "text-white"
                  )}
                />
                <span className={cn("ml-3 text-sm", active && "font-medium")}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
