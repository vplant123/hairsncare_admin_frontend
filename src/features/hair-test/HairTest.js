import React, { useEffect, useState } from 'react';
import './HairTest.css';
import data from './Data';
import PersonalProfile from './components/PersonalProfile';
import Nutritional from './components/Nutritional';
import LifeStyle from './components/LifeStyle';
import Stress from './components/Stress';
import HairAndScalp from './components/HairAndScalp';
import UploadImage from './components/UploadImage';
import ThankYou from './components/ThankYou';
import Checkout from './components/Checkout';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../Config';
import SignByhairTestUp from '../SignByhairTestUp';
import { ToastContainer } from 'react-toastify';
import PopUp from './components/PopUp';
export default function HairTest() {
  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  const navigate = useNavigate();

  const [selectedOptions4, setSelectedOptions4] = useState([
    { ques: 'Physical exercise', option: '' },
    { ques: 'Sound sleep', option: '' },
    { ques: 'Healthy eating', option: '' },
    { ques: 'Yoga/Meditation', option: '' },
    { ques: 'Positive thinking', option: '' },
    { ques: 'Social/Medical support', option: '' },
    { ques: 'Feeling Anxious/Depressed', option: '' },
    // Add more questions and options as needed
]);
  const [banner, setBanner] = useState('/assets/img/question/personal-profile-pic.png');
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [api, setApi] = useState(""); 

  const [email, setEmail] = useState("");
  const [selectedOptionP, setSelectedOptionP] = useState(null);
  const [male,setMale]=useState(false)
  const [selectedOptions, setSelectedOptions] = useState(Array(data[0].questions.length).fill([]));
  const [selectedOptions1, setSelectedOptions1] = useState(Array(data[1].questions.length).fill([]));
  const [hairTestExist, setHairTestExist] = useState();
  const [testId,setTestId]=useState('')

  const [openS,setOpenS] = useState(false)

  const handlePopShowClick = () => {
    setOpenS(!openS);
    navigate("/home")
  };

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 

  useEffect(() => {
       
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/hair-tests/gethairtest-detail`, {
          method: 'GET',
          headers: {
            'Authorization': storedUserData.logedInUser.accessToken,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data
            ,'fsijsaijfijiasjijis');
        // setdata1(data.data[0]);
        if(data?.hairTest){
          let all = data?.hairTest;
          setTestId(all?._id)
          setHairTestExist(all);
          if (all?.personal) setStep(2);
          if (all?.Nutritional) setStep(3);
          if (all?.LifeStyle) setStep(4);
          if (all?.Stress) setStep(5);
          if (all?.HairAndScalp) setStep(6);
          if (all?.UploadedImage) setStep(7);
          if(all?.personal?.Gender && all?.personal?.Gender?.src === '/assets/img/question/male.svg') {
            setMale(true);          
          }else setMale(false);   
        }
        if(data?.hairTestComp){
          setOpenS(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    scrollToTop()

  }, []);

  // const [selectedOptions3, setSelectedOptions3] = useState({1:[],2:[],3:[],4:[],5:[]});
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionIndex1, setCurrentQuestionIndex1] = useState(0);
  const [currentQuestionIndex2, setCurrentQuestionIndex2] = useState(0);

  const [currentSubQuestions, setCurrentSubQuestions] = useState({});
  const [currentSubQuestions1, setCurrentSubQuestions1] = useState({});
  const [currentSubQuestions3, setCurrentSubQuestions3] = useState({});

  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedSubOption1, setSelectedSubOption1] = useState(null);
  const [selectedSubOption2, setSelectedSubOption2] = useState(null);

  // const [selectedSubOption1, setSelectedSubOption1] = useState(null);
  const [showSubQuestions, setShowSubQuestions] = useState(false);
  const [showSubQuestions1, setShowSubQuestions1] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };
console.log(selectedOptions4,'Stress')
console.log(selectedOptionP,'fiajsoijasoijfoasij');
  const nextStep = () => {
    scrollToTop();
    setStep(step + 1)
  };
  const prevStep = () => {
    scrollToTop();
    setStep(step - 1)
  };



  let stepContent;

  switch (step) {
    case 1:
      stepContent = <PersonalProfile 
      data={data[2]}
      setMale={setMale}
      nextStep={nextStep}
      setTestId={setTestId}
      selectedOptionP={selectedOptionP}
      setSelectedOptionP={setSelectedOptionP}
      name={name}
      setName={setName}
      phoneNumber={phoneNumber}
setPhoneNumber={setPhoneNumber}
email={email}
setEmail={setEmail}
hairTestExist={hairTestExist}
handleSignupClick={handleSignupClick}
setApi={setApi} 
scrollToTop={scrollToTop}
      />;
      break;
    case 2:
      stepContent = (
        <Nutritional
        testId={testId}
          nextStep={nextStep}
          setBanner={setBanner}
          prevStep={prevStep}
          data={data[0]}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentSubQuestions={currentSubQuestions}
          setCurrentSubQuestions={setCurrentSubQuestions}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
          showSubQuestions={showSubQuestions}
          setShowSubQuestions={setShowSubQuestions}
          hairTestExist={hairTestExist}
          scrollToTop={scrollToTop}

        />
      );
      break;
    case 3:
      stepContent = 
      <LifeStyle
      nextStep={nextStep}
      testId={testId}

      setBanner={setBanner}
      prevStep={prevStep}
      data={data[1]}
      selectedOptions={selectedOptions1}
      setSelectedOptions={setSelectedOptions1}
      currentQuestionIndex={currentQuestionIndex1}
      setCurrentQuestionIndex={setCurrentQuestionIndex1}
      currentSubQuestions={currentSubQuestions1}
      setCurrentSubQuestions={setCurrentSubQuestions1}
      selectedSubOption={selectedSubOption1}
      setSelectedSubOption={setSelectedSubOption1}
      showSubQuestions={showSubQuestions1}
      setShowSubQuestions={setShowSubQuestions1}
      hairTestExist={hairTestExist}
      scrollToTop={scrollToTop}

        />
      break;
    case 4:
      stepContent = <Stress 
      selectedOptions={selectedOptions4}
      testId={testId}

      setSelectedOptions={setSelectedOptions4}
      nextStep={nextStep}
      prevStep={prevStep}
setBanner={setBanner}      
hairTestExist={hairTestExist}
scrollToTop={scrollToTop}

/>;
      break;
    case 5:
      stepContent = <HairAndScalp 
      data={male?data[4]:data[5]}
      // data={data[5]}
      selectedSubOption1={selectedSubOption2}
      setSelectedSubOption1={setSelectedSubOption2}
      nextStep={nextStep}
      prevStep={prevStep}
      setBanner={setBanner}
      testId={testId}
      male={male}
      selectedOptions3={selectedOptions3}
      setSelectedOptions3={setSelectedOptions3}
      currentQuestionIndex={currentQuestionIndex1}
      setCurrentQuestionIndex={setCurrentQuestionIndex1}
      hairTestExist={hairTestExist}
      scrollToTop={scrollToTop}

      />;
      break;
      case 6:
        stepContent = <UploadImage 
        testId={testId}
        setBanner={setBanner}
        male={male}
        name={name}
        phoneNumber={phoneNumber}
        nextStep={nextStep}
        email={email}
        selectedOptionP={selectedOptionP}
        selectedOptions={selectedOptions}
        selectedOptions1={selectedOptions1}
        selectedOptions4={selectedOptions4}
        selectedOptions3={selectedOptions3}
        setTestId={setTestId}
        scrollToTop={scrollToTop}
        />;
        break;
        case 7:
          
         stepContent= <ThankYou   nextStep={nextStep}       prevStep={prevStep}/>
          break;
          case 8:
            stepContent=<Checkout testId = {testId}/>
            break;
    default:
      stepContent = null;
  }
console.log(selectedOptions,'s',selectedOptions1,'q');
  return (
    <>

<div className="barr" style={{backgroundColor : "#005cad"}}>
        <div className="container">

        <div className="d-flex" style={{fontSize : "18px", gap: "12px",color : "white",fontWeight : "500"}}>
        <div className="d-flex" style={{margin: "10px 0 0 0",    gap: "12px"}}>
        <span class="ltn__secondary-color"><i class="fas fa-home"></i></span>
        <div onClick={() => navigate("/home")} style={{cursor:"pointer"}}>Home</div>
        </div>
        <div style={{margin: "10px 0 0 0"}}>{">"}</div>
        <div style={{margin: "10px 0 0 0",cursor:"pointer"}} onClick={() => navigate("/shop")}>Hair Test</div>

      </div>
        </div>
      </div>
      <div className='test-link container'>
        <div className='test-link-item'>
          <div className={`tab-1 tab ${step==1&&"selected1"}`}>PERSONAL PROFILE</div>
          <div className={`tab-2 tab ${step==2&&"selected1"}`}>NUTRITIONAL</div>
          <div className={`tab-3 tab ${step==3&&"selected1"}`}>LIFESTYLE</div>
          <div className={`tab-4 tab ${step==4&&"selected1"}`}>STRESS</div>
          <div className={`tab-5 tab ${step==5&&"selected1"}`}>HAIR AND SCALP ASSESSMENT</div>
        </div>
      </div>
      <div className='test-content-container container' style={{justifyContent: "center"}}>
        <div className='test-content'>
          {stepContent}
        </div>
        <div className='test-image'>
          <img  src={banner} alt="Banner" style={{zIndex : 0}} />
        </div>
        <a id="scrollUp" href="#top" style={{position: "fixed", zIndex: "2147483647"}} onClick={scrollToTop}><i class="fa fa-angle-up"></i></a>
      </div>
      <div>
      {showSignup && <SignByhairTestUp onClose={handleSignupClick} name={name}
emailAdd={email}
phoneNumber={phoneNumber}
api = {api}
/>}
{
  openS && <PopUp msg={"You have completed the Hair Test. Thank you. ! Our team will contact you soon."} onClose={handlePopShowClick} />
}

        </div>
        <ToastContainer position="bottom-right" />
    </>
  );
}
