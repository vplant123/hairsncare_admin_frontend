import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2, Search, UserPlus, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const DoctorManagement = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<any>(null);
  const [doctorsList, setDoctorsList] = useState<any>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        "https://apihair.txogavideo.in/api/v1/admin/all-doctor-Data",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setDoctorsList(data.data);
    } catch (error) {
      console.log("error while fetching doctors data", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // Filter doctors based on search query
  useEffect(() => {
    const filtered = doctorsList.filter(
      (doctor: any) =>
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, doctorsList]);

  const handleEditDoctor = (doctor: any) => {
    navigate("/add-doctor", {
      state: {
        doctor,
        isEdit: true,
      },
    });
  };

  // Token from localStorage or adjust according to your auth flow
  const token = localStorage.getItem("token");

  // Delete doctor API call
  const handleDeleteDoctor = async () => {
    if (!doctorToDelete?._id) return;

    try {
      const response = await fetch(
        `https://apihair.txogavideo.in/api/v1/admin/delete-doctor`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: doctorToDelete._id }),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to delete doctor");
      }

      toast.success(`Deleted doctor ${doctorToDelete.name} successfully`);

      setDoctorsList((prev: any[]) =>
        prev.filter(doc => doc._id !== doctorToDelete._id)
      );

      setDeleteDialogOpen(false);
      setDoctorToDelete(null);
    } catch (error: any) {
      toast.error(error.message || "Error deleting doctor");
    }
  };

  const totalDoctors = filteredDoctors.length || 0;
  const totalPages = Math.ceil(totalDoctors / rowsPerPage);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Management</h1>
        <Button
          className="bg-[#209fd9] hover:bg-blue-600"
          onClick={() => navigate("/add-doctor")}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Doctor
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle>Doctors</CardTitle>
          <CardDescription>Manage doctor accounts and profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search doctors..."
                  className="px-8"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
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
                {totalDoctors === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                      currentPage * rowsPerPage,
                      totalDoctors
                    )}`}{" "}
                of {totalDoctors}
              </span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Degrees</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDoctors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No doctors found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDoctors.map((doctor: any) => (
                  <TableRow key={doctor._id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.degree}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    {/* <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          doctor.isActive
                            ? "bg-green-400 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {doctor.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewUserDetails(doctor)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDoctorToDelete(doctor);
                            setDeleteDialogOpen(true);
                          }}
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
              {totalDoctors} total doctors.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
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

      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] md:w-[90vw] md:max-w-[90vw] lg:w-[80vw] lg:max-w-[80vw] xl:w-[70vw] xl:max-w-[70vw] p-0 sm:p-0 overflow-hidden">
          <div className="flex flex-col h-[85vh]">
            {/* Header */}
            <DialogHeader className="sticky top-0 bg-white z-10 px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Doctor Details
                  </DialogTitle>
                  <DialogDescription className="text-xs mt-0.5">
                    View and manage doctor information
                  </DialogDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUserDetailsOpen(false)}
                  className="h-7 w-7"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {selectedUser && (
                <div className="space-y-4">
                  {/* Basic and Professional Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Information */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.name}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Profile Image
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 flex justify-center">
                          <img
                            src={
                              selectedUser.profileImage ||
                              "/placeholder-doctor.jpg"
                            }
                            alt={selectedUser.name}
                            className="w-20 h-20 rounded-full object-cover border border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.phone}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm break-words">
                          {selectedUser.email}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Address
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.address}
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Degree
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.degree}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Specialist
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.specialist}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Experience
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.experience}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Language
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.language}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Expertise
                        </Label>
                        <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                          {selectedUser.expertise}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                        {selectedUser.description}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">
                        Qualifications
                      </Label>
                      <div className="p-2.5 border rounded-md bg-gray-50/50 text-sm">
                        {selectedUser.qualification}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2.5 border rounded-md bg-gray-50/50">
                      <Checkbox
                        id="showOnDashboard"
                        checked={selectedUser.showOnDashboard}
                        disabled
                        className="border-gray-400"
                      />
                      <Label
                        htmlFor="showOnDashboard"
                        className="text-sm text-gray-700"
                      >
                        Show on Specialist Dashboard
                      </Label>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">
                        Awards & Certifications
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedUser.awards?.map((award, index) => (
                          <div
                            key={index}
                            className="p-2 border rounded-md bg-gray-50/50"
                          >
                            <img
                              src={award}
                              alt={`Award ${index + 1}`}
                              className="w-full h-28 object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t px-4 py-3">
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setUserDetailsOpen(false)}
                  className="w-full sm:w-auto h-8 text-sm"
                >
                  Close
                </Button>
                <Button
                  className="w-full sm:w-auto bg-primary hover:bg-health-primary/90 h-8 text-sm"
                  onClick={() => {
                    setUserDetailsOpen(false);
                    handleEditDoctor(selectedUser);
                  }}
                >
                  Edit Details
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete{" "}
              <span className="text-red-500 font-medium">
                {doctorToDelete?.name}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDoctorToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteDoctor}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DoctorManagement;
