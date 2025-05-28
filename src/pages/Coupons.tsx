import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Calendar,
  Percent,
  Hash,
  Trash2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface CouponFormData {
  _id?: string | null;
  code: string;
  type: string;
  value: string;
  validity: string;
  isActive: boolean;
  notes: string;
}

const Coupons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [createCouponOpen, setCreateCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponFormData | null>(
    null
  );
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialFormData: CouponFormData = {
    _id: null,
    code: "",
    type: "percentage",
    value: "",
    validity: "",
    isActive: true,
    notes: "",
  };

  const [formData, setFormData] = useState<CouponFormData>(initialFormData);

  // Reset form data when modal opens/closes or when editing coupon changes
  useEffect(() => {
    if (createCouponOpen && selectedCoupon) {
      setFormData({
        _id: selectedCoupon._id || null,
        code: selectedCoupon.code || "",
        type: selectedCoupon.type || "percentage",
        value: selectedCoupon.value || "",
        validity: selectedCoupon.validity
          ? new Date(selectedCoupon.validity).toISOString().split("T")[0]
          : "",
        isActive: selectedCoupon.isActive ?? true,
        notes: selectedCoupon.notes || "",
      });
    } else if (!createCouponOpen) {
      setFormData(initialFormData);
      setSelectedCoupon(null);
    }
  }, [createCouponOpen, selectedCoupon]);

  // Validate form data
  const validateFormData = (): boolean => {
    // Validate coupon code
    if (!formData.code.trim()) {
      toast({
        title: "Validation Error",
        description: "Coupon Code is required.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate coupon type
    if (!formData.type) {
      toast({
        title: "Validation Error",
        description: "Coupon Type is required.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate value
    if (!formData.value.trim()) {
      toast({
        title: "Validation Error",
        description: "Value is required.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate value is a positive number
    const value = Number(formData.value);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Validation Error",
        description: "Value must be a positive number.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate percentage value range
    if (formData.type === "percentage" && value > 100) {
      toast({
        title: "Validation Error",
        description: "Percentage value cannot be greater than 100%.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate validity date
    if (!formData.validity) {
      toast({
        title: "Validation Error",
        description: "Validity Date is required.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate validity date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const validityDate = new Date(formData.validity);
    validityDate.setHours(0, 0, 0, 0); // Reset time to start of day

    if (validityDate < today) {
      toast({
        title: "Validation Error",
        description: "Validity Date must be today or a future date.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate notes (optional but if provided, check length)
    if (formData.notes && formData.notes.length > 500) {
      toast({
        title: "Validation Error",
        description: "Notes cannot exceed 500 characters.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    return true;
  };

  // Handle input change for form fields with validation
  const handleInputChange = (field: keyof CouponFormData, value: any) => {
    // Validate value field for numbers
    if (field === "value") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        toast({
          title: "Validation Error",
          description: "Value must be a positive number.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      if (formData.type === "percentage" && numValue > 100) {
        toast({
          title: "Validation Error",
          description: "Percentage value cannot be greater than 100%.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    }

    // Validate date field
    if (field === "validity") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast({
          title: "Validation Error",
          className:"bg-white",
          description: "Validity Date must be today or a future date.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch coupons list
  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const res = await fetch(
        "http://localhost:3000/api/v1/admin/getCoupons",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.success) {
        setCoupons(data.data || []);
        setError(null);
      } else {
        throw new Error(data.message || "Failed to fetch coupons");
      }
    } catch (error: any) {
      setError(error.message || "Failed to load coupons");
      setCoupons([]);
      console.error("Fetch coupons error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // On component mount load coupons
  useEffect(() => {
    fetchCoupons();
  }, []);

  // Create new coupon
  const handleCreateCoupon = async () => {
    if (!validateFormData()) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const payload = {
        code: formData.code,
        _id: null,
        validity: formData.validity,
        percent: Number(formData.value),
        type: formData.type,
        isActive: formData.isActive ?? true
      };

      console.log('Creating coupon with payload:', payload);

      const res = await fetch(
        "http://localhost:3000/api/v1/admin/editCoupon",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log('Create coupon response:', data);

      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Coupon created successfully",
          className: "bg-green-50 border-green-200",
          duration: 5000,
        });
        fetchCoupons();
        setCreateCouponOpen(false);
        setFormData(initialFormData);
      } else {
        throw new Error(data.message || "Failed to create coupon");
      }
    } catch (error: any) {
      console.error('Create coupon error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      toast({
        title: "Error",
        description: error.message || "Failed to create coupon",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
        duration: 5000,
      });
    }
  };

  // Edit coupon
  const handleEditSubmit = async () => {
    if (!validateFormData()) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      if (!formData._id) throw new Error("Coupon ID is missing for edit");

      const payload = {
        code: formData.code,
        _id: formData._id,
        validity: formData.validity,
        percent: Number(formData.value),
        type: formData.type,
        isActive: formData.isActive
      };

      console.log('Editing coupon with payload:', payload);

      const res = await fetch(
        "http://localhost:3000/api/v1/admin/editCoupon",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log('Edit coupon response:', data);

      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Coupon updated successfully",
          className: "bg-green-50 border-green-200",
          duration: 5000,
        });
        fetchCoupons();
        setCreateCouponOpen(false);
      } else {
        throw new Error(data.message || "Failed to update coupon");
      }
    } catch (error: any) {
      console.error('Edit coupon error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      toast({
        title: "Error",
        description: error.message || "Failed to update coupon",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
        duration: 5000,
      });
    }
  };

  // Delete coupon with confirmation
  const handleDeleteCoupon = async (couponId?: string | null) => {
    if (!couponId) return;
    setCouponToDelete(couponId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!couponToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const res = await fetch(
        "http://localhost:3000/api/v1/admin/deleteCoupon",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: couponToDelete }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Coupon deleted successfully",
          className: "bg-green-50 border-green-200",
          duration: 5000,
        });
        setCoupons(prev => prev.filter(c => c._id !== couponToDelete));
      } else {
        throw new Error(data.message || "Failed to delete coupon");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete coupon",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
        duration: 5000,
      });
      console.error("Delete coupon error:", error);
    } finally {
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    }
  };

  // Toggle coupon active status
  const handleToggleCouponStatus = async (couponId?: string | null) => {
    if (!couponId) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const couponToToggle = coupons.find(c => c._id === couponId);
      if (!couponToToggle) throw new Error("Coupon not found");

      const updatedCoupon = {
        ...couponToToggle,
        isActive: !couponToToggle.isActive,
      };

      const res = await fetch(
        "http://localhost:3000/api/v1/admin/editCoupon",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoupon),
        }
      );

      const data = await res.json();
      if (data.success) {
        setCoupons(prev => prev.map(c => (c._id === couponId ? data.data : c)));
        toast({
          title: "Success",
          description: `Coupon ${
            updatedCoupon.isActive ? "activated" : "deactivated"
          } successfully`,
          className: "bg-green-50 border-green-200",
          duration: 5000,
        });
      } else {
        throw new Error(data.message || "Failed to update coupon status");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update coupon status",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
        duration: 5000,
      });
      console.error("Toggle coupon status error:", error);
    }
  };

  // Format date for display
  const formatDate = (isoString?: string) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // Filter coupons by search, status, and expiry
  const filteredCoupons = coupons.filter(coupon => {
    const now = new Date();
    const expiry = new Date(coupon.validity);
    const isExpired = expiry < now;
    const isMaxedOut =
      coupon.usageLimit && coupon.usageCount >= coupon.usageLimit;

    let effectiveStatus = coupon.isActive ? "active" : "inactive";
    if (isExpired) effectiveStatus = "expired";
    if (isMaxedOut && effectiveStatus !== "expired")
      effectiveStatus = "maxed_out";

    const matchesSearch =
      !searchQuery ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || statusFilter === effectiveStatus;
    const matchesExpiry =
      expiryFilter === "all" ||
      (expiryFilter === "expired" && isExpired) ||
      (expiryFilter === "valid" && !isExpired);

    return matchesSearch && matchesStatus && matchesExpiry;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoupons = filteredCoupons.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Open modal for new coupon
  const openCreateModal = () => {
    setSelectedCoupon(null);
    setCreateCouponOpen(true);
  };

  // Open modal for editing coupon
  const openEditModal = (coupon: any) => {
    setSelectedCoupon(coupon);
    setCreateCouponOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Coupons</h1>
          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Coupons</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by coupon code..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="maxed_out">Maxed Out</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={expiryFilter} onValueChange={setExpiryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Expiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Coupon Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {coupons.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No coupons found. Create a new coupon to get started.
                        </TableCell>
                      </TableRow>
                    ) : currentCoupons.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No coupons found matching your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentCoupons.map(coupon => {
                        const isExpired =
                          new Date(coupon.validity) < new Date();
                        return (
                          <TableRow key={coupon._id}>
                            <TableCell className="font-medium">
                              {coupon.code}
                            </TableCell>
                            <TableCell>
                              {coupon.type === "percentage"
                                ? `${coupon.value || 0}%`
                                : `${(parseFloat(coupon.value) || 0).toFixed(
                                    2
                                  )} Rs`}
                            </TableCell>
                            <TableCell>{formatDate(coupon.validity)}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${
                                  coupon.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                } px-3 py-1 text-sm rounded-full font-medium`}
                              >
                                {coupon.isActive ? "Active" : "Not Active"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={coupon.isActive === true}
                                onCheckedChange={() =>
                                  handleToggleCouponStatus(coupon._id)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditModal(coupon)}
                                disabled={isExpired}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCoupon(coupon._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredCoupons.length)} of{" "}
                      {filteredCoupons.length} entries
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map(page => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Modal for Add/Edit */}
        <Dialog open={createCouponOpen} onOpenChange={setCreateCouponOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedCoupon ? "Edit Coupon" : "Create New Coupon"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  {/* <Hash className="h-4 w-4 mr-2 text-muted-foreground" /> */}
                  <span>Coupon Code</span>
                </div>
                <Input
                  value={formData.code}
                  onChange={e => handleInputChange("code", e.target.value)}
                  placeholder="e.g. SUMMER25"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Type</span>
                  </div>
                  <Select
                    value={formData.type}
                    onValueChange={value => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (Rs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Value</span>
                  </div>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={e => handleInputChange("value", e.target.value)}
                    placeholder={formData.type === "percentage" ? "25" : "100"}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Validity Date</span>
                </div>
                <Input
                  type="date"
                  value={formData.validity}
                  onChange={e => handleInputChange("validity", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <span>Notes</span>
                <Input
                  value={formData.notes}
                  onChange={e => handleInputChange("notes", e.target.value)}
                  placeholder="Coupon notes or description"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="coupon-active"
                  checked={formData.isActive}
                  onCheckedChange={checked =>
                    handleInputChange("isActive", checked)
                  }
                />
                <label htmlFor="coupon-active">Active</label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateCouponOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedCoupon ? handleEditSubmit() : handleCreateCoupon()
                }
                disabled={
                  !formData.code || !formData.value || !formData.validity
                }
              >
                {selectedCoupon ? "Update Coupon" : "Create New Coupon"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete Coupon</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this coupon?</p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setCouponToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="bg-red-500 text-white"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Coupons;
