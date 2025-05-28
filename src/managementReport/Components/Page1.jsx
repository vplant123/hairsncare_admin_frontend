import React from "react";
import "./Page1.css";
import { color } from "framer-motion";

export default function Page1({ data }) {
  console.log("jojerofre", data?.personal);

  const content = [
    {
      text: "Treatment Plan",
      color: "bg-[#02A1E5]",
      img: "/assets/img/reports/management/page1/grade2baldnesspatienttreatmentplan1427-3wi-300h.png",
    },
    {
      text: "Treatment Plan Hair & Scalp Treatment Management",
      color: "bg-[rgba(159,239,248,1)]",
      img: "/assets/img/reports/management/page1/hairandscalpanalysis11428-9whh-300h.png",
    },
    {
      text: " Nutritional Management",
      color: "bg-[rgba(190,206,55,1)]",
      img: "/assets/img/reports/management/page1/nutritional11429-nkz-300h.png",
    },
    {
      text: " Lifestyle Management",
      color: "bg-[rgba(248,180,115,1)]",
      img: "/assets/img/reports/management/page1/lifestyle41430-5azi-300h.png",
    },
    {
      text: "Stress Management",
      color: "bg-[rgba(230,146,208,1)]",
      img: "/assets/img/reports/management/page1/doctorstressmanagementposter21431-vnz-300w.png",
    },
  ];
  return (
    <div className="break-avoid p-5 relative">
      <div className="bg-[rgba(0,160,227,0.48)] h-[65px] px-[30px] py-[15px] flex justify-between">
        <img src="/assets/img/logo.png" className="h-[35px]" />
        <div className="font-semibold text-[25px] leading-[50px] flex items-center text-[#292929]">
          Management Report
        </div>
        <div className="flex items-center text-[rgba(84,84,84,1)]">
          Smart Report
        </div>
      </div>

      <div className="flex gap-[6%]">
        <div className="w-[47%] flex flex-col mt-5 gap-3">
          <div className="box-border flex flex-row justify-center items-center px-[23px] py-[15px] gap-[37.76px] w-full h-[35px] border border-black font-['Poppins'] font-semibold text-[15px] leading-[123.5%] text-black bg-[#02A1E5]">
            Treatment Plan
          </div>
          <div className="box-border flex flex-row justify-center items-center px-[23px] py-[15px] gap-[37.76px] w-full h-[35px] border border-black font-['Poppins'] font-semibold text-[15px] leading-[123.5%] text-black bg-[rgba(159,239,248,1)]">
            Hair &amp; Scalp Treatment Recommendation
          </div>
          <div className="box-border flex flex-row justify-center items-center px-[23px] py-[15px] gap-[37.76px] w-full h-[35px] border border-black font-['Poppins'] font-semibold text-[15px] leading-[123.5%] text-black bg-[rgba(190,206,55,1)]">
            Nutritional Management
          </div>
          <div className="box-border flex flex-row justify-center items-center px-[23px] py-[15px] gap-[37.76px] w-full h-[35px] border border-black font-['Poppins'] font-semibold text-[15px] leading-[123.5%] text-black bg-[rgba(248,180,115,1)]">
            Lifestyle Management
          </div>
          <div className="box-border flex flex-row justify-center items-center px-[23px] py-[15px] gap-[37.76px] w-full h-[35px] border border-black font-['Poppins'] font-semibold text-[15px] leading-[123.5%] text-black bg-[rgba(230,146,208,1)]">
            Stress Management
          </div>
        </div>
        <div className="w-[47%] flex flex-col justify-between relative">
          <div className="w-full flex justify-end">
            <div className="bg-[rgba(129,206,239,0.36)] w-[40%] p-[10px] text-[12px]">
              {data?.personal?.name}
            </div>
          </div>

          <div className="p-[10px] bg-[#00a0e3] rounded-[15.8534px] relative flex flex-col">
            <div className="font-bold text-[20px] leading-[35px] flex items-center text-center text-white">
              Dr Amit Agarkar
            </div>
            <div className="font-normal text-[12px] leading-[22px] flex items-center text-white">
              MBBS, MD, FCPS,DDV
            </div>
            <div className="font-normal text-[12px] leading-[22px] flex items-center text-white">
              Fellowship in Hair Transplant
            </div>
            <div className="font-normal text-[12px] leading-[22px] flex items-center text-white">
              Reg. No,- 06/07/2868
            </div>
          </div>
          <img
            className="absolute h-[175px] right-[5px] bottom-0"
            src="https://res.cloudinary.com/drkpwvnun/image/upload/v1731256157/hair-assessment/a6jo0qrxvq61phbr9ywt.png"
          />
        </div>
      </div>

      <div className="flex mt-5 gap-[5%]">
        <div className="flex flex-col w-full">
          <div className="font-semibold text-[25px] leading-[90%] text-black">
            Welcome to the hairsncares.com
          </div>
          <div className="text-[28px]">
            YOUR <span className="text-[rgba(0,160,227,1)]">HAIR EXPERT!</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="text-[12px]">
              Dear {data?.personal?.sex == "Male" ? "Mr" : "Miss"}.{" "}
              {data?.personal?.name},
            </div>
            <div className="text-[12px]">
              After careful consideration of the hair test you provided, here is
              a customized recommendation report to address your concerns.
            </div>
            <div className="text-[12px]">
              Following a comprehensive assessment by the dermatologist, please
              find your detailed treatment plan below
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-5 gap-[1%]">
        {content?.map(e => (
          <div
            key={e.text}
            className={`w-[19%] h-[250px] border border-black gap-[5%] ${e.color} flex flex-col`}
          >
            <div className="h-[30%] text-center font-semibold text-[12px] leading-[14px] flex items-center justify-center">
              {e.text}
            </div>
            <div className="h-[65%] p-[10px]">
              <img src={e.img} className="w-full h-full" alt={e.text} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[rgba(0,160,227,1)] text-[8px] h-full text-white mt-[13%]">
        <span className="font-bold">Legal Disclaimer</span>: This communication
        aims to ensure your comprehensive understanding of the diagnosis's
        nature. (Read more.. Please be cognizant that, as of this juncture, the
        diagnosis is regarded as provisional, signifying its preliminary status.
        It is derived solely from the data and photos (if provided) obtained
        through the online hair test furnished by you. Nevertheless, it is
        imperative to accentuate that the precision of this diagnosis may
        exhibit incongruities across individuals. Various determinants,
        encompassing distinctive health conditions, genetic makeup, and external
        influences, can contribute to disparities in accuracy. While our utmost
        endeavor is directed towards accuracy, we hereby acknowledge the
        potential divergence in individual cases, thus warranting judicious
        discretion during the interpretation of outcomes.) Diagnosis & Details
      </div>
    </div>
  );
}
