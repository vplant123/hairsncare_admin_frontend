import React from 'react';
import "./Page8.css"

export default function Page8({data}) {
  console.log("jojerofre",data?.personal)
  return (
    <>
    {
      data?.management?.Stress?.length == 1 && data?.management?.Stress?.[0] == "Mild to Moderate Stress Management" ? <></>:
      <div className='page-8'>
    <div>
    <div style={{display : "flex",justifyContent :"center"}}>
    <div style={{width : "65%"}}>
      <h1>Severe Stress Management Overview</h1>
      <div style={{fontSize: "8px"}}>
      Follow previous instructions to reduce the stress. Severe stress significantly impacts mental, emotional, and physical well-being, and managing it effectively is crucial for maintaining overall health. Below are some effective strategies for addressing and managing severe stress:
      </div>
      </div>
      </div>

      <div class="content" style={{height : "6rem"}}>
        <div class="image">
            <img src = "/assets/img/reports/management/page8/image7.png" style={{width : "100%",height : "100%"}} />
        </div>
        <div class="content-body">
          <ul>
            <li class="main-heading">
              <strong>1. Seek Professional Support </strong>
            </li>
            <li>
              <strong>• Consult a Mental Health Professional: </strong>Severe
              stress often requires professional guidance. Consulting a
              therapist, counselor, or psychiatrist ensures that you receive
              tailored support and effective coping strategies.
            </li>
            <li class="main-content">
              <strong>• Avoid Self-Diagnosis: </strong>Self-diagnosing or using
              over-the-counter medications without professional guidance can be
              harmful. A licensed professional can accurately assess your
              condition and recommend appropriate treatments.
            </li>
          </ul>
        </div>
      </div> 

      <div class="content" style={{height : "14rem"}}>
        <div class="content-body-reverse">
          <ul>
            <li class="main-heading">
              <strong>2. Psychotherapy (Talk Therapy) Options </strong><br />
              Therapy helps address underlying causes of stress and develop
              healthier coping mechanisms. Common therapeutic approaches
              include:
            </li>
            <li>
              <strong>Cognitive Behavioral Therapy (CBT): </strong>
              <br />
              • Helps identify and challenge negative thought patterns. <br />
              • Encourages developing positive coping strategies. <br />
              • Effective for managing anxiety and depression.
            </li>
            <li>
              <strong>Acceptance and Commitment Therapy (ACT): </strong>
              <br />
              • Focuses on accepting emotions and thoughts instead of fighting
              them. <br />
              • Encourages aligning actions with personal values for a more
              meaningful life.
            </li>
            <li>
              <strong>Interpersonal Therapy (IPT): </strong>
              <br />
              • Addresses relationship issues contributing to stress. <br />
              • Improves communication and conflict resolution skills.
            </li>
            <li>
              <strong>Dialectical Behavior Therapy (DBT): </strong>
              <br />
              • Combines CBT with mindfulness practices. <br />
              • Focuses on emotional regulation and managing impulsive
              behaviors.
            </li>
          </ul>
        </div>
        <div class="image-reversee" style={{backgroundColor: "#47a8ef",display:"flex",alignItems : "center"}}>
            <img src = "/assets/img/reports/management/page8/image2.png"  style={{width : "100%"}}/>
        </div>
      </div>

      <div class="content" style={{height : "8rem"}}>
        <div class="image2">
            <img src= "/assets/img/reports/management/page8/image3.png" style={{width : "100%",height : "100%"}} />
        </div>
        <div class="content-body">
          <ul style={{fontSize : "8px"}}>
            <li class="main-heading">
              <strong>3. Medications (Consult a Psychiatrist) </strong><br />
              In cases where therapy alone is insufficient, medications may be
              prescribed:
            </li>
            <li>
              <strong>Antidepressants: </strong>
              <br />
              • Include Selective Serotonin Reuptake Inhibitors (SSRIs) and
              Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs). <br />
              • Help balance brain chemicals that regulate mood and emotions.
            </li>
            <li>
              <strong>Benzodiazepines: </strong>
              <br />
              • Used for short-term relief of severe anxiety. <br />
              • Typically avoided for long-term use due to the risk of
              dependency.
            </li>
            Regular follow-up appointments are essential to monitor treatment
            progress and adjust medications if needed.
          </ul>
        </div>
      </div>

      <div class="content" style={{height : "5rem"}}>
        <div class="content-body-reverse">
          <ul>
            <li class="main-heading">
              <strong>4. Psychiatric Rehabilitation Programs </strong><br />
              These programs provide structured support for improving overall
              functioning and quality of life:
            </li>
            <li>
              <strong>• Vocational Training: </strong>Helps develop skills for
              job readiness.
            </li>
            <li>
              <strong>• Social Skills Development: </strong>Improves
              interpersonal interactions.
            </li>
            <li>
              <strong>• Community Reintegration: </strong>Facilitates a return
              to everyday life activities.
            </li>
          </ul>
        </div>
        <div class="image-reverse2">
            <img src = "/assets/img/reports/management/page8/image4.png" style={{width : "100%",height : "100%"}} />
        </div>
      </div>

      <div class="content2" style={{height : "11rem"}}>
        <div class="image3" style={{backgroundColor:"#47a8ef"}}>
        <img src = "/assets/img/reports/management/page8/image5.png" style={{width : "100%",height : "100%"}} />
        </div>
        <div class="content-body" style={{width : "60%"}}>
          <ul>
            <li class="main-heading">
              <strong>5. Stress Reduction Techniques </strong><br />
              Incorporate practical strategies to manage stress in daily life:
            </li>
            <li>
              <strong>Set Boundaries: </strong>
              <br />
              • Establish clear limits in personal and professional life to
              prevent stress and overwhelm. <br />
            </li>
            <li>
              <strong>Identify and Address Triggers: </strong>
              <br />
              • Recognize sources of stress and implement strategies to manage
              or eliminate them.
              <br />
            </li>
            <li>
              <strong>Incorporate Relaxation Techniques and Therapies: </strong>
              <br />
              • Use deep breathing, meditation, or progressive muscle relaxation
              to soothe the nervous system, and consider therapies like
              aromatherapy, massage, or acupuncture for additional stress
              relief. <br />
            </li>
            <li>
              <strong>Prioritize Self-Care Activities: </strong>
              <br />
              • Engage in enjoyable activities like hobbies, exercise, or
              spending time in nature to support well-being. <br />
            </li>
            <li>
              <strong>Include Professional Guidance and Support: </strong>
              <br />
              • Develop a personalized plan that combines expert advice,
              relaxation methods, and support networks. <br />
            </li>
          </ul>
        </div>
      </div>

      <div class="content" style={{height : "rem"}}>
        <div class="content-body-reverse">
          <ul>
            <li class="main-heading">
              <strong>6. Build a Support Network </strong>
            </li>
            <li>
              <strong>Connect with Supportive People: </strong><br />
              • Reach out to family, friends, or support groups for comfort and
              understanding.
            </li>
            <li>
              <strong>Seek Supportive Counseling: </strong><br />
              • Regular sessions can help navigate ongoing challenges and
              maintain recovery.
            </li>
          </ul>
        </div>
        <div class="image-reverse3" style={{backgroundColor:"#47a8ef"}}>
        <img src = "/assets/img/reports/management/page8/image6.png" style={{width : "100%",height : "100%"}} />

        </div>
      </div>

      <div class="content" style={{height : "5rem"}}>
        <div class="image4">
        
        <img src = "/assets/img/reports/management/page8/image7.png" style={{width : "100%",height : "100%"}} />

        </div>
        <div class="content-body">
          <ul>
            <li class="main-heading">
              <strong>7. Develop a Personalized Stress Management Plan </strong>
            </li>
            <li>
              <strong>Create a Plan: </strong><br />
              • Include a combination of professional guidance, relaxation
              techniques, self-care, and support networks.
            </li>
            <li>
              <strong>Incorporate Relaxation Therapies: </strong><br />
              • Consider therapies like aromatherapy, massage, or acupuncture to
              help reduce stress levels.
            </li>
          </ul>
        </div>
      </div>

      <div class="disclamer">
        <strong>Conclusion </strong>
        Managing severe stress is a multifaceted process that requires patience,
        professional guidance, and self-awareness. Developing a comprehensive
        approach involving therapy, medication (if needed), lifestyle changes,
        and a strong support network is essential for overcoming severe stress
        and enhancing long-term well-being.
      </div>

      {/* <footer
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "1%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </footer> */}
    </div>


    </div>
    }
    </>

  );
}
