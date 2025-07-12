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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Filter, Eye, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { renderWelcomeEmail } from "./renderEmail";
import toast from "react-hot-toast";
import BASE_URL from "../Config";
import { Toaster } from "react-hot-toast";

const OrdersInvoices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAssignDoctorModalOpen, setIsAssignDoctorModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [assignResponse, setAssignResponse] = useState({
    message: "",
    type: "",
  });
  const [selectedTest, setSelectedTest] = useState(null);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
 function formatDateArrowStyle(isoString) {
  const date = new Date(isoString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string if the date is invalid
  }

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "Asia/Kolkata", // IST timezone
  });
  const year = date.getUTCFullYear();

  // Convert to IST (Indian Standard Time)
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const time = date.toLocaleTimeString("en-US", options);


  return `${day} ${month} ${year}, ${time}`;
}

  // Handle view order details
  const handleViewOrder = order => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  // Handle payment status change
  const handlePaymentStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} payment status to ${newStatus}`);
    // Here you would typically make an API call to update the payment status
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
  const setAssignDoctor = order => {
    console.log(order);
    setSelectedOrder(order);
    console.log(selectedOrder);
    setIsAssignDoctorModalOpen(true);
  };
  const handleFetchDoctor = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/all-doctor-Data`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Doctors data:", data);
      if (data.success) {
        setDoctorsList(data.data);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors list");
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
      console.log("Assigning doctor:", {
        doctorId: selectedDoctor,
        orderId: selectedOrder._id,
      });
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
      console.log("API Response:", result);

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
          setIsAssignDoctorModalOpen(false);
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

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase();
    const orderId = order._id?.toLowerCase() || "";
    const customerName = order.userId?.fullname?.toLowerCase() || "";

    return (
      (searchQuery === "" ||
        orderId.includes(query) ||
        customerName.includes(query)) &&
      (statusFilter === "" ||
        statusFilter === "all" ||
        order.deliveryStatus === statusFilter) &&
      (dateFilter === "" ||
        dateFilter === "all" ||
        order.createdAt?.includes(dateFilter))
    );
  });

  // Pagination calculations
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / rowsPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getOrders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleFetchDoctor();
  }, []);

  const handleStatusChange = async (
    orderId,
    newStatus,
    order,
    paymentStatus
  ) => {
    let emailHtml = null;
    if (newStatus || paymentStatus) {
      emailHtml = renderWelcomeEmail(order, 2, newStatus || paymentStatus);
      // console.log("nmkmneor", emailHtml);
    }
    let data = {
      orderId,
      status: newStatus,
      emailHtml,
      payment: paymentStatus,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/payment/change-order-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      setLoader(!loader);
      if (response.ok) {
        const result = await response.json();
        await fetchOrders();
        console.log(result.data);
        toast.success("order status changed");
      } else {
        toast.error("Please logout and login again with valid credentials.");
        console.error("Failed to create review:", response.statusText);
      }
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
      console.error("Error:", error);
    }
  };

  const sendReport = async orderId => {
    console.log("Starting send report process for orderId:", orderId);
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
        `${BASE_URL}/admin/send-order-prescription?orderId=${orderId}`,
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
  return (
    <DashboardLayout>
      <Toaster />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Orders Management</h1>
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer name..."
                  className="px-10 bg-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Delivery Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Type</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Total Amount (Rs)</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Date</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>{order.userId?.fullname}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.mode}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={value =>
                            handleStatusChange(order._id, null, order, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {/* <SelectItem value="">Select</SelectItem> */}
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDateArrowStyle(order.createdAt)}
                      </TableCell>
                      {/* <TableCell> */}
                      {/* <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </TableCell> */}
                      <TableCell>
                        <Select
                          value={order.deliveryStatus}
                          onValueChange={value =>
                            handleStatusChange(
                              order._id,
                              value,
                              order,
                              order.status
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="processing">
                              Processing
                            </SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="canceled">Cancelled</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                      <TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {order.prescriptionDetails?.[0]?.appointment
                            ?.status === "completed" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[170px] h-[32px] flex items-center justify-center gap-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
                              onClick={() => {
                                const appointmentId =
                                  order.prescriptionDetails[0]?.appointment
                                    ?._id;
                                window.open(
                                  `${import.meta.env.VITE_FRONTEND_URL}/order-prescription/${appointmentId}`,
                                  "_blank"
                                );
                              }}
                            >
                              <Eye className="h-3.5 w-5" />
                              <span>View Prescription</span>
                            </Button>
                          ) : order.prescriptionDetails?.[0]?.appointment
                              ?.status === "assigned" &&
                            order.prescriptionDetails?.[0]?.appointment
                              ?.appointmentDate ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[170px] h-[32px] flex items-center justify-center gap-1 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                              disabled
                            >
                              <span>Assigned</span>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-[170px] h-[32px] flex items-center justify-center gap-1 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                              onClick={() => setAssignDoctor(order)}
                            >
                              <Eye className="h-3.5 w-5" />
                              <span>Generate Prescription</span>
                            </Button>
                          )}

                          {order.prescriptionDetails?.[0]?.appointment
                            ?.status === "completed" &&
                            order.prescriptionDetails?.[0]?.appointment
                              ?.isReportSent === false && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-[170px] h-[32px] flex items-center justify-center gap-1 bg-blue-500 text-white hover:bg-blue-600 mt-2"
                                onClick={() => {
                                  sendReport(order._id);
                                  console.log(order);
                                }}
                              >
                                Sent
                              </Button>
                            )}
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No orders found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">Rows per page</p>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={value => {
                    setRowsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={rowsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 25, 50].map(num => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="bg-white"
                      >
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  {/* <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to first page</span>
                    {"<<"}
                  </Button> */}
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      setCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    {"<"}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Go to next page</span>
                    {">"}
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Go to last page</span>
                    {">>"}
                  </Button> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{selectedOrder._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">
                      {selectedOrder.addressId?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">
                      {selectedOrder.addressId?.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">
                      {selectedOrder.amount?.toFixed(2)} Rs
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Charge</p>
                    <p className="font-medium">
                      {selectedOrder.deliveryCharges}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Mode</p>
                    <p className="font-medium">{selectedOrder.mode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <p className="font-medium">{selectedOrder.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>
                    <p className="font-medium">
                      {selectedOrder.deliveryStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Discount Details</p>
                    <p className="font-medium">{selectedOrder.totalDiscount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SubTotal</p>
                    <p className="font-medium">
                      {selectedOrder.amount}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Contact Information</p>
                  <div className="bg-muted/50 p-3 rounded-md mt-1">
                    <p>{selectedOrder.addressId?.fullAdress}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Products
                  </h3>
                  <div className="space-y-6">
                    {selectedOrder.products.map((product, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-sm text-gray-500">
                              Product Name
                            </p>
                            <p className="font-medium text-gray-800">
                              {product.item.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="font-medium text-gray-800">
                              {product.item.price} Rs
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="font-medium text-gray-800">
                              {product.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Discount</p>
                            <p className="font-medium text-gray-800">
                              {product.item.discount} %
                            </p>
                          </div>
                        </div>

                        {/* New Fields: Category, SubCategory, GST, Expiry Date, Batch No, and Manufacturer */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium text-gray-800">
                              {product.item.category}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">SubCategory</p>
                            <p className="font-medium text-gray-800">
                              {product.item.subCategory}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">GST</p>
                            <p className="font-medium text-gray-800">
                              {product.item.gst}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Expiry Date</p>
                            <p className="font-medium text-gray-800">
                              {new Date(
                                product.item.expiryDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Batch No</p>
                            <p className="font-medium text-gray-800">
                              {product.item.batchNo}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Manufacturer
                            </p>
                            <p className="font-medium text-gray-800">
                              {product.item.mfgName}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Images</p>
                          <div className="flex space-x-3 overflow-x-auto">
                            {product.item.src.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={product.item.name}
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
                  onValueChange={value => setSelectedDoctor(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Doctor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto">
                    {doctorsList?.map(doctor => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className=" pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAssignDoctorModalOpen(false)}
                  className="w-full sm:w-auto px-6 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignDoctor}
                  className="w-full ms-2 sm:w-auto bg-primary hover:bg-health-primary/90 text-white px-6 transition-colors duration-200"
                >
                  Assign Doctor
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

export default OrdersInvoices;
