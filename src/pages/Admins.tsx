import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { constructNow } from "date-fns";

// Define a type for the admin data including _id
interface AdminData {
  _id?: string;
  fullname: string;
  email: string;
  mobile: string;
  password?: string;
  role: string;
  permission: {
    hairTest: boolean;
    doctor: boolean;
    patient: boolean;
    website: boolean;
    coupon: boolean;
    orders: boolean;
    contactus: boolean;
    product: boolean;
    reviews: boolean;
    admin: boolean;
  };
}

const Admins = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<{ _id: string; fullname: string } | null>(null);
  const [newAdmin, setNewAdmin] = useState<AdminData>({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    permission: {
      hairTest: false,
      doctor: false,
      patient: false,
      website: false,
      coupon: false,
      orders: false,
      contactus: false,
      product: false,
      reviews: false,
      admin: false,
    },
  });
  const [admin, setAdmin] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Regular expressions for validation
  const regexPatterns = {
    fullname: /^[a-zA-Z\s]{3,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    mobile: /^(\+\d{1,3})?\d{10,14}$/, // Only allows numbers and plus sign
    password: newAdmin.password
      ? /^.{6,}$/ // Minimum 6 characters, any type
      : null,
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getAdmin`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log("Fetched admin data:", data);
      setAdmin(data?.data || []);
    } catch (error) {
      console.error("Error while fetching admin data", error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data.",
        variant: "destructive",
        className: "bg-white",
      });
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;

    // Special handling for mobile number input
    if (name === "mobile") {
      // Remove all characters except numbers and plus sign
      const cleanedValue = value.replace(/[^\d+]/g, "");
      // Ensure only one plus sign at the start
      const finalValue = cleanedValue.replace(/\+/g, (match, index) =>
        index === 0 ? "+" : ""
      );
      setNewAdmin(prev => ({ ...prev, [name]: finalValue }));
    } else {
      setNewAdmin(prev => ({ ...prev, [name]: value }));
    }

    setErrorMessages(prev =>
      prev.filter(err => !err.field || err.field !== name)
    );
  };

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    setNewAdmin(prev => ({
      ...prev,
      permission: {
        ...prev.permission,
        [permissionName]: checked,
      },
    }));
  };

  const handleRoleChange = (role: string) => {
    setNewAdmin(prev => ({
      ...prev,
      role,
      // Reset permissions if switching to admin role
      permission:
        role === "admin"
          ? {
              hairTest: true,
              doctor: true,
              patient: true,
              website: true,
              coupon: true,
              orders: true,
              contactus: true,
              product: true,
              reviews: true,
              admin: true,
            }
          : prev.permission,
    }));
  };

  const isValid = () => {
    let valid = true;
    const errors = [];

    if (
      !newAdmin.fullname.trim() ||
      !regexPatterns.fullname.test(newAdmin.fullname)
    ) {
      valid = false;
      errors.push({
        field: "fullname",
        msg: "Fullname must be 3 to 50 characters long and contain only letters and spaces.",
      });
    }

    if (!newAdmin.email.trim() || !regexPatterns.email.test(newAdmin.email)) {
      valid = false;
      errors.push({ field: "email", msg: "Please enter a valid email." });
    }

    if (
      !newAdmin.mobile.trim() ||
      !regexPatterns.mobile.test(newAdmin.mobile)
    ) {
      valid = false;
      errors.push({
        field: "mobile",
        msg: "Please enter a valid mobile number (10-14 digits, with optional +country code).",
      });
    }

    if (!newAdmin.role) {
      valid = false;
      errors.push({
        field: "role",
        msg: "Please select a role (Admin or Sub Admin).",
      });
    }

    if (
      (!isEditMode || (isEditMode && newAdmin.password)) &&
      (!newAdmin.password || !regexPatterns.password?.test(newAdmin.password))
    ) {
      valid = false;
      errors.push({
        field: "password",
        msg: "Password must be at least 6 characters long.",
      });
    }

    setErrorMessages(errors);
    return valid;
  };

  const handleEditAdmin = (adminData: any) => {
    setIsEditMode(true);
    setNewAdmin({
      _id: adminData._id || "",
      fullname: adminData.fullname || "",
      email: adminData.email || "",
      mobile: adminData.mobile || "",
      password: "",
      role: adminData.role || "",
      permission: adminData.permission || {
        hairTest: false,
        doctor: false,
        patient: false,
        website: false,
        coupon: false,
        orders: false,
        contactus: false,
        product: false,
        reviews: false,
        admin: false,
      },
    });
    setErrorMessages([]);
    setIsDialogOpen(true);
  };

  const handleAddAdmin = async () => {
    if (!isValid()) {
      toast({
        title: "Validation Error",
        description:
          errorMessages[0]?.msg ||
          "Please fill in all required fields correctly.",
        variant: "destructive",
        className: "bg-white",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/addAdmin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAdmin),
        }
      );
      const data = await response.json();
      console.log(data);

      // Check for success status codes (200 OK or 201 Created)
      if (data.statusCode === 200 || data.statusCode === 201) {
        await handleFetchData();
        handleCloseDialog();
        toast({
          title: "Admin Added",
          description: `${newAdmin.fullname} has been added as a ${newAdmin.role}`,
          variant: "success",
        });
      } else {
        // Handle API errors
        const errorMessage = data.isOperational || "Failed to add admin.";
        console.log(errorMessage)
        setErrorMessages([{ msg: errorMessage }]);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          className: "bg-red-200", // Ensure error toast has red background
        });
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      console.error("Error while adding admin", error);
      const errorMessage = error.message || "An unexpected error occurred.";
      setErrorMessages([
        { msg: errorMessage },
      ]);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        className: "bg-red-200", // Ensure error toast has red background
      });
    }
  };

  const handleUpdateAdmin = async () => {
    if (!isValid()) {
      toast({
        title: "Validation Error",
        description:
          errorMessages[0]?.msg ||
          "Please fill in all required fields correctly.",
        className: "bg-red-200",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        const errorMessage = "Authorization token not found for update.";
        setErrorMessages([
          { msg: errorMessage },
        ]);
        toast({
          title: "Error",
          description: errorMessage,
          className: "bg-red-200",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/update-admin-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAdmin),
        }
      );
      const data = await response.json();

      // Check for success status codes (200 OK or 201 Created)
      if (data.statusCode === 200 || data.statusCode === 201) {
        await handleFetchData();
        handleCloseDialog();
        toast({
          title: "Admin Updated",
          description: `${newAdmin.fullname} has been updated successfully`,
          variant: "success",
        });
      } else {
        // Handle API errors
        const errorMessage = data.message || "Failed to update admin.";
        setErrorMessages([{ msg: errorMessage }]);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          className: "bg-red-200", // Ensure error toast has red background
        });
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      console.error("Error while updating admin", error);
      const errorMessage = error.message || "An unexpected error occurred during update.";
      setErrorMessages([
        { msg: errorMessage },
      ]);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        className: "bg-red-200", // Ensure error toast has red background
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setNewAdmin({
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      role: "",
      permission: {
        hairTest: false,
        doctor: false,
        patient: false,
        website: false,
        coupon: false,
        orders: false,
        contactus: false,
        product: false,
        reviews: false,
        admin: false,
      },
    });
    setErrorMessages([]);
  };

  const handleConfirmDelete = (adminItem: { _id: string; fullname: string }) => {
    setAdminToDelete(adminItem);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleActualDelete = async () => {
    if (adminToDelete) {
      console.log("Deleting admin with ID:", adminToDelete._id);
      // Add your actual delete API call here
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            title: "Error",
            description: "Authentication token missing.",
            variant: "destructive",
            className: "bg-red-200",
          });
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/delete-admin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({adminId: adminToDelete._id }),
          }
        );

        const data = await response.json();
        console.log("Delete admin response:", data);

        if (data.statusCode === 200) {
          await handleFetchData(); // Refresh the admin list
          toast({
            title: "Admin Deleted",
            description: data.message,
            variant: "success",
            className: "bg-green-200",
          });
        } else {
           toast({
            title: "Error",
            description: data.message || "Failed to delete admin.",
            variant: "destructive",
            className: "bg-red-200",
          });
        }
      } catch (error: any) {
        console.error("Error while deleting admin", error);
        toast({
          title: "Error",
          description: error || "An unexpected error occurred during deletion.",
          variant: "destructive",
          className: "bg-red-200",
        });
      } finally {
        handleCloseConfirmDeleteDialog();
      }
    }
  };

  const handleCloseConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
    setAdminToDelete(null);
  };

  const filteredAdmins = admin.filter(
    adminItem =>
      adminItem.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adminItem.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adminItem.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAdmins = filteredAdmins.length;
  const totalPages = Math.ceil(totalAdmins / rowsPerPage);

  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrators Management</h1>
        <Button
          onClick={() => {
            setIsEditMode(false);
            handleCloseDialog();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Admin</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Administrators</CardTitle>
          <CardDescription>
            Manage your admin users and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search admins..."
                className="px-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
              <span>Rows per page&nbsp;</span>
              <select
                value={rowsPerPage}
                onChange={e => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="border rounded px-2 py-1"
              >
                {[5, 10, 25, 50].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>
                {totalAdmins === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                      currentPage * rowsPerPage,
                      totalAdmins
                    )}`}{" "}
                of {totalAdmins}
              </span>
            
             
             
             
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No administrators found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAdmins.map(adminItem => (
                  <TableRow key={adminItem._id}>
                    <TableCell className="font-medium">
                      {adminItem.fullname}
                    </TableCell>
                    <TableCell>{adminItem.email}</TableCell>
                    <TableCell>{adminItem.mobile}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          adminItem.role === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {adminItem.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAdmin(adminItem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:border-red-500"
                          onClick={() => handleConfirmDelete(adminItem)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls (Bottom) */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {totalAdmins} total administrators.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || totalPages === 0}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || totalPages === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Last
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Administrator" : "Add New Administrator"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the administrator details."
                : "Fill in the details to add a new administrator to the system."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="md:text-right">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={newAdmin.fullname}
                onChange={handleInputChange}
                className="md:col-span-3"
              />
              {errorMessages.find(err => err.field === "fullname") && (
                <div className="col-start-1 md:col-start-2 col-span-4 text-red-600 text-sm -mt-2">
                  <i>
                    {errorMessages.find(err => err.field === "fullname")?.msg}
                  </i>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="mobile" className="md:text-right">
                Phone
              </Label>
              <Input
                id="mobile"
                name="mobile"
                value={newAdmin.mobile}
                onChange={handleInputChange}
                className="md:col-span-3"
              />
              {errorMessages.find(err => err.field === "mobile") && (
                <div className="col-start-1 md:col-start-2 col-span-4 text-red-600 text-sm -mt-2">
                  <i>
                    {errorMessages.find(err => err.field === "mobile")?.msg}
                  </i>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="md:text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                className="md:col-span-3"
              />
              {errorMessages.find(err => err.field === "email") && (
                <div className="col-start-1 md:col-start-2 col-span-4 text-red-600 text-sm -mt-2">
                  <i>{errorMessages.find(err => err.field === "email")?.msg}</i>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="md:text-right">
                Password
              </Label>
              <div className="relative md:col-span-3">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  className="pr-10"
                  autoComplete="new-password"
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
              {errorMessages.find(err => err.field === "password") && (
                <div className="col-start-1 md:col-start-2 col-span-4 text-red-600 text-sm -mt-2">
                  <i>
                    {errorMessages.find(err => err.field === "password")?.msg}
                  </i>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
              <Label className="md:text-right pt-2">Role</Label>
              <div className="grid grid-cols-2 gap-4 md:col-span-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Checkbox
                    id="role-admin"
                    checked={newAdmin.role === "admin"}
                    onCheckedChange={() => handleRoleChange("admin")}
                    className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor="role-admin"
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                  >
                    Admin
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Checkbox
                    id="role-subadmin"
                    checked={newAdmin.role === "subadmin"}
                    onCheckedChange={() => handleRoleChange("subadmin")}
                    className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor="role-subadmin"
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                  >
                    Sub Admin
                  </label>
                </div>
              </div>
              {errorMessages.find(err => err.field === "role") && (
                <div className="col-start-1 md:col-start-2 col-span-4 text-red-600 text-sm -mt-2">
                  <i>{errorMessages.find(err => err.field === "role")?.msg}</i>
                </div>
              )}
            </div>

            {newAdmin.role === "subadmin" && (
              <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                <Label className="md:text-right pt-2">Permissions</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-3">
                  {[
                    { id: "hairTest", label: "Hair Test" },
                    { id: "doctor", label: "Doctor" },
                    { id: "patient", label: "Patient" },
                    { id: "website", label: "Manage Website" },
                    { id: "coupon", label: "Coupon" },
                    { id: "orders", label: "Orders" },
                    { id: "contactus", label: "Contact Us" },
                    { id: "product", label: "Product" },
                    { id: "reviews", label: "Reviews" },
                    { id: "admin", label: "Admin Management" },
                  ].map(({ id, label }) => (
                    <div
                      key={id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Checkbox
                        id={`perm-${id}`}
                        checked={!!newAdmin.permission[id]}
                        onCheckedChange={checked => {
                          handlePermissionChange(id, checked as boolean);
                        }}
                        className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`perm-${id}`}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={isEditMode ? handleUpdateAdmin : handleAddAdmin}
              className="w-full sm:w-auto"
            >
              {isEditMode ? "Update Administrator" : "Add Administrator"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete administrator{" "}
              <strong>{adminToDelete?.fullname}</strong>?
            
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseConfirmDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleActualDelete} className="bg-red-400 text-white">
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Admins;
