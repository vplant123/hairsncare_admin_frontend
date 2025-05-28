import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, Eye, EyeOff } from "lucide-react";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const from = location.state?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
        className: "bg-health-danger text-white border-health-danger",
      });
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Logo Section */}
      <div className="w-full min-h-[40vh] md:w-1/2 bg-[#007bff] flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl px-4 py-8 space-y-8">
          {/* Logo and Text Container */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <img
              className="h-16 w-40 md:h-20 md:w-48 object-contain"
              src="/lovable-uploads/logo.png"
              alt="logo"
            />
            <div className="text-center space-y-4">
              <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                Hello, Friends!
              </h1>
              <p className="text-center text-white text-sm sm:text-base md:text-lg max-w-md mx-auto">
                Enter your personal details and start your journey with us
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-[50vh] p-4 md:p-8">
        <div className="w-full max-w-[400px] space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="password"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm md:text-base text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-[40%] bg-[#007bff] text-white py-2 md:py-3 rounded-full hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
