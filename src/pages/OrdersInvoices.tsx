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
import { Search, Filter, Eye, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { renderWelcomeEmail } from "./renderEmail";
import toast from "react-hot-toast";

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

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter(order => {
    return (
      (searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "" ||
        statusFilter === "all" ||
        order.status === statusFilter) &&
      (dateFilter === "" ||
        dateFilter === "all" ||
        order.date.includes(dateFilter))
    );
  });

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/getOrders`,
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
        `http://localhost:3000/api/v1/payment/change-order-status`,
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
  return (
    <DashboardLayout>
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
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id}</TableCell>
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
                      <TableCell>{order.createdAt}</TableCell>
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
                      {selectedOrder.userId?.fullname}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">
                      {selectedOrder.totalAmount.toFixed(2)} Rs
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
    </DashboardLayout>
  );
};

export default OrdersInvoices;
