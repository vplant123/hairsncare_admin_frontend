import React, { useEffect, useState } from "react";

const contentF = {
  "Grade 1": {
    heading: "Grade 1 – 1500 Grafts",
    title: "Grade 1 – 1500 Grafts (Female)",
    paragraphs: [
      {
        strong: "Grade 1 – 1500 Grafts",
        text: "",
      },
      {
        strong: "Introduction:",
        text: "You have been diagnosed with Grade 1 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness.",
      },
      {
        strong: "What is Hair Transplant?",
        text: "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair.",
      },
      {
        strong: "What are the types of Hair Transplant?",
        textHead: "Hair transplant procedures primarily use three techniques:",
        text: [
          {
            text: "Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation.",
          },
          {
            text: "and Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results.",
          },
          {
            text: "MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result.",
          },
        ],
      },
      {
        strong: "Advantages of Modified Hair Implantation (MHI):",
        text: [
          { text: "NO CUT" },
          { text: "NO PAIN" },
          { text: "NO STITCHES" },
          { text: "NO BLEEDING" },
          { text: "NO SCALPELS" },
          { text: "LESS INVASIVE" },
          { text: "LESS TRAUMATIC" },
          { text: "LESS HANDLING OF THE GRAFT" },
          { text: "INCREASED GRAFT SURVIVAL" },
          { text: "INVISIBLE SCARRING" },
          { text: "QUICK RECOVERY" },
        ],
      },
      {
        text: "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness.",
      },
      {
        strong: "Advantages of MHI+",
        text: [
          {
            text: "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle.",
          },
          {
            text: "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs.",
          },
          { text: "Increases Success Rate of hair transplant." },
        ],
      },
      {
        strong: "MHI+ PRINCIPLES:",
        text: [
          { text: "SAFE" },
          { text: "QUICK RECOVERY" },
          { text: "NATURAL" },
          { text: "NON-SURGICAL" },
          { text: "ADVANCED" },
          { text: "LONG TERM" },
        ],
      },
      {
        text: "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence.",
      },
      {
        text: "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT).",
      },
      {
        strong: "What are the number of grafts required for you?",
        text: "1500 Grafts",
      },
      {
        strong:
          "Your Prescription of medications for your Grade 1 Androgenetic alopecia will be provided in the Prescription in Your My Reports section",
      },
      {
        strong: "Below is the detailed management report for your condition.",
      },
    ],
  },

  "Grade 2": {
    heading: "Grade 2 – 2000 to 2500 Grafts (Female)",
    title: "Grade 2 – 2000 to 2500 Grafts (Female)",
    paragraphs: [
      {
        strong: "Grade 2 – 2000 to 2500 Grafts",
        text: "",
      },
      {
        strong: "Introduction:",
        text: "You have been diagnosed with Grade 2 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness.",
      },
      {
        strong: "What is Hair Transplant?",
        text: "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair.",
      },
      {
        strong: "What are the types of Hair Transplant?",
        textHead: "Hair transplant procedures primarily use three techniques:",
        text: [
          {
            text: "Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation.",
          },
          {
            text: "and Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results.",
          },
          {
            text: "MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result.",
          },
        ],
      },
      {
        strong: "Advantages of Modified Hair Implantation (MHI):",
        text: [
          { text: "NO CUT" },
          { text: "NO PAIN" },
          { text: "NO STITCHES" },
          { text: "NO BLEEDING" },
          { text: "NO SCALPELS" },
          { text: "LESS INVASIVE" },
          { text: "LESS TRAUMATIC" },
          { text: "LESS HANDLING OF THE GRAFT" },
          { text: "INCREASED GRAFT SURVIVAL" },
          { text: "INVISIBLE SCARRING" },
          { text: "QUICK RECOVERY" },
        ],
      },
      {
        text: "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness.",
      },
      {
        strong: "Advantages of MHI+",
        text: [
          {
            text: "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle.",
          },
          {
            text: "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs.",
          },
          { text: "Increases Success Rate of hair transplant." },
        ],
      },
      {
        strong: "MHI+ PRINCIPLES:",
        text: [
          { text: "SAFE" },
          { text: "QUICK RECOVERY" },
          { text: "NATURAL" },
          { text: "NON-SURGICAL" },
          { text: "ADVANCED" },
          { text: "LONG TERM" },
        ],
      },
      {
        text: "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence.",
      },
      {
        text: "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT).",
      },
      {
        strong: "What are the number of grafts required for you?",
        text: "2000 to 2500 Grafts",
      },
      {
        strong:
          "Your Prescription of medications for your Grade 2 Androgenetic alopecia will be provided in the Prescription in Your My Reports section.",
      },
      {
        strong: "Below is the detailed management report for your condition.",
      },
    ],
  },

  "Grade 3": {
    heading: "Grade 3 – 2500 to 3000 Grafts (Female)",
    title: "Grade 3 – 2500 to 3000 Grafts (Female)",
    paragraphs: [
      {
        strong: "Grade 3 – 2500 to 3000 Grafts",
        text: "",
      },
      {
        strong: "Introduction:",
        text: "You have been diagnosed with Grade 3 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness.",
      },
      {
        strong: "What is Hair Transplant?",
        text: "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair.",
      },
      {
        strong: "What are the types of Hair Transplant?",
        textHead: "Hair transplant procedures primarily use three techniques:",
        text: [
          {
            text: "A. Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation.",
          },
          {
            text: "B. and Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results.",
          },
          {
            text: "C. MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result.",
          },
        ],
      },
      {
        strong: "Advantages of Modified Hair Implantation (MHI):",
        text: [
          { text: "NO CUT" },
          { text: "NO PAIN" },
          { text: "NO STITCHES" },
          { text: "NO BLEEDING" },
          { text: "NO SCALPELS" },
          { text: "LESS INVASIVE" },
          { text: "LESS TRAUMATIC" },
          { text: "LESS HANDLING OF THE GRAFT" },
          { text: "INCREASED GRAFT SURVIVAL" },
          { text: "INVISIBLE SCARRING" },
          { text: "QUICK RECOVERY" },
        ],
      },
      {
        text: "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness.",
      },
      {
        strong: "Advantages of MHI+",
        text: [
          {
            text: "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle.",
          },
          {
            text: "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs.",
          },
          { text: "Increases Success Rate of hair transplant." },
        ],
      },
      {
        strong: "MHI+ PRINCIPLES:",
        text: [
          { text: "SAFE" },
          { text: "QUICK RECOVERY" },
          { text: "NATURAL" },
          { text: "NON-SURGICAL" },
          { text: "ADVANCED" },
          { text: "LONG TERM" },
          {
            text: "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence.",
          },
          {
            text: "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT).",
          },
        ],
      },
      {
        strong: "What are the number of grafts required for you?",
        text: "2500 to 3000 Grafts",
      },
      {
        strong:
          "Your Prescription of medications for your Grade 3 Androgenetic alopecia will be provided in the Prescription in Your My Reports section.",
        text: "",
      },
      {
        strong: "Below is the detailed management report for your condition.",
        text: "",
      },
    ],
  },
};

