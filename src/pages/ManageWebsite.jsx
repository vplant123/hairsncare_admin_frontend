import DashboardLayout from "@/components/layout/DashboardLayout";

import AnalyseEdit from "./manage-website/AnalyseEdit.jsx";
import HeroEdit from "./manage-website/HeroEdit";
import ReviewEdit from "./manage-website/ReviewEdit.jsx";
import TrustEdit from "./manage-website/TrustEdit";
import WhyTrustEdit from "./manage-website/WhyTrustEdit.jsx";
import CoreEdit from "./manage-website/CoreEdit";
import BeforeAfterEdit from "./manage-website/BeforeAfterEdit.jsx";
import ShoppingFeatureEdit from "./manage-website/ShoppingFeatureEdit";
import OurEpertiseEdit from "./manage-website/OurExpertiseEdit.jsx";
import AboutUsEdit from "./manage-website/AboutUsEdit.jsx";
import BASE_URL from "../Config.js";
// import DoctorPrescribe from '../doctor-dashboard/analysis/DoctorPrescribe'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SliderImageEdit from "./video-slider/SliderImageEdit";
import MediaEdit from "./media/MediaEdit";
import RxBlueprintEdit from "./rx-section/RxBlueprintEdit.tsx";
import "../pages/nav/Navbar.css"
import "../pages/hair-test/HairTest.css";
// import { toast } from "@/hooks/use-toast";

// const BASE_URL = "https://backend.hairsncares.com/api/v1";
import "./admin-dashboard/AdminDashboard.css";

import SpecialistEdit from "./manage-website/SpecialistEdit";
import HappyCustomer from "./manage-website/HappyCustomer.jsx";
import ManagePrice from "./manage-website/ManagePrice.jsx";

import MarketPopEdit from "./MarketPopEdit";
import BookAppointmentEdit from "./book-appointment/BookAppointmentEdit.jsx";

import HairLossWomen from "./manage-website/HairLossWomen.jsx";
import HairLossMen from "./manage-website/HairLossMen.jsx";
import HairTransplant from "./manage-website/HairTransplant.jsx";
import OtherProcedures from "./manage-website/OtherProcedures.jsx";
import OnlineTest from "./manage-website/OnlineTest.jsx";
import Dermatologist from "./manage-website/Dermatologist.jsx";

