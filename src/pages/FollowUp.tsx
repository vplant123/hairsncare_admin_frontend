import React, { useState, useEffect } from "react";
import BASE_URL from "../Config";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Search, Filter, FileText, CheckCircle, Pill } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

interface FollowUp {
  _id: string;
  userId?: { fullname: string };
  personal?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    ageRange?: string;
    ["Select your age group"]?: string;
    Gender?: { src?: string };
    createdAt?: string;
    progress?: number;
  };
  status?: string;
  orders?: { amount?: number };
  followUps?: Array<{
    _id: string;
    doctorId: string;
    appointmentDate: string;
    timeSlot: string;
    status: string;
    doctorNotes?: string;
    createdAt: string;
  }>;
  appointments?: Array<{
    _id: string;
    appointmentDate: string;
    timeSlot: string;
    status: string;
    Method?: string; // Added Method property
  }>;
}

const FollowUp = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [hairTests, setHairTests] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [doctorsList, setDoctorsList] = useState<any>();
  const [assignResponse, setAssignResponse] = useState({
    message: "",
    type: "",
  });

  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedTestForFollowUp, setSelectedTestForFollowUp] =
    useState<FollowUp | null>(null);
  const [followUpData, setFollowUpData] = useState({
    followupOf: "",
    doctorId: "",
    appointmentDate: "",
    timeSlot: "",
    status: "pending",
    doctorNotes: "",
  });

  const [scheduleAppointment, setScheduleAppointment] = useState({
    doctorId: "",
    appointmentDate: "",
    timeSlot: "",
    hairTestId: "",
  });

  // Pagination state for All Hair Tests
  const [allCurrentPage, setAllCurrentPage] = useState(1);
  const [allRowsPerPage, setAllRowsPerPage] = useState(10);

  // Pagination state for Pending Tests
  const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
  const [pendingRowsPerPage, setPendingRowsPerPage] = useState(10);

  const pendingTests = hairTests.filter(
    test => test.status?.toLowerCase() === "pending"
  );

  const completedTests = hairTests.filter(
    test => test.status?.toLowerCase() === "completed"
  );

  // Filter hair tests based on search query for All tab
  const filteredAllHairTests = hairTests.filter(test => {
    const query = searchQuery.toLowerCase();
    const name = test.personal?.name?.toLowerCase() || "";
    const email = test.personal?.email?.toLowerCase() || "";
    const phoneNumber = test.personal?.phoneNumber?.toLowerCase() || "";

    return (
      name.includes(query) ||
      email.includes(query) ||
      phoneNumber.includes(query)
    );
  });

  // Pagination calculations for All Hair Tests
  const totalAllHairTests = filteredAllHairTests.length;
  const totalAllPages = Math.ceil(totalAllHairTests / allRowsPerPage);

  const paginatedAllHairTests = filteredAllHairTests.slice(
    (allCurrentPage - 1) * allRowsPerPage,
    allCurrentPage * allRowsPerPage
  );

  // Pagination calculations for Pending Tests
  const totalPendingTests = pendingTests.length;
  const totalPendingPages = Math.ceil(totalPendingTests / pendingRowsPerPage);

  const paginatedPendingTests = pendingTests.slice(
    (pendingCurrentPage - 1) * pendingRowsPerPage,
    pendingCurrentPage * pendingRowsPerPage
  );

  // Pagination state for Completed Tests
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);
  const [completedRowsPerPage, setCompletedRowsPerPage] = useState(10);

  // Pagination calculations for Completed Tests
  const totalCompletedTests = completedTests.length;
  const totalCompletedPages = Math.ceil(
    totalCompletedTests / completedRowsPerPage
  );

  const paginatedCompletedTests = completedTests.slice(
    (completedCurrentPage - 1) * completedRowsPerPage,
    completedCurrentPage * completedRowsPerPage
  );

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Pagination state for Prescriptions
  const [prescriptionCurrentPage, setPrescriptionCurrentPage] = useState(1);
  const [prescriptionRowsPerPage, setPrescriptionRowsPerPage] = useState(10);

  // Filter and paginate prescriptions
  const filteredPrescriptions = Orders.filter(order => {
    const query = searchQuery.toLowerCase();
    const name = order.personalId?.name?.toLowerCase() || "";
    const email = order.personalId?.email?.toLowerCase() || "";
    const productName =
      order.productId?.map(p => p.name.toLowerCase()).join(", ") || "";

    return (
      name.includes(query) ||
      email.includes(query) ||
      productName.includes(query)
    );
  });

  const totalPrescriptionOrders = filteredPrescriptions.length;
  const totalPrescriptionPages = Math.ceil(
    totalPrescriptionOrders / prescriptionRowsPerPage
  );

  const paginatedPrescriptions = filteredPrescriptions.slice(
    (prescriptionCurrentPage - 1) * prescriptionRowsPerPage,
    prescriptionCurrentPage * prescriptionRowsPerPage
  );

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/hair-tests/getall`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Fetched Hair Tests:", data);
      setHairTests(data?.message || []);
    } catch (error) {
      console.log("Error while fetching hair tests data", error);
    }
  };

  const handleFetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getOrders`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Fetched Orders:", data);
      setOrders(data?.data || []);
    } catch (error) {
      console.log("Error while fetching orders data", error);
    }
  };
  const sendWhatsapp = async userId => {
    console.log("Starting WhatsApp send process for userId:", userId);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        toast("No authorization token found", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
        return;
      }

      if (!userId) {
        console.error("No userId provided");
        toast("User ID not found", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
        return;
      }

      console.log("Making API call to send WhatsApp...");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/sendWhatsapp?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response status:", response.status);
      const data = await response.json();
      console.log("API Response data:", data);

      if (!response.ok) {
        console.error("API call failed:", data);
        toast(data.message || "Failed to send WhatsApp message", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
        return;
      }

      console.log("API call successful, showing success toast");
      toast(data.message || "WhatsApp message sent successfully", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error in sendWhatsapp:", error);
      toast(error.message || "Error sending WhatsApp message", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    }
  };
  const handleFetchDoctor = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/all-doctor-Data`,
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
    handleFetchOrders();
    handleFetchDoctor();
  }, []);

  const handleFollowUp = (test: FollowUp) => {
    console.log("Starting follow-up process for test:", test);
    setSelectedTestForFollowUp(test);
    setFollowUpData(prev => ({
      ...prev,
      followupOf: test._id,
    }));
    setIsFollowUpModalOpen(true);
  };

  const handleSubmitFollowUp = async () => {
    console.log("Submit follow-up initiated");
    console.log("Current follow-up data:", followUpData);
    console.log("Selected test for follow-up:", selectedTestForFollowUp);

    // Validate required fields
    if (
      !followUpData.doctorId ||
      !followUpData.appointmentDate ||
      !followUpData.timeSlot
    ) {
      console.error("Missing required fields:", {
        doctorId: !followUpData.doctorId,
        appointmentDate: !followUpData.appointmentDate,
        timeSlot: !followUpData.timeSlot,
      });
      toast("Please fill in all required fields", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authorization token found");
      toast("No authorization token found", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const requestData = {
        doctorId: followUpData.doctorId,
        appointmentDate: followUpData.appointmentDate,
        timeSlot: followUpData.timeSlot,
        status: "pending",
        doctorNotes: followUpData.doctorNotes || "",
        followupOf: selectedTestForFollowUp,
      };

      console.log("Preparing API request with data:", requestData);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/create-Followup-Appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log("API Response status:", response.status);
      const result = await response.json();
      console.log("API Response data:", result);

      if (response.ok) {
        console.log("Follow-up created successfully");
        toast("Follow-up appointment created successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
        setIsFollowUpModalOpen(false);
        setFollowUpData({
          followupOf: "",
          doctorId: "",
          appointmentDate: "",
          timeSlot: "",
          status: "pending",
          doctorNotes: "",
        });
        console.log("State reset completed");
        await handleFetchData();
        console.log("Data refreshed");
      } else {
        console.error("Failed to create follow-up:", result.message);
        toast(result.message || "Failed to create follow-up", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error in follow-up creation:", error);
      toast("Error creating follow-up", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    }
  };

  const handleSubmitSchedule = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("No authorization token found", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      return;
    }

    if (
      !scheduleAppointment.doctorId ||
      !scheduleAppointment.appointmentDate ||
      !scheduleAppointment.timeSlot
    ) {
      toast("Please fill in all required fields", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/assignAppointmentToDoctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId: scheduleAppointment.doctorId,
            appointmentDate: scheduleAppointment.appointmentDate,
            timeSlot: scheduleAppointment.timeSlot,
            hairTestId: scheduleAppointment.hairTestId,
            followupOf: scheduleAppointment.hairTestId,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast("Appointment scheduled successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
        setIsModalOpen(false);
        setScheduleAppointment({
          doctorId: "",
          appointmentDate: "",
          timeSlot: "",
          hairTestId: "",
        });
        await handleFetchData();
      } else {
        toast(result.message || "Failed to schedule appointment", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast("Error scheduling appointment", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      console.error("Error scheduling appointment:", error);
    }
  };

  const viewReport = async (testId, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/hair-tests/getall`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.success) {
        const test = data.message.find(t => t._id === testId);
        if (test) {
          setSelectedTest(test);
          setIsCompletedModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  };

  const viewOrderDetails = async orderId => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/order-details`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSelectedOrder(data.data.order);
        setSelectedAppointment(data.data.appointments?.[0] || null);
        setIsOrderModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleAssignDoctor = async () => {
    if (!selectedDoctor || !selectedOrder?._id) {
      console.log("Doctor or order not selected.");
      toast("Please select a doctor", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/assignDoctorForPrescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            orderId: selectedOrder._id,
            doctorId: selectedDoctor,
            items: selectedOrder.products,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Doctor assigned successfully:", result);
        toast(result.message || "Doctor assigned successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
        setTimeout(() => {
          setIsOrderModalOpen(false);
          setSelectedDoctor("");
          setAssignResponse({ message: "", type: "" });
          handleFetchOrders();
        }, 2000);
      } else {
        console.error("Failed to assign doctor:", result.message);
        toast(result.message || "Failed to assign doctor", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error assigning doctor:", error);
      toast("Error assigning doctor", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    }
  };

  const handleViewPrescription = async orderId => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/order-details`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSelectedPrescription(data.data.order);
        setIsPrescriptionModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching prescription details:", error);
      toast.error("Error fetching prescription details");
    }
  };

  return (
    <DashboardLayout>
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Follow Up Tests</h1>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger
            value="completed"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
          >
            Completed Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed" className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle>Completed Tests</CardTitle>
              <CardDescription>
                View and manage completed hair test appointments and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search completed tests..."
                      className="px-10"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Pagination Controls for Completed Hair Tests */}
              <div className="flex flex-col sm:flex-row items-center justify-between my-4">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                  <span className="text-sm font-medium">Rows per page:</span>
                  <select
                    value={completedRowsPerPage}
                    onChange={e => {
                      setCompletedRowsPerPage(Number(e.target.value));
                      setCompletedCurrentPage(1); // Reset to first page
                    }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[5, 10, 25, 50].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 text-md">
                  <span className="mr-4 ">
                    {completedCurrentPage} of {totalCompletedPages}
                  </span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Created Date & Time</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Email Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Amount</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Scheduled Date & Time</TableHead>

                    <TableHead>Action</TableHead>
                    <TableHead>Final Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCompletedTests.map(test => (
                    <TableRow key={test._id}>
                      <TableCell>
                        {test.appointments?.[0]?.createdAt
                          ? `${new Date(
                              test.appointments[0].createdAt
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })} ${new Date(
                              test.appointments[0].createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : ""}
                      </TableCell>
                      <TableCell className="font-medium">
                        {test.personal?.name || ""}
                      </TableCell>
                      <TableCell>{test.personal?.phoneNumber || ""}</TableCell>
                      <TableCell>{test.personal?.email || ""}</TableCell>
                      <TableCell>
                        {/* <span
                          className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            test.status?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : test.status?.toLowerCase() === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {test.status || "Unknown"}
                        </span> */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto bg-primary hover:bg-health-primary/90 text-white px-4 py-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                          onClick={() => {
                            const baseUrl = `${import.meta.env.VITE_FRONTEND_URL}`;
                            const path = "patient-test-result";
                            const userId = test?.userId?._id;
                            const appointmentId = test?.appointments?.[0]?._id;
                            const testId = test?._id;

                            if (userId && testId && appointmentId) {
                              window.open(
                                `${baseUrl}/${path}/${userId},${appointmentId},${testId}`,
                                "_blank"
                              );
                            } else {
                              toast.error(
                                "Missing required data for this report."
                              );
                            }
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          View Old Test
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                            test.orders?.amount === 300
                              ? "bg-green-100"
                              : test.orders?.amount === 150
                                ? "bg-blue-100"
                                : typeof test.orders?.amount !== "number"
                                  ? "bg-yellow-100"
                                  : "bg-gray-100" // Default neutral if none match
                          } text-gray-700`}
                        >
                          {test.orders?.amount
                            ? `₹ ${test.orders.amount}`
                            : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>{test?.progress || ""}%</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                            test.appointments?.[0]?.Method?.toLowerCase() ===
                            "video call"
                              ? "bg-green-100"
                              : test.appointments?.[0]?.Method?.toLowerCase() ===
                                  "audio call"
                                ? "bg-blue-100"
                                : "bg-gray-100"
                          } text-gray-700`}
                        >
                          {test.appointments?.[0]?.Method || "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {test.appointments?.[0]?.appointmentDate
                          ? new Date(
                              test.appointments[0].appointmentDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                        {test.appointments?.[0]?.timeSlot
                          ? ` (${test.appointments[0].timeSlot})`
                          : ""}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex flex-col gap-2 items-end">
                          {test.status?.toLowerCase() === "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[180px] flex items-center justify-center gap-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-colors"
                              onClick={() => handleFollowUp(test)}
                            >
                              <span>Schedule Follow Up</span>
                            </Button>
                          )}
                          {test.status?.toLowerCase() === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[180px] flex items-center justify-center gap-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-colors"
                              onClick={() => {
                                setSelectedTest(test);
                                setScheduleAppointment(prev => ({
                                  ...prev,
                                  hairTestId: test._id,
                                }));
                                setIsModalOpen(true);
                              }}
                            >
                              <span>Schedule Appointment</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-health-primary"
                          onClick={() => viewReport(test._id, test.status)}
                        >
                          {test.status?.toLowerCase() === "completed" ? (
                            <>
                              <FileText className="h-3 w-3" />
                              <span>Report sent</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3" />
                              <span>View report</span>
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls (Bottom) for Completed Hair Tests */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {totalCompletedTests} total results.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompletedCurrentPage(1)}
                    disabled={
                      completedCurrentPage === 1 || totalCompletedPages === 0
                    }
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCompletedCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={
                      completedCurrentPage === 1 || totalCompletedPages === 0
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCompletedCurrentPage(prev =>
                        Math.min(prev + 1, totalCompletedPages)
                      )
                    }
                    disabled={
                      completedCurrentPage === totalCompletedPages ||
                      totalCompletedPages === 0
                    }
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompletedCurrentPage(totalCompletedPages)}
                    disabled={
                      completedCurrentPage === totalCompletedPages ||
                      totalCompletedPages === 0
                    }
                  >
                    Last
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Completed Test Report Modal */}
      <Dialog
        open={isCompletedModalOpen}
        onOpenChange={setIsCompletedModalOpen}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedTest && (
            <div className="space-y-6 overflow-y-auto">
              <DialogHeader className="sticky top-0 z-10 pb-4">
                <DialogTitle>Completed Test Report</DialogTitle>
                <DialogDescription>
                  View and manage completed test report
                </DialogDescription>
              </DialogHeader>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name</label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedTest.personal?.name || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedTest.personal?.email || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedTest.personal?.phoneNumber || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age Range</label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {selectedTest.personal?.ageRange ||
                      selectedTest.personal?.["Select your age group"] ||
                      "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    <span className="text-green-600">
                      {selectedTest.status || "Completed"}
                    </span>
                  </div>
                </div>
              </div> */}

              {/* Appointment Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Appointment Details
                </h3>
                {selectedTest.appointments &&
                selectedTest.appointments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Appointment ID
                      </label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0]._id || "-"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        <span
                          className={`${
                            selectedTest.appointments[0].status?.toLowerCase() ===
                            "pending"
                              ? "text-yellow-600"
                              : selectedTest.appointments[0].status?.toLowerCase() ===
                                  "completed"
                                ? "text-green-600"
                                : "text-blue-600"
                          }`}
                        >
                          {selectedTest.appointments[0].status || "Unknown"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Slot</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].timeSlot || "-"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Doctor</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].doctorId?.name || "-"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Appointment Date
                      </label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].appointmentDate
                          ? new Date(
                              selectedTest.appointments[0].appointmentDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Created At</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].createdAt
                          ? new Date(
                              selectedTest.appointments[0].createdAt
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 border rounded-md bg-gray-50">
                    <p className="text-gray-500 text-sm">
                      No appointment details available
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                {selectedTest.status === "completed" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_FRONTEND_URL}/doctor-analyse-report/${selectedTest.appointments[0]._id}`,
                          "_blank"
                        )
                      }
                    >
                      <FileText className="h-4 w-4" />
                      Generate Assessment Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_FRONTEND_URL}/management-report/${selectedTest.appointments[0]._id}`,
                          "_blank"
                        )
                      }
                    >
                      <FileText className="h-4 w-4" />
                      Generate Management Report
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_FRONTEND_URL}/doctor/report/${selectedTest.appointments[0]._id}`,
                          "_blank"
                        )
                      }
                    >
                      <FileText className="h-4 w-4" />
                      Generate Prescription
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Report Send Complete
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
                )}
                <div className="flex flex-col sm:flex-row justify-end gap-3  mt-4 sticky bottom-0  ">
                  <Button
                    variant="outline"
                    onClick={() => setIsCompletedModalOpen(false)}
                    className="w-full sm:w-auto px-6 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                  >
                    Close
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-primary hover:bg-health-primary/90 text-white px-6 transition-colors duration-200 flex items-center justify-center gap-2"
                    onClick={() => {
                      const baseUrl = `${import.meta.env.VITE_FRONTEND_URL}`;
                      const path = "patient-test-result";
                      const userId = selectedTest?.userId?._id;
                      const appointmentId =
                        selectedTest?.appointments?.[0]?._id;
                      const testId = selectedTest?._id;

                      if (userId && testId && appointmentId) {
                        window.open(
                          `${baseUrl}/${path}/${userId},${appointmentId},${testId}`,
                          "_blank"
                        );
                      } else {
                        toast.error("Missing required data for this report.");
                      }
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View Test Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Schedule an appointment for the patient
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Doctor *</label>
              <Select
                value={scheduleAppointment.doctorId}
                onValueChange={value => {
                  console.log("Doctor selected:", value);
                  setScheduleAppointment(prev => ({
                    ...prev,
                    doctorId: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {doctorsList?.map(doctor => (
                    <SelectItem key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Appointment Date *</label>
              <Input
                type="date"
                value={scheduleAppointment.appointmentDate}
                onChange={e => {
                  console.log("Date selected:", e.target.value);
                  setScheduleAppointment(prev => ({
                    ...prev,
                    appointmentDate: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Slot *</label>
              <Select
                value={scheduleAppointment.timeSlot}
                onValueChange={value => {
                  console.log("Time slot selected:", value);
                  setScheduleAppointment(prev => ({
                    ...prev,
                    timeSlot: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time Slot" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="noon">Noon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log("Cancel button clicked");
                  setIsModalOpen(false);
                  setError("");
                  setScheduleAppointment({
                    doctorId: "",
                    appointmentDate: "",
                    timeSlot: "",
                    hairTestId: "",
                  });
                  console.log("Schedule form reset");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Schedule appointment button clicked");
                  handleSubmitSchedule();
                }}
                className="bg-primary hover:bg-health-primary/90"
              >
                Schedule Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View and manage order information
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Order Details Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Order ID</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder._id || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">User Name</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.userId?.fullname || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Order Type</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.orderType || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <div className="p-2 border rounded-md text-sm">
                      <span
                        className={`${
                          selectedOrder.status?.toLowerCase() === "pending"
                            ? "text-yellow-600"
                            : selectedOrder.status?.toLowerCase() === "paid"
                              ? "text-green-600"
                              : "text-red-600"
                        }`}
                      >
                        {selectedOrder.status || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Delivery Status
                    </label>
                    <div className="p-2 border rounded-md text-sm">
                      <span
                        className={`${
                          selectedOrder.deliveryStatus?.toLowerCase() ===
                          "pending"
                            ? "text-yellow-600"
                            : selectedOrder.deliveryStatus?.toLowerCase() ===
                                "delivered"
                              ? "text-green-600"
                              : selectedOrder.deliveryStatus?.toLowerCase() ===
                                  "canceled"
                                ? "text-red-600"
                                : "text-blue-600"
                        }`}
                      >
                        {selectedOrder.deliveryStatus || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Created At</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.createdAt
                        ? new Date(selectedOrder.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )
                        : ""}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Doctor</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.doctorId?.name || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mt-4">Product Details</h3>
                {selectedOrder.products && selectedOrder.products.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedOrder.products.map((product, index) => (
                      <li key={index} className="text-sm">
                        {product.name} (Quantity: {product.quantity})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 border rounded-md text-sm text-gray-500">
                    No products in this order.
                  </div>
                )}
              </div>

              {/* Assign Doctor Section */}
              <div className="space-y-3 mt-4">
                <h3 className="text-lg font-semibold">Assign Doctor</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Doctor</label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={value => setSelectedDoctor(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {doctorsList.map(doctor => (
                        <SelectItem key={doctor._id} value={doctor._id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAssignDoctor}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Assign Doctor
                </Button>
              </div>

              {/* Success/Error Message */}
              {assignResponse.message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    assignResponse.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {assignResponse.message}
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Follow Up Modal */}
      <Dialog open={isFollowUpModalOpen} onOpenChange={setIsFollowUpModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Follow Up</DialogTitle>
            <DialogDescription>
              Schedule a follow up appointment for the patient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Doctor *</label>
              <Select
                value={followUpData.doctorId}
                onValueChange={value =>
                  setFollowUpData(prev => ({
                    ...prev,
                    doctorId: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {doctorsList?.map(doctor => (
                    <SelectItem key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Appointment Date *</label>
              <Input
                type="date"
                value={followUpData.appointmentDate}
                onChange={e =>
                  setFollowUpData(prev => ({
                    ...prev,
                    appointmentDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Slot *</label>
              <Select
                value={followUpData.timeSlot}
                onValueChange={value =>
                  setFollowUpData(prev => ({
                    ...prev,
                    timeSlot: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time Slot" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="noon">Noon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Doctor Notes</label>
              <textarea
                value={followUpData.doctorNotes}
                onChange={e =>
                  setFollowUpData(prev => ({
                    ...prev,
                    doctorNotes: e.target.value,
                  }))
                }
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Add any notes about the follow-up..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFollowUpModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFollowUp}
                className="bg-primary hover:bg-health-primary/90"
              >
                Schedule Follow Up
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FollowUp;
