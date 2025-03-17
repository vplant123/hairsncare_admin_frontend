import React,{useEffect,useState} from 'react';
import AdminNavbar from './AdminNavbar';
import BASE_URL from '../../Config';
import { useParams } from 'react-router-dom';



export default function PendingTestResults(){

    const [data1, setdata1] = useState({});
    const params = useParams();
    const [selectedTab, setSelectedTab] = useState('personal');
console.log(params.id,"params")
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
    useEffect(() => {
       
        const fetchData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/doctor/get-hair-test?hairTestId=${params.id}`, {
              method: 'GET',
              headers: {
                
              }
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data
                ,'fsijsaijfijiasjijis');
            setdata1(data.data[0]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
   
      }, []);
      
console.log(data1[0],"api data")
  return (<AdminNavbar>
    <div className='test-link container'>
        <div className='test-link-item'>
          <div onClick={() => handleTabChange('personal')} className={`tab-1 tab tab2 ${selectedTab === 'personal' ? 'selected1' : ''}`}>PERSONAL PROFILE</div>
          <div onClick={() => handleTabChange('nutritional')} className={`tab-2 tab tab2 ${selectedTab === 'nutritional' ? 'selected1' : ''}`}>NUTRITIONAL</div>
          <div onClick={() => handleTabChange('lifestyle')} className={`tab-3 tab tab2 ${selectedTab === 'lifestyle' ? 'selected1' : ''}`}>LIFESTYLE</div>
          <div onClick={() => handleTabChange('stress')} className={`tab-4 tab tab2 ${selectedTab === 'stress' ? 'selected1' : ''}`}>STRESS</div>
          <div onClick={() => handleTabChange('hairScalp')} className={`tab-5 tab tab2 ${selectedTab === 'hairScalp' ? 'selected1' : ''}`}>HAIR AND SCALP ASSESSMENT</div>
          <div onClick={() => handleTabChange('uploadedImages')} className={`tab-5 tab tab2 tabimage ${selectedTab === 'uploadedImages' ? 'selected1' : ''}`}>UPLOADED IMAGES</div>
        </div>
      </div>
    <div className="hair-scalp">
  {
  data1.personal?<>

{selectedTab === 'personal' && data1.personal &&<>
  <h3 className='test-result-h1'>Name : {data1?.personal?.name}</h3>
  <h3 className='test-result-h1'>E-mail : {data1?.personal.email}</h3>
  <h3 className='test-result-h1'>Phone Number : {data1?.personal.phoneNumber}</h3>
  <h3 className='test-result-h1'>Age group : {data1?.personal['Select your age group']}</h3>
  <h3 className='test-result-h1'>Gender : {data1?.personal.Gender.src=="/assets/img/question/female.svg"?'Female':'Male'}</h3></>}

    
  {selectedTab === 'nutritional' && data1.Nutritional &&data1?.Nutritional.map((step, stepIndex) => (
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

  {selectedTab === 'lifestyle' && data1.LifeStyle &&data1?.LifeStyle.map((step, stepIndex) => (
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
   
  {selectedTab === 'stress' && data1.Stress &&[data1?.Stress].map((step, stepIndex) => (
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
  
  {selectedTab === 'hairScalp' && data1.HairAndScalp &&data1?.HairAndScalp.map((step, stepIndex) => (
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
  ))}</>:<p>Please wait</p>
}
{
selectedTab === 'uploadedImages' &&<div className='d-flex flex-column'>
  {
    data1?.UploadedImage?.length > 0 ? data1?.UploadedImage?.map((e) => {
      return (
        <img style={{width:'400px',cursor:"pointer"}} src={e?.imageUrl} onClick={() => window.open(e?.imageUrl)}/>
      )
    }) : data1?.UploadedImage ?   <img style={{width:'400px'}} src={data1?.UploadedImage?.imageUrl}/>
     :<></>
  }
  </div>
}
</div></AdminNavbar>
    
  );
}
