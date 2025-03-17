import React from 'react';
import "./Page6.css"

export default function Page6({data}) {
  console.log("jojerofre",data?.personal)
  return (
    <div className='page-6'>
      <div
      className="head-managereport d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <img src="/assets/img/logo.png" className="head-managereport-logo" />
      <div className="head-managereport-text1">Lifestyle Management</div>
      <div
        className="text-flex-line-center-veritcal"
        style={{ color: "rgba(84, 84, 84, 1)" }}
      >
        Smart Report
      </div>
    </div>


    <main>
      <section class="do-dont-section mt-2 page-break-2" >
        <div class="card do-card">
          <div class="do-header">
            <div class="image" style={{width : "12%",height : "48px",padding : "10px"}}>
              <img src="/assets/img/reports/management/page6/Group (1).png" alt="Thumbs Up Icon" class="icon" style={{height : "100%",width : "100%"}} />
            </div>
            <h2 class="image-header" style={{fontSize : "22px"}}>DO</h2>
          </div>
          <img
            src="/assets/img/reports/management/page6/lifestyle advice png 2.png"
            alt="Illustration for Do"
            class="illustration"
          />
          <ul className='mt-2'>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Balanced Diet:</strong>Eat nutrient-rich foods,
                especially protein, iron, biotin, zinc, and vitamins C and E.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Stay Hydrated:</strong>Drink enough water daily.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Regular Exercise:</strong>Engage in physical activity to
                boost blood circulation to the scalp.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Manage Stress:</strong>Practice relaxation activities
                like meditation or yoga.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Gentle Hair Care:</strong>Use mild, sulfate-free
                shampoos & conditioners.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Scalp Care:</strong>Keep your scalp clean and free from
                excessive oil or dandruff.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Protect Hair:</strong>Use hats or UV protection products
                and minimize pollution exposure.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Get Enough Sleep:</strong>Aim for 7-9 hours of quality
                sleep each night.
              </div>
            </li>
            <li>
              <div class="right">
                <img src="/assets/img/reports/management/page6/Vector.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Regular Trims:</strong> Trim hair regularly to remove
                split ends.
              </div>
            </li>
          </ul>
        </div>

        <div class="card dont-card">
          <div class="dont-header">
            <div class="image" style={{width : "12%",height : "48px",padding : "10px"}}>
              <img src="/assets/img/reports/management/page6/Group (2).png" alt="Thumbs Down Icon" class="icon" style={{height : "100%",width : "100%"}} />
            </div>
            <h2 class="image-header" style={{fontSize : "22px"}}>DON'T</h2>
          </div>
          <img
            src="/assets/img/reports/management/page6/dont.png"
            alt="Illustration for Don't"
            class="illustration"
          />
          <ul className='mt-2'>
            <li>
              <div class="right cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Avoid Overstyling:</strong>Limit heat styling, tight
                hairstyles, and chemical treatments
              </div>
            </li>
            <li>
              <div class="cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Avoid Smoking and Limit Alcohol:</strong>Both can
                negatively impact hair health.
              </div>
            </li>
            <li>
              <div class="cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Avoid Tight Hair Accessories:</strong>Choose looser
                hairstyles to prevent hair thinning
              </div>
            </li>
            <li>
              <div class="cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Avoid Crash Diets:</strong> Maintain a balanced diet to
                prevent nutrient deficiencies.
              </div>
            </li>
            <li>
              <div class="cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Avoid Excessive Stress:</strong>Manage stress with
                relaxation techniques.
              </div>
            </li>
            <li>
              <div class="cross">
                <img src="/assets/img/reports/management/page6/Cross.png" alt="Right Icon" class="right-icon" />
              </div>
              <div class="description">
                <strong>Don't Neglect Scalp Health:</strong>Keep your scalp
                clean and avoid harsh chemicals
              </div>
            </li>
          </ul>
        </div>
      </section>

    <div style={{display : "flex",justifyContent : "center",position : "relative",marginTop : "2%"}} className='page-break-2'>
    <div class="bordered-container" >
        <h1>Advice and Tips for Special Condition</h1>
        <p>1. Anemia</p>
        <ul style={{listStyleType : "disc"}}>
          <li>
            Avoid Iron Blockers (If anemic): Refrain from consuming calcium
            supplements, dairy, tea, and coffee during iron-rich meals.
          </li>
          <li>
            Limit Blood Donation (If anemic): Hold off on blood donation until
            iron levels improve.
          </li>
        </ul>
        <p>2. Thyroid</p>
        <ul style={{listStyleType : "disc"}}>
          <li>
            Limit Goitrogenic Foods (Hypothyroidism): Reduce intake of foods
            like broccoli, cauliflower, & soy.
          </li>
          <li>
            Monitor Iodine Intake (Hypothyroidism): Ensure sufficient iodine
            from sources like iodized salt and fish.
          </li>
          <li>
            Moderate Stimulants (Hyperthyroidism): Limit caffeine and stimulants
            to manage symptoms.
          </li>
        </ul>
        <p>3. Insulin</p>
        <strong style={{fontSize : "0.6rem"}}> Regulate Insulin Levels</strong>
        <ul style={{listStyleType : "disc"}}>
          <li>Low Glycemic Index (GI) Diet</li>
          <li>Avoid Refined Sugars and Processed Carbs</li>
        </ul>
        <strong style={{fontSize : "0.6rem"}}> Hormonal Balance through Exercise</strong>
        <ul style={{listStyleType : "disc",marginBottom : "8px"}}>
          <li>Strength Training & Yoga</li>
          <li>High Intensity Interval Training (HIIT) Workouts</li>
        </ul>
        <div class="helpful-tips-container page-helpful-tips">
          <img src="/assets/img/reports/management/page6/helpful-tips.png" alt="Helpful Tips" class="helpful-tips" />
        </div>
      </div>
    </div>

    </main>
    <div
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "5%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </div>
    </div>
  );
}
