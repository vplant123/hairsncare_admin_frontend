import React, { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Search, Filter, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample data for hair test results
const hairTestResults = [
  {
    id: 1,
    patientName: "Emily Wilson",
    payment: "Paid",
    paymentAmount: "$150",
    timeSlot: "10:00 AM",
    appointmentDate: "2025-04-20",
    date: "2025-04-17",
    status: "Assigned",
  },
  {
    id: 2,
    patientName: "Michael Brown",
    payment: "Paid",
    paymentAmount: "$200",
    timeSlot: "2:30 PM",
    appointmentDate: "2025-04-22",
    date: "2025-04-17",
    status: "Completed",
  },
  {
    id: 3,
    patientName: "Sophia Garcia",
    payment: "Pending",
    paymentAmount: "$180",
    timeSlot: "11:15 AM",
    appointmentDate: "2025-04-25",
    date: "2025-04-18",
    status: "Assigned",
  },
  {
    id: 4,
    patientName: "David Clark",
    payment: "Paid",
    paymentAmount: "$175",
    timeSlot: "3:45 PM",
    appointmentDate: "2025-04-19",
    date: "2025-04-16",
    status: "Completed",
  },
  {
    id: 5,
    patientName: "Olivia Martinez",
    payment: "Paid",
    paymentAmount: "$160",
    timeSlot: "1:00 PM",
    appointmentDate: "2025-04-24",
    date: "2025-04-18",
    status: "Assigned",
  },
];

// Sample data for pending tests
const pendingTests = hairTestResults.filter(test => test.payment === "Pending");

const HairTest = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const viewReport = (testId: number, status: string) => {
    const test = hairTestResults.find(t => t.id === testId);
    if (status === "Completed") {
      setSelectedTest(test);
      setIsCompletedModalOpen(true);
    } else {
      setSelectedTest(test);
      setIsModalOpen(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hair Test Management</h1>
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4 "
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="all">All Hair Test Results</TabsTrigger>
          <TabsTrigger value="pending">Pending Tests</TabsTrigger>
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
                    <TableHead>Payment</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Appointment Date</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hairTestResults.map(test => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">
                        {test.patientName}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            test.payment === "Paid"
                              ? "text-green-600 font-medium"
                              : "text-orange-500 font-medium"
                          }
                        >
                          {test.payment}
                        </span>
                      </TableCell>
                      <TableCell>{test.timeSlot}</TableCell>
                      <TableCell>{test.appointmentDate}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            test.status === "Assigned"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {test.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-health-primary"
                          onClick={() => viewReport(test.id, test.status)}
                        >
                          {test.status === "Assigned" ? (
                            <>
                              <Eye className="h-3 w-3" />
                              <span>View report</span>
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3" />
                              <span>Report sent</span>
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
                Manage tests with pending payment status
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
                    <TableHead>Payment</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Appointment Date</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTests.map(test => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">
                        {test.patientName}
                      </TableCell>
                      <TableCell>
                        <span className="text-orange-500 font-medium">
                          {test.payment}
                        </span>
                      </TableCell>
                      <TableCell>{test.timeSlot}</TableCell>
                      <TableCell>{test.appointmentDate}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                          {test.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-health-primary"
                          onClick={() => viewReport(test.id, test.status)}
                        >
                          <Eye className="h-3 w-3" />
                          <span>View report</span>
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

      <Dialog
        open={isCompletedModalOpen}
        onOpenChange={setIsCompletedModalOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Completed Test Report</DialogTitle>
            <DialogDescription>
              View and manage completed test report
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name</label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.patientName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Status</label>
                  <div className="p-2 border rounded-md">
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          selectedTest.payment === "Paid"
                            ? "text-green-600"
                            : "text-orange-500"
                        }
                      >
                        {selectedTest.payment}
                      </span>
                      {selectedTest.payment === "Paid" && (
                        <span className="text-green-600 font-medium">
                          {selectedTest.paymentAmount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Slot</label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.timeSlot}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Appointment Date
                  </label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.appointmentDate}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Doctor</label>
                  <div className="p-2 border rounded-md">Dr. Smith</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="p-2 border rounded-md">
                    <span className="text-green-600">Completed</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCompletedModalOpen(false)}
                >
                  Close
                </Button>
                <Button className="bg-primary hover:bg-health-primary/90">
                  View Test Report
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Generate Assessment Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    Generate Management Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    Generate Prescription
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Report Send Complete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Test Report Details</DialogTitle>
            <DialogDescription>
              View and manage test report information
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name</label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.patientName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Status</label>
                  <div className="p-2 border rounded-md">
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          selectedTest.payment === "Paid"
                            ? "text-green-600"
                            : "text-orange-500"
                        }
                      >
                        {selectedTest.payment}
                      </span>
                      {selectedTest.payment === "Paid" && (
                        <span className="text-green-600 font-medium">
                          {selectedTest.paymentAmount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Slot</label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.timeSlot}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Appointment Date
                  </label>
                  <div className="p-2 border rounded-md">
                    {selectedTest.appointmentDate}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Doctor</label>
                  <div className="p-2 border rounded-md">Dr. Smith</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="p-2 border rounded-md">
                    <span className="text-blue-600">
                      Waiting for doctor's response
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button className="bg-primary hover:bg-health-primary/90">
                  View Test Result
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default HairTest;
