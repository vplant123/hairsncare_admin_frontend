import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bell,
  Menu,
  Search,
  Settings,
  User,
  X,
  Lock,
  Save,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TopbarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
}

const Topbar: React.FC<TopbarProps> = ({
  onSidebarToggle,
  isSidebarOpen,
  toggleButtonRef,
}) => {
  const { logout, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  // Update profile data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      // console.log("=== Updating Profile Data ===");
      const newProfileData = {
        name: userProfile.fullname || "",
        email: userProfile.email || "",
        mobile: userProfile.mobile || "",
      };
      // console.log(JSON.stringify(newProfileData, null, 2));

      setProfileData(prev => ({
        ...prev,
        ...newProfileData,
      }));
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const maskPassword = (password: string) => {
    if (!password) return "";
    return password.slice(0, 3) + "*".repeat(Math.max(0, password.length - 3));
  };

  const handleChangePassword = () => {
    if (!profileData.password) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
        className: "bg-white text-black  shadow-lg",
      });
      return;
    }

    if (!profileData.newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
        className: "bg-white text-black  shadow-lg",
      });
      return;
    }

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match",
        variant: "destructive",
        className: "bg-white text-black  shadow-lg",
      });
      return;
    }

    // Here you would typically make an API call to update the password
    toast({
      title: "Success",
      description: "Password changed successfully",
      className: "bg-white text-black  shadow-lg",
    });

    // Reset form and close modal
    setProfileData(prev => ({
      ...prev,
      password: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setIsChangePasswordOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
    toast({
      title: "Success",
      description: "Logged out successfully",
      className: "bg-white text-black  shadow-lg",
    });
  };

  return (
    <div className="bg-blue border-b border-border px-6 py-2 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4 relative flex-1 md:flex-initial">
        <Button
          ref={toggleButtonRef}
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onSidebarToggle}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-health-danger"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <NotificationItem
                title="New appointment request"
                description="Dr. Smith has a new appointment request for tomorrow at 2:00 PM"
                time="5 min ago"
              />
              <NotificationItem
                title="Prescription approved"
                description="Prescription #12345 has been approved"
                time="30 min ago"
              />
              <NotificationItem
                title="Low inventory alert"
                description="Ibuprofen is running low on stock (5 units remaining)"
                time="1 hour ago"
              />
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#209fd9] flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">
                  {userProfile?.fullname || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userProfile?.role || "User"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-blue-800 cursor-pointer"
            >
              My Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-health-danger focus:text-health-danger focus:bg-health-danger/10 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="w-[95%] max-w-[425px] p-4 sm:p-6 h-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center sm:text-left">
              My Profile
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              View your profile information
            </p>
          </DialogHeader>
          <div className="grid gap-4 sm:gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#209fd9] flex items-center justify-center">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="name" className="sm:text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="sm:col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="email" className="sm:text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="sm:col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="mobile" className="sm:text-right">
                  Mobile
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={profileData.mobile}
                  onChange={handleInputChange}
                  className="sm:col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="role" className="sm:text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={userProfile?.role || ""}
                  className="sm:col-span-3"
                  disabled
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      {/* <Dialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      >
        <DialogContent className="w-[95%] max-w-[425px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center sm:text-left">
              Change Password
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="current-password" className="sm:text-right">
                Current
              </Label>
              <div className="sm:col-span-3 relative">
                <Input
                  id="current-password"
                  name="password"
                  type="text"
                  value={profileData.password}
                  onChange={handleInputChange}
                  className="pr-10"
                  placeholder="Enter current password"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="new-password" className="sm:text-right">
                New
              </Label>
              <div className="sm:col-span-3 relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={profileData.newPassword}
                  onChange={handleInputChange}
                  className="pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="confirm-password" className="sm:text-right">
                Confirm
              </Label>
              <div className="sm:col-span-3 relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={profileData.confirmPassword}
                  onChange={handleInputChange}
                  className="pr-10"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="w-full sm:w-auto">
              Save Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  return (
    <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default Topbar;
