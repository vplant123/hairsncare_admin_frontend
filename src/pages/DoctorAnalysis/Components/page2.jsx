import React from "react";
import styles from "../index.module.css";
import SpeedoMeter from "../../../pages/doctor-analyse/SpeedoMeter";

export default function Page2({ data }) {
  console.log("jojerofre", data?.nutrition?.value);
  return (
    <div className="page-avoid-1" style={{ padding: "10px" }}>
      <div
        className={`${styles.headManagerReport} d-flex`}
        style={{ justifyContent: "space-between" }}
      >
        <img
          src="/assets/img/logo.png"
          className={styles.headManagerReportLogo}
        />
        <div className={styles.headManagerReportText1}>
          Doctors Analysis Report
        </div>
        <div
          className={styles.textFlexLineCenterVertical}
          style={{ color: "rgba(84, 84, 84, 1)" }}
        >
          Smart Report
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <div
          className={styles.page2Sec1Main}
          style={{ fontSize: "20px", fontWeight: "700" }}
        >
          Nutritional Assessment
        </div>
      </div>

      <div className="d-flex" style={{ gap: "3%" }}>
        <div style={{ width: "35%", height: "180px" }}>
          <img
            src="/assets/img/reports/doctorAnalysis/page2/image2371177-pzv-500w.png"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div style={{ width: "30%", fontSize: "9px" }}>
          Hair loss and thinning can arise from various factors, with
          nutritional deficiencies being a significant contributor. Essential
          nutrients for healthy hair growth include iron, zinc, biotin, vitamins
          D, A, E, and C, protein, and omega-3 fatty acids. For instance, iron
          deficiency can weaken hair follicles, while inadequate zinc may lead
          to thinning. Our expert dermatologists have assessed your inputs and
          provided the following nutritional assessment.
        </div>
        <div
          style={{
            width: "30%",
            background: "rgba(190, 206, 55, 0.2)",
            borderRadius: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/img/reports/doctorAnalysis/page2/image59627101182-iwz-200w.png"
            style={{
              height: "36%",
              width: "30%",
            }}
          />
          <div
            style={{
              padding: "0 25%",
              fontSize: "10px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {data?.nutrition?.value || ""}
          </div>
        </div>
      </div>

      <div
        className="d-flex mt-3"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ width: "70%", fontSize: "12px", textAlign: "center" }}>
          Adhering to the given recommendations can elevate the quality of your
          hair, mitigate potential damage, and ensure the well-being of your
          hair, resulting in radiant hair.
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <div
          className={styles.page2Sec1Main}
          style={{
            fontSize: "20px",
            fontWeight: "700",
            background: "rgba(248, 180, 115, 1)",
          }}
        >
          Lifestyle Assessment
        </div>
      </div>

      <div className="d-flex" style={{ gap: "3%" }}>
        <div style={{ width: "35%", height: "180px" }}>
          <img
            src="/assets/img/reports/doctorAnalysis/page2/image2391189-qw7o-500h.png"
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>

        <div style={{ width: "30%", fontSize: "9px" }}>
          Lifestyle assessments are vital for understanding hair loss, as daily
          habits significantly impact hair health. Unhealthy choices, including
          poor nutrition, chronic stress, and smoking, can lead to issues like
          nutrient deficiencies and hormonal imbalances. These factors disrupt
          hair growth cycles and affect circulation. Addressing these issues
          involves adopting healthier lifestyle practices. Our expert
          dermatologists have reviewed your inputs and provided a tailored
          nutritional assessment to support your hair health{" "}
        </div>
        <div
          style={{
            width: "30%",
            background: "rgba(190, 206, 55, 0.2)",
            borderRadius: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/img/reports/doctorAnalysis/page2/image74795591194-o6xo-200h.png"
            style={{
              height: "36%",
              width: "30%",
            }}
          />
          <div
            style={{
              padding: "0 25%",
              fontSize: "10px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {data?.lifeStyle?.value || ""}
          </div>
        </div>
      </div>

      <div
        className="d-flex mt-3"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ width: "70%", fontSize: "12px", textAlign: "center" }}>
          By integrating the recommended guidance, you can refine your
          nutritional habits to uphold the quality of your hair, shield it from
          harm, and maintain its liveliness.{" "}
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <div
          className={styles.page2Sec1Main}
          style={{
            fontSize: "20px",
            fontWeight: "700",
            background: "rgba(230, 146, 208, 1)",
          }}
        >
          Stress Analysis
        </div>
      </div>

      <div className="d-flex" style={{ gap: "3%" }}>
        <div
          style={{
            width: "35%",
            height: "100%",
            border: "1px solid",
            padding: "5px",
          }}
        >
          {/* <img
        src="/assets/img/reports/doctorAnalysis/page2/stressometer111199-dwan-300h.png"
        style={{
            height : "100%",
            width :"100%"
        }}
      /> */}
          <SpeedoMeter data={data?.stress?.value} />
        </div>

        <div style={{ width: "30%", fontSize: "9px" }}>
          Stress-induced hair loss occurs when hair follicles shift from the
          active growth phase to the resting phase, resulting in increased
          shedding. Elevated cortisol levels disrupt follicle function and
          restrict blood flow to the scalp, affecting hair health. Managing
          stress through relaxation and support can help mitigate this impact.
          Finding: Your Stress Indicator score is 21.{" "}
        </div>
        <div
          style={{
            width: "30%",
            background: "rgba(190, 206, 55, 0.2)",
            borderRadius: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`/assets/img/reports/doctorAnalysis/page2/${data?.stress?.src}`}
            style={{
              height: "40%",
              width: "30%",
            }}
          />
          <div
            style={{
              padding: "0 25%",
              fontSize: "10px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {data?.stress?.value || ""}
          </div>
        </div>
      </div>

      <div
        className="d-flex mt-3"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ width: "70%", fontSize: "12px", textAlign: "center" }}>
          As your stress level shifts to a moderate state, adhering to specific
          stress management guidelines will signifi- cantly aid you on your
          journey to achieving better hair growth.
        </div>
      </div>

      <div
        className="head-managereport mt-2"
        style={{
          fontSize: "8px",
          height: "100%",
          color: "#FFFFFF",
          background: "rgba(0, 160, 227, 1)",
        }}
      >
        <span style={{ fontWeight: "700" }}>Legal Disclaimer</span>: This
        communication aims to ensure your comprehensive understanding of the
        diagnosis's nature. (Read more.. Please be cognizant that, as of this
        juncture, the diagnosis is regarded as provisional, signifying its
        preliminary status. It is derived solely from the data and photos (if
        provided) obtained through the online hair test furnished by you.
        Nevertheless, it is imperative to accentuate that the precision of this
        diagnosis may exhibit incongruities across individuals. Various
        determinants, encompassing distinctive health conditions, genetic
        makeup, and external influences, can contribute to disparities in
        accuracy. While our utmost endeavor is directed towards accuracy, we
        hereby acknowledge the potential divergence in individual cases, thus
        warranting judicious discretion during the interpretation of outcomes.)
        Diagnosis & Details
      </div>

      {/* 
            <div class="frame3-container">
    <div class="frame3-frame3">
      <img
        alt="Rectangle346245101167"
        src="/assets/img/reports/doctorAnalysis/page2/rectangle346245101167-amos-200h.png"
        class="frame3-rectangle34624510"
      />
      <div class="frame3-frame1261153115">
        <span class="frame3-text10">Nutritional Assessment Lifestyle</span>
      </div>
      <span class="frame3-text11">Smart Report</span>
      <img
        alt="Rectangle346245111171"
        src="/assets/img/reports/doctorAnalysis/page2/rectangle346245111171-d1e-200h.png"
        class="frame3-rectangle34624511"
      />
      <span class="frame3-text12">
        <span class="frame3-text13">Legal Disclaimer</span>
        <span>
          : This communication aims to ensure your comprehensive
          understanding of the diagnosis's nature. (Read more.. Please be
          cognizant that, as of this juncture, the diagnosis is regarded as
          provisional, signifying its preliminary status. It is derived
          solely from the data and photos (if provided) obtained through the
          online hair test furnished by you. Nevertheless, it is imperative
          to accentuate that the precision of this diagnosis may exhibit
          incongruities across individuals. Various determinants,
          encompassing distinctive health conditions, genetic makeup, and
          external influences, can contribute to disparities in accuracy.
          While our utmost endeavor is directed towards accuracy, we hereby
          acknowledge the potential divergence in individual cases, thus
          warranting judicious discretion during the interpretation of
          outcomes.) Diagnosis &amp; Details
        </span>
      </span>
      <div class="frame3-group1707485983">
        <img
          alt="Rectangle346245221174"
          src="/assets/img/reports/doctorAnalysis/page2/rectangle346245221174-5htn-200h.png"
          class="frame3-rectangle34624522"
        />
        <img
          alt="HAIRSN111175"
          src="/assets/img/reports/doctorAnalysis/page2/hairsn111175-29q4-200h.png"
          class="frame3hairsn11"
        />
      </div>
      <span class="frame3-text15">Doctors Analysis Report</span>
      <img
        alt="image2371177"
        src="/assets/img/reports/doctorAnalysis/page2/image2371177-pzv-500w.png"
        class="frame3-image237"
      />
      <span class="frame3-text16">
        Hair loss and thinning can arise from various factors, with
        nutritional deficiencies being a significant contributor. Essential
        nutrients for healthy hair growth include iron, zinc, biotin,
        vitamins D, A, E, and C, protein, and omega-3 fatty acids. For
        instance, iron deficiency can weaken hair follicles, while
        inadequate zinc may lead to thinning. Our expert dermatologists have
        assessed your inputs and provided the following nutritional
        assessment.
      </span>
      <span class="frame3-text17 page-avoid-1">
        Lifestyle assessments are vital for understanding hair loss, as
        daily habits significantly impact hair health. Unhealthy choices,
        including poor nutrition, chronic stress, and smoking, can lead to
        issues like nutrient deficiencies and hormonal imbalances. These
        factors disrupt hair growth cycles and affect circulation.
        Addressing these issues involves adopting healthier lifestyle
        practices. Our expert dermatologists have reviewed your inputs and
        provided a tailored nutritional assessment to support your hair
        health
      </span>
      <span class="frame3-text18">
        Stress-induced hair loss occurs when hair follicles shift from the
        active growth phase to the resting phase, resulting in increased
        shedding. Elevated cortisol levels disrupt follicle function and
        restrict blood flow to the scalp, affecting hair health. Managing
        stress through relaxation and support can help mitigate this impact.
        Finding: Your Stress Indicator score is 21.
      </span>
      <img
        alt="Rectangle346245301181"
        src="/assets/img/reports/doctorAnalysis/page2/rectangle346245301181-b95nj-400w.png"
        class="frame3-rectangle34624530"
      />
      <img
        alt="IMAGE59627101182"
        src="/assets/img/reports/doctorAnalysis/page2/image59627101182-iwz-200w.png"
        class="frame3image5962710"
      />
      <span class="frame3-text19">
        Adequate Nutritional Condition but needs improvement
      </span>
      <span class="frame3-text20">
        Adhering to the given recommendations can elevate the quality of
        your hair, mitigate potential damage, and ensure the well-being of
        your hair, resulting in radiant hair.
      </span>
      <span class="frame3-text21">
        By integrating the recommended guidance, you can refine your
        nutritional habits to uphold the quality of your hair, shield it
        from harm, and maintain its liveliness.
      </span>
      <span class="frame3-text22">
        As your stress level shifts to a moderate state, adhering to
        specific stress management guidelines will signifi- cantly aid you
        on your journey to achieving better hair growth.
      </span>
      <div class="frame3-frame1261153144 page-avoid-1" >
        <span class="frame3-text23">Lifestyle Assessment</span>
      </div>
      <div className="page-break-1">

      <img
        alt="image2391189"
        src="/assets/img/reports/doctorAnalysis/page2/image2391189-qw7o-500h.png"
        class="frame3-image239 page-avoid-1"
      />
      <div class="frame3-group1707485989 page-avoid-1">
        <div class="frame3-group1707485988">
          <span class="frame3-text24 page-avoid-1">
            Unhealthy Lifestyle &amp; needs improvement
          </span>
          <img
            alt="IMAGE74795591194"
            src="/assets/img/reports/doctorAnalysis/page2/image74795591194-o6xo-200h.png"
            class="frame3image7479559 page-avoid-1"
          />
        </div>
      </div>
      </div>



      <img
        alt="Rectangle346245311195"
        src="/assets/img/reports/doctorAnalysis/page2/rectangle346245311195-8tfs-300h.png"
        class="frame3-rectangle34624531"
      />
      <span class="frame3-text25">Mild to Moderate Level</span>
      <div class="frame3-frame1261153117">
        <span class="frame3-text26">Stress Analysis</span>
      </div>
      <img
        alt="Stressometer111199"
        src="/assets/img/reports/doctorAnalysis/page2/stressometer111199-dwan-300h.png"
        class="frame3-stressometer11"
      />
      <img
        alt="IMAGE23951200"
        src="/assets/img/reports/doctorAnalysis/page2/image23951200-qaeb-200w.png"
        class="frame3image2395"
      />
      <div class="frame3-frame1261153145"></div>
    </div>
  </div> */}
    </div>
  );
}
