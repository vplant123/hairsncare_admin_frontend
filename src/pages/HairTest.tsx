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
import { Eye, Search, Filter, FileText, CheckCircle } from "lucide-react";
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

interface HairTest {
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

const HairTest = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAssignDoctorModalOpen, setIsAssignDoctorModalOpen] = useState(false);

  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [hairTests, setHairTests] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");

  const [doctorsList, setDoctorsList] = useState<any>();
  const [assignResponse, setAssignResponse] = useState({
    message: "",
    type: "",
  });

  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedTestForFollowUp, setSelectedTestForFollowUp] =
    useState<HairTest | null>(null);
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

  const pendingTests = hairTests
    .filter((test) => test.status?.toLowerCase() === "pending")
    .filter((test) => {
      const query = pendingSearchQuery.toLowerCase();
      const name = test.personal?.name?.toLowerCase() || "";
      const email = test.personal?.email?.toLowerCase() || "";
      const phoneNumber = test.personal?.phoneNumber?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        phoneNumber.includes(query)
      );
    });

  // Filter hair tests based on search query for All tab
  const filteredAllHairTests = hairTests.filter((test) => {
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

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hair-tests/getall`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("Fetched Hair Tests:", data);
      setHairTests(data?.data || []);
    } catch (error) {
      console.log("Error while fetching hair tests data", error);
    }
  };

  const handleFetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/getOrders`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("Fetched Orders:", data);
      setOrders(data?.data || []);
    } catch (error) {
      console.log("Error while fetching orders data", error);
    }
  };

  const sendReport = async (hairTestId) => {
    console.log("Starting send report process for hairTestId:", hairTestId);
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

      const response = await fetch(
        `${BASE_URL}/admin/send-report?hairTestId=${hairTestId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Report sent successfully");
      } else {
        toast.error(data.message || "Failed to send report");
      }
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Failed to send report");
    }
  };

  const sendWhatsapp = async (userId) => {
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
        `${BASE_URL}/admin/sendWhatsapp?userId=${userId}`,
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

  const handleFollowUp = (test: HairTest) => {
    console.log("Starting follow-up process for test:", test);
    setSelectedTestForFollowUp(test);
    setFollowUpData((prev) => ({
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
        const test = data.data?.find((t) => t?._id === testId);
        if (test) {
          setSelectedTest(test);
          setIsCompletedModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  };

  const viewOrderDetails = async (orderId) => {
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

  const handleViewPrescription = async (orderId) => {
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

  const setAssignDoctor = (order) => {
    console.log(order);
    setSelectedOrder(order);
    console.log(selectedOrder);
    setIsAssignDoctorModalOpen(true);
  };

  return (
    <DashboardLayout>
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hair Test Management</h1>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList className="flex gap-2 bg-gray-50 p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
          >
            All Hair Test Results
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
          >
            Pending Tests
          </TabsTrigger>
          {/* <TabsTrigger
            value="prescription"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
          >
            Prescription Orders
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle>All Hair Test Results</CardTitle>
              <CardDescription>
                View and manage all hair test appointments and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search tests..."
                      className="px-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Pagination Controls for All Hair Tests */}
              <div className="flex flex-col sm:flex-row items-center justify-between my-4">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                  <span className="text-sm font-medium">Rows per page:</span>
                  <select
                    value={allRowsPerPage}
                    onChange={(e) => {
                      setAllRowsPerPage(Number(e.target.value));
                      setAllCurrentPage(1); // Reset to first page
                    }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[5, 10, 25, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 text-md">
                  <span className="mr-4 ">
                    {allCurrentPage} of {totalAllPages}
                  </span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#209FD9] text-white whitespace-nowrap">
                    <TableHead>Hair Test Date & Time</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Email Id</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date & Time Slot</TableHead>
                    <TableHead>Appointment Status</TableHead>
                    <TableHead>View Hair Test</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Final Status</TableHead>
                    <TableHead>View Final Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="whitespace-nowrap">
                  {paginatedAllHairTests.map((test, index) => (
                    <TableRow
                      key={test._id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                    >
                      <TableCell>
                        {test?.createdAt
                          ? `${new Date(test.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}, ${new Date(test.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}`
                          : ""}
                      </TableCell>
                      <TableCell className="font-medium">
                        {test.personal?.name || ""}
                      </TableCell>
                      <TableCell>{test.personal?.phoneNumber || ""}</TableCell>
                      <TableCell>{test.personal?.email || ""}</TableCell>

                      <TableCell>
                        <span
                          className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                            typeof test.orders?.amount === "number" &&
                            test.orders.amount > 0
                              ? "bg-green-100"
                              : "bg-yellow-100"
                          } text-gray-700`}
                        >
                          {typeof test.orders?.amount === "number" &&
                          test.orders.amount > 0
                            ? `₹ ${test.orders.amount}`
                            : "Not Paid"}
                        </span>
                      </TableCell>

                      <TableCell>
                        {test.appointments?.[0]?.status?.toLowerCase() !==
                          "completed" && (
                          <div className="flex flex-row gap-2 items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[180px] flex items-center justify-center gap-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-colors"
                              onClick={() => sendWhatsapp(test.userId?._id)}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              <span>Send WhatsApp</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>

                      <TableCell>{test.progress || "20"}%</TableCell>
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
                      <TableCell className="whitespace-nowrap">
                        {test.appointments?.[0]?.appointmentDate &&
                        test.appointments?.[0]?.timeSlot
                          ? `${new Date(
                              test.appointments[0].appointmentDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })} (${test.appointments[0].timeSlot})`
                          : test.appointments?.[0]?.appointmentDate
                            ? new Date(
                                test.appointments[0].appointmentDate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : test.appointments?.[0]?.timeSlot
                              ? `(${test.appointments[0].timeSlot})`
                              : ""}
                      </TableCell>

                      <TableCell>
                        {(() => {
                          const status =
                            test.appointments?.[0]?.status?.toLowerCase();
                          let bgClass = "bg-gray-100 text-gray-700";
                          let label = "Not Scheduled";

                          if (status === "booked" || status === "assigned") {
                            bgClass = "bg-red-100 text-red-700";
                            label = "Booked";
                          } else if (status === "completed") {
                            bgClass = "bg-green-100 text-green-700";
                            label = "Completed";
                          }

                          return (
                            <span
                              className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-xs font-medium ${bgClass}`}
                            >
                              {label}
                            </span>
                          );
                        })()}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-health-primary"
                        >
                          {test.appointments?.[0]?.status.toLowerCase() ===
                          "completed" ? (
                            <>
                              <FileText className="h-3 w-3" />
                              <span
                                onClick={() =>
                                  viewReport(test._id, test.status)
                                }
                              >
                                Report sent
                              </span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3" />
                              <span
                                onClick={() => {
                                  const baseUrl = `${import.meta.env.VITE_FRONTEND_URL}`;
                                  const path = "test-results";
                                  const testId = test?._id;
                                  const userId = test?.userId?._id;
                                  console.log("userId", userId);
                                  console.log("testId", testId);
                                  // console.log("appointmentId", appointmentId);
                                  if (userId && testId) {
                                    console.log(
                                      "path",
                                      `${baseUrl}/${path}/${testId}`
                                    );
                                    window.open(
                                      `${baseUrl}/${path}/${testId}`,
                                      "_blank"
                                    );
                                  } else {
                                    toast.error(
                                      "Missing required data for this report."
                                    );
                                  }
                                }}
                              >
                                View Hair Test
                              </span>
                            </>
                          )}
                        </Button>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex flex-col gap-2 items-end">
                          {test.appointments?.[0]?.status?.toLowerCase() ===
                            "booked" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[180px] flex items-center justify-center gap-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-colors"
                              onClick={() => {
                                setSelectedTest(test);
                                setScheduleAppointment((prev) => ({
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

                      <TableCell>
                        {" "}
                        {test.appointments?.[0]?.status?.toLowerCase() ===
                          "completed" &&
                          test.appointments?.[0]?.isReportSent == false && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[180px] flex items-center justify-center gap-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-colors"
                              onClick={() => {
                                sendReport(test?.appointments[0]?.hairTestId);
                              }}
                            >
                              <span>Send Report</span>
                            </Button>
                          )}
                      </TableCell>
                      <TableCell>
                        {test.appointments?.[0]?.status?.toLowerCase() ===
                          "completed" &&
                        test.appointments?.[0]?.isReportSent === true ? (
                          <span className="inline-flex items-center justify-center w-36 h-7 rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                            Report Send Completed
                          </span>
                        ) : test.appointments?.[0]?.status?.toLowerCase() !==
                          "completed" ? (
                          <span className="inline-flex items-center justify-center w-28 h-7 rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
                            Report Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-40 h-7 rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                            Report Generated
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {test?.appointments?.[0]?.status?.toLowerCase() ===
                          "completed" && (
                          <button
                            onClick={() =>
                              window.open(
                                `${import.meta.env.VITE_FRONTEND_URL}/doctor-analyse-report/${test.appointments[0]._id}`,
                                "_blank"
                              )
                            }
                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-150"
                          >
                            View Report
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls (Bottom) for All Hair Tests */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {totalAllHairTests} total results.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAllCurrentPage(1)}
                    disabled={allCurrentPage === 1 || totalAllPages === 0}
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAllCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={allCurrentPage === 1 || totalAllPages === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAllCurrentPage((prev) =>
                        Math.min(prev + 1, totalAllPages)
                      )
                    }
                    disabled={
                      allCurrentPage === totalAllPages || totalAllPages === 0
                    }
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAllCurrentPage(totalAllPages)}
                    disabled={
                      allCurrentPage === totalAllPages || totalAllPages === 0
                    }
                  >
                    Last
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 bg-white">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Tests</CardTitle>
              <CardDescription>
                Manage tests with pending status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search pending tests..."
                      className="pl-10"
                      value={pendingSearchQuery}
                      onChange={(e) => setPendingSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Pagination Controls (Top) for Pending Tests - Reverted to native buttons by user */}
              <div className="flex flex-col sm:flex-row items-center justify-between my-4">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                  <span className="text-sm font-medium">Rows per page:</span>
                  <select
                    value={pendingRowsPerPage}
                    onChange={(e) => {
                      setPendingRowsPerPage(Number(e.target.value));
                      setPendingCurrentPage(1); // Reset to first page
                    }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[5, 10, 25, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="mr-4 font-medium">
                    {pendingCurrentPage} of {totalPendingPages}
                  </span>
                  {/* <button
                    onClick={() => setPendingCurrentPage(1)}
                    disabled={pendingCurrentPage === 1}
                    className="px-3 py-1 border rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    First
                  </button> */}
                  {/* <button
                    onClick={() => setPendingCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={pendingCurrentPage === 1}
                    className="px-3 py-1 border-t border-b border-r-0 rounded-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button> */}
                  {/* <button
                    onClick={() =>
                      setPendingCurrentPage(prev => Math.min(prev + 1, totalPendingPages))
                    }
                    disabled={pendingCurrentPage === totalPendingPages}
                    className="px-3 py-1 border-t border-b border-l-0 rounded-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Next
                  </button> */}
                  {/* <button
                    onClick={() => setPendingCurrentPage(totalPendingPages)}
                    disabled={pendingCurrentPage === totalPendingPages}
                    className="px-3 py-1 border rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Last
                  </button> */}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#209FD9] text-white whitespace-nowrap">
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Appointment Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPendingTests.map((test, index) => (
                    <TableRow
                      key={test._id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                    >
                      <TableCell className="font-medium">
                        {test.personal?.name || "N/A"}
                      </TableCell>
                      <TableCell>{test.personal?.email || "N/A"}</TableCell>
                      <TableCell>
                        {test.personal?.phoneNumber || "N/A"}
                      </TableCell>
                      <TableCell>
                        {test.personal?.ageRange ||
                          test.personal?.["Select your age group"] ||
                          "N/A"}
                      </TableCell>

                      <TableCell>
                        {(() => {
                          const status =
                            test.appointments?.[0]?.status?.toLowerCase();
                          let bgClass = "bg-gray-100 text-gray-700";
                          let label = "Not Scheduled";

                          if (
                            status === "booked" ||
                            status === "pending" ||
                            status === "assigned"
                          ) {
                            bgClass = "bg-red-100 text-red-700";
                            label = "Booked";
                          } else if (status === "completed") {
                            bgClass = "bg-green-100 text-green-700";
                            label = "Completed";
                          }

                          return (
                            <span
                              className={`inline-flex items-center justify-center w-24 h-6 rounded-full px-2.5 py-0.5 text-xs font-medium ${bgClass}`}
                            >
                              {label}
                            </span>
                          );
                        })()}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-row gap-2 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-[180px] flex items-center justify-center gap-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-colors"
                            onClick={() => sendWhatsapp(test.userId?._id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>Send WhatsApp</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-[180px] flex items-center justify-center gap-1 text-health-primary"
                            // onClick={() => viewReport(test._id, test.status)}
                            onClick={() => {
                              const baseUrl = `${import.meta.env.VITE_FRONTEND_URL}`;
                              const path = "test-results";
                              const testId = test?._id;
                              const userId = test?.userId?._id;
                              console.log("userId", userId);
                              console.log("testId", testId);
                              // console.log("appointmentId", appointmentId);
                              if (userId && testId) {
                                console.log(
                                  "path",
                                  `${baseUrl}/${path}/${testId}`
                                );
                                window.open(
                                  `${baseUrl}/${path}/${testId}`,
                                  "_blank"
                                );
                              } else {
                                toast.error(
                                  "Missing required data for this report."
                                );
                              }
                            }}
                          >
                            <Eye className="h-3 w-3" />
                            <span>View Hair Test</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls (Bottom) for Pending Tests */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {totalPendingTests} total results.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingCurrentPage(1)}
                    disabled={
                      pendingCurrentPage === 1 || totalPendingPages === 0
                    }
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPendingCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={
                      pendingCurrentPage === 1 || totalPendingPages === 0
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPendingCurrentPage((prev) =>
                        Math.min(prev + 1, totalPendingPages)
                      )
                    }
                    disabled={
                      pendingCurrentPage === totalPendingPages ||
                      totalPendingPages === 0
                    }
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingCurrentPage(totalPendingPages)}
                    disabled={
                      pendingCurrentPage === totalPendingPages ||
                      totalPendingPages === 0
                    }
                  >
                    Last
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescription" className="space-y-4 bg-white">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Prescription Orders</CardTitle>
              <CardDescription>
                View and manage all prescription-related orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#209FD9] text-white whitespace-nowrap">
                    <TableHead>Order ID</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Order Type</TableHead>
                    {/* <TableHead>Status</TableHead> */}
                    <TableHead>Delivery Status</TableHead>
                    <TableHead>Appointment Status</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>View Prescription</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Orders.map((order, index) => (
                    <TableRow
                      key={order._id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                    >
                      <TableCell className="font-medium">
                        {order._id || "N/A"}
                      </TableCell>
                      <TableCell>{order.userId?.fullname || "N/A"}</TableCell>
                      <TableCell>{order.orderType || "N/A"}</TableCell>
                      {/* <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status?.toLowerCase() === "paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </TableCell> */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            order.deliveryStatus?.toLowerCase() === "pending"
                              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                              : order.deliveryStatus?.toLowerCase() ===
                                  "delivered"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : order.deliveryStatus?.toLowerCase() ===
                                    "canceled"
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {order.deliveryStatus
                            ? order.deliveryStatus
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                )
                                .join(" ")
                            : "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            order.prescriptionDetails?.[0]?.appointment?.status?.toLowerCase() ===
                            "assigned"
                              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                              : order.prescriptionDetails?.[0]?.appointment?.status?.toLowerCase() ===
                                  "completed"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : order.prescriptionDetails?.[0]?.appointment?.status?.toLowerCase() ===
                                    "canceled"
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {order.prescriptionDetails?.[0]?.appointment?.status
                            ? order.prescriptionDetails[0].appointment.status
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")
                            : "Not Assigned"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {order.totalAmount
                          ? `${order.currency || "INR"} ${order.totalAmount}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[140px] h-[32px] flex items-center justify-center gap-1 text-health-primary hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                          onClick={() => {
                            const status =
                              order.prescriptionDetails[0]?.appointment?.status;
                            const appointmentId =
                              order.prescriptionDetails[0]?.appointment?._id;
                            if (status === "completed") {
                              window.open(
                                `${import.meta.env.VITE_FRONTEND_URL}/doctor/report/${appointmentId}`,
                                "_blank"
                              );
                            } else {
                              setAssignDoctor(order);
                            }
                          }}
                        >
                          <Eye className="h-3.5 w-5" />
                          {order.prescriptionDetails?.[0]?.appointment
                            ?.status === "completed" ? (
                            <span>View Prescription</span>
                          ) : (
                            <span>Generate Prescription</span>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[140px] h-[32px] flex items-center justify-center gap-1 text-health-primary hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                          onClick={() => viewOrderDetails(order._id)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Order</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                        {selectedTest.appointments[0].doctorId?.fullname || "-"}
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

                    {/* The following button is removed as per user request */}
                    {/*
                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Report Send Complete
                    </Button>
                    */}
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
                      const path = "test-results";
                      const testId = selectedTest?._id;
                      const userId = selectedTest?.userId?._id;
                      console.log("userId", userId);
                      console.log("testId", testId);
                      // console.log("appointmentId", appointmentId);
                      if (userId && testId) {
                        console.log("path", `${baseUrl}/${path}/${testId}`);
                        window.open(`${baseUrl}/${path}/${testId}`, "_blank");
                      } else {
                        toast.error("Missing required data for this report.");
                      }
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View Hair Test
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
                onValueChange={(value) => {
                  console.log("Doctor selected:", value);
                  setScheduleAppointment((prev) => ({
                    ...prev,
                    doctorId: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {doctorsList?.map((doctor) => (
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
                onChange={(e) => {
                  console.log("Date selected:", e.target.value);
                  setScheduleAppointment((prev) => ({
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
                onValueChange={(value) => {
                  console.log("Time slot selected:", value);
                  setScheduleAppointment((prev) => ({
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
                    <label className="text-sm font-medium">Total Amount</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.totalAmount
                        ? `${selectedOrder.currency || "INR"} ${selectedOrder.totalAmount}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Order Date</label>
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
                    <label className="text-sm font-medium">Payment Mode</label>
                    <div className="p-2 border rounded-md text-sm">
                      {selectedOrder.mode || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Products</label>
                  <div className="p-2 border rounded-md text-sm">
                    {selectedOrder.products?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {selectedOrder.products.map((product, index) => (
                          <li key={index}>{product.name || "N/A"}</li>
                        ))}
                      </ul>
                    ) : (
                      "No products"
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                {/* Appointment Details Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Appointment Information
                  </h3>
                  {selectedAppointment ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Appointment ID
                        </label>
                        <div className="p-2 border rounded-md text-sm">
                          {selectedAppointment._id || "N/A"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Status</label>
                        <div className="p-2 border rounded-md text-sm">
                          <span
                            className={`${
                              selectedAppointment.status?.toLowerCase() ===
                              "pending"
                                ? "text-yellow-600"
                                : selectedAppointment.status?.toLowerCase() ===
                                    "completed"
                                  ? "text-green-600"
                                  : "text-red-600"
                            }`}
                          >
                            {selectedAppointment.status || "Unknown"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Appointment Type
                        </label>
                        <div className="p-2 border rounded-md text-sm">
                          {selectedAppointment.appointmentType || "N/A"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Time Slot</label>
                        <div className="p-2 border rounded-md text-sm">
                          {selectedAppointment.timeSlot || "N/A"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Assigned At
                        </label>
                        <div className="p-2 border rounded-md text-sm">
                          {selectedAppointment.createdAt
                            ? new Date(
                                selectedAppointment.createdAt
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

                  {/* {(!selectedAppointment ||
                    selectedAppointment.status === "pending") && (
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex justify-end space-x-2">
                        <Select
                          value={selectedDoctor}
                          onValueChange={setSelectedDoctor}
                        >
                          <SelectTrigger className="w-[200px] bg-white border">
                            <SelectValue placeholder="Select Doctor" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {doctorsList.map((doctor) => (
                              <SelectItem key={doctor._id} value={doctor._id}>
                                {doctor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button
                          className="bg-primary hover:bg-health-primary/90"
                          onClick={handleAssignDoctor}
                          disabled={!selectedDoctor}
                        >
                          Assign Doctor
                        </Button>
                      </div>
                      {assignResponse.message && (
                        <div
                          className={`text-sm text-right ${
                            assignResponse.type === "success"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {assignResponse.message}
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOrderModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Follow-Up Modal */}
      <Dialog open={isFollowUpModalOpen} onOpenChange={setIsFollowUpModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Follow-Up Appointment</DialogTitle>
            <DialogDescription>
              Schedule a follow-up appointment for the patient
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
                value={followUpData.doctorId}
                onValueChange={(value) => {
                  console.log("Doctor selected:", value);
                  setFollowUpData((prev) => ({ ...prev, doctorId: value }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {doctorsList?.map((doctor) => (
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
                onChange={(e) => {
                  console.log("Date selected:", e.target.value);
                  setFollowUpData((prev) => ({
                    ...prev,
                    appointmentDate: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Slot *</label>
              <Select
                value={followUpData.timeSlot}
                onValueChange={(value) => {
                  console.log("Time slot selected:", value);
                  setFollowUpData((prev) => ({ ...prev, timeSlot: value }));
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

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Doctor Notes (optional)
              </label>
              <Input
                placeholder="Add any additional notes"
                value={followUpData.doctorNotes}
                onChange={(e) => {
                  console.log("Notes updated:", e.target.value);
                  setFollowUpData((prev) => ({
                    ...prev,
                    doctorNotes: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log("Cancel button clicked");
                  setIsFollowUpModalOpen(false);
                  setError("");
                  setFollowUpData({
                    followupOf: "",
                    doctorId: "",
                    appointmentDate: "",
                    timeSlot: "",
                    status: "pending",
                    doctorNotes: "",
                  });
                  console.log("Follow-up form reset");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Create follow-up button clicked");
                  handleSubmitFollowUp();
                }}
                className="bg-primary hover:bg-health-primary/90"
              >
                Create Follow-Up
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prescription Modal */}
      <Dialog
        open={isPrescriptionModalOpen}
        onOpenChange={setIsPrescriptionModalOpen}
      >
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              View prescription information for the order
            </DialogDescription>
          </DialogHeader>

          {selectedPrescription && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between mb-2 gap-2">
                <div>
                  <div className="font-bold text-sm py-2">PRESCRIPTION</div>
                  <div className="mt-1 space-y-0.5 leading-relaxed">
                    <div className="text-xs">
                      Order ID: {selectedPrescription._id}
                    </div>
                    <div className="text-xs">
                      Order Date:{" "}
                      {selectedPrescription.createdAt &&
                      !isNaN(new Date(selectedPrescription.createdAt).getTime())
                        ? new Date(
                            selectedPrescription.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </div>
                    <div className="text-xs">
                      Name: {selectedPrescription.userId?.fullname || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm py-2">VPLANT CHEMIST</div>
                  <div className="max-w-xs text-xs leading-relaxed">
                    OFFICE NO. 101/A (PART 1), FIRST FLOOR, KANE PLAZA,
                    <br />
                    MIND SPACE OFF. MALAD LINK ROAD,
                    <br />
                    MALAD WEST, Tal : MALAD WEST ( MUMBAI -ZONE6 )<br />
                    Pin : 400064
                    <br />
                    Email : infor@hairsncares.com
                    <br />
                    Website: www.hairsncares.com
                    <br />
                    LICENSE No. : MH-MZ6-537527
                  </div>
                </div>
              </div>

              {/* Prescription Table */}
              <div className="border rounded overflow-x-auto mt-6">
                <table className="min-w-full text-xs md:text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-1 border font-semibold">SL.</th>
                      <th className="py-1 border font-semibold">
                        MEDICINE NAME
                      </th>
                      <th className="py-1 border font-semibold">BATCH NO</th>
                      {/* <th className="py-1 border font-semibold">EXPIRY DATE</th> */}
                      {/* <th className="py-1 border font-semibold">HSN CODE</th> */}
                      <th className="py-1 border font-semibold">QTY.</th>
                      <th className="py-1 border font-semibold">GST</th>
                      <th className="py-1 border font-semibold">PRICE</th>
                      <th className="py-1 border font-semibold">DISCOUNT</th>
                      <th className="py-1 border font-semibold">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrescription.products?.map((products, idx) => (
                      <tr
                        key={products._id || idx}
                        className={`text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                      >
                        <td className="border px-2 py-2">{idx + 1}</td>
                        <td className="border px-2 py-2">
                          {products.item.name || ""}
                        </td>
                        <td className="border px-2 py-2">
                          {products.item.batchNo || ""}
                        </td>
                        {/* <td className="border px-2 py-2">
                          {products.item.expiryDate ? new Date(products.item.expiryDate).toLocaleDateString() : ""}
                        </td> */}
                        {/* <td className="border px-2 py-2">{products.item.hsnCode || ""}</td> */}
                        <td className="border px-2 py-2">
                          {products.item.quantity || 1}
                        </td>
                        <td className="border px-2 py-2">
                          {products.item.gst || 0}%
                        </td>
                        <td className="border px-2 py-2">
                          ₹ {products.item.price || 0}
                        </td>
                        <td className="border px-2 py-2">
                          ₹ {products.item.discount || 0}
                        </td>
                        <td className="border px-2 py-2">
                          ₹{" "}
                          {(
                            (products.item.quantity || 1) *
                              (products.item.price || 0) -
                            (products.item.discount || 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Summary */}
              <div className="flex flex-col md:flex-row justify-between mt-10 gap-2">
                <div>
                  <div className="text-xs">
                    Payment Type:{" "}
                    <span className="font-semibold">
                      {selectedPrescription.mode || "N/A"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs">
                    Note: Inclusive of all Taxes
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-md w-full md:w-64 mt-2 md:mt-0 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold">
                      ₹ {selectedPrescription.totalAmount?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Delivery Charges</span>
                    <span className="font-bold">
                      ₹{" "}
                      {selectedPrescription.deliveryCharges?.toFixed(2) ||
                        "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-200 mt-1 pt-1">
                    <span className="font-medium">Final Amount</span>
                    <span className="font-bold">
                      ₹{" "}
                      {(
                        selectedPrescription.totalAmount +
                        (selectedPrescription.deliveryCharges || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center font-semibold text-xs md:text-sm">
                Thank you for choosing our services.
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full hover:bg-blue-500 hover:text-white hover:border-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_FRONTEND_URL}/doctor/report/${selectedPrescription?.prescriptionDetails?.appointmentId}`,
                "_blank"
              )
            }
          >
            <FileText className="h-4 w-4" />
            Generate Prescription
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAssignDoctorModalOpen}
        onOpenChange={setIsAssignDoctorModalOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Assign Doctor
            </DialogTitle>
            <DialogDescription>
              Select a doctor to assign to this order
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* <h3 className="text-sm font-medium mb-2">Order Details</h3> */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Customer Name</p>
                  <p className="font-medium mt-1">
                    {selectedOrder?.userId?.fullname}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Doctor</label>
                <Select
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctorsList?.map((doctor) => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className=" pt-4">
                <Button
                  className="bg-health-primary hover:bg-health-primary/90"
                  onClick={handleAssignDoctor}
                  disabled={!selectedDoctor}
                >
                  Assign Doctor
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAssignDoctorModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>

            {assignResponse?.message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  assignResponse.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {assignResponse.message}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default HairTest;
