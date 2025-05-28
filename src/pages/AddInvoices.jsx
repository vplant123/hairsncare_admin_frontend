import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

// Calculate total for an item based on quantity, rate, gst, and discount
const calculateItemTotal = item => {
  const quantity = item.quantity || 0;
  const rate = item.rate || 0;
  const gst = item.gst || 0;
  const discount = item.discount || 0;

  const subtotal = quantity * rate;
  const gstAmount = subtotal * (gst / 100);
  const discountAmount = subtotal * (discount / 100);

  return subtotal + gstAmount - discountAmount;
};

const AddInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [doctorsList, setDoctorsList] = useState([]);
  const [name, setName] = useState("");
  const [payeeName, setPayeeName] = useState(""); // Initially empty, to be set based on product
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  // Fetch Doctor Data
  const handleDoctorData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/all-doctor-Data",
        { method: "GET" }
      );
      const data = await response.json();
      setDoctorsList(data.data); // Set the fetched doctors list
    } catch (error) {
      console.log("Error while fetching doctors data", error);
    }
  };

  const handleProductData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/product",
        { method: "GET" }
      );
      const data = await response.json();
      setProductList(data?.message); // Set the fetched product list
    } catch (error) {
      console.log("Error while fetching product data", error);
    }
  };

  const handleDoctorChange = value => {
    console.log(value);
    setSelectedDoctor(value); // Update the selected doctor ID
  };

  const handleProductChange = (itemId, value) => {
    console.log(value);
    setInvoiceItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, description: value }; // Set the selected product's _id in description
        }
        return item;
      })
    );
  };

  // Add a new invoice item
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: "", // Initially set to an empty string
      quantity: 1,
      rate: 0,
      gst: 0,
      discount: 0,
      discountAmount: 0,
      total: 0,
    };
    setInvoiceItems(prevItems => [...prevItems, newItem]);
  };

  // Update an item in the invoice
  const updateItem = (id, field, value) => {
    setInvoiceItems(items =>
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          const subtotal = updatedItem.quantity * updatedItem.rate;
          updatedItem.discountAmount = subtotal * (updatedItem.discount / 100);
          updatedItem.total = calculateItemTotal(updatedItem);
          return updatedItem;
        }
        return item;
      })
    );
  };

  // Remove an item from the invoice
  const removeItem = id => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };

  // Calculate the grand total of all items in the invoice
  const calculateGrandTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };

  // Prepare the invoice data and send it to the backend API
  const handleSave = async () => {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    const totalAmount = calculateGrandTotal();
    const orderId = `ORD-${
      new Date().toISOString().split("T")[0]
    }-${Math.random().toString(36).substr(2, 9)}`;
    const orderDate = new Date().toISOString();

    const newInvoiceData = {
      name: name, // Payee name will be set to the selected product's name
      mobile: mobile,
      address: address,
      date: new Date().toISOString(),
      doctor: selectedDoctor,
      items: invoiceItems.map(item => ({
        item: item.description, // Store product's _id as item
        quantity: item.quantity.toString(),
        rate: item.rate.toString(),
        gst: item.gst.toString(),
        discount: item.discount.toString(),
        discountPercent: item.discount.toString(),
        total: item.total.toString(),
      })),
      total: totalAmount,
      paid: true,
      paidAmt: totalAmount,
      dues: 0,
      orderId: orderId,
      orderDate: orderDate,
      couponDiscount: 100,
      paymentMode: "cash",
      deliveryCharges: 50,
      totalDiscount: 100,
      totalAmount: totalAmount,
      isActive: true,
    };

    console.log(newInvoiceData);
    // Send invoice data to the backend API
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/addInvoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newInvoiceData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Invoice created successfully", data);
        navigate("/invoice"); // Redirect to the invoice list page after saving
      } else {
        console.log("Error while saving invoice", data);
      }
    } catch (error) {
      console.log("Error while saving invoice", error);
    }
  };

  // Save invoice and mark it as paid
  const handleSaveAndPaid = () => {
    const grandTotal = calculateGrandTotal();
    setPaidAmount(grandTotal);
    console.log("Invoice saved and marked as paid");
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleDoctorData();
      await handleProductData();
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <Button onClick={() => navigate("/invoice")}>Show Invoices</Button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Payee Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  type="number"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="doctor">Doctor</Label>
                <Select
                  value={selectedDoctor}
                  onValueChange={handleDoctorChange}
                >
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select a doctor" />
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
            </div>
          </div>

          <div className="mb-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>GST (%)</TableHead>
                  <TableHead>Discount (%)</TableHead>
                  <TableHead>Discount Amount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No items added. Click "Add Item" to add invoice items.
                    </TableCell>
                  </TableRow>
                ) : (
                  invoiceItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Select
                          value={item.description}
                          onValueChange={value =>
                            handleProductChange(item.id, value)
                          }
                        >
                          <SelectTrigger id="product">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {productList?.map(product => (
                              <SelectItem key={product._id} value={product._id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={e =>
                            updateItem(
                              item.id,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={e =>
                            updateItem(item.id, "rate", Number(e.target.value))
                          }
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.gst}
                          onChange={e =>
                            updateItem(item.id, "gst", Number(e.target.value))
                          }
                          min="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={e =>
                            updateItem(
                              item.id,
                              "discount",
                              Number(e.target.value)
                            )
                          }
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>{item.discountAmount.toFixed(2)}</TableCell>
                      <TableCell>{item.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-8">
            <div className="space-x-2 mb-4 md:mb-0">
              <Button onClick={addItem}>Add Item</Button>
              <Button onClick={handleSaveAndPaid}>Save and Paid</Button>
              <Button onClick={handleSave} variant="outline">
                Save
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md w-full md:w-64">
              <div className="flex justify-between py-2">
                <span className="font-medium">Grand Total:</span>
                <span className="font-bold">
                  {calculateGrandTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Paid Amount:</span>
                <span className="font-bold">{paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                <span className="font-medium">Due:</span>
                <span className="font-bold">
                  {(calculateGrandTotal() - paidAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddInvoice;