const ManageWebsite = () => {
  const [selectedTab, setSelectedTab] = useState("HomePage");
  const [content, setContent] = useState();
  // const content = useSelector(state => state.content);

  const [loader, setLoader] = useState(false); // New state for discount

  console.log("mwokorke", content);
  [];

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/utility/getContent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data, "fsijsaijfijiasjijis");
      setContent(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [section1, setSection1] = useState();
  const [section2, setSection2] = useState();
  const [section3, setSection3] = useState();
  const [section4, setSection4] = useState();
  const [section5, setSection5] = useState();
  const [section6, setSection6] = useState();
  const [section7, setSection7] = useState();
  const [section8, setSection8] = useState();
  const [section9, setSection9] = useState();
  const [section10, setSection10] = useState();
  const [section11, setSection11] = useState();
  const [section12, setSection12] = useState();

  useEffect(() => {
    setSection1(content?.home?.section1);
    setSection2(content?.home?.section2);
    setSection3(content?.home?.section3);
    setSection4(content?.home?.section4);
    setSection5(content?.home?.section5);
    setSection6(content?.home?.section6);
    setSection7(content?.home?.section7);
    setSection8(content?.home?.section8);
    setSection9(content?.home?.section9);
    setSection10(content?.home?.section10);
    setSection11(content?.home?.section11);
    setSection12(content?.home?.section12);
  }, [content]);

  const changeContent = type => {
    setSection1(content[type]?.section1);
    setSection2(content[type]?.section2);
    setSection3(content[type]?.section3);
    setSection4(content[type]?.section4);
    setSection5(content[type]?.section5);
    setSection6(content[type]?.section6);
    setSection7(content[type]?.section7);
    setSection8(content[type]?.section8);
    setSection9(content[type]?.section9);
    setSection10(content[type]?.section10);
    setSection11(content[type]?.section11);
    setSection12(content[type]?.section12);
  };

  const handleSubmit = async e => {
    setLoader(true);
    // const formData = new FormData();
    // console.log("nnirhei",images)
    // images.forEach(image => formData.append('image', image));
    try {
      const data = {
        section1,
        section2,
        section3,
        section4,
        section5,
        section6,
        section7,
        section8,
        section9,
        section10,
        section11,
        section12,
        id: content?._id,
      };
      let url =
        selectedTab === "HomePage"
          ? `${BASE_URL}/utility/editHome`
          : selectedTab === "About Us Page"
            ? `${BASE_URL}/utility/editAboutUs1`
            : selectedTab === "Our Specialists Page"
              ? `${BASE_URL}/utility/editSpecialist`
              : selectedTab === "Our Expertise Page"
                ? `${BASE_URL}/utility/editExpertise`
                : selectedTab === "Hair Loss In Women"
                  ? `${BASE_URL}/utility/editHairWomen`
                  : selectedTab === "Hair Loss In Men"
                    ? `${BASE_URL}/utility/editHairMen`
                    : selectedTab === "Hair Transplant"
                      ? `${BASE_URL}/utility/editHairTransplant`
                      : selectedTab === "Other Procedures"
                        ? `${BASE_URL}/utility/editOtherProcedures`
                        : selectedTab === "Online Test"
                          ? `${BASE_URL}/utility/editOnlineTest`
                          : selectedTab === "Dermatologist"
                            ? `${BASE_URL}/utility/editDermatologist`
                            : selectedTab === "Happy Customer"
                              ? `${BASE_URL}/utility/editVideoCustomer`
                              : selectedTab === "Contact Us"
                                ? `${BASE_URL}/utility/editContactUs`
                                : "";
      data["id"] =
        selectedTab === "HomePage"
          ? content?.home?._id
          : selectedTab === "About Us Page"
            ? content?.aboutUs?._id
            : selectedTab === "Our Specialists Page"
              ? content?.specialist?._id
              : selectedTab === "Our Expertise Page"
                ? content?.expertise?._id
                : selectedTab === "Happy Customer"
                  ? content?.customerVideos?._id
                  : selectedTab === "Contact Us"
                    ? content?.contactus?._id
                    : selectedTab === "Hair Loss In Women"
                      ? content?.hairWomen?._id
                      : selectedTab === "Hair Loss In Men"
                        ? content?.hairMen?._id
                        : selectedTab === "Hair Transplant"
                          ? content?.hairTransplant?._id
                          : selectedTab === "Other Procedures"
                            ? content?.otherProcedures?._id
                            : selectedTab === "Online Test"
                              ? content?.onlineTest?._id
                              : selectedTab === "Dermatologist"
                                ? content?.dermatologist?._id
                                : "";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        setLoader(false);
        if (response.ok) {
          const result = await response.json();
          toast.success("content update successfully");
          console.log("Product created successfully:", result);
        } else {
          toast.error(`Failed to update update: ${response.statusText}`);
          console.error("Failed to create product:", response.statusText);
        }
      } catch (error) {
        setLoader(false);
        toast.error("Please logout and login again with valid credentials.");
        console.error("Error:", error);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Please logout and login again with valid credentials.");
      console.error("Error:", error);
    }
  };
  const someObjectValue = {
    showLogin: false, // or true, whatever your app needs
  };

  const handleTabChange = tab => {
    setSelectedTab(tab);
  };
  return (
    <DashboardLayout>
      <div className="">
        <div className="test-link-item ">
          <div
            onClick={() => {
              changeContent("home");
              handleTabChange("HomePage");
            }}
            className={`tab-3 tab tab2 ${
              selectedTab === "HomePage" ? "selected1" : ""
            }`}
          >
            HomePage
          </div>
          <div
            onClick={() => {
              changeContent("aboutUs");
              handleTabChange("About Us Page");
            }}
            className={`tab-1 tab tab2 ${
              selectedTab === "About Us Page" ? "selected1" : ""
            }`}
          >
            About Us Page
          </div>
          <div
            onClick={() => {
              changeContent("specialist");
              handleTabChange("Our Specialists Page");
            }}
            className={`tab-4 tab tab2 ${
              selectedTab === "Our Specialists Page" ? "selected1" : ""
            }`}
          >
            Our Specialists Page
          </div>

          <div
            onClick={() => {
              changeContent("expertise");
              handleTabChange("Our Expertise Page");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Our Expertise Page" ? "selected1" : ""
            }`}
          >
            Our Expertise Page
          </div>

          <div
            onClick={() => {
              changeContent("hairWomen");
              handleTabChange("Hair Loss In Women");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Hair Loss In Women" ? "selected1" : ""
            }`}
          >
            Hair Loss In Women
          </div>

          <div
            onClick={() => {
              changeContent("hairMen");
              handleTabChange("Hair Loss In Men");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Hair Loss In Men" ? "selected1" : ""
            }`}
          >
            Hair Loss In Men
          </div>

          <div
            onClick={() => {
              changeContent("hairTransplant");
              handleTabChange("Hair Transplant");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Hair Transplant" ? "selected1" : ""
            }`}
          >
            Hair Transplant
          </div>

          <div
            onClick={() => {
              changeContent("otherProcedures");
              handleTabChange("Other Procedures");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Other Procedures" ? "selected1" : ""
            }`}
          >
            Other Procedures
          </div>

          <div
            onClick={() => {
              changeContent("onlineTest");
              handleTabChange("Online Test");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Online Test" ? "selected1" : ""
            }`}
          >
            Online Test
          </div>

          <div
            onClick={() => {
              changeContent("dermatologist");
              handleTabChange("Dermatologist");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Dermatologist" ? "selected1" : ""
            }`}
          >
            Dermatologist
          </div>

          <div
            onClick={() => {
              changeContent("customerVideos");
              handleTabChange("Happy Customer");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Happy Customer" ? "selected1" : ""
            }`}
          >
            Happy Customer
          </div>
          <div
            onClick={() => {
              changeContent("plan");
              handleTabChange("Hair-test-price");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Hair-test-price" ? "selected1" : ""
            }`}
          >
            Hair-test price
          </div>
          <div
            onClick={() => {
              changeContent("contactus");
              handleTabChange("Contact Us");
            }}
            className={`tab-2 tab tab2 ${
              selectedTab === "Contact Us" ? "selected1" : ""
            }`}
          >
            Contact Us
          </div>
        </div>
      </div>

      <div className="">
        {selectedTab === "HomePage" && (
          <div>
            <HeroEdit section1={section1} setSection1={setSection1} />
            <TrustEdit section2={section2} setSection2={setSection2} />
            <ReviewEdit section3={section3} setSection3={setSection3} />
            <MediaEdit section5={section5} setSection5={setSection5} />
            <AnalyseEdit section7={section7} setSection7={setSection7} />
            <WhyTrustEdit section4={section4} setSection4={setSection4} />
            <CoreEdit section6={section6} setSection6={setSection6} />

            <RxBlueprintEdit section8={section8} setSection8={setSection8} />
            <ShoppingFeatureEdit
              section9={section9}
              setSection9={setSection9}
            />
            <BeforeAfterEdit
              section10={section10}
              setSection10={setSection10}
            />
            <SliderImageEdit
              section11={section11}
              setSection11={setSection11}
            />
            <MarketPopEdit section12={section12} setSection12={setSection12} />
          </div>
        )}

        {selectedTab === "About Us Page" && (
          <AboutUsEdit
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
            section6={section6}
            setSection6={setSection6}
          />
        )}
        {selectedTab === "Our Specialists Page" && (
          <SpecialistEdit
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
          />
        )}
        {selectedTab === "Our Expertise Page" && (
          <OurEpertiseEdit
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
            section6={section6}
            setSection6={setSection6}
            section7={section7}
            setSection7={setSection7}
          />
        )}
        {selectedTab === "Happy Customer" && (
          <HappyCustomer section1={section1} setSection1={setSection1} />
        )}
        {selectedTab === "Hair Loss In Women" && (
          <HairLossWomen
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
            section6={section6}
            setSection6={setSection6}
            section7={section7}
            setSection7={setSection7}
          />
        )}
        {selectedTab === "Hair Loss In Men" && (
          <HairLossMen
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
          />
        )}
        {selectedTab === "Hair Transplant" && (
          <HairTransplant
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
            section6={section6}
            setSection6={setSection6}
            section7={section7}
            setSection7={setSection7}
          />
        )}
        {selectedTab === "Other Procedures" && (
          <OtherProcedures
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
          />
        )}
        {selectedTab === "Online Test" && (
          <OnlineTest
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
          />
        )}
        {selectedTab === "Dermatologist" && (
          <Dermatologist
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
            section4={section4}
            setSection4={setSection4}
            section5={section5}
            setSection5={setSection5}
            section6={section6}
            setSection6={setSection6}
            section7={section7}
            setSection7={setSection7}
            section8={section8}
            setSection8={setSection8}
          />
        )}
        {selectedTab === "Hair-test-price" && (
          <ManagePrice 
            content={content?.plan} 
            content1={content?.config}
          />
        )}
        {selectedTab === "Contact Us" && (
          <BookAppointmentEdit
            section1={section1}
            setSection1={setSection1}
            section2={section2}
            setSection2={setSection2}
            section3={section3}
            setSection3={setSection3}
          />
        )}
        {selectedTab != "Hair-test-price" ? (
          <div>
            <button
              style={{ background: "bisque", cursor: "pointer" }}
              onClick={() => handleSubmit()}
              className="btn"
            >
              {loader ? "loadin" : "Update Data"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* <ToastContainer position="bottom-right" /> */}
    </DashboardLayout>
  );
};

export default ManageWebsite;
