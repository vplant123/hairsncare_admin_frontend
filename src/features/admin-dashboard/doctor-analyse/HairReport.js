import React from "react";

export default function HairReport({data,data1}) {
  return (
    <>
      <div className="hair-report-2 page-break-1">
        <h1 className='tab-5 diag'>2) Hair & Scalp Analysis: </h1>
        <p className="intro-23">
          <strong>Introduction:</strong> This report presents an assessment of
          the overall hair health.
        </p>
        <p className="intro-p">
          The evaluation was conducted to understand the condition of your hair
          health, identify potential concerns, and provide appropriate
          recommendations for improvement.{" "}
        </p>
        <p className="intro-p">
          The assessment includes an analysis of hair quality, scalp
          examination, hair density, color vibrancy, hair breakage, and hair
          hydration on the basis of data and photos (if provided) obtained
          through the online hair test furnished by you.
        </p>
        <p className="intro-p">
          All of them play important roles in understanding hair loss.{" "}
        </p>
        <div className="hair-deta">
          <p>
            <strong>• Hair quality,</strong> including its texture and
            thickness, can give insights into overall hair health.{" "}
          </p>
          <p>
            <strong>• Examining the scalp</strong> helps identify issues like
            inflammation or infections that might contribute to hair loss.
          </p>
          <p>
            <strong>• Hair breakage</strong> can signal damage and weakness.{" "}
          </p>
          <p>
            <strong>• Hair density,</strong> or how thick your hair is, can show
            if hair is thinning.{" "}
          </p>
          <p>
            <strong>• Color vibrancy</strong> can indicate how well hair is
            nourished.{" "}
          </p>
          <p>
            <strong>• Hair Hydration</strong> levels influence hair's strength
            and elasticity.{" "}
          </p>
        </div>
        <p>
          All these factors help professionals determine the causes of hair loss
          and plan appropriate treatments for healthier hair.
        </p>
        <div className="custom-container">
        <div className="custom-side-panel custom-left-panel">
          <div style={{backgroundColor:data1?.ExaminationColor}} className="color-diva-1 diva1">
            <img src="\scalp-examination.png" />
            <h2 style={{fontSize : "16px"}}>Scalp Examination</h2>
          </div>
          <div className="custom-color-buttons"></div>
          <div style={{backgroundColor:data1?.DensityColor}} className="color-diva-1 diva1">
            <img src="\Hair-Density.png" /> <h2 style={{fontSize : "16px"}}>Hair Density</h2>
          </div>
          <div className="custom-color-buttons"></div>

          <div style={{backgroundColor:data1?.MoistureColor}} className="color-diva-1 diva1">
            <img src="\moisture-&-hydration-of-hair.png" />
            <h2 style={{fontSize : "16px"}}>Moisture & Hydration of Hair</h2>
          </div>
          <div className="custom-color-buttons"></div>

        </div>
        <div className="custom-center-panel">
          <div
            className="custom-color-circle-1 main-circle-health"
            style={{ backgroundColor: 
              data1?.circleColor }}
          >
            <h1 style={{fontSize : "16px",margin : 0}}>Overall health</h1>
          </div>
        </div>
        <div className="custom-side-panel custom-right-panel">
          <div style={{backgroundColor:data1?.qualityColor}} className="color-diva-1 diva1">
            <img src="\Hair-Quality.png" />
            <h2 style={{fontSize : "16px"}}>Hair Quality Texture</h2>
          </div>
          <div className="custom-color-buttons"></div>

          <div style={{backgroundColor:data1?.vibrancy
}} className="color-diva-1 diva1">
            <img src="\color-vibrancy.png" />
            <h2 style={{fontSize : "16px"}}>Color Vibrancy</h2>
          </div>
          <div className="custom-color-buttons"></div>
          
          <div style={{backgroundColor:data1?.breakageColor}} className="color-diva-1 diva1">
            <img src="/Hair-Breakage.png" />
            <h2 style={{fontSize : "16px"}}>Hair Breakage</h2>
          </div>
        </div>
      </div>
        <div className="label-report">
          <p>
            <strong>1. Scalp examination:</strong>
          </p>

        {  data?.data?.scalp?.length && data?.data?.scalp?.map((item)=>{
            return <div className={item==="Normal Scalp"?"good":"better"}>{item}</div>
          })}
          <br />

          <p>
            <strong>2. Hair Quality (texture):</strong>
          </p>
          {  data?.data?.hairQuality  ? data?.data?.hairQuality?.map((item)=>{
            return <div className={item==="Good"?"good":"better"}>{item}</div>
          }) :  <></>}
          <br />

          <p>
            <strong>3. Hair density (general instructions):</strong>
          </p>

          <div className={data?.data?.hairDensity==="Good"?"good":"better"}>{data?.data?.hairDensity
}</div>

          <p>
            <strong>4. Color vibrancy (color protection products):</strong>
          </p>
          <div className={data?.data?.colorVibrancy
==="Normal Hair Color"?"good":"better"}>{data?.data?.colorVibrancy}</div>
          <br />

          <p>
            <strong>
              5. Moisture and hydration of hair (general instructions):
            </strong>
          </p>
          <div className={data?.data?.moisture==="Well Hydrated"?"good":"better"}>{data?.data?.moisture}</div>
          <br />

          <p>
            <strong>6. Hair breakage (general instructions):</strong>
          </p>
          <div className={data?.data?.hairBreakage==="No Breakage"?"good":"better"}>{data?.data?.hairBreakage}</div>
          <br />
        </div>
        <h2 className='tab-5 diag'>Conclusion: Your Overall hair health is deemed to be</h2>
        <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
        <img src={data?.selectedOption?.src} />

        <h2>{data?.selectedOption?.value} </h2>
            </div>
        <p>
         {data?.selectedOption?.description}
        </p>
      </div>
      
     
    </>
  );
}
