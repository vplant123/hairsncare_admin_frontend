import React,{useState,useEffect}from 'react'
import BASE_URL from '../../Config';
import ManagementReportUser from './ManagementReportUser';
import DoctorAnalyseUser from './DoctorAnalyseUser'
import PrescriptionUser from './PrescriptionUser';
import { useParams } from 'react-router-dom';
export default function MyReport() {
    const [selectedTab, setSelectedTab] = useState('Prescription');
    const [data1, setdata1] = useState({});
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const params = useParams();

    let storedUserData = localStorage.getItem("User343");
    let User=JSON.parse(storedUserData).logedInUser.user;
console.log(User._id);
    useEffect(() => {
       setLoading(true)
        const fetchData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/doctor/getPrescription?appointmentId=${params.id }`, {
              method: 'GET',
              headers: {
                
              }
            });
    
            if (!response.ok) {
              setNoData(true)
              throw new Error('Network response was not ok');
            }
     
            const data = await response.json();
            console.log(data.data
                ,'fsijsaijfijiasjijis');
            setdata1(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        setLoading(false)
   
      }, []);

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
  // return (
  //   <div>
  //         <div className='test-link container'>
  //       <div className='test-link-item'>
  //         <div onClick={() => handleTabChange('Management Report')} className={`tab-1 tab tab2 ${selectedTab === 'Management Report' ? 'selected1' : ''}`}>Management Report</div>
  //         <div onClick={() => handleTabChange('Doctor Analyse Report')} className={`tab-2 tab tab2 ${selectedTab === 'Doctor Analyse Report' ? 'selected1' : ''}`}>Doctor Analyse Report</div>
  //         <div onClick={() => handleTabChange('Prescription')} className={`tab-3 tab tab2 ${selectedTab === 'Prescription' ? 'selected1' : ''}`}>Prescription</div>
  //       </div>
  //     </div>
  //        {data1?data1.showToUser?selectedTab === 'Management Report'?"hhhhhh":null:<h1>Wait for Doctor Response</h1>: <h1>Give Test</h1>}
        
  //   </div>
  // )
  return (
    <div>
      <div className='test-link container'>
        <div className='test-link-item'>
        <div onClick={() => handleTabChange('Doctor Analyse Report')} className={`tab-2 tab tab2 ${selectedTab === 'Doctor Analyse Report' ? 'selected1' : ''}`}>Doctor's Analysis Report</div>
        <div onClick={() => handleTabChange('Management Report')} className={`tab-1 tab tab2 ${selectedTab === 'Management Report' ? 'selected1' : ''}`}>Management Report</div>
        <div onClick={() => handleTabChange('Prescription')} className={`tab-3 tab tab2 ${selectedTab === 'Prescription' ? 'selected1' : ''}`}>Prescription</div>
        </div>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        noData?<h1>Give a Test</h1>:
          data1.showToUser ? (
            selectedTab === 'Management Report' ? (
              <div>
                <ManagementReportUser data={data1}/>
              </div>
            ) : selectedTab === 'Doctor Analyse Report' ? (
              <div><DoctorAnalyseUser data={data1}/></div>
            ) : (
              <div><PrescriptionUser data={data1}/></div>
            )
          ) : (
            <h1>Wait for Doctor Response</h1>
          )
         
      )}
      
    </div>
  );
}

