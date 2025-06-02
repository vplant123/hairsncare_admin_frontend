import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const Appointments = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [appointmentDetailsOpen, setAppointmentDetailsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authorization token not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/v1/doctor/get-all-appointment",
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
        if (data.success) {
          // Transform the API data to match our calendar format
          const transformedAppointments = data.data.map((appointment: any) => ({
            id: appointment._id,
            patient: appointment.userId?.fullname || "N/A",
            doctor: "Dr. " + (appointment.doctorId?.fullname || "N/A"),
            date: new Date(appointment.appointmentDate),
            status: appointment.status || "Pending",
            type: appointment.appointmentType || "Consultation",
            timeSlot: appointment.timeSlot,
            followupOf: appointment.followupOf,
            hairTestId: appointment.hairTestId,
            userId: appointment.userId,
          }));
          setAppointments(transformedAppointments);
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
  }, []);

  const viewAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setAppointmentDetailsOpen(true);
  };

  // Filter appointments for the currently selected date
  const todaysAppointments = appointments
    .filter(appointment => isSameDay(appointment.date, date))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get all dates that have appointments for calendar highlighting
  const appointmentDates = appointments.map(appointment => appointment.date);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button className="bg-health-primary hover:bg-health-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Calendar</CardTitle>
                <Tabs
                  defaultValue="month"
                  onValueChange={v => setView(v as any)}
                >
                  <TabsList>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                View and manage all scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(date);
                      newDate.setMonth(date.getMonth() - 1);
                      setDate(newDate);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-medium">
                    {format(date, "MMMM yyyy")}
                  </h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(date);
                      newDate.setMonth(date.getMonth() + 1);
                      setDate(newDate);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={d => d && setDate(d)}
                  className="rounded-none pointer-events-auto"
                  modifiers={{
                    appointment: appointmentDates,
                  }}
                  modifiersStyles={{
                    appointment: {
                      fontWeight: "bold",
                      color: "var(--health-primary)",
                      textDecoration: "underline",
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{format(date, "EEEE, MMMM d")}</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                {todaysAppointments.length} appointments scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p>Loading appointments...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : todaysAppointments.length > 0 ? (
                <div className="divide-y">
                  {todaysAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className="p-4 hover:bg-muted/30 cursor-pointer"
                      onClick={() => viewAppointmentDetails(appointment)}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">
                            {format(appointment.date, "h:mm a")}
                          </span>
                        </div>
                        <span
                          className={`status-badge status-badge-${appointment.status.toLowerCase()}`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <h4 className="font-medium mb-1">{appointment.type}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <User className="h-3 w-3 mr-1" />
                        {appointment.patient}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.doctor}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium mb-1">No Appointments</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    There are no appointments scheduled for this day.
                  </p>
                  <Button className="bg-health-primary hover:bg-health-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog
        open={appointmentDetailsOpen}
        onOpenChange={setAppointmentDetailsOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and manage appointment information
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="mt-4 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedAppointment.type}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Appointment #{selectedAppointment.id}
                  </p>
                </div>
                <span
                  className={`status-badge status-badge-${selectedAppointment.status.toLowerCase()}`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-health-primary" />
                  <div>
                    <p className="text-sm font-medium">
                      {format(selectedAppointment.date, "EEEE, MMMM d, yyyy")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(selectedAppointment.date, "h:mm a")} -{" "}
                      {format(
                        new Date(
                          selectedAppointment.date.getTime() + 30 * 60000
                        ),
                        "h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Patient
                  </h4>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {selectedAppointment.patient
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Patient ID: P-
                        {(1000 + selectedAppointment.id)
                          .toString()
                          .substring(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Doctor
                  </h4>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      {selectedAppointment.doctor
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedAppointment.doctor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Appointment Type: {selectedAppointment.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Notes
                </h4>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">
                    No notes added for this appointment.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div className="space-x-2">
                  {/* <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-500"
                  >
                    Close
                  </Button> */}
                  {/* <Button variant="outline">Reschedule</Button> */}
                </div>
                <Button className="bg-health-primary hover:bg-health-primary/90">
                  Edit Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Appointments;
