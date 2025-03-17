import React, { useState } from "react";
import "./Faq.css"; // Create a CSS file to style the FAQ component


const Faq = () => {


  // State to manage the active accordion
  const [activeAccordion, setActiveAccordion] = useState(null);
  

  // Helper function to toggle the active accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(prevIndex => (index === prevIndex ? null : index));
  };
  
  // FAQ data based on the provided HTML code
  const faqData = [
    {
      question: "Education & Confidence Boosting",
      answer:
        "Hair counsellors educate on hair care, restore confidence, provide emotional support and guide suitable product selection to address self-esteem impacted by hair concerns.",
    },
    {
      question:
        "Assessment",
      answer:
        "They assess the client's hair type, texture, condition, and overall health to determine the underlying causes of any issues. This assessment helps in tailoring appropriate recommendations",
    },
    {
      question: "Recommendations & Product Knowledge",
      answer:
        "Hair counsellors offer personalized advice, including product suggestions, treatments, and styling methods aligned with clients' preferences, leveraging up-to-date knowledge of hair care advancements.",
    },
 
    {
      question: "Hair Health & Styling Guidance",
      answer:
        "Hair counsellors offer styling guidance for desired looks and provide insights into hair loss causes and solutions, coordinating with the medical professionals for better hair care needs.",
    },
    {
      question: "Follow-Up",
      answer:
        "Depending on the situation, hair counsellors might have follow-up sessions with clients to track progress, make adjustments to recommendations, and provide ongoing support. Role of a hair counsellor involves a combination of hair expertise, communication skills, and empathy to help clients achieve healthier, more attractive hair and boost their overall self-image.",
    },
  ];

  return (
    <>
    
      <div className="faq-container container">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question" onClick={() => toggleAccordion(index)}>
              {faq.question}
            </h3>
            {activeAccordion === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Faq;
