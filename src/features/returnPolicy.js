import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Footer from "./footer/Footer";
import Navbar from "./nav/Navbar";

const ReturnPolicy = () => {
  return (
    <>    <Navbar>
      <Container>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Refund, Return, and Cancellation Policy</h1>

      <p>At Vplant Speciality Clinic ("Hairsncares"), we prioritize customer satisfaction and aim to provide a smooth and hassle-free experience. Our Refund Policy allows for full refunds under specific conditions outlined below:</p>
      
      <ul>
        <li><strong>Incorrect Product Received:</strong> If you receive an incorrect product.</li>
        <li><strong>Missing Products:</strong> If any product(s) are missing from your order.</li>
        <li><strong>Lost or Damaged in Transit:</strong> If the ordered product(s) were lost or damaged during transit.</li>
        <li><strong>Expired Products:</strong> If the product(s) delivered are past their expiry date.</li>
        <li><strong>Allergic Reactions:</strong> In rare cases, if the product causes allergic reactions or is unsuitable for your body.</li>
      </ul>

      <p>To be eligible for a refund, requests must be submitted within 15 days of delivery, and you must provide clear images of the product(s) highlighting the issue. For claims of missing products, we will review the packing video to confirm that all ordered items were included before dispatch. We may also ask you to share images of the entire package received when submitting your request.</p>

      <p>For non-defective products, we may accept returns of sealed and unused items provided we are notified within 15 days of receipt. We will initiate a pickup once your return request is received within the specified timeframe.</p>

      <h2>How to Request a Refund</h2>
      <p>To request a refund, please contact our customer care team between 10 AM and 7 PM Monday to Saturday via:</p>
      <ul>
        <li><strong>Email:</strong> hairsncares@gmail.com</li>
        <li><strong>WhatsApp:</strong> +91 9136028327</li>
      </ul>
      <p>When contacting us, include your order ID, reason for the refund, specified product(s), and an image of the product(s) in question.</p>

      <h2>Return Processing</h2>
      <p>Once we receive a return request, we will arrange for our logistics partner to pick up the product, typically within 2 working days. The timeline may vary based on logistics partner availability, location, and public holidays. Refunds for returned products are initiated after a Quality Check. The product must be returned with all original packaging and materials to pass the Quality Check.</p>
      <p><strong>Quality Check:</strong> This is conducted by the delivery partner during pickup to ensure the returned product is in its original condition, sealed, unused, and with no signs of tampering or usage. If the product passes the Quality Check, we will process the refund to your original payment method. For Cash on Delivery (COD) orders, a refund link will be provided to select your preferred refund method and submit the necessary details.</p>

      <h2>Cancellation of Orders</h2>
      <p>To cancel your order, please contact us via:</p>
      <ul>
        <li><strong>Email:</strong> hairsncares@gmail.com</li>
        <li><strong>WhatsApp:</strong> +91 9136028327</li>
      </ul>
      <p>If our courier partner attempts delivery for orders canceled before delivery, please decline acceptance. If delivery is accepted, we will arrange a reverse pickup, ensuring the products remain sealed and unused.</p>

      <h2>Processing of Refunds</h2>
      <p>Refund processing times depend on the original payment method:</p>
      <ul>
        <li><strong>Credit/Debit Card or Net Banking:</strong> Allow 5 to 7 working days for the credit to appear.</li>
        <li><strong>Cash on Delivery (COD):</strong> May require an image of a voided cheque leaf, bank statement, or bank details. COD refunds may take up to 3 weeks.</li>
      </ul>
      <p>Please note that refund processing times may be delayed due to factors such as bank policies or circumstances beyond our control. We apologize for any inconvenience caused.</p>
      
      <p>This revised policy provides a clear and concise outline of the refund, return, and cancellation processes at Vplant Speciality Clinic ("Hairsncares").</p>
    </div>
      </Container>
          <Footer/>
          </Navbar>
          </>
  );
};

export default ReturnPolicy;
