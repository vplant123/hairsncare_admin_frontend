import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-health-primary mb-2">404</h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. The page may have been
            moved, deleted, or never existed.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/signin"}>
            <Button className="bg-health-primary hover:bg-health-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isAuthenticated ? "Return to Dashboard" : "Return to Sign In"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
