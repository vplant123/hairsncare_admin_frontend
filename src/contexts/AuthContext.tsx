import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  permissions: { [key: string]: boolean };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem("role");
  });
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>(
    () => {
      const storedPermissions = localStorage.getItem("permissions");
      return storedPermissions ? JSON.parse(storedPermissions) : {};
    }
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Update localStorage when authentication state changes
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const token = data.data.logedInUser.accessToken;
        const userRole = data.data.logedInUser.role;
        const userPermissions = data?.data.user?.permission || {};

        // Store authentication data
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("permissions", JSON.stringify(userPermissions));

        setIsAuthenticated(true);
        setRole(userRole);
        setPermissions(userPermissions);

        // Navigate based on role
        const redirectPath = "/dashboard";
        navigate(redirectPath, { replace: true });

        // Show success toast
        setTimeout(() => {
          toast({
            title: "Success",
            description: `Logged in successfully as ${userRole}`,
            className: "bg-white text-black border-gray-200 shadow-lg",
          });
        }, 100);
      } else {
        toast({
          title: "Error",
          description: data.message || "Login failed. Please try again.",
          variant: "destructive",
          className: "bg-white text-black border-health-danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
        className: "bg-white text-black border-health-danger",
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setPermissions({});
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, permissions, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
