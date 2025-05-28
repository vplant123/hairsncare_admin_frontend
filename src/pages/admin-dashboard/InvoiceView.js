import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import BASE_URL from "../../Config";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import { Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "./InvoiceView.css";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import html2pdf from 'html2pdf.js';

const customStyles = {
  rows: {
    style: {
      borderBottom: "none", // Removes border below rows
    },
  },
  headRow: {
    style: {
      borderBottom: "none",
      fontWeight: "400",
    },
  },
  table: {
    style: {
      border: "none", // Removes border around the table
    },
  },
};

export default function InvoiceView() {
  const { id } = useParams();
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const [data, setData] = useState();
  const [patientData, setPatientData] = useState([]);
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/getInvoiceById`, {
          method: "POST",
          headers: {
            Authorization: storedUserData.logedInUser.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log("smoejfoe", jsonData?.data);
        setData(jsonData?.data);
        setPatientData(jsonData.data?.items);
      } catch (error) {
        toast.error("Error fetching doctors: " + error.message);
      }
    };

    fetchData();
  }, [id]);


  const generatePDF = () => {
    setLoading(true);

    const element = contentRef.current;
    const opt = {
      margin: 0.5, // Top, left, bottom, right margins
      filename: `Prescription.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' },
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success('PDF generated successfully');
  };

  let columns;
  {
    patientData?.map((i, k) => {
      columns = [
        {
          name: "SL.",
          selector: (i) => k + 1,
          width: "5%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Medicine Name",
          selector: (i) => i?.item?.name || "",
          width: "15%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Batch No",
          selector: (i) => i?.item?.batchNo || "",
          width: "10%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Expiry Date",
          width: "12%",
          selector: (i) => i?.item?.expiryDate || "",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "HSN Code",
          selector: (i) => "",
          width: "12%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Qty.",
          selector: (i) => i["quantity"],
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "GST",
          selector: (i) => i["gst"] + "%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Rate",
          selector: (i) => "₹ " + i["rate"],
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
        {
          name: "Discount",
          selector: (i) => "₹ " + i["discount"],
          width: "10%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },

        {
          name: "Amount",
          selector: (i) => "₹ " + i["total"],
          width: "10%",
          wrap: true, // This will wrap the text within the cell
          style: {
            whiteSpace: "pre-wrap", // Ensure the text wraps correctly
            wordBreak: "break-word", // Break long words to fit within the cell
          },
        },
      ];
    });
  }
  return (
    <AdminNavbar>
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Generate and Download PDF"}
          </button>
      <div className="main-invoice-view" ref={contentRef}>
        <div
          className="sec-1 d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ width: "40%" }} className="d-flex flex-column">
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              TAX INVOICE
            </div>
            <div className="main-text">INVOICE No. {data?.invoiceNo}</div>
            {data?.orderId && (
              <div className="main-text">Order ID: {data?.orderId}</div>
            )}
            {data?.orderDate && (
              <div className="main-text">Order Date: {data?.orderDate}</div>
            )}

            <div className="main-text">
              Invoice Date:{" "}
              {data?.date && moment(data?.date)?.format("DD-MM-YYYY")}
            </div>
            <div className="main-text">Name: {data?.name}</div>
            <div style={{ fontSize: "14px" }}>
              <strong>Shipping Address :</strong> {data?.address}
            </div>

            <div className="main-text">GST No: 27AOVPA1 631 G2Z1</div>
          </div>
          <div className="d-flex flex-column" style={{ width: "20%" }}></div>
          <div className="d-flex flex-column" style={{ width: "40%" }}>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              VPLANT CHEMIST
            </div>
            <div style={{ margin: "10px 0 0px 0" }} className="main-text">
              OFFICE NO. 101/A (PART 1), FIRST FLOOR, KANE PLAZA,
              <br />
              MIND SPACE OFF. MALAD LINK ROAD,
              <br />
              MALAD WEST, Tal : MALAD WEST ( MUMBAI -ZONE6 )<br />
              Pin : 400064
              <br />
              Email : infor@hairsncares.com
              <br />
              Website: www.hairsncares.com
            </div>
            <div style={{ margin: "10px 0 60px 0" }}>
              <strong>LICENSE No. :</strong> MH-MZ6-537527
              <br />
              <strong> Doctor Name</strong> {data?.doctor?.name}
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid #ededf1" }}>
          <DataTable
            columns={columns}
            data={patientData}
            pagination={false}
            customStyles={{
              tableWrapper: {
                style: {
                  border: "1px solid #ededf1", // Apply border around the full table
                },
              },
              headRow: {
                style: {
                  backgroundColor: "#FFFFFF",
                  fontSize: "16px",
                },
              },
              headCells: {
                style: {
                  fontWeight: "600",
                  textTransform: "uppercase",
                  border: "none",
                },
              },
              cells: {
                style: {
                  fontSize: "14px",
                  minHeight: "50px",
                  border: "none",
                  backgroundColor: "#ededf1",
                },
              },
            }}
            // fixedHeader
            // fixedHeaderScrollHeight='450px'
            // selectableRows
            selectableRowsHighlight
            highlightOnHover
          />
          <div className="d-flex" style={{ padding: "10px" }}>
            <div style={{ width: "20%" }}>Payment Type:</div>
            <div style={{ width: "80%" }}>{data?.paymentMode||"cash"}</div>
          </div>

          <div
            className="d-flex"
            style={{
              margin: "70px 0 0 0",
              padding: "10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <div>Note: Inclusive of all Taxes</div>
              <div style={{ margin: "100px 0 0 0" }}>
                <img
                  style={{ width: "350px" }}
                  alt="logo"
                  className="nav-logo"
                  src="/assets/img/logo.png"
                />
              </div>
            </div>
            <div
              className="d-flex flex-column"
              style={{ width: "30%", justifyContent: "space-between" }}
            >
              <div className="d-flex flex-column">
                <div style={{ border: "1px solid #ededf1", marginRight: "7%" }}></div>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between",margin : "10px 0 20px 0" }}
                >
                  <div>MRP Total</div>
                  <div style={{ marginRight: "20%" }}>₹ {data?.total}</div>
                </div>

                {data?.couponDiscount && <div
                  className="d-flex"
                  style={{ justifyContent: "space-between",margin : "10px 0 20px 0" }}
                >
                  <div>Coupon Discoun</div>
                  <div style={{ marginRight: "20%" }}>₹ {data?.couponDiscount}</div>
                </div>}

                {/* <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-between",
                    margin: "10px 0 0 0",
                  }}
                >
                  <div>MRP Total</div>
                  <div style={{ marginRight: "20%" }}>5143</div>
                </div> */}
                <div style={{ border: "1px solid #ededf1", marginRight: "7%" }}></div>

                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between",margin : "10px 0 20px 0" }}
                >
                  <div>Total Invoice Amount</div>
                  <div style={{ marginRight: "20%" }}>₹ {data?.total}</div>
                </div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>
                Thank you very much for choosing us.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
