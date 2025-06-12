import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DoctorFollowUp = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDateArrowStyle(isoString) {
    const date = new Date(isoString);
    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return ""; // Return an empty string if the date is invalid
    }

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          setError("Authorization token not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/doctor/get-all-appointment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching appointments: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(data?.data);
        if (data?.success) {
          const filteredData = data?.data?.filter((appointment) => {
            // Filter logic to include only follow-up appointments where followupOf is not null
            return (
              appointment.appointmentType === "hair_test_with_prescription" &&
              appointment.followupOf != null
            );
          });

          setAppointments(filteredData || []);
          console.log(filteredData);
        } else {
          setError(data.message || "Failed to fetch appointments.");
        }
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching appointments."
        );
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    // Apply the search filter
    return appointment.userId?.fullname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  // Pagination calculations
  const totalAppointments = filteredAppointments.length;
  const totalPages = Math.ceil(totalAppointments / rowsPerPage);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle>Appointments</CardTitle>
          <CardDescription>Manage patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search appointments..."
                  className="px-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pagination Controls (Top) */}
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
                {totalAppointments === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                      currentPage * rowsPerPage,
                      totalAppointments
                    )}`}{" "}
                of {totalAppointments}
              </span>
              {/* <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2"
              >
                {"|<"}
              </button> */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2"
              >
                {"<"}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2"
              >
                {">"}
              </button>
              {/* <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2"
              >
                {">|"}
              </button> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#209FD9] text-white whitespace-nowrap">
                  <TableHead>Date & Time </TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Phone No.</TableHead>
                  <TableHead>Email Id</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>FollowUp Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Loading appointments...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-red-500">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : paginatedAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No appointments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAppointments.map((appointment) => (
                    <TableRow key={appointment._id}>
                      <TableCell>{appointment.appointmentDate}</TableCell>
                      <TableCell className="font-medium">
                        {appointment.userId?.fullname || "N/A"}
                      </TableCell>
                      <TableCell>{appointment.userId?.mobile || ""}</TableCell>
                      <TableCell>{appointment.userId?.email || ""}</TableCell>
                      <TableCell>
                        <span>{appointment.progress}%</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-24 h-8 text-xs font-medium"
                          style={{
                            backgroundColor:
                              appointment.Method === "Audio Call"
                                ? "#3b82f6"
                                : appointment.Method === "Video Call"
                                  ? "#10b981"
                                  : "white",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {appointment.Method}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-24 h-8 text-xs font-medium"
                          style={{
                            backgroundColor:
                              appointment.status === "completed"
                                ? "#22c55e"
                                : appointment.status === "pending"
                                  ? "#eab308"
                                  : appointment.status === "cancelled"
                                    ? "#ef4444"
                                    : "#3b82f6",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {appointment.status?.charAt(0).toUpperCase() +
                            appointment.status?.slice(1) || "N/A"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {appointment.appointmentType || "Follow Up Patient"}
                      </TableCell>

                      {/* <TableCell>
                        {appointment.status ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-24 h-8 text-xs font-medium"
                            style={{
                              backgroundColor:
                                appointment.status === "completed"
                                  ? "#22c55e"
                                  : "#eab308",
                              color: "white",
                              border: "none",
                            }}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </Button>
                        ) : (
                          "N/A"
                        )}
                      </TableCell> */}

                      <TableCell>
                        {formatDateArrowStyle(appointment.appointmentDate) ||
                          ""}{" "}
                        {appointment.timeSlot
                          ? `(${appointment.timeSlot})`
                          : ""}
                      </TableCell>
                      <TableCell>
                        {appointment?.status ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-32 h-8 text-xs font-medium"
                            style={{
                              backgroundColor:
                                appointment?.status === "completed"
                                  ? "#22c55e"
                                  : "#3b82f6",
                              color: "white",
                              border: "none",
                            }}
                            onClick={() => {
                              const userId = appointment.userId?._id;
                              const appointmentId = appointment._id;
                              const testId = appointment.followupOf;

                              if (!userId || !testId) {
                                toast({
                                  variant: "destructive",
                                  title: "Error",
                                  description:
                                    "Missing required data for this appointment",
                                });
                                return;
                              }

                              const baseUrl = `${import.meta.env.VITE_FRONTEND_URL}`;
                              const path = "followup/patient-test-result";

                              window.open(
                                `${baseUrl}/${path}/${userId},${appointmentId},${testId}`,
                                "_blank"
                              );
                            }}
                          >
                            {appointment?.status === "completed"
                              ? "Prescription Sent"
                              : "Generate Prescription"}
                          </Button>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DoctorFollowUp;
