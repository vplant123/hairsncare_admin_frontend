// import React,{useEffect} from 'react'

// export default function Stress({nextStep,prevStep,setBanner}) {
    
//       useEffect(()=>setBanner("/assets/img/question/stress.png"),[])
//   const handleNextQuestion = () => {
  
//       nextStep();

//   };

//   const handlePrevQuestion = () => {
//   prevStep() 
//   };

//   const checkFields_stressmanage = () => {
//     // Add your logic for handling input changes here
//   };
//   return (
//     <div>
//   <table className="table stress-table" id="stressManagementTable">
//       <thead>
//         <tr>
//           <th>Please tick relevant option</th>
//           <th>Not at all</th>
//           <th>Sometimes</th>
//           <th>All the time</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="left-t">Physical exercise</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="physicalexercise" id="flexCheckDefault" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="physicalexercise" id="flexCheckDefault1" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="physicalexercise" id="flexCheckDefault2" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Sound sleep</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="soundlsleep" id="flexCheckDefault3" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="soundlsleep" id="flexCheckDefault4" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="soundlsleep" id="flexCheckDefault5" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Healthy eating</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="healthyeating" id="flexCheckDefault6" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="healthyeating" id="flexCheckDefault7" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="healthyeating" id="flexCheckDefault8" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Yoga/Meditation</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="yogameditation" id="flexCheckDefault9" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="yogameditation" id="flexCheckDefault10" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="yogameditation" id="flexCheckDefault11" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Positive thinking</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="positive_thinking" id="flexCheckDefault12" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="positive_thinking" id="flexCheckDefault13" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="positive_thinking" id="flexCheckDefault14" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Social/Medical support</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="socialsupport" id="flexCheckDefault15" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="socialsupport" id="flexCheckDefault16" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="socialsupport" id="flexCheckDefault17" /></td>
//         </tr>
//         <tr>
//           <td className="left-t">Feeling Anxious/Depressed</td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Not At All" name="depressed" id="flexCheckDefault18" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="Sometimes" name="depressed" id="flexCheckDefault19" /></td>
//           <td><input className="form-check-input" onInput={checkFields_stressmanage} type="radio" value="All the time" name="depressed" id="flexCheckDefault20" /></td>
//         </tr>
//       </tbody>
//     </table>
//     <div className='test-btnn'>
//         <button onClick={handlePrevQuestion}>
//           Prev
//         </button>
//         <button onClick={handleNextQuestion} >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../Config';

export default function Stress({       scrollToTop,    nextStep, testId, selectedOptions, setSelectedOptions, prevStep, setBanner,hairTestExist }) {
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    let storedUserData = JSON.parse(localStorage.getItem("User343"));
    const token = storedUserData.logedInUser.accessToken;
    useEffect(() => {
        setBanner("/assets/img/question/stress.png");
    }, [setBanner]);

    useEffect(() => {
        // Check if all questions have been answered
        const allAnswered = selectedOptions.every(item => item.option !== '');
        setIsNextDisabled(!allAnswered);
    }, [selectedOptions]);

    useEffect(() => {
        if(hairTestExist?.Stress){
          console.log("erknker",hairTestExist?.Stress)
          setSelectedOptions(hairTestExist?.Stress);
        }
      },[hairTestExist])

    const handleNextQuestion = async() => {
        if (!isNextDisabled) {
            try {
                const response = await fetch(`${BASE_URL}/hair-tests/createHairTestForUserStepWise`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  },
                  body: JSON.stringify({id:testId,data:{Stress:selectedOptions,userId:storedUserData.logedInUser.user._id}})
                });
              
                if (!response.ok) {
                
                  throw new Error('Network response was not ok');
                }else{
                  const responseData = await response.json();
                 
               
                 
                  nextStep()
                  console.log(responseData,'huhuhuh');
                }
              
               
                // Handle the response data as needed
              } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
              } 
            nextStep();
        }
    };

    const handlePrevQuestion = () => {
        prevStep();
    };

    const handleOptionChange = (event, index) => {
        const { value } = event.target;
        const updatedOptions = selectedOptions.map((item, idx) => {
            if (idx === index) {
                return { ...item, option: value };
            }
            return item;
        });
        setSelectedOptions(updatedOptions);
    };

    return (
        <div>
            <table className="table stress-table" id="stressManagementTable" style={{tableLayout: "fixed"}}>
                <thead>
                    <tr>
                        <th style={{width : "50%"}}>Please tick relevant option</th>
                        <th style={{width : "15%"}}>Not at all</th>
                        <th  style={{width : "20%",wordBreak: "break-word"}}>Sometimes</th>
                        <th  style={{width : "15%"}}>All the time</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedOptions.map((item, index) => (
                        <tr key={index}>
                            <td className="left-t"  style={{width : "50%"}}>{item.ques} </td>
                            <td  style={{width : "15%"}}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="Not At All"
                                    name={`option_${index}`}
                                    checked={item.option === "Not At All"}
                                    onChange={(event) => handleOptionChange(event, index)}
                                    style={{appearance : "auto"}}
                                />
                            </td>
                            <td style={{width : "15%"}}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="Sometimes"
                                    name={`option_${index}`}
                                    checked={item.option === "Sometimes"}
                                    onChange={(event) => handleOptionChange(event, index)}
                                    style={{appearance : "auto"}}
                                />
                            </td>
                            <td style={{width : "15%"}}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="All the time"
                                    name={`option_${index}`}
                                    checked={item.option === "All the time"}
                                    onChange={(event) => handleOptionChange(event, index)}
                                    style={{appearance : "auto"}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='test-btnn'>
                <button onClick={handlePrevQuestion}>
                    Prev
                </button>
                <button onClick={handleNextQuestion} disabled={isNextDisabled}>
                    Next
                </button>
            </div>
        </div>
    );
}