const contentM = {
  "Grade 1": {
    "heading": "Grade 1 – 1500 to 2000 Grafts (Male)",
    "title": "Grade 1 – 1500 to 2000 Grafts (Male)",
    "paragraphs": [
      {
        "strong": "Grade 1 – 1500 to 2000 Grafts (Male)",
        "text": ""
      },
      {
        "strong": "Introduction: ",
        "text": "You have been diagnosed with Grade 1 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness."
      },
      {
        "strong": "What is Hair Transplant?",
        "text": "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair."
      },
      {
        "strong": "What are the types of Hair Transplant?",
        "textHead": "Hair transplant procedures primarily use three techniques:",
        "text": [
          { "text": "A. Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation." },
          { "text": "B. Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results." },
          { "text": "C. MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result." }
        ]
      },
      {
        "strong": "Advantages of Modified Hair Implantation (MHI):",
        "text": [
          { "text": "NO CUT" },
          { "text": "NO PAIN" },
          { "text": "NO STITCHES" },
          { "text": "NO BLEEDING" },
          { "text": "NO SCALPELS" },
          { "text": "LESS INVASIVE" },
          { "text": "LESS TRAUMATIC" },
          { "text": "LESS HANDLING OF THE GRAFT" },
          { "text": "INCREASED GRAFT SURVIVAL" },
          { "text": "INVISIBLE SCARRING" },
          { "text": "QUICK RECOVERY" }
        ]
      },
      {
        "strong": "",
        "text": "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness."
      },
      {
        "strong": "Advantages of MHI+",
        "text": [
          { "text": "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle." },
          { "text": "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs." },
          { "text": "Increases Success Rate of hair transplant." }
        ]
      },
      {
        "strong": "MHI+ PRINCIPLES:",
        "text": [
          { "text": "SAFE" },
          { "text": "QUICK RECOVERY" },
          { "text": "NATURAL" },
          { "text": "NON-SURGICAL" },
          { "text": "ADVANCED" },
          { "text": "LONG TERM" }
        ]
      },
      { "text": "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence." },
      { "text": "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT)." },
      {
        "strong": "What are the number of grafts required for you?",
        "text": "1500 to 2000 Grafts"
      },
      {
        "strong": "Your Prescription of medications for your Grade 1 Androgenetic alopecia will be provided in the Prescription in Your My Reports section",
        "text": ""
      },
      {
        "strong": "Below is the detailed management report for your condition.",
        "text": ""
      }
    ]
  },
  "Grade 2 & Grade 3": {
    "heading": "Grade 2 to Grade 3 – 2500 to 3000 Grafts (Male)",
    "title": "Grade 2 to Grade 3 – 2500 to 3000 Grafts (Male)",
    "paragraphs": [
      {
        "strong": "Grade 2 to Grade 3 – 2500 to 3000 Grafts",
        "text": ""
      },
      {
        "strong": "Introduction:",
        "text": "You have been diagnosed with Grade 2 / Grade 3 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness."
      },
      {
        "strong": "What is Hair Transplant?",
        "text": "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair."
      },
      {
        "strong": "What are the types of Hair Transplant?",
        "textHead": "Hair transplant procedures primarily use three techniques:",
        "text": [
          { "text": "A. Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation." },
          { "text": "B. and Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results." },
          { "text": "C. MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result." }
        ]
      },
      {
        "strong": "Advantages of Modified Hair Implantation (MHI):",
        "text": [
          { "text": "NO CUT" },
          { "text": "NO PAIN" },
          { "text": "NO STITCHES" },
          { "text": "NO BLEEDING" },
          { "text": "NO SCALPELS" },
          { "text": "LESS INVASIVE" },
          { "text": "LESS TRAUMATIC" },
          { "text": "LESS HANDLING OF THE GRAFT" },
          { "text": "INCREASED GRAFT SURVIVAL" },
          { "text": "INVISIBLE SCARRING" },
          { "text": "QUICK RECOVERY" }
        ]
      },
      {
        "text": "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness."
      },
      {
        "strong": "Advantages of MHI+",
        "text": [
          { "text": "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle." },
          { "text": "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs." },
          { "text": "Increases Success Rate of hair transplant." }
        ]
      },
      {
        "strong": "MHI+ PRINCIPLES:",
        "text": [
          { "text": "SAFE" },
          { "text": "QUICK RECOVERY" },
          { "text": "NATURAL" },
          { "text": "NON-SURGICAL" },
          { "text": "ADVANCED" },
          { "text": "LONG TERM" },
          { "text": "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence." },
          { "text": "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT)." }
        ]
      },
      {
        "strong": "What are the number of grafts required for you?",
        "text": "2500 to 3000 Grafts"
      },
      {
        "strong": "Your Prescription of medications for your Grade 2 / Grade 3 Androgenetic alopecia will be provided in the Prescription in Your My Reports section.",
        "text": ""
      },
      {
        "strong": "Below is the detailed management report for your condition.",
        "text": ""
      }
    ]
  },
  "Grade 4 & Grade 5": {
    "heading": "Grade 4 & Grade 5 – 4500 to 5000 Grafts (Male)",
    "title": "Grade 4 & Grade 5 – 4500 to 5000 Grafts (Male)",
    "paragraphs": [
      {
        "strong": "Grade 4 & Grade 5 – 4500 to 5000 Grafts",
        "text": ""
      },
      {
        "strong": "Introduction:",
        "text": "You have been diagnosed with Grade 4 / 5 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness."
      },
      {
        "strong": "What is Hair Transplant?",
        "text": "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair."
      },
      {
        "strong": "What are the types of Hair Transplant?",
        "textHead": "Hair transplant procedures primarily use three techniques:",
        "text": [
          { "text": "A. Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation." },
          { "text": "B. and Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results." },
          { "text": "C. MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result." }
        ]
      },
      {
        "strong": "Advantages of Modified Hair Implantation (MHI):",
        "text": [
          { "text": "NO CUT" },
          { "text": "NO PAIN" },
          { "text": "NO STITCHES" },
          { "text": "NO BLEEDING" },
          { "text": "NO SCALPELS" },
          { "text": "LESS INVASIVE" },
          { "text": "LESS TRAUMATIC" },
          { "text": "LESS HANDLING OF THE GRAFT" },
          { "text": "INCREASED GRAFT SURVIVAL" },
          { "text": "INVISIBLE SCARRING" },
          { "text": "QUICK RECOVERY" }
        ]
      },
      {
        "text": "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness."
      },
      {
        "strong": "Advantages of MHI+",
        "text": [
          { "text": "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle." },
          { "text": "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs." },
          { "text": "Increases Success Rate of hair transplant." }
        ]
      },
      {
        "strong": "MHI+ PRINCIPLES:",
        "text": [
          { "text": "SAFE" },
          { "text": "QUICK RECOVERY" },
          { "text": "NATURAL" },
          { "text": "NON-SURGICAL" },
          { "text": "ADVANCED" },
          { "text": "LONG TERM" },
          { "text": "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence." },
          { "text": "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT)." }
        ]
      },
      {
        "strong": "What are the number of grafts required for you?",
        "text": "4500 to 5000 Grafts"
      },
      {
        "strong": "Your Prescription of medications for your Grade 4/5 Androgenetic alopecia will be provided in the Prescription in Your My Reports section.",
        "text": ""
      },
      {
        "strong": "Below is the detailed management report for your condition.",
        "text": ""
      }
    ]
  },
  "Grade 6 & Grade 7": {
    "heading": "Grade 6 & Grade 7 – 2 sessions (Male)",
    "title": "Grade 6 & Grade 7 – 2 sessions (Male)",
    "paragraphs": [
      {
        "strong": "Grade 6 & Grade 7 – 2 sessions",
        "text": "1st session for 2 days with 4500 to 5000 grafts. 2nd session for 2 days with 4000 to 4500 grafts."
      },
      {
        "strong": "Introduction:",
        "text": "You have been diagnosed with Grade 6 / Grade 7 Androgenetic alopecia and you need hair transplant as a long term, effective natural solution for your baldness."
      },
      {
        "strong": "What is Hair Transplant?",
        "text": "A hair transplant is a surgical procedure that involves moving hair follicles from one part of the body (usually the back or sides of the head, where hair is resistant to balding) to an area with thinning or no hair."
      },
      {
        "strong": "What are the types of Hair Transplant?",
        "textHead": "Hair transplant procedures primarily use three techniques:",
        "text": [
          { "text": "A. Follicular Unit Transplantation (FUT) involves removing a strip of skin containing hair follicles from the donor area, which is then dissected into individual grafts for transplantation." },
          { "text": "B. Follicular Unit Extraction (FUE) involves the extraction of individual hair follicles directly from the donor site, often resulting in smaller, less noticeable scars. These transplanted follicles typically continue to grow in their new location, providing lasting results." },
          { "text": "C. MHI is the latest, unique, Advanced Hair Implant system which is a combination of Advanced Hair Transplant, Platelet Rich Plasma (PRP) Therapy along with addition of patented specific growth factor which gives boost to existing hairs and ensures the growth of newly implanted hair to ensure uniform growth for excellent result." }
        ]
      },
      {
        "strong": "Advantages of Modified Hair Implantation (MHI):",
        "text": [
          { "text": "NO CUT" },
          { "text": "NO PAIN" },
          { "text": "NO STITCHES" },
          { "text": "NO BLEEDING" },
          { "text": "NO SCALPELS" },
          { "text": "LESS INVASIVE" },
          { "text": "LESS TRAUMATIC" },
          { "text": "LESS HANDLING OF THE GRAFT" },
          { "text": "INCREASED GRAFT SURVIVAL" },
          { "text": "INVISIBLE SCARRING" },
          { "text": "QUICK RECOVERY" }
        ]
      },
      {
        "text": "MHI + is MHI hair transplant technique which is now upgraded with our patented V-thread technique first time in India exclusively available only in our Vplant centers. V Thread is an absorbable thread dipped with DHT blocker solution. DHT is a main culprit for baldness."
      },
      {
        "strong": "Advantages of MHI+",
        "text": [
          { "text": "It will increase blood flow and provide Nutritional boost for bald area which will provide new hair follicle." },
          { "text": "It increases the graft survival rate from 90 to 98%. It will give more density than any other methods of hair transplant by Rejuvenating existing hairs." },
          { "text": "Increases Success Rate of hair transplant." }
        ]
      },
      {
        "strong": "MHI+ PRINCIPLES:",
        "text": [
          { "text": "SAFE" },
          { "text": "QUICK RECOVERY" },
          { "text": "NATURAL" },
          { "text": "NON-SURGICAL" },
          { "text": "ADVANCED" },
          { "text": "LONG TERM" },
          { "text": "The results of a well-executed hair transplant can appear natural and seamlessly blend with existing hair, enhancing the individual's appearance and self-confidence." },
          { "text": "While hair transplants are generally considered permanent because the transplanted hair follicles are resistant to the hormone responsible for male pattern baldness (DHT)." }
        ]
      },
      {
        "strong": "What are the number of grafts required for you?",
        "text": "4500 to 5000 Grafts"
      },
      {
        "strong": "Your Prescription of medications for your Grade 6 / Grade 7 Androgenetic alopecia will be provided in the Prescription in Your My Reports section.",
        "text": ""
      },
      {
        "strong": "Below is the detailed management report for your condition.",
        "text": ""
      }
    ]
  }
}
export default function Page11({data1}) {
  console.log("joejroj",data1)
  return (
    <div className="a4-page">
      {data1?.map((item) => {
        let content =
          item?.option == "Androgenetic Alopecia (M)"
            ? contentM[item?.subOption]
            : item?.option == "Androgenetic Alopecia (F)"
            ? contentF[item?.subOption]
            : null;
        console.log(
          "jsoejfo",
          content,
          item?.option,
          contentM[item?.subOption]
        );
        return (
          <>
            {content ? (
              <div className="page-break-1">
                <h1>{item?.option}</h1>
                {/* <h1 className="diag">Diagnosis Management</h1> */}
                <h2>{content?.title}</h2>
                {content?.paragraphs?.map((para, index) => (
                  <div key={index}>
                    {para?.strong && <strong>{para?.strong}</strong>}
                    {Array.isArray(para?.text) ? (
                      <ul>
                        {para?.text?.map((item, idx) => (
                          <li key={idx}>{item.text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{para?.text}</p>
                    )}
                    {para.textHead && <h3>{para.textHead}</h3>}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
}
