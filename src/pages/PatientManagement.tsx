import React, { useState, useEffect } from "react";
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
import {
  Edit,
  Eye,
  Trash2,
  Search,
  UserPlus,
  Filter,
  ShoppingCart,
  Download,
  UserX,
  History,
  ClipboardList,
  Package,
  FileText,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPatientModal from "@/components/AddPatientModal";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";
import { format } from "date-fns";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("login-history");
  const { toast } = useToast();
  const [patientDetails, setPatientDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [prescriptionViewOpen, setPrescriptionViewOpen] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState<any>(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "p"); // hh:mm a
    } catch (error) {
      console.error("Invalid time:", dateString);
      return "Invalid Time";
    }
  };

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/allpatient`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
       
        const data = await res.json();
         console.log("response pat:", data);
        // Sort patients by lastLogin date in descending order
        const sortedPatients = (data?.data || []).sort((a, b) => {
          const dateA = new Date(a.lastLogin || 0);
          const dateB = new Date(b.lastLogin || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setPatients(sortedPatients);
        setFilteredPatients(sortedPatients);
      } catch (err) {
        console.error(err);
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const token = localStorage.getItem("token");
  // Filter patients
  useEffect(() => {
    const filtered = patients.filter(
      (patient: any) =>
        patient.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mobile?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  const fetchPatientDetails = async (patientId) => {
  try {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/get-patient-Data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: patientId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch patient details");
    }

    const data = await response.json();

    // Log the data to the console
    console.log("API Response Data:", data);
    
    if (data.success) {
      setPatientDetails(data.data);
      setUserDetailsOpen(true);
    } else {
      throw new Error(data.message || "Failed to fetch patient details");
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message || "Failed to fetch patient details",
      className: "bg-white",
    });
  } finally {
    setLoading(false);
  }
};


  const viewUserDetails = (user) => {
    setSelectedUser(user);
    fetchPatientDetails(user._id);
  };

  const handleAddPatient = (patientData: any) => {
    console.log("Adding patient:", patientData);
    toast({
      title: "Success",
      description: "Patient added successfully",
      className: "bg-white",
    });
  };

  const handleDeactivateAccount = async (userId) => {
    // Add deactivate account logic here
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/deleteuser?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete user",
          className: "bg-white",
        });
        return;
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "User deleted successfully!",
        className: "bg-white",
      });
      console.log(data); // Optional: update state or refresh list
    } catch (error) {
      toast({
        title: "Account Deactivated",
        description: "Patient account has been deactivated successfully.",
        className: "bg-white",
      });
    }
  };

  const handleDownloadInvoice = (orderId) => {
    const element = document.getElementById(`invoice-${orderId}`);
    if (element) {
      html2pdf().from(element).save(`invoice-${orderId}.pdf`);
    }
  };

  const handleDownloadPrescription = (prescriptionId) => {
    const element = document.getElementById(`prescription-${prescriptionId}`);
    if (element) {
      const opt = {
        margin: 1,
        filename: `prescription-${prescriptionId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      // Create a clone of the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;
      document.body.appendChild(clonedElement);
      clonedElement.style.display = "block";
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";

      html2pdf()
        .set(opt)
        .from(clonedElement)
        .save()
        .then(() => {
          document.body.removeChild(clonedElement);
        })
        .catch((err) => {
          console.error("Error generating PDF:", err);
          document.body.removeChild(clonedElement);
        });
    }
  };

  const handleViewPrescription = (prescription: any) => {
    setCurrentPrescription(prescription);
    setPrescriptionViewOpen(true);
  };

  const handleDownloadViewedPrescription = () => {
    if (currentPrescription) {
      const element = document.getElementById(
        `prescription-view-content-${currentPrescription._id}`
      );
      if (element) {
        const opt = {
          margin: 1,
          filename: `prescription-${currentPrescription._id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
          },
        };

        // html2pdf() does not require cloning when called on a visible element
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .catch((err) => {
            console.error("Error generating PDF:", err);
          });
      }
    }
  };

  const totalPatients = filteredPatients.length;
  const totalPages = Math.ceil(totalPatients / rowsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Management</h1>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle>Patients</CardTitle>
          <CardDescription>
            Manage patient accounts and profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  className="px-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
              <span>Rows per page&nbsp;</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="border rounded px-2 py-1"
              >
                {[5, 10, 25, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>
                {totalPatients === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                      currentPage * rowsPerPage,
                      totalPatients
                    )}`}{" "}
                of {totalPatients}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Email ID</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Order Amount</TableHead>
                  <TableHead>Com HairTest</TableHead>
                  <TableHead>Last Login</TableHead>
                  {/* <TableHead>Cart</TableHead> */}
                  {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={11}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-red-500">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : paginatedPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11}>No patients found.</TableCell>
                  </TableRow>
                ) : (
                  paginatedPatients.map((patient: any) => (
                    <TableRow key={patient._id}>
                      <TableCell className="font-medium">
                        {patient.fullname}
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.mobile}</TableCell>
                      <TableCell>{patient.orders}</TableCell>
                      <TableCell>₹ {patient.orderAmount}</TableCell>
                      <TableCell>
                        {patient.completedHairTest ? "Yes" : "No"}
                      </TableCell>

                      <TableCell>
                        {formatDate(patient.lastLogin)}
                      </TableCell>
                      <TableCell>
                        {/* <div className="flex items-center">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span>{patient.cartItems}</span>
                        </div> */}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewUserDetails(patient)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => deleteUser(patient._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls (Bottom) */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {totalPatients} total patients.
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
        <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-4xl h-[90vh] sm:h-[85vh] md:h-[80vh] p-0 overflow-hidden flex flex-col">
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 border-b">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  Patient Details
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Detailed information about the selected patient.
                </DialogDescription>
              </DialogHeader>
            </div>
            {selectedUser && (
              <ScrollArea className="flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 overflow-y-auto">
                <div className="space-y-4 sm:space-y-6">
                  {/* Patient Profile Section */}
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-muted/30 p-3 sm:p-4 rounded-lg">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-[#209fd9] flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
                      {selectedUser.fullname
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div className="space-y-1 text-sm sm:text-base">
                      <h3 className="text-lg sm:text-xl font-bold">
                        {selectedUser.fullname}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Patient ID: {selectedUser.id}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {selectedUser.email}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {selectedUser.mobile}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <Button
                      variant={
                        activeTab === "login-history" ? "default" : "outline"
                      }
                      className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                      onClick={() => setActiveTab("login-history")}
                    >
                      <History className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Login History</span>
                      <span className="sm:hidden">Login</span>
                    </Button>
                    <Button
                      variant={
                        activeTab === "hair-tests" ? "default" : "outline"
                      }
                      className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                      onClick={() => setActiveTab("hair-tests")}
                    >
                      <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Hair Tests</span>
                      <span className="sm:hidden">Tests</span>
                    </Button>
                    <Button
                      variant={activeTab === "orders" ? "default" : "outline"}
                      className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                      onClick={() => setActiveTab("orders")}
                    >
                      <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Orders</span>
                      <span className="sm:hidden">Orders</span>
                    </Button>
                    <Button
                      variant={
                        activeTab === "prescriptions" ? "default" : "outline"
                      }
                      className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                      onClick={() => setActiveTab("prescriptions")}
                    >
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Prescriptions</span>
                      <span className="sm:hidden">Rx</span>
                    </Button>
                  </div>

                  {/* Content Section */}
                  <div className="mt-4 sm:mt-6">
                    <div className="overflow-x-auto">
                      {activeTab === "login-history" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">
                                Date
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Time
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Device
                              </TableHead>
                             
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loading ? (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                  Loading...
                                </TableCell>
                              </TableRow>
                            ) : patientDetails?.loginHistory?.length > 0 ? (
                              patientDetails.loginHistory.map((log, index) => (
                                <TableRow key={log.loginTime + index}>
                                  <TableCell className="text-xs sm:text-sm">
                                    {formatDate(log.loginTime)}
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">
                                    {formatTime(log.loginTime)}
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">
                                    {log.os}
                                  </TableCell>
                                  
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                  No login history found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}

                      {activeTab === "hair-tests" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">
                                Test ID
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Date
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Progress
                              </TableHead>
                              
                              <TableHead className="text-xs sm:text-sm">
                                Status
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loading ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  Loading...
                                </TableCell>
                              </TableRow>
                            ) : patientDetails?.hairTests?.length > 0 ? (
                              patientDetails.hairTests.map((test) => (
                                <TableRow key={test.id}>
                                  <TableCell className="text-xs sm:text-sm">
                                    {test._id}
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">
                                  {formatDate (test.createdAt)}
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">
                                    {test.progress}%
                                  </TableCell>
                                 
                                  <TableCell className="text-xs sm:text-sm">
                                    {test.status}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  No hair tests found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}

                      {activeTab === "orders" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">
                                Order ID
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Date
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Amount
                              </TableHead>
                              <TableHead className="text-xs sm:text-sm">
                                Status
                              </TableHead>
                              {/* <TableHead className="text-xs sm:text-sm text-right">
                                Actions
                              </TableHead> */}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loading ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  Loading...
                                </TableCell>
                              </TableRow>
                            ) : patientDetails?.orders?.length > 0 ? (
                              patientDetails.orders.map((order) => (
                                <React.Fragment key={order._id}>
                                  <TableRow>
                                    <TableCell className="text-xs sm:text-sm">
                                      {order._id}
                                    </TableCell>
                                    <TableCell className="text-xs sm:text-sm">
                                      {formatDate(order.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-xs sm:text-sm">
                                      Rs. {order.totalAmount}
                                    </TableCell>
                                    <TableCell className="text-xs sm:text-sm">
                                      {order.status}
                                    </TableCell>
                                    {/* <TableCell className="text-right">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleDownloadInvoice(order._id)
                                        }
                                        className="flex items-center gap-1"
                                      >
                                        <Download className="h-3 w-3" />
                                        <span className="hidden sm:inline">
                                          Download
                                        </span>
                                      </Button>
                                    </TableCell> */}
                                  </TableRow>
                                  {/* Hidden div for PDF generation */}
                                  <div
                                    id={`invoice-${order._id}`}
                                    style={{ display: "none" }}
                                  >
                                    <div className="p-8">
                                      <div className="text-center mb-4">
                                        <h1 className="text-xl font-bold">
                                          INVOICE
                                        </h1>
                                      </div>
                                      <div className="mb-4">
                                        <p>
                                          <strong>Order ID:</strong> {order._id}
                                        </p>
                                        <p>
                                          <strong>Date:</strong>{" "}
                                          {formatDate(order.createdAt)}
                                        </p>
                                        <p>
                                          <strong>Total Amount:</strong> Rs.{" "}
                                          {order.totalAmount}
                                        </p>
                                        <p>
                                          <strong>Status:</strong>{" "}
                                          {order.status}
                                        </p>
                                      </div>
                                      <table className="w-full border-collapse">
                                        <thead>
                                          <tr>
                                            <th className="border p-2">
                                              Product
                                            </th>
                                            <th className="border p-2">
                                              Quantity
                                            </th>
                                            <th className="border p-2">
                                              Price
                                            </th>
                                            <th className="border p-2">
                                              Total
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {order.products?.map(
                                            (product, index) => (
                                              <tr key={index}>
                                                <td className="border p-2">
                                                  {product.item?.name}
                                                </td>
                                                <td className="border p-2">
                                                  {product.quantity}
                                                </td>
                                                <td className="border p-2">
                                                  Rs. {product.item?.price}
                                                </td>
                                                <td className="border p-2">
                                                  Rs.{" "}
                                                  {product.quantity *
                                                    product.item?.price}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </React.Fragment>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  No orders found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}

                      {activeTab === "prescriptions" && (
                        <div className="space-y-3 sm:space-y-4">
                          {loading ? (
                            <div className="text-center py-4">Loading...</div>
                          ) : patientDetails?.prescriptions?.length > 0 ? (
                            patientDetails.prescriptions?.map((pres) => (
                              <Card key={pres._id}>
                                <CardHeader className="p-3 sm:p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <CardTitle className="text-base sm:text-lg">
                                        Prescription
                                      </CardTitle>
                                      <CardDescription className="text-xs sm:text-sm">
                                        Prescribed by {pres.doctor}
                                      </CardDescription>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleViewPrescription(pres)
                                      }
                                      className="flex items-center gap-1"
                                    >
                                      <span className="hidden sm:inline">
                                        View
                                      </span>
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="text-xs sm:text-sm">
                                          Medicine Name
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                          Route
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                          SubCategory
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                          Quantity
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                          Frequency
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                          Duration
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {pres?.test6.medicines?.map(
                                        (kit, kitIndex) => (
                                          <React.Fragment key={kitIndex}>
                                            {Object.keys(kit.medicines).map(
                                              (medicineName) => {
                                                const medicine =
                                                  kit.medicines[medicineName];
                                                return (
                                                  <TableRow key={medicineName}>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicineName}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicine.route}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicine.subCategory}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicine.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicine.frequency}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm">
                                                      {medicine.duration}
                                                    </TableCell>
                                                  </TableRow>
                                                );
                                              }
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="text-center py-4">
                              No prescriptions found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
            <DialogFooter className="p-3 sm:p-4 md:p-6 border-t">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                  onClick={() => setUserDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prescription View Dialog */}
      <Dialog
        open={prescriptionViewOpen}
        onOpenChange={setPrescriptionViewOpen}
      >
        <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-4xl h-[90vh] sm:h-[85vh] md:h-[80vh] p-0 overflow-hidden flex flex-col">
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6 border-b">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  Prescription Details
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Detailed information about the selected prescription.
                </DialogDescription>
              </DialogHeader>
            </div>
            {currentPrescription && (
              <ScrollArea className="flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 overflow-y-auto">
                {/* Content for PDF generation */}
                <div
                  id={`prescription-view-content-${currentPrescription._id}`}
                  className="report-container page-break-2"
                  style={{
                    padding: "20px",
                    fontFamily: "Arial, sans-serif",
                    border: "1px solid #ccc",
                    maxWidth: "800px",
                    margin: "auto",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    {/* Logos (adjust paths and styling as needed) */}
                    {/* Uncomment and adjust paths if you have these logos */}
                    {/* <img
                      className="rx-logo"
                      src="/RX.png"
                      alt="RX Logo"
                      style={{ height: "50px", marginBottom: "10px" }}
                    /> */}
                    <img
                      className="logo-main"
                      src="/assets/img/logo.png"
                      alt="Main Logo"
                      style={{ height: "60px", marginBottom: "10px" }}
                    />
                    <h1
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: "0",
                      }}
                    >
                      MEDICAL PRESCRIPTION
                    </h1>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                      Date:{" "}
                      {formatDate(
                        currentPrescription?.createdAt || new Date()
                      )}
                    </p>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        fontWeight: "bold",
                      }}
                    >
                      Ref no: <span>{currentPrescription?._id || "N/A"}</span>
                    </div>
                  </div>

                  {/* Patient Details */}
                  <div
                    style={{
                      marginBottom: "20px",
                      paddingBottom: "15px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Patient Information
                    </h2>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        fontSize: "14px",
                      }}
                    >
                      <p>
                        <strong>Patient Name:</strong>{" "}
                        {selectedUser?.fullname || "N/A"}
                      </p>
                      <p>
                        <strong>Patient ID:</strong>{" "}
                        {selectedUser?._id || "N/A"}
                      </p>
                      {/* Add age and gender if available in selectedUser data */}
                      <p>
                        <strong>Age:</strong> {selectedUser?.age || "N/A"}
                      </p>
                      <p>
                        <strong>Gender:</strong> {selectedUser?.gender || "N/A"}
                      </p>
                      <p style={{ gridColumn: "span 2" }}>
                        {" "}
                        {/* Span two columns */}
                        <strong>Phone:</strong> {selectedUser?.mobile || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Doctor's Note / Provisional Diagnosis */}
                  {currentPrescription?.doctorsNote && (
                    <div
                      style={{
                        marginBottom: "20px",
                        paddingBottom: "15px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        Doctor's Note / Provisional Diagnosis
                      </h2>
                      <p style={{ fontSize: "14px" }}>
                        {currentPrescription.doctorsNote}
                      </p>
                    </div>
                  )}

                  {/* Lab Tests (if available in data) */}
                  {currentPrescription?.labTests &&
                    currentPrescription.labTests.length > 0 && (
                      <div
                        style={{
                          marginBottom: "20px",
                          paddingBottom: "15px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          Lab Tests
                        </h2>
                        <ul
                          style={{
                            fontSize: "14px",
                            listStyleType: "disc",
                            marginLeft: "20px",
                          }}
                        >
                          {currentPrescription.labTests.map((test, index) => (
                            <li key={index}>{test}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Medications */}
                  <div style={{ marginBottom: "30px" }}>
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Rx
                    </h2>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "1px solid #ddd",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            Medicine Name
                          </th>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            Route
                          </th>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            SubCategory
                          </th>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            Quantity
                          </th>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            Frequency
                          </th>
                          <th
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              textAlign: "left",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Map through prescription medicines */}
                        {currentPrescription?.test6?.medicines?.map(
                          (kit, kitIndex) => (
                            <React.Fragment key={kitIndex}>
                              {Object.keys(kit.medicines).map(
                                (medicineName, medicineIndex) => {
                                  const medicine = kit.medicines[medicineName];
                                  return (
                                    <tr key={medicineIndex}>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicineName || "N/A"}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicine?.route || "N/A"}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicine?.subCategory || "N/A"}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicine?.quantity || "N/A"}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicine?.frequency || "N/A"}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                        }}
                                      >
                                        {medicine?.duration || "N/A"}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                    {/* Additional notes for medicines if available in data */}
                    {/* Example: */}
                    {/* {currentPrescription?.test6?.medicine?.option?.split('\n').map((line, index) => <div key={index} style={{ fontSize: "14px", marginTop: "5px" }}>{line}</div>)} */}
                  </div>

                  {/* Doctor Info */}
                  <div
                    className="heading-container item2559"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "30px",
                    }}
                  >
                    <div>
                      {/* Doctor's Signature (adjust path and styling as needed) */}
                      <img
                        className="img-sign"
                        src="/Amit-Sir---Signature.png"
                        alt="Doctor's Signature"
                        style={{ height: "50px", marginBottom: "10px" }}
                      />
                      <h4
                        style={{
                          color: "#008CD7",
                          fontWeight: "600",
                          margin: 0,
                        }}
                      >
                        {currentPrescription?.doctor || "N/A"}
                      </h4>
                      {/* Add other doctor details if available in currentPrescription or patientDetails */}
                      {/* Example: */}
                      {/* <div style={{ fontSize: "14px", fontWeight: "600" }}>
                           MBBS, MD, FCPS,DDV
                         </div>
                         <div style={{ fontSize: "14px", fontWeight: "600" }}>
                           Fellowship in Hair Transplant
                         </div>
                         <div style={{ fontSize: "14px", fontWeight: "600" }}>
                           Reg. No,- 06/07/2868
                         </div> */}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div
                    className="dec-container"
                    style={{ margin: "50px 0 0 0" }}
                  >
                    <p style={{ fontWeight: "bold" }}>Disclaimer</p>
                  </div>
                  <div
                    className="disclaimer"
                    style={{ fontSize: "12px", color: "#777" }}
                  >
                    <div>
                      1. The information and advice provided here is provisional
                      in nature as it is based on the limited information made
                      available by the patient.
                    </div>
                    <div>
                      2. The information is confidential in nature and for
                      recipients use only.
                    </div>
                    <div>
                      3.The Prescription is generated on a Teleconsultation.
                    </div>
                    <div>4. Not Valid for Medico-legal purpose.</div>
                  </div>
                </div>
              </ScrollArea>
            )}
            <DialogFooter className="p-3 sm:p-4 md:p-6 border-t">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                  onClick={() => setPrescriptionViewOpen(false)}
                >
                  Close
                </Button>
                {currentPrescription && (
                  <Button
                    className="flex-1 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                    onClick={handleDownloadViewedPrescription}
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* <AddPatientModalff
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPatient}
      /> */}
    </DashboardLayout>
  );
};

export default PatientManagement;
