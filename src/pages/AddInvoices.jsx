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
  const [orderid, setOrderid] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [productList, setProductList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(""); // Add payment method state
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for managing total amount (adapted from user's code)
  const [totalAmt, setTotalAmt] = useState(0);

  // New coupon discount state
  const [couponData, setCouponData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    // Handle product selection: populate rate, gst, discount, and calculate discount percent
    if (fieldName === "description") {
      const selectedProduct = productList.find(p => p._id === value);
      if (selectedProduct) {
        currentItem["description"] = selectedProduct._id; // Store the product ID
        currentItem["rate"] = parseFloat(selectedProduct.price || 0);
        currentItem["batchNo"] = selectedProduct.batchNo || ""; // Set batchNo
        currentItem["expiryDate"] = selectedProduct.expiryDate || "";
        currentItem["gst"] = parseFloat(selectedProduct.gst || 0);
        // Assuming product discount from API is an amount. Adjust if it's a percentage.
        currentItem["discount"] = parseFloat(selectedProduct.discount || 0);
        // Calculate discount percentage based on the populated discount amount and rate
        currentItem["discountPercent"] =
          currentItem["rate"] > 0
            ? ((currentItem["discount"] / currentItem["rate"]) * 100)?.toFixed(
                2
              )
            : 0;
      } else {
        // Reset values if product not found or selection cleared
        currentItem["description"] = "";
        currentItem["batchNo"] = "";
        currentItem["expiryDate"] = "";
        currentItem["rate"] = 0;
        currentItem["gst"] = 0;
        currentItem["discount"] = 0;
        currentItem["discountPercent"] = 0;
      }
    }

    // Recalculate discount amount if discountPercent changes (applies after direct input or product select)
    if (fieldName === "discountPercent" || fieldName === "rate") {
      const rate = parseFloat(currentItem["rate"] || 0);
      const discountPercent = parseFloat(currentItem["discountPercent"] || 0);
      const discountAmount = rate * (discountPercent / 100);
      currentItem["discount"] = discountAmount?.toFixed(2);
    }

    // Recalculate discount percentage if discount amount changes (applies after direct input or product select)
    if (fieldName === "discount" || fieldName === "rate") {
      const rate = parseFloat(currentItem["rate"] || 0);
      const discountAmount = parseFloat(currentItem["discount"] || 0);
      currentItem["discountPercent"] =
        rate > 0 ? ((discountAmount / rate) * 100)?.toFixed(2) : 0;
    }

    // Recalculate total after any relevant field changes
    const quantity = parseFloat(currentItem["quantity"] || 0);
    const rate = parseFloat(currentItem["rate"] || 0);
    const gst = parseFloat(currentItem["gst"] || 0);
    const discountAmount = parseFloat(currentItem["discount"] || 0); // Use discount AMOUNT for total calculation

    const subtotal = quantity * rate;
    const discountedSubtotal = subtotal - discountAmount;
    const gstValue = discountedSubtotal * (gst / 100);
    const totalForItem = discountedSubtotal + gstValue;

    currentItem["total"] = totalForItem?.toFixed(2);

    setInvoiceItems(tempItems); // Update the state

    // Recalculate grand total
    let grandTotal = 0;
    tempItems?.forEach(item => {
      grandTotal += parseFloat(item["total"] || 0);
    });
    setTotalAmt(grandTotal);
  };

  // New deleteItem logic based on user's code
  const deleteItem = ind => {
    const temp = invoiceItems?.filter((item, i) => i !== ind);
    // Recalculate grand total after deletion
    let grandTotal = 0;
    temp?.forEach(ity => {
      grandTotal += parseFloat(ity["total"] || 0); // Ensure total is a number
    });
    setTotalAmt(grandTotal);
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
      discount: 0, // This will store discount amount
      discountPercent: 0, // This will store discount percentage
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
        gst: item.gst?.toString() || "",
        discount: item.discount?.toString() || "",

        total: item.total?.toString() || "",
        batchNo: item.batchNo || "",
        expiryDate: item.expiryDate || "",
        hsnNo: item.hsnNo || "",
        consultationFee: consultationFee,
        consultationGST: consultationGST,
      })),
      total: totalAmount,
      paid: true,
      paidAmt: totalAmount,
      dues: 0,
      orderId: orderId,
      orderDate: orderDate,
      // couponDiscount: 100,
      paymentMode: "cash",
      // deliveryCharges: 50,
      totalDiscount: 100,
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
  const handleSaveAndPaid = () => {
    const grandTotal = totalAmt;
    setPaidAmount(grandTotal);
    console.log("Invoice saved and marked as paid");
  };

  // Calculate consultation GST amount
  const consultationGSTAmount = (consultationFee * consultationGST) / 100;
  // Calculate total consultation charge (fee + GST)
  const totalConsultationCharge =
    Number(consultationFee) + Number(consultationGSTAmount);

  // Calculate coupon discount from percent if available
  const couponPercent = couponData?.couponPercent || 0;
  const couponDiscount = (totalAmt * couponPercent) / 100;

  // Update grand total to include consultation charge
  const shippingCharges = totalAmt < 2000 ? 200 : 0;
  const grandTotal =
    totalAmt - couponDiscount + shippingCharges + totalConsultationCharge;

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

  const totalAfterCoupon = totalAmt - couponDiscount;

  const totalMRP = invoiceItems.reduce((sum, item) => {
    const rate = parseFloat(item.rate || 0);
    const quantity = parseFloat(item.quantity || 0);
    return sum + rate * quantity;
  }, 0);

  const totalProductDiscount = invoiceItems.reduce((sum, item) => {
    const rate = parseFloat(item.rate || 0);
    const discountPercent = parseFloat(item.discount || 0);
    const quantity = parseFloat(item.quantity || 0);
    const discountAmount = rate * (discountPercent / 100) * quantity;
    return sum + discountAmount;
  }, 0);

  const totalSavings = totalProductDiscount + couponDiscount;

  // In the component, before rendering invoiceItems, create a consultation row object
  const consultationRow = {
    id: "consultation-row",
    description: "Consultation",
    batchNo: "",
    expiryDate: "",
    hsnNo: "",
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

  const handleCheckDiscount = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/check-coupon?orderId=${orderid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setCouponData(data.data);
        if (data.data.address) setAddress(data.data.address);
        if (data.data.couponPercent) {
          const discount = (totalAmt * data.data.couponPercent) / 100;
          // setCouponDiscount(discount);
        } else {
          // setCouponDiscount(0);
        }
      } else {
        setError(data.message || "Failed to fetch coupon data");
        setCouponData(null);
        // setCouponDiscount(0);
      }
    } catch (err) {
      setError("Error fetching coupon data");
      setCouponData(null);
      // setCouponDiscount(0);
    }
    setLoading(false);
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
                <Input
                  id="orderid"
                  placeholder="Enter order ID"
                  value={orderid}
                  onChange={e => setOrderid(e.target.value)}
                />
                <Button onClick={handleCheckDiscount} className="mt-4">
                  Check Discount
                </Button>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {couponData && (
                  <div>
                    <p>
                      <strong>Coupon Percent:</strong>{" "}
                      {couponData.couponPercent ?? "0"}%
                    </p>
                    <p>
                      <strong>Address:</strong> {couponData.address}
                    </p>
                  </div>
                )}
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
                  <SelectContent className="bg-white max-h-60 overflow-y-auto">
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
                    DISCOUNT(%)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    AFTER DISCOUNT AMT.( ₹)
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
                    TOTAL AMT.( ₹)
                  </TableHead>
                  <TableHead className="2 py-1 border font-semibold">
                    DELETE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Always show consultation row at the top */}
                <TableRow key={consultationRow.id}>
                  <TableCell>Consultation</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={consultationFee}
                      onChange={e => setConsultationFee(Number(e.target.value))}
                      min="0"
                      placeholder="Consultation Fee"
                      className="w-auto"
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
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
                  <TableCell>
                    {((consultationFee * consultationGST) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {(
                      Number(consultationFee) +
                      (Number(consultationFee) * Number(consultationGST)) / 100
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
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
                      <TableCell>
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

                      <TableCell>
                        <Input
                          type="text"
                          value={item.batchNo}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "batchNo")
                          }
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        <Input
                          type="text"
                          value={item.hsnNo || ""}
                          onChange={e =>
                            handleItemChange(index, e.target.value, "hsnNo")
                          }
                          placeholder="Enter HSN number"
                          className="w-auto"
                        />
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        {parseFloat(item.discount || 0).toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {(
                          parseFloat(item.rate || 0) -
                          (parseFloat(item.rate || 0) *
                            parseFloat(item.discount || 0)) /
                            100
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell>
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
                      <TableCell>
                        {(
                          (parseFloat(item.rate || 0) -
                            (parseFloat(item.rate || 0) *
                              parseFloat(item.discount || 0)) /
                              100) *
                          parseFloat(item.quantity || 0)
                        ).toFixed(2)}
                      </TableCell>

                      <TableCell>
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
                      <TableCell>
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
                      <TableCell>
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

                      <TableCell>
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
            <div className="bg-gray-50 p-4 rounded-md w-70  ">
              <div className="flex justify-between py-2">
                <span className="font-medium">Total MRP:</span>
                <span className="font-bold ms-10">{totalMRP.toFixed(2)}</span>
              </div>

              {/* <div className="flex justify-between py-2">
                <span className="font-medium">
                  Subtotal(After Product Discounts):
                </span>
              </div> */}
              <div className="flex justify-between py-2">
                <span className="font-medium">Coupon Code Discount:</span>
                <span className="font-bold">₹{couponDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">
                  Total After Coupon Discount:
                </span>
                <span className="font-bold">
                  ₹{totalAfterCoupon.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Taxable Amount:</span>
                <span className="font-bold ms-10">{totalAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">GST</span>
                <span className="font-bold">{totalGST.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">
                  Consultation Fee (incl. GST):
                </span>
                <span className="font-bold">
                  ₹{totalConsultationCharge.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Shipping Charges:</span>
                <span className="font-bold">
                  {shippingCharges > 0 ? `₹${shippingCharges}` : "Free"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Grand Total (Payable):</span>
                <span className="font-bold">₹{grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">
                  Total Savings (Product + Coupon ):
                </span>
                <span className="font-bold">{totalSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                <span className="font-medium">Due:</span>
                <span className="font-bold">
                  {(grandTotal - paidAmount).toFixed(2)}
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
