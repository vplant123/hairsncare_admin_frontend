import React, { useState } from "react";
// import "./OurSpecialist.css";
import Faq from "./faq/Faq";

export default function OurSpecialist() {
  let [formData, setFormData] = useState({
    experiencedTeamTitle: 'Experienced Team',
    experiencedTeamDesc: 'Our experienced dermatologists specialize in hair care, offering tailored solutions for your hair needs. Trust us for the healthy, beautiful hair you deserve.',
    hairsNcaresTitle: 'HairsNcares Counsellors',
    hairsNcaresDesc: 'Our team of skilled hair care counselors is here to provide personalized advice and solutions for all your hair needs. With a deep understanding of various hair types and concerns',
    counselors: [
      { title: 'Education & Confidence Boosting', img: '/uploads/admprcoun-icon1.png' },
      { title: 'Result Assessment', img: '/uploads/coun-icon2.png' },
      { title: 'Recommendation & Product Knowledge', img: '/uploads/coun-icon3.png' },
      { title: 'Hair Health and Style Guiding', img: '/uploads/coun-icon4.png' },
      { title: 'Regular Follow-Up', img: '/uploads/coun-icon5.png' },
    ],
    doctors: [
      {
        src: "/uploads/admprteam-pic1.png",
        name: "Dr. Sudhir Singh",
        degree: "MBBS, MD",
        decrip: "Dr. Sudhir is a member of IADVL (Indian Association of Dermatologists, Venereologists)"
      },
      {
        src: "/uploads/admprteam-pic2.png",
        name: "Dr. Ram Tainwala",
        degree: "MBBS",
        decrip: "Dr. Ram is a member of IIADVL (Indian Association of Dermatologists, Venereologists)"
      },
      {
        src: "/uploads/team-pic3.png",
        name: "Dr. Jyoti Agarkar",
        degree: "MBBS, MD MBBS, MD, DDV, PGDHA, D.N.Y.S",
        decrip: "Dr. Jyoti Agarkar is a member of IIADVL (Indian Association of Dermatologists, Venereologists)"
      },
      {
        src: "/uploads/team-pic4.png",
        name: "Dr. Sunita Patel",
        degree: "MBBS, MD, DDV",
        decrip: "Dr. Sunita is a member of IADVL (Indian Association of Dermatologists, Venereologists)"
      },
      {
        src: "/uploads/team-pic5.png",
        name: "Dr. Poorti Kolge",
        degree: "MBBS, DDV",
        decrip: "Dr. Poorti is a member of IADVL (Indian Association of Dermatologists, Venereologists)"
      },
      {
        src: "/uploads/team-pic6.png",
        name: "Dr. Pradeep Mishra",
        degree: "MD, FCAS",
        decrip: "Dr. Pradeep is a member of IADVL (Indian Association of Dermatologists & Venereologists in India)"
      },
      {
        src: "/uploads/team-pic7.png",
        name: "Dr. Sagar Vyas",
        degree: "MD, FCAS",
        decrip: "Dr. Sagar Vyas is a member of IADVL (Indian Association of Dermatologists & Venereologists in India)"
      },
      {
        src: "/uploads/team-pic9.png",
        name: "Dr. Trupti K",
        degree: "Nutritionalist",
        decrip: "Dr. Trupti K is a member of IADVL (Indian Association of Dermatologists & Venereologists in India)"
      },
      {
        src: "/uploads/team-pic10.png",
        name: "Dr. Anjali Dinarajan",
        degree: "BAMS",
        decrip: "Dr. Anjali is a member of Ayurveda Medical Association Of India"
      },
      {
        src: "/uploads/team-pic11.png",
        name: "Dr. Suvarnna Uday",
        degree: "MBBS",
        decrip: "Dr. Suvarnna is a member of IADVL (Indian Association of Dermatologists & Venereologists in India)"
      }
    ]
  });

  const handleInputChange = (e, field, index = null) => {
    if (index !== null) {
      let newDoctors = [...formData.doctors];
      newDoctors[index][field] = e.target.value;
      setFormData({ ...formData, doctors: newDoctors });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleFileUpload = (e, index) => {
    let newDoctors = [...formData.doctors];
    newDoctors[index].src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, doctors: newDoctors });
  };

  const handleCounselorChange = (e, index) => {
    let newCounselors = [...formData.counselors];
    newCounselors[index].title = e.target.value;
    setFormData({ ...formData, counselors: newCounselors });
  };

  const handleCounselorFileUpload = (e, index) => {
    let newCounselors = [...formData.counselors];
    newCounselors[index].img = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, counselors: newCounselors });
  };

  return (
    <>
      <div className="our-specialist">
        <div className="our-specialist-container container">
          <div>
            <h1 className="contect-us-heading">OUR SPECIALISTS</h1>
          </div>
        </div>
      </div>

      <div className="specialist-section-2 container">
        <div className="section-item">
          <input
            type="text"
            value={formData.experiencedTeamTitle}
            onChange={(e) => handleInputChange(e, "experiencedTeamTitle")}
          />
          <textarea
            value={formData.experiencedTeamDesc}
            onChange={(e) => handleInputChange(e, "experiencedTeamDesc")}
          />
        </div>
        <div className="section-item">
          <input
            type="text"
            value="Hair Care Counselling"
            readOnly
          />
          <textarea
            value="Hair counselling is vital for personalized, informed, and effective hair management. It empowers individuals to achieve and maintain healthy, beautiful hair while addressing their unique needs and concerns."
            readOnly
          />
        </div>
        <div className="section-item">
          <input
            type="text"
            value="Award Winning Approach"
            readOnly
          />
          <textarea
            value="Discover our award-winning holistic approach to hair loss management."
            readOnly
          />
        </div>
        <div className="section-item">
          <input
            type="text"
            value="Safe & Cost Effective"
            readOnly
          />
          <textarea
            value="Safe and cost-effective hair loss solution which is evidence-based, administered by qualified professionals, tailored to your needs, balances effectiveness with affordability, and regularly monitored."
            readOnly
          />
        </div>
      </div>

      <div className="specialist-section-3 container">
        <div className="sec-3">
          <img alt="hair" src="/uploads/doctor.jpg" />
        </div>
        <div className="sec-3 sec-pad">
          <h3>Dr Amit Agarkar</h3>
          <p>
            MBBS, MD FCPS, DDV Hair Transplant Surgeon, Trichologist
            <br />
            MBBS, MD FCPS, DDV Hair <br />
            Transplant Surgeon, Trichologist Medical Director
            <br />
            Experience: 15 Years
          </p>
        </div>
        <div className="sec-3 sec-pad1">
          <div>Trichology</div>
          <div>Hair Transplant Surgeon</div>
          <div>Dermato Surgery</div>
          <div>Skin & Cosmetology</div>
        </div>
      </div>

      <div className="specialist-section-4 container">
        <div className="section-4-first">
          <div className="col-lg-8 col-md-8">
            <div className="row mb-20">
              <div className="col-lg-3">
                <h6>Qualification:</h6>
              </div>
              <div className="col-lg-9">
                <p>
                  MBBS from Government Medical College and Hospital, Nagpur in
                  2005 MD from Grant Medical College &amp; J.J. hospital, Mumbai
                  in 2010. FCPS &amp; DDV from Grand Medical college &amp; J.J.
                  Hospital, Mumbai in 2010
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <h6>Association:</h6>
              </div>
              <div className="col-lg-9">
                <p>
                  Dr. Amit Agarkar is a part of AHRS (association of hair
                  restoration surgeons) &amp; other such reputed hair
                  restoration associations in India.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section-4-second">
          <div className="col-lg-3">
            <h6>Awards</h6>
          </div>
          <img alt="hair" src="/assets/img/specialists/award.png" />
        </div>
      </div>

      <div className="container">
        <div className="doc-head">
          <h1>Our Team of Doctors</h1>
          <p>
            Introducing Our Esteemed Team of Doctors: Our team embodies a
            commitment to excellence, utilizing the latest advancements and a
            patient-centered approach to achieve your desired hair goals.
          </p>
        </div>
        <div className="doc-container">
          {formData.doctors.map((item, index) => (
            <div className="doctors" key={index}>
              <div className="doc-image">
                <img alt="hair" src={item.src} />
                <input
                  type="file"
                  style={{
                    height: "354px",
                    width: "345px"
                  }}
                  onChange={(e) => handleFileUpload(e, index)}
                />
              </div>
              <div className="doc-detail">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleInputChange(e, "name", index)}
                />
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleInputChange(e, "degree", index)}
                />
                <textarea
                  value={item.decrip}
                  onChange={(e) => handleInputChange(e, "decrip", index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="councellor-container">
        <div className="container">
          <input
            type="text"
            value={formData.hairsNcaresTitle}
            onChange={(e) => handleInputChange(e, "hairsNcaresTitle")}
          />
          <textarea
            value={formData.hairsNcaresDesc}
            onChange={(e) => handleInputChange(e, "hairsNcaresDesc")}
          />
          <div className="councellor-item">
            {formData.counselors.map((counselor, index) => (
              <div className="coun-item" key={index}>
                <img alt="hair" src={counselor.img} />
                <input
                  type="file"
                  onChange={(e) => handleCounselorFileUpload(e, index)}
                />
                <input
                  type="text"
                  value={counselor.title}
                  onChange={(e) => handleCounselorChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-wraper-container">
        <h1>Role of Hair Counsellor</h1>
        <Faq />
      </div>
    </>
  );
}
