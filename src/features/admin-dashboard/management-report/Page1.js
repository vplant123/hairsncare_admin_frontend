import React from 'react';

export default function Page1({data}) {
  console.log("jojerofre",data?.personal)
  return (
    <div className="a4-page avoid-break">
      <div>
      <div
        id="report"
        className="report-container1"
        style={{ padding: "10px", boxSizing: "border-box" }}
      >
        <div className="heading-container2">
          <div className="image-container" style={{    width: "30%"}}>
            {/* <img className="rx-logo" src="/medical-prescription-pharmaceutical-drug-pharmacy-symbol-clip-art-rx-logo-image-b7b1ba0f952be8c1872ae92a48af3874.png" alt="RX Logo" /> */}
            <img
              className="logo-main"
              src="/assets/img/logo.png"
              alt="Main Logo"
              style={{maxWidth : "100%"}}
            />
          </div>
          <div style={{    width: "70%",textAlign: "end"}}>
            <h2>Dr Amit Agarkar</h2>
            <p>MBBS, MD, FCPS,DDV</p>
            <p>Fellowship in Hair Transplant</p>
            <p>Reg. No,- 06/07/2868</p>
          </div>
        </div>
        </div>
         <div className='mm-container'>
          <h1 style={{color:"#008bff",fontSize:'1.8rem'}}>Welcome to the hairsncares.com – YOUR HAIR EXPERT!</h1>
        <div style={{textAlign:'center'}}> <h1 style={{fontSize:'1.8rem'}} >Hair Health Recommendation Management Report</h1></div>
     <p>Dear {data?.personal?.sex == "Male" ? "Mr" : "Ms"} {data?.personal?.name} ,</p>
     <p>After careful consideration of the hair test you provided, here is a customized recommendation report to address your concerns. </p>
     <p>Following a comprehensive assessment by the dermatologist, please find your detailed treatment plan below:	
</p>
         </div>
      </div>
         <div>
         <h1 className='diag treat-plan-h1'>
1) Treatment Plan </h1>
<h1 style={{textAlign:'center'}}>Diagnosis Synopsis </h1>
<div style={{textAlign:'center'}}><div className='don' style={{background : "none",color:"black"}}>
                {data?.dianosis?.map((item,index)=>{
                  return <div style={{fontSize : "20px",fontWeight : "600"}}> 
                  <div>{index+1}) {item.option}</div>

{item.subOption&&<div><li>{item.subOption}</li></div>}
                  </div>
                })}
              </div></div>
              <p style={{fontWeight:'500'}}>Your Prescription of medications for {data?.dianosis?.map((item,index)=>{
                  return <>
                   {index>=1?<span> and </span>:null}
                  <span>{item.option}</span>
                 
<span>{item.subOption&&item.subOption}</span>

                  </>
                })} will be provided in the Prescription in Your My Reports section. 
<br></br>Below is the detailed management report for your condition.
</p>
         </div>
    </div>
  );
}
