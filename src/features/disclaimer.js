import React, { useEffect, useState } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./footer/Footer";
function Disclaimer(props) {
  return (
    <Navbar>
      <div className="container">
        <div
          style={{
            textAlign: "center",
            padding: "40px 0 0 0",
            fontSize: "26px",
            fontWeight: "600",
          }}
        >
          Disclaimer
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          Overview:
        </div>
        <div>
          hairsncares.com is an online hair test portal that offers scalp
          analysis based on submitted scalp pictures and answers to a
          questionnaire. The website provides provisional diagnosis to users,
          emphasizing a holistic approach to hair health and related concerns.
          Please read this disclaimer carefully before using our services. By
          accessing or using the Website, you agree to abide by this disclaimer.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          1. Seek Professional Medical Advice:{" "}
        </div>
        <div>
          The content and services provided on hairsncares.com are for
          informational and educational purposes as well as professional
          management by professionals. It is strongly recommended that clients
          engage in an in-person consultation with a qualified hairsncares
          medical practitioner to ensure the accuracy of diagnosis and receive
          appropriate guidance
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          2. Provisional Diagnoses:
        </div>
        <div>
          The provisional diagnoses provided on hairsncares.com are based on the
          information and images submitted by the user and virtual consultation
          (optional). These diagnoses are provisional and should not be
          considered as a replacement for a thorough medical examination by a
          qualified healthcare provider. Users should consult a hairsncares.com
          healthcare professional personally for a comprehensive evaluation of
          their condition.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          3. Holistic Approach:
        </div>
        <div>
          hairsncares.com promotes a holistic approach to hair health, taking
          into consideration various factors that may affect hair and scalp
          conditions. However, our recommendations are general in nature and may
          not address individualized health needs. It is essential to consult a
          hairsncares healthcare professional for personalized guidance.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          4. Accuracy and Reliability:
        </div>
        <div>
          While we strive to provide accurate and reliable information, the
          content on hairsncares.com may not always be up-to-date. We do not
          guarantee the accuracy, reliability, or completeness of the
          information provided on the Website. Users should verify any
          information obtained from this Website with a healthcare professional.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          5. User Responsibility:
        </div>
        <div>
          Users of hairsncares.com are responsible for their actions and
          decisions based on the information and recommendations provided on the
          Website. We are not liable for any direct, indirect, or consequential
          damages resulting from the use of this Website or its content.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          6. Results Disclaimer:
        </div>
        <div>
          While we strive to provide valuable insights and support, it is
          essential to acknowledge the following regarding results:
        </div>
        <ul style={{    margin: "10px 0 0 0"}}>
          <li>
            Individual Variation:
            <div>
              The outcomes of hair loss management can vary significantly from
              person to person. Factors such as genetics, lifestyle, overall
              health, and adherence to recommendations can influence results.
            </div>
          </li>

          <li>
            No Guarantee of Specific Results:
            <div>
              We do not make any guarantees or warranties, whether expressed or
              implied, regarding the specific results that users may achieve
              through the use of our services or recommendations.
            </div>
          </li>

          <li>
            Consultation with Professionals:{" "}
            <div>
              Users are strongly encouraged to consult with qualified healthcare
              professionals, particularly dermatologists, for personalized
              advice and treatment options.
            </div>
          </li>

          <li>
            Company Safeguard:{" "}
            <div>
              hairsncares.com and its affiliated entities shall not be held
              responsible or liable for the outcomes or consequences resulting
              from the use of the information and recommendations provided on
              the Website. Users assume full responsibility for their actions
              and decisions.
            </div>
          </li>

          <li>
            Changes to Information:{" "}
            <div>
              We reserve the right to update, modify, or remove content from the
              Website at any time. Users are responsible for verifying the
              accuracy and currency of information provided.
            </div>
          </li>
        </ul>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          7. Privacy and Data Security:
        </div>
        <div>
          We take user privacy and data security seriously. Any personal or
          medical information provided by users will be handled in accordance
          with our Privacy Policy. However, we cannot guarantee the security of
          data transmitted over the internet.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          8. Third-Party Links:
        </div>
        <div>
          hairsncares.com may contain links to third-party websites or
          resources. We are not responsible for the content, accuracy, or
          reliability of these external sites. Users should exercise caution and
          review the terms and conditions of third-party websites.
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          9. Changes to Disclaimer:
        </div>
        <div>
          We reserve the right to modify or update this disclaimer at any time
          without notice. It is the user's responsibility to review this
          disclaimer periodically for changes.{" "}
        </div>

        <div
          style={{
            margin: "20px 0 10px 0",
            fontSize: "20px",
          }}
        >
          10. Contact Information:
        </div>
        <div>
          If you have any questions or concerns regarding this disclaimer or the
          services provided on hairsncares.com, please contact us at [Contact
          Email]. By using hairsncares.com, you acknowledge that you have read,
          understood, and agreed to this Website Disclaimer. If you do not agree
          with any part of this disclaimer, please refrain from using our
          services.
        </div>
      </div>
      <Footer />
    </Navbar>
  );
}

export default Disclaimer;
