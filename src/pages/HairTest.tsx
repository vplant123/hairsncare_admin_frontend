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
  };
  status?: string;
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

  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [hairTests, setHairTests] = useState([]);
  const [Orders, setOrders] = useState([]);

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

  const pendingTests = hairTests.filter(
    test => test.status?.toLowerCase() === "pending"
  );

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        "https://apihair.txogavideo.in/api/v1/hair-tests/getall",
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
        "https://apihair.txogavideo.in/api/v1/admin/getOrders",
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
    handleFetchOrders();
    handleFetchDoctor();
  }, []);

  const handleFollowUp = (test: HairTest) => {
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
        "https://apihair.txogavideo.in/api/v1/admin/create-Followup-Appointment",
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
        "https://apihair.txogavideo.in/api/v1/admin/assignAppointmentToDoctor",
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
        "https://apihair.txogavideo.in/api/v1/hair-tests/getall",
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
        `https://apihair.txogavideo.in/api/v1/admin/order-details`,
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
        `https://apihair.txogavideo.in/api/v1/admin/assignDoctorForPrescription`,
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
        <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-lg">
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
          <TabsTrigger
            value="prescription"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
          >
            Prescription Orders
          </TabsTrigger>
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
                    <Input placeholder="Search tests..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Follow Up</TableHead> */}
                    {/* <TableHead>Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hairTests.map(test => (
                    <TableRow key={test._id}>
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
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            test.status?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : test.status?.toLowerCase() === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {test.status || "Unknown"}
                        </span>
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
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTests.map(test => (
                    <TableRow key={test._id}>
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
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
                          {test.status || "Pending"}
                        </span>
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
                            onClick={() => viewReport(test._id, test.status)}
                          >
                            <Eye className="h-3 w-3" />
                            <span>View report</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Order Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Status</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Orders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        {order._id || "N/A"}
                      </TableCell>
                      <TableCell>{order.userId?.fullname || "N/A"}</TableCell>
                      <TableCell>{order.orderType || "N/A"}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.deliveryStatus?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.deliveryStatus?.toLowerCase() ===
                                  "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.deliveryStatus?.toLowerCase() ===
                                    "canceled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.deliveryStatus || "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {order.totalAmount
                          ? `${order.currency || "INR"} ${order.totalAmount}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-health-primary"
                          onClick={() => viewOrderDetails(order._id)}
                        >
                          <Eye className="h-3 w-3" />
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
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Completed Test Report</DialogTitle>
            <DialogDescription>
              View and manage completed test report
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Appointment Details Section */}
              <div className="border-t pt-4">
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
                        {selectedTest.appointments[0]._id || "N/A"}
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
                        {selectedTest.appointments[0].timeSlot || "N/A"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Doctor</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].doctorId?.name || "N/A"}
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
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Created At</label>
                      <div className="p-2 border rounded-md bg-gray-50">
                        {selectedTest.appointments[0].createdAt
                          ? new Date(
                              selectedTest.appointments[0].createdAt
                            ).toLocaleDateString()
                          : "N/A"}
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
                          `http://localhost:5173/doctor-analyse-report/${selectedTest.appointments[0]._id}`,
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
                          `http://localhost:5173/management-report/${selectedTest.appointments[0]._id}`,
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
                          `http://localhost:5173/doctor/report/${selectedTest.appointments[0]._id}`,
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
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sticky bottom-0 bg-white pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsCompletedModalOpen(false)}
                  className="w-full sm:w-auto px-6 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                >
                  Close
                </Button>
                <Button
                  className="w-full sm:w-auto bg-primary hover:bg-health-primary/90 text-white px-6 transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => navigate(`/test-result/${selectedTest._id}`)}
                >
                  <Eye className="h-4 w-4" />
                  View Test Report
                </Button>
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
                        ? new Date(selectedOrder.createdAt).toLocaleDateString()
                        : "N/A"}
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
                              ).toLocaleDateString()
                            : "N/A"}
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

                  {/* Doctor Assignment Section */}
                  {(!selectedAppointment ||
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
                            {doctorsList.map(doctor => (
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
                  )}
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
                onValueChange={value => {
                  console.log("Doctor selected:", value);
                  setFollowUpData(prev => ({ ...prev, doctorId: value }));
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
                value={followUpData.appointmentDate}
                onChange={e => {
                  console.log("Date selected:", e.target.value);
                  setFollowUpData(prev => ({
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
                onValueChange={value => {
                  console.log("Time slot selected:", value);
                  setFollowUpData(prev => ({ ...prev, timeSlot: value }));
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
                onChange={e => {
                  console.log("Notes updated:", e.target.value);
                  setFollowUpData(prev => ({
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
    </DashboardLayout>
  );
};

export default HairTest;
