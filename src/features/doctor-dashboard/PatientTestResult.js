import React,{useState,useEffect} from 'react'
import DoctorNavbar from './DoctorNavbar'
import BASE_URL from '../../Config';
import { useParams,useNavigate } from 'react-router-dom';
import { fetchPatientTestResult } from './PatientTestResultSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function PatientTestResult(){
  const dispatch = useDispatch();
  // const [data1, setdata1] = useState({});
  const [selectedTab, setSelectedTab] = useState('personal');
  const params = useParams();
  const navigate=useNavigate();
  const [userId, appointmentId,haiTestId] = params.id.split(',');
  const { data1, status, error } = useSelector((state) => state.patientTestResult);
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  useEffect(() => {
    dispatch(fetchPatientTestResult(haiTestId));
  }, [dispatch, userId,haiTestId]);
    
console.log(data1,"api data")



if (status === 'loading') {
  return <DoctorNavbar><div>Loading...</div></DoctorNavbar>
}

if (status === 'failed') {
  return <DoctorNavbar><div>Error: {error}</div></DoctorNavbar>
}

return (<DoctorNavbar>
  <div className='test-link container'>
      <div className='test-link-item'>
        <div onClick={() => handleTabChange('personal')} className={`tab-1 tab tab2 ${selectedTab === 'personal' ? 'selected1' : ''}`}>PERSONAL PROFILE</div>
        <div onClick={() => handleTabChange('nutritional')} className={`tab-2 tab tab2 ${selectedTab === 'nutritional' ? 'selected1' : ''}`}>NUTRITIONAL</div>
        <div onClick={() => handleTabChange('lifestyle')} className={`tab-3 tab tab2 ${selectedTab === 'lifestyle' ? 'selected1' : ''}`}>LIFESTYLE</div>
        <div onClick={() => handleTabChange('stress')} className={`tab-4 tab tab2 ${selectedTab === 'stress' ? 'selected1' : ''}`}>STRESS</div>
        <div onClick={() => handleTabChange('hairScalp')} className={`tab-5 tab tab2 ${selectedTab === 'hairScalp' ? 'selected1' : ''}`}>HAIR AND SCALP ASSESSMENT</div>
        <div onClick={() => handleTabChange('uploadedImages')} className={`tab-5 tab tab2 tabimage ${selectedTab === 'uploadedImages' ? 'selected1' : ''}`}>UPLOADED IMAGES</div>
        <div onClick={() => handleTabChange('GenerateReport')} className={`tab-5 tab tab2 tabimage1 ${selectedTab === 'GenerateReport' ? 'selected1' : ''}`}>GENERATE REPORT</div>

      </div>
    

    </div>
  <div className="hair-scalp">


{selectedTab === 'personal' && data1?.personal &&<>
<h3 className='test-result-h1'>Name : {data1?.personal?.name}</h3>
<h3 className='test-result-h1'>E-mail : {data1?.personal.email}</h3>
<h3 className='test-result-h1'>Phone Number : {data1?.personal.phoneNumber}</h3>
<h3 className='test-result-h1'>Age group : {data1?.personal['Select your age group']}</h3>
<h3 className='test-result-h1'>Gender : {data1?.personal.Gender.src=="/assets/img/question/female.svg"?'Female':'Male'}</h3></>}

  
{selectedTab === 'nutritional' && data1?.Nutritional &&data1?.Nutritional.map((step, stepIndex) => (
  <div key={stepIndex}>
    {step.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3>{question.question}</h3>
        <div className="options-container">
          {typeof question.option === 'object' ? (
            <label>
              <img  src={question.option.src} alt={question.option.name} />
              <p>{question.option.name}</p>
            </label>
          ) : (
            <div className={`option ${typeof question.option === 'string' ? 'circle' : ''}`}>
              <div className="circle">
                {question.option}
              </div>
            </div>
          )}
        </div>
        {/* Render subquestions if available */}
        {question.subquestions && question.subquestions.length > 0 ? (
            <div className="subquestions">
              {question.subquestions.map((subQuestion, subQuestionIndex) => (
                <div key={subQuestionIndex}>
                  <h4>{subQuestion.subQuestion}</h4>
                  <div className="options-container">
                    {typeof subQuestion.option === 'object' ? (
                      <label>
                        <img  src={subQuestion.option.src} alt={subQuestion.option.name} />
                        <p>{subQuestion.option.name}</p>
                      </label>
                    ) : (
                      <div className={`option ${typeof subQuestion.option === 'string' ? 'circle' : ''}`}>
                        <div className="circle">
                          {subQuestion.option}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : question?.subquestion ?             <div className="subquestions">
          {
            <div>
              <h4>{question?.subquestion}</h4>
              <div className="options-container">
                {typeof question?.suboption == 'object' ? (
                  <label>
                    <img  src={question?.suboption.src} alt={question.suboption.name} />
                    <p>{question?.suboption.name}</p>
                  </label>
                ) : (
                  <div className={`option ${typeof question?.suboption == 'string' ? '' : ''}`}>
                    <div className="">
                      {question?.suboption}
                    </div>
                  </div>
                )}
              </div>
            </div>
}
        </div> : <></>}
      </div>
    ))}
  </div>
))}

{selectedTab === 'lifestyle' && data1?.LifeStyle &&data1?.LifeStyle.map((step, stepIndex) => (
  <div key={stepIndex}>
    {step.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3>{question.question}</h3>
        <div className="options-container">
          {typeof question.option === 'object' ? (
            <label>
              <img  src={question.option.src} alt={question.option.name} />
              <p>{question.option.name}</p>
            </label>
          ) : (
            <div className={`option ${typeof question.option === 'string' ? 'circle' : ''}`}>
              <div className="circle">
                {question.option}
              </div>
            </div>
          )}
        </div>
        {/* Render subquestions if available */}
        {question.subquestions && question.subquestions.length > 0 && (
          <div className="subquestions">
            {question.subquestions.map((subQuestion, subQuestionIndex) => (
              <div key={subQuestionIndex}>
                <h4>{subQuestion.subQuestion}</h4>
                <div className="options-container">
                  {typeof subQuestion.option === 'object' ? (
                    <label>
                      <img  src={subQuestion.option.src} alt={subQuestion.option.name} />
                      <p>{subQuestion.option.name}</p>
                    </label>
                  ) : (
                    <div className={`option ${typeof subQuestion.option === 'string' ? 'circle' : ''}`}>
                      <div className="circle">
                        {subQuestion.option}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
))}
 
{selectedTab === 'stress' && data1?.Stress &&[data1?.Stress].map((step, stepIndex) => (
  <div key={stepIndex}>
    {step.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3>{question.ques}</h3>
        <div className="options-container">
          {typeof question.option === 'object' ? (
            <label>
              <img  src={question.option.src} alt={question.option.name} />
              <p>{question.option.name}</p>
            </label>
          ) : (
            <div className={`option ${typeof question.option === 'string' ? 'circle' : ''}`}>
              <div className="circle">
                {question.option}
              </div>
            </div>
          )}
        </div>
        {/* Render subquestions if available */}
        {question.subquestions && question.subquestions.length > 0 && (
          <div className="subquestions">
            {question?.subquestions?.map((subQuestion, subQuestionIndex) => (
              <div key={subQuestionIndex}>
                <h4>{subQuestion.subQuestion}</h4>
                <div className="options-container">
                  {typeof subQuestion.option === 'object' ? (
                    <label>
                      <img  src={subQuestion.option.src} alt={subQuestion.option.name} />
                      <p>{subQuestion.option.name}</p>
                    </label>
                  ) : (
                    <div className={`option ${typeof subQuestion.option === 'string' ? 'circle' : ''}`}>
                      <div className="circle">
                        {subQuestion.option}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
))}

{selectedTab === 'hairScalp' && data1?.HairAndScalp &&data1?.HairAndScalp.map((step, stepIndex) => (
  <div key={stepIndex}>
    {step.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3>{question.question}</h3>
        <div className="options-container">

{typeof question.option === 'object' ? (
              question.option?.length > 0 ? question?.option?.map((e) => {
                return(
                  <>
                  {typeof e == 'object' ?  <label>
                  <img  src={e?.src} alt={e?.name} />
                  <p>{e?.name}</p>
                </label>  : <label>{e}</label>}
                  </>
                 
                )
              })       :            <label>
              <img  src={question.option.src} alt={question.option.name} />
              <p>{question.option.name}</p>
            </label>

            ) : (
              <div className={`option ${typeof question.option === 'string' ? 'circle' : ''}`}>
                <div className="circle">
                  {question.option}
                </div>
              </div>
            )}

          
        </div>
        {/* Render subquestions if available */}
        {question.subquestions && question.subquestions.length > 0 && (
          <div className="subquestions">
               {question.subquestions.map((subQuestion, subQuestionIndex) => (
                <div key={subQuestionIndex}>
                  <h4>{subQuestion.subQuestion}</h4>
                  <div className="options-container" style={{display:"flex",flexDirection : "column"}}>
                    {typeof subQuestion.option === 'object' ? (
                      subQuestion?.option?.length > 0 ? subQuestion?.option?.map((e) => {
                        return(
                          <>
                                            {typeof e == 'object' ?  <label>
                  <img  src={e?.src} alt={e?.name} />
                  <p>{e?.name}</p>
                </label>  : <label>{e}</label>}
                          </>
                        )
                      })       :            <label>
                        <img  src={subQuestion.option.src} alt={subQuestion.option.name} />
                        <p>{subQuestion.option.name}</p>
                      </label>
                    ) : (
                      <div className={`option ${typeof subQuestion.option === 'string' ? 'circle' : ''}`}>
                        <div className="circle">
                          {subQuestion.option}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    ))}
  </div>
))}
{
selectedTab === 'uploadedImages' &&<div>{data1?.UploadedImage?.map((e)=>{
  return(
    <img style={{width:'400px',cursor:"pointer"}} src={e?.imageUrl} onClick={() => window.open(e?.imageUrl)}/>
  )
})}</div>
}
{
  selectedTab==="GenerateReport" && <div className='gene-report'><button onClick={()=>navigate(`/analysis/${params.id}`)}>Generate Report</button></div>
}
</div></DoctorNavbar>
  
);
}
