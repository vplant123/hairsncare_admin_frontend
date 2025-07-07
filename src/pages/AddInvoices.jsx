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
import { useToast } from "@/components/ui/use-toast";
import { ClassNames } from "@emotion/react";

// Calculate total for an item based on quantity, rate, and gst
const calculateItemTotal = item => {
  const quantity = item.quantity || 0;
  const rate = item.rate || 0;
  const gst = item.gst || 0;

  const subtotal = quantity * rate;
  const gstAmount = subtotal * (gst / 100);

  return subtotal + gstAmount;
};

const AddInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [doctorsList, setDoctorsList] = useState([]);
  const [name, setName] = useState("");
  const [payeeName, setPayeeName] = useState(""); // Initially empty, to be set based on product
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [orderid, setOrderid] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [productList, setProductList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(""); // Add payment method state
  const [loading, setLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for managing total amount (adapted from user's code)
  const [totalAmt, setTotalAmt] = useState(0);

  const [consultationFee, setConsultationFee] = useState(0);
  const [consultationGST, setConsultationGST] = useState(0);

  // Fetch Doctor Data
  const handleDoctorData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/all-doctor-Data`,
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/product`,
        { method: "GET" }
      );
      const data = await response.json();
      console.log("products", data);
      setProductList(data?.message); // Set the fetched product list
    } catch (error) {
      console.log("Error while fetching product data", error);
    }
  };

  const checkCoupon = async orderId => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/check-coupon?orderId=${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("data", data);

      if (response.ok && data.success) {
        setCouponData(data.data);
        // Autofill address if available
        if (data.data?.address) {
          setAddress(data.data.address);
          // Extract name and mobile from address string if available
          const addressParts = data.data.address
            .split(",")
            .map(part => part.trim());
          if (addressParts.length > 1) {
            setName(addressParts[0]); // First part is name
            setMobile(addressParts[1]); // Second part is mobile
          }
        }
        toast({
          title: "Success",
          description: data.message || "Address details fetched successfully!",
          className: "bg-green-50 text-green-800",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch address details",
          variant: "destructive",
          className: "bg-white text-black",
        });
      }
    } catch (error) {
      console.error("Error checking coupon:", error);
      toast({
        title: "Error",
        description: "Failed to fetch address details. Please try again.",
        variant: "destructive",
        className: "bg-white text-black",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOrderIdChange = e => {
    const value = e.target.value;
    setOrderid(value);
    // Check coupon when orderId is entered
    if (value) {
      checkCoupon(value);
    }
  };

  const handleDoctorChange = value => {
    setSelectedDoctor(value);
    // Fetch consultation fee and GST for the selected doctor
    const doctor = doctorsList.find(doc => doc._id === value);
    if (doctor) {
      setConsultationFee(doctor.consultationFee || 0);
      setConsultationGST(doctor.consultationGST || 0);
    } else {
      setConsultationFee(0);
      setConsultationGST(0);
    }
  };

  // New handleItem logic based on user's code, refined for accuracy
  const handleItemChange = (ind, value, fieldName) => {
    console.log("====>>>", ind, value, fieldName);
    const tempItems = invoiceItems?.map(item => ({ ...item }));
    const currentItem = tempItems[ind];

    // Update the changed field
    currentItem[fieldName] = parseFloat(value) || value; // Parse numbers, keep strings if not number

    // Handle product selection: populate rate, gst, and other fields
    if (fieldName === "description") {
      const selectedProduct = productList.find(p => p._id === value);
      if (selectedProduct) {
        currentItem["description"] = selectedProduct._id; // Store the product ID
        currentItem["rate"] = parseFloat(selectedProduct.price || 0);
        currentItem["discount"] = parseFloat(selectedProduct.discount || 0);
        currentItem["batchNo"] = selectedProduct.batchNo || ""; // Set batchNo
        currentItem["expiryDate"] = selectedProduct.expiryDate || "";
        currentItem["gst"] = parseFloat(selectedProduct.gst || 0);
        currentItem["hsn"] = selectedProduct.hsn || ""; // Set HSN number
      } else {
        // Reset values if product not found or selection cleared
        currentItem["description"] = "";
        currentItem["batchNo"] = "";
        currentItem["expiryDate"] = "";
        currentItem["rate"] = 0;
        currentItem["gst"] = 0;
        currentItem["hsn"] = "";
      }
    }

    // Calculate total for the current item
    const quantity = parseFloat(currentItem["quantity"] || 0);
    const rate = parseFloat(currentItem["rate"] || 0);
    const discount = parseFloat(currentItem["discount"] || 0);
    const gst = parseFloat(currentItem["gst"] || 0);

    // Calculate discounted rate
    const discountedRate = rate - (rate * discount) / 100;
    const subtotal = discountedRate * quantity;
    const gstAmount = subtotal * (gst / 100);
    const totalForItem = subtotal + gstAmount;

    currentItem["total"] = totalForItem.toFixed(2);

    setInvoiceItems(tempItems);

    console.log("tempItems", tempItems);
    // Calculate total amount without applying coupon discount
    let grandTotal = 0;
    tempItems?.forEach(item => {
      const itemRate = parseFloat(item.rate || 0);
      const itemDiscount = parseFloat(item.discount || 0);
      const itemQuantity = parseFloat(item.quantity || 0);
      const itemGst = parseFloat(item.gst || 0);

      const discountedRate = itemRate - (itemRate * itemDiscount) / 100;
      const subtotal = discountedRate * itemQuantity;
      const gstAmount = subtotal * (itemGst / 100);
      const totalFinalitemrate = subtotal + gstAmount;

      grandTotal += totalFinalitemrate;
    });
    setTotalAmt(grandTotal);
  };

  // New deleteItem logic based on user's code
  const deleteItem = ind => {
    const temp = invoiceItems?.filter((item, i) => i !== ind);
    // Recalculate grand total after deletion
    // let grandTotal = 0;
    // temp?.forEach(ity => {
    //   grandTotal += parseFloat(ity["total"] || 0); // Ensure total is a number
    // });
    // setTotalAmt(grandTotal);

    //

    let grandTotal = 0;
    temp?.forEach(item => {
      const discountedRate =
        parseFloat(item.rate || 0) -
        (parseFloat(item.rate || 0) * parseFloat(item.discount || 0)) / 100;

      const subtotal = discountedRate * parseFloat(item.quantity || 0);
      const gstAmount = (subtotal * parseFloat(item.gst || 0)) / 100;
      const totalFinalitemrate = subtotal + gstAmount;

      grandTotal += totalFinalitemrate;
    });
    setTotalAmt(grandTotal);

    //

    setInvoiceItems(temp);
  };

  // Add a new invoice item
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: "", // Initially set to an empty string (product ID)
      quantity: 1,
      rate: 0,
      gst: 0,
      total: 0,
    };
    setInvoiceItems(prevItems => [...prevItems, newItem]);
  };

  // Prepare the invoice data and send it to the backend API
  const handleSave = async () => {
    if (!selectedDoctor) {
      toast({
        title: "Warning",
        description: "Please select a doctor before saving the invoice.",
        variant: "destructive",
        className: "bg-white text-black",
      });
      return;
    }

    const totalAmount = totalAmt;
    const orderId = `ORD-${
      new Date().toISOString().split("T")[0]
    }-${Math.random().toString(36).substr(2, 9)}`;
    const orderDate = new Date().toISOString();
    console.log("....couponData", couponData);
    const newInvoiceData = {
      name: name, // Payee name will be set to the selected product's name
      mobile: mobile,
      address: address,
      orderNumber: orderid,
      date: new Date().toISOString(),
      doctor: selectedDoctor,
      items: invoiceItems.map(item => ({
        item: item.description, // Store product's _id as item
        quantity: item.quantity?.toString() || "",
        rate: item.rate?.toString() || "",
        discount: item.discount?.toString() || "",
        gst: item.gst?.toString() || "",
        total: item.total?.toString() || "",
        batchNo: item.batchNo || "",
        expiryDate: item.expiryDate || "",
        hsn: item.hsn || "",
      })),
      consultationFee: consultationFee,
      consultationGST: consultationGST,
      couponDiscount: couponData?.couponPercent || "",
      total: totalAmount,
      paid: true,
      paidAmt: totalAmount,
      dues: 0,
      orderId: orderId,
      orderDate: orderDate,
      paymentMode: "cash",
      totalAmount: totalAmount,
      isActive: true,
    };

    console.log(newInvoiceData);
    // Send invoice data to the backend API
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/addInvoice`,
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
  const handleSaveAndPaid = async () => {
    if (!selectedDoctor) {
      toast({
        title: "Warning",
        description: "Please select a doctor before saving the invoice.",
        variant: "destructive",
        className: "bg-white text-black",
      });
      return;
    }

    const totalAmount = totalAmt;
    const orderId = `ORD-${
      new Date().toISOString().split("T")[0]
    }-${Math.random().toString(36).substr(2, 9)}`;
    const orderDate = new Date().toISOString();

    const newInvoiceData = {
      name: name,
      mobile: mobile,
      address: address,
      orderNumber: orderid,
      date: new Date().toISOString(),
      doctor: selectedDoctor,
      items: invoiceItems.map(item => ({
        item: item.description,
        quantity: item.quantity?.toString() || "",
        rate: item.rate?.toString() || "",
        discount: item.discount?.toString() || "",
        gst: item.gst?.toString() || "",
        total: item.total?.toString() || "",
        batchNo: item.batchNo || "",
        expiryDate: item.expiryDate || "",
        hsn: item.hsn || "",
      })),
      consultationFee: consultationFee,
      consultationGST: consultationGST,
      total: totalAmount,
      paid: true,
      paidAmt: grandTotal,
      dues: 0,
      orderId: orderId,
      orderDate: orderDate,
      paymentMode: paymentMethod || "cash",
      totalDiscount: couponData?.couponPercent || 0,
      couponDiscount: couponData?.couponPercent || 0,
      couponCode: couponData?.couponCode || "",
      originalOrderId: orderid || "",
      totalAmount: grandTotal,
      isActive: true,
    };

    console.log("Saving invoice with consultation data:", newInvoiceData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/addInvoice`,
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
        console.log("Invoice created successfully and marked as paid", data);
        setPaidAmount(grandTotal);
        toast({
          title: "Success",
          description: "Invoice saved and marked as paid successfully.",
          className: "bg-green-50 text-green-800",
        });
        navigate("/invoice");
      } else {
        console.log("Error while saving invoice", data);
        toast({
          title: "Error",
          description: "Failed to save invoice. Please try again.",
          variant: "destructive",
          className: "bg-white text-black",
        });
      }
    } catch (error) {
      console.log("Error while saving invoice", error);
      toast({
        title: "Error",
        description: "Failed to save invoice. Please try again.",
        variant: "destructive",
        className: "bg-white text-black",
      });
    }
  };

  // Calculate consultation GST amount
  const consultationGSTAmount = (consultationFee * consultationGST) / 100;
  // Calculate total consultation charge (fee + GST)
  const totalConsultationCharge =
    Number(consultationFee) + Number(consultationGSTAmount);

  // Update grand total to include consultation charge and coupon discount
  const couponDiscount = couponData?.couponPercent
    ? (totalAmt * couponData.couponPercent) / 100
    : 0;
  const amountAfterDiscount = totalAmt - couponDiscount;
  const shippingCharges = amountAfterDiscount < 2000 ? 200 : 0;
  const grandTotal =
    amountAfterDiscount + shippingCharges + totalConsultationCharge;

  const totalGST = invoiceItems.reduce((sum, item) => {
    // Calculate GST for each item: (rate - discount) * quantity * (gst / 100)
    const rate = parseFloat(item.rate || 0);
    const discount = parseFloat(item.discount || 0);
    const quantity = parseFloat(item.quantity || 0);
    const gst = parseFloat(item.gst || 0);

    const taxableAmount = (rate - discount) * quantity;
    const gstAmount = taxableAmount * (gst / 100);
    return sum + gstAmount;
  }, 0);

  // In the component, before rendering invoiceItems, create a consultation row object
  const consultationRow = {
    id: "consultation-row",
    description: "Consultation",
    batchNo: "",
    expiryDate: "",
    hsn: "",
    rate: consultationFee,
    discount: 0,
    quantity: 1,
    gst: consultationGST,
    total: (
      Number(consultationFee) +
      (Number(consultationFee) * Number(consultationGST)) / 100
    ).toFixed(2),
    isConsultation: true,
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
                  onChange={e => {
                    const filteredValue = e.target.value.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    ); // Remove numbers and symbols
                    setName(filteredValue);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={e => {
                    const filteredValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                    setMobile(filteredValue);
                  }}
                />
              </div>
              <div>
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
              <div>
                <Label htmlFor="address">Order ID</Label>
                <div className="relative">
                  <Input
                    id="orderid"
                    placeholder="Enter order ID"
                    value={orderid}
                    onChange={handleOrderIdChange}
                    disabled={loading}
                  />
                  {loading && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                </div>
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
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
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
                  <SelectContent
                    className="bg-white max-h-60 overflow-y-auto"
                    required
                  >
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
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="2 py-1 border font-semibold">
                    PARTICULARS
                  </TableHead>

                  <TableHead className="2 py-1 border font-semibold">
                    BATCH NO
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    EXPIRY DATE
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    HSN/SAC CODE
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    MRP( ₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    Discount(%)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    After Discount(₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    QTY
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    TAXABLE AMOUNT( ₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    GST RATE(%)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    GST AMT( ₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    FINAL AMT.( ₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    DELETE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Always show consultation row at the top */}
                <TableRow key={consultationRow.id}>
                  <TableCell className="2 py-1 border font-semibold">
                    Consultation
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    <Input
                      type="number"
                      value={consultationFee}
                      onChange={e => setConsultationFee(Number(e.target.value))}
                      min="0"
                      placeholder="Consultation Fee"
                      className="w-auto"
                    />
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                  <TableCell> - </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    <Input
                      type="number"
                      value={consultationGST}
                      onChange={e => setConsultationGST(Number(e.target.value))}
                      min="0"
                      max="100"
                      placeholder="Consultation GST %"
                      className="w-auto"
                    />
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    {((consultationFee * consultationGST) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    {(
                      Number(consultationFee) +
                      (Number(consultationFee) * Number(consultationGST)) / 100
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell className="2 py-1 border font-semibold">
                    -
                  </TableCell>
                </TableRow>
                {/* Then render the rest of the invoice items as before */}
                {invoiceItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} className="text-center py-4">
                      No items added. Click "Add Item" to add invoice items.
                    </TableCell>
                  </TableRow>
                ) : (
                  invoiceItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="2 py-1 border font-semibold">
                        <Select
                          value={item.description}
                          onValueChange={value =>
                            handleItemChange(index, value, "description")
                          }
                        >
                          <SelectTrigger id="product">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-60 overflow-y-auto ">
                            {productList?.map(product => (
                              <SelectItem key={product._id} value={product._id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="text"
                          value={item.batchNo}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "batchNo")
                          }
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        {item.expiryDate
                          ? (() => {
                              const date = new Date(item.expiryDate);
                              const day = date.getDate();
                              const month = date.toLocaleString("default", {
                                month: "short",
                              });
                              const year = date
                                .getFullYear()
                                .toString()
                                .slice(-2);
                              return `${day} ${month}/${year}`;
                            })()
                          : ""}
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="text"
                          value={item.hsn || ""}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "hsn")
                          }
                          placeholder="Enter HSN number"
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "rate")
                          }
                          min="0"
                          max="100"
                          className="w-auto"
                        />
                      </TableCell>

                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "discount")
                          }
                          min="0"
                          max="100"
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        {(
                          parseFloat(item.rate || 0) -
                          (parseFloat(item.rate || 0) *
                            parseFloat(item.discount || 0)) /
                            100
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "quantity")
                          }
                          min="1"
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        {(
                          (parseFloat(item.rate || 0) -
                            (parseFloat(item.rate || 0) *
                              parseFloat(item.discount || 0)) /
                              100) *
                          parseFloat(item.quantity || 0)
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell className="2 py-1 border font-semibold">
                        <Input
                          type="number"
                          value={item.gst}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "gst")
                          }
                          min="1"
                          max="100"
                        />
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        {(
                          ((parseFloat(item.rate || 0) -
                            (parseFloat(item.rate || 0) *
                              parseFloat(item.discount || 0)) /
                              100) *
                            parseFloat(item.quantity || 0) *
                            parseFloat(item.gst || 0)) /
                          100
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell className="2 py-1 border font-semibold">
                        {(
                          (parseFloat(item.rate || 0) -
                            (parseFloat(item.rate || 0) *
                              parseFloat(item.discount || 0)) /
                              100) *
                            parseFloat(item.quantity || 0) +
                          ((parseFloat(item.rate || 0) -
                            (parseFloat(item.rate || 0) *
                              parseFloat(item.discount || 0)) /
                              100) *
                            parseFloat(item.quantity || 0) *
                            parseFloat(item.gst || 0)) /
                            100
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell className="2 py-1 border font-semibold">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(index)}
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
            <div className="bg-gray-50 p-4 rounded-md w-80">
              <h3 className="font-bold text-lg mb-4 text-center">
                Invoice Summary
              </h3>

              <div className="flex justify-between py-2">
                <span className="font-medium">
                  Products Total (Final Amount):
                </span>
                <span className="font-bold">₹{totalAmt.toFixed(2)}</span>
              </div>

              {couponData?.couponPercent > 0 && (
                <>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">
                      Coupon Discount ({couponData.couponPercent}%):
                    </span>
                    <span className="font-bold text-green-600">
                      -₹
                      {((totalAmt * couponData.couponPercent) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Amount After Discount:</span>
                    <span className="font-bold">
                      ₹{amountAfterDiscount.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between py-2">
                <span className="font-medium">Shipping Charges:</span>
                <span className="font-bold">
                  {shippingCharges > 0 ? `₹${shippingCharges}` : "Free"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Consultation Fee:</span>
                <span className="font-bold">
                  ₹{totalConsultationCharge.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-t border-gray-300 pt-2 mt-2">
                <span className="font-bold text-lg">Grand Total:</span>
                <span className="font-bold text-lg">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-t border-gray-300 pt-2 mt-2">
                <span className="font-medium">Due Amount:</span>
                <span className="font-bold">
                  ₹{(grandTotal - paidAmount).toFixed(2)}
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
