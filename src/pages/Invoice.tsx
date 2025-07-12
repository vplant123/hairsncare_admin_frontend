import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Bold, Eye, FileText, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2pdf from "html2pdf.js"; // Corrected import

// Modal Component for Invoice Form
const InvoiceFormModal = ({ isOpen, invoice, onClose }) => {
  if (!isOpen || !invoice) return null;

  // Use invoice.items or [] if undefined
  const invoiceItems = invoice.items || [];

  // For PDF download
  const handleDownload = () => {
    const element = document.getElementById("invoice-pdf-content");

    if (element) {
      html2pdf()
        .from(element) // Pass the element to convert into PDF
        .save("invoice.pdf"); // Set the file name
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">Invoice Preview</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <span className="text-xs">X</span>
          </Button>
        </div>
        <div className="flex justify-end mb-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="text-xs px-3 py-1"
          >
            Download Invoice
          </Button>
        </div>
        <div
          id="invoice-pdf-content"
          className="bg-white p-8 rounded shadow text-xs md:text-sm border"
        >
          {/* Header */}
          <div className="mt-2">
            <img
              src="/lovable-uploads/logo.png"
              alt="Logo"
              className="h-12 inline-block mr-2"
            />
          </div>
          <div className="font-bold text-lg py-2">
            Hairncares Wellness Center
          </div>
          {/* <div className="font-bold text-lg py-2  ">
            Tax Invoice/Bill of Supply/Cash Memo
          </div> */}
          <div className="flex flex-col md:flex-row justify-between mb-2 gap-2 ">
            <div className="text-left ">
              <div className="font-bold text-sm py-2">SOLD BY:</div>
              <div className="font-bold text-sm py-2">VPLANT CHEMIST</div>
              <div className="max-w-xs text-xs leading-relaxed">
                <b>Email :</b> infor@hairsncares.com
                <br />
                <b>Website:</b> www.hairsncares.com
                <br />
                <b>LICENSE No. :</b> MH-MZ6-537527
                <br />
                <b>Doctor Name:</b> {invoice.doctor?.name || "-"}
              </div>
              <div>
                <div className="font-bold text-sm py-2">Registered Adress:</div>
                <div className="text-xs">
                  First Floor, Solitaire 1, A-102, New Link Rd,<br></br>{" "}
                  Opposite Infinity Mall, ,Malad West,<br></br> Mumbai,
                  Maharashtra 400064
                </div>
                <div></div>
              </div>
            </div>

            <div>
              <div className="font-bold text-sm py-2 pb-11">SOLD TO: </div>
              <div className="text-xs">
                {" "}
                <b>Patient Name:</b> {invoice.name}
              </div>
              <div className="text-xs">
                <b>Shipping Address:</b> {invoice.address}
              </div>
            </div>
            <div>
              <div className="font-bold text-sm py-2">TAX INVOICE</div>
              <div className="mt-1 space-y-0.5 leading-relaxed pt-7">
                <div className="text-xs">
                  <b>INVOICE No.</b> {invoice.invoiceNo}
                </div>
                <div className="text-xs">
                  <b>Order ID:</b> {invoice.orderNumber}
                </div>
                <div className="text-xs">
                  <b>Invoice Date:</b>{" "}
                  {new Date(invoice.date).toLocaleDateString()}
                </div>
                <div className="text-xs">
                  <b>GST NO:</b> 27AOVPA1 631 G2Z1
                </div>
                <div className="text-xs">
                  <b>Payment Type:</b>{" "}
                  <span className="font-semibold">{invoice.paymentMode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded overflow-x-auto mt-6  ">
            <table className="min-w-full text-xs md:text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="2 py-1 border font-semibold">SR.NO</th>
                  <th className="2 py-1 border font-semibold">PARTICULARS</th>

                  <th className="2 py-1 border font-semibold">BATCH NO</th>
                  <th className="2 py-1 border font-semibold">EXPIRY DATE</th>
                  <th className="2 py-1 border font-semibold">HSN/SAC CODE</th>
                  <th className="2 py-1 border font-semibold">MRP(₹)</th>

                  <th className="2 py-1 border font-semibold">
                    DISCOUNT AMOUNT(%)
                  </th>

                  <th className="2 py-1 border font-semibold">
                    TAXABLE AMT.(₹)
                  </th>
                  <th className="2 py-1 border font-semibold">QTY</th>
                  <th className="2 py-1 border font-semibold">GST RATE(%)</th>
                  <th className="2 py-1 border font-semibold">GST AMT.(₹)</th>
                  <th className="2 py-1 border font-semibold">FINAL AMT.(₹)</th>
                </tr>
              </thead>
              <tbody>
                {/* Only show consultation row if consultation fee exists and is not zero */}
                {/* {invoice.consultationFee > 0 && (
                  <tr>
                    <td></td>
                    <td className="border px-2 py-2 font-semibold text-center">
                      Consultation Fee
                    </td>
                    <td className="border px-2 py-2">-</td>
                    <td className="border px-2 py-2">-</td>
                    <td className="border px-2 py-2">-</td>
                    <td className="border px-2 py-2">-</td>
                    <td className="border px-2 py-2 text-center">
                      {Number(invoice.consultationFee).toFixed(2)}
                    </td>

                    <td className="border px-2 py-2 text-center"></td>
                    <td className="border px-2 py-2 text-center"></td>
                    <td className="border px-2 py-2 text-center"></td>
                    <td className="border px-2 py-2 text-center">
                      {Number(invoice.consultationGST).toFixed(2)}%
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {(
                        Number(invoice.consultationFee) +
                        (Number(invoice.consultationFee) *
                          Number(invoice.consultationGST)) /
                          100
                      ).toFixed(2)}
                    </td>
                  </tr>
                )} */}
                {invoiceItems.map((item, idx) => (
                  <tr
                    key={item._id || idx}
                    className={`text-center ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="border px-2 py-2">{idx + 1}</td>
                    <td className="border px-2 py-2">
                      {item.item?.name || ""}
                    </td>

                    <td className="border px-2 py-2">{item.batchNo || ""}</td>
                    <td className="border px-2 py-2">
                      {item.expiryDate
                        ? new Date(item.expiryDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="border px-2 py-2">{item.hsn || ""}</td>

                    <td className="border px-2 py-2">
                      {Number(item.rate).toFixed(2)}
                    </td>
                    <td className="border px-2 py-2">
                      {Number(item.discount || 0).toFixed(2)}%
                    </td>

                    <td>
                      {(
                        parseFloat(item.rate || 0) -
                        (parseFloat(item.rate || 0) *
                          parseFloat(item.discount || 0)) /
                          100
                      ).toFixed(2)}
                    </td>
                    <td className="border px-2 py-2">
                      {Number(item.quantity)}
                    </td>
                    <td className="border px-2 py-2">
                      {Number(item.gst || 0).toFixed(2)}%
                    </td>
                    <td className="border px-2 py-2">
                      {(
                        ((parseFloat(item.rate || 0) -
                          (parseFloat(item.rate || 0) *
                            parseFloat(item.discount || 0)) /
                            100) *
                          parseFloat(item.quantity || 0) *
                          parseFloat(item.gst || 0)) /
                        100
                      ).toFixed(2)}
                    </td>
                    <td className="border px-2 py-2">
                      {Number(item.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Payment Type and Note */}
          <div className="flex flex-col md:flex-row justify-between mt-10 gap-2">
            <div>
              <div className="mt-1 text-sm">
                <b>Note:</b> Inclusive of all Taxes
              </div>

              <div className="mt-10 text-sm">
                <p className="text-sm">
                  * All Disputes related to this order are subject to the
                  jurisdication <br />
                  of courts at Mumbai,Maharashtra
                </p>
                <p className="text-sm">
                  For Support Contact : info@hairncares.com
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md w-full md:w-64 mt-2 md:mt-0 text-xs">
              <div className="flex justify-between py-1">
                <span className="font-medium">
                  Product Total (Final Amount)
                </span>
                <span className="font-bold">
                  ₹ {Number(invoice.total || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">Coupon Discount (₹)</span>
                <span className="font-bold">
                  ₹ {Number(invoice.couponDiscount || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">After Discount Amount</span>
                <span className="font-bold">
                  ₹{" "}
                  {(
                    Number(invoice.total || 0) -
                    Number(invoice.couponDiscount || 0)
                  ).toFixed(2)}
                </span>
              </div>{" "}
              <div className="flex justify-between py-1">
                <span className="font-medium">Shipping Charges</span>
                <span className="font-bold">
                  ₹{" "}
                  {Number(invoice.total || 0) -
                    Number(invoice.couponDiscount || 0) <
                  2000
                    ? "200.00"
                    : "0.00"}
                </span>
              </div>
              {/* {invoice.consultationFee > 0 && (
                <div className="flex justify-between py-1">
                  <span className="font-medium">
                    Consultation Fee (Incl.{" "}
                    {Number(invoice.consultationGST).toFixed(2)}% GST)
                  </span>
                  <span className="font-bold">
                    ₹{" "}
                    {(
                      Number(invoice.consultationFee || 0) +
                      (Number(invoice.consultationFee || 0) *
                        Number(invoice.consultationGST || 0)) /
                        100
                    ).toFixed(2)}
                  </span>
                </div>
              )} */}
              <div className="flex justify-between py-1 border-t border-gray-200 mt-1 pt-1">
                <span className="font-medium">Total Invoice Amount</span>
                <span className="font-bold">
                  ₹{" "}
                  {(
                    Number(invoice.total || 0) -
                    Number(invoice.couponDiscount || 0) +
                    (Number(invoice.total || 0) -
                      Number(invoice.couponDiscount || 0) <
                    2000
                      ? 200
                      : 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {/* Thank you note */}

          <div className="mt-20 text-center font-semibold text-xs md:text-sm">
            Thank you very much for choosing us.
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
const InvoiceDetailsModal = ({ isOpen, selectedItems, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            X
          </Button>
        </div>
        <div className="mt-4">
          <h3 className="mt-4 font-semibold">Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedItems?.length > 0 &&
                selectedItems.map(item => (
                  <TableRow key={item._id}>
                    <TableCell>{item.item?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.rate}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                    <TableCell>{item.discountPercent}</TableCell>
                    <TableCell>{item.gst}</TableCell>
                    <TableCell>
                      {(item.quantity * item.rate).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getInvoices`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data", data);
      setInvoices(data?.data);
    } catch (error) {
      console.log("error while fetching invoices data", error);
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    handleFetchData();
  }, []);

  function formatDateArrowStyle(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }

  const handleViewDetails = invoice => {
    setSelectedItems(invoice);
    setIsModalOpen(true);
  };

  const handleViewInvoice = invoice => {
    setSelectedInvoice(invoice);
    setInvoiceModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleCloseInvoiceModal = () => {
    setInvoiceModalOpen(false);
    setSelectedInvoice(null);
  };

  function formatNumberToTwoDecimals(number) {
    return Number(number).toFixed(2);
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button onClick={() => navigate("/addinvoices")}>Add Invoice</Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table className="min-w-full divide-y divide-gray-200">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Invoice No
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Payee Name
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Mobile
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Doctor
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Total
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Paid Amount
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Dues
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Payment Mode
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Order ID
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Items
                      </TableHead>
                      <TableHead className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        View
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(invoices) && invoices.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={12}
                          className="text-center py-8 text-gray-500"
                        >
                          No invoices found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      Array.isArray(invoices) &&
                      invoices.map(invoice => (
                        <TableRow
                          key={invoice._id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.invoiceNo}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.name}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.mobile}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice?.doctor?.name || "-"}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹ {formatNumberToTwoDecimals(invoice.totalAmount)}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹ {formatNumberToTwoDecimals(invoice.paidAmt)}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹ {formatNumberToTwoDecimals(invoice.dues)}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.paymentMode}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.orderId}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDateArrowStyle(invoice.date)}
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(invoice.items)}
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            <Button
                              onClick={() => handleViewInvoice(invoice)}
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to view invoice details */}
      <InvoiceDetailsModal
        isOpen={isModalOpen}
        selectedItems={selectedItems}
        onClose={handleCloseModal}
      />

      {/* Invoice Form Modal */}
      <InvoiceFormModal
        isOpen={invoiceModalOpen}
        invoice={selectedInvoice}
        onClose={handleCloseInvoiceModal}
      />
    </DashboardLayout>
  );
};

export default Invoice;
