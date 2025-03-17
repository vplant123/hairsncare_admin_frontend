import React,{useState,useEffect}from 'react';
import DoctorNavbar from './DoctorNavbar';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../Config';
import { MaterialReactTable } from 'material-react-table';
import { Button } from 'reactstrap';
import moment from 'moment';
// Import dummy appointment data
const appointmentData = [
  { id: 1, name: 'John Doe', time: '8:00 AM - 9:00 AM', problem: 'Dental Checkup' },
  { id: 2, name: 'Jane Smith', time: '9:00 AM - 10:00 AM', problem: 'Eye Examination' },
  { id: 3, name: 'Alice Johnson', time: '10:00 AM - 11:00 AM', problem: 'General Checkup' },
  { id: 4, name: 'Bob Brown', time: '11:00 AM - 12:00 PM', problem: 'Physiotherapy' },
  { id: 5, name: 'Emily Jones', time: '12:00 PM - 1:00 PM', problem: 'Dermatology Consultation' },
  { id: 6, name: 'Michael Davis', time: '1:00 PM - 2:00 PM', problem: 'Orthopedic Consultation' },
  { id: 7, name: 'Sarah Wilson', time: '2:00 PM - 3:00 PM', problem: 'Psychological Counseling' },
  { id: 8, name: 'David Rodriguez', time: '3:00 PM - 4:00 PM', problem: 'Gynecology Checkup' },
  { id: 9, name: 'Laura Martinez', time: '4:00 PM - 5:00 PM', problem: 'Pediatric Consultation' },
  { id: 10, name: 'Chris Thompson', time: '5:00 PM - 6:00 PM', problem: 'Cardiology Checkup' }
];

function AppointmentList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  let storedUserData = JSON.parse(localStorage.getItem("User343")) ;

  useEffect(() => {
    const fetchData = async () => {
      console.log(storedUserData?.logedInUser?.user._id,"hi hi hi");
      try {
        const response = await fetch(`${BASE_URL}/doctor/get-all-appointment?doctorId=${storedUserData.logedInUser.user._id}&status=assigned`)
      
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log(result.data,"lulla");
        setData(result.data);

      } catch (error) {
        // setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

console.log();
  return (
    <DoctorNavbar>
      <MaterialReactTable
        columns={[
          {
            accessorKey: "userId.fullname",
            header: "Patient Name",
            size: 150,
            id: "patientName", // Added id
          },
          {
            accessorKey: "timeSlot",
            header: "Time Slot",
            size: 150,
            id: "timeSlot", // Added id
          },
          {
            accessorKey: "appointmentDate",
            header: "Appointment Date",
            size: 150,
            id: "appointmentDate", // Added id
          },
          {
            accessorKey: "createdAt",
            header: "Created Date",
            size: 100,
            id: "Date", // Added id
            Cell: ({ cell }) => (
              // <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
              //   {cell.row.original.amount===50000?"Rs 500":"Rs 100"}
              // </span>
              <div>
                {cell.row.original?.createdAt
                  ? moment(cell.row.original?.createdAt).format("DD-MM-YYYY")
                  : "-"}
              </div>
            ),
          },
          {
            header: "Method",
            size: 150,
            id: "method", // Added id
            Cell: ({ cell }) => {
              const plan = cell.row.original?.planId?.toLowerCase();
              let backgroundColor;
              let text = "Voice Call";
              console.log("moejor", plan);
              switch (plan) {
                case "66194c51e6c1744156eb35d2":
                  backgroundColor = "blue";
                  text = "Video Call";
                  break;
                case "66194c29e6c1744156eb35cf":
                  backgroundColor = "#00c500";
                  text = "Voice Call";
                  break;
                default:
                  backgroundColor = "#00c500";
              }

              return (
                <div
                  style={{
                    backgroundColor,
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                  className="appointment-button3"
                >
                  {text}
                </div>
              );
            },
          },
          {
            header: "",
            size: 150,
            id: "viewDetails", // Added id
            Cell: ({ cell }) => (
              <div className="d-flex flex-column" style={{gap : "10px"}}>
                {/* {cell.row.original?.status !== "completed" && (
                  <button className="appointment-button decline-button">
                    Decline
                  </button>
                )} */}
                {cell.row.original?.status !== "completed" ? (
                  <button
                    onClick={() =>
                      navigate(
                        `/patient-test-result/${cell.row.original?.userId?._id},${cell.row.original?._id},${cell.row.original?.hairTestId?._id}`
                      )
                    }
                    className="appointment-button"
                  >
                    Test
                  </button>
                ) : (
                  <span
                    className="appointment-button3"
                    style={{ backgroundColor: "green" }}
                  >
                    Completed
                  </span>
                )}
              </div>
            ),
          },
        ]}
        data={data || []}
      />
      {/* {data?.map(appointment => (
          <div key={appointment?.id} className="appointment-item-1">
            <div className="appointment-details">
              <h2>{appointment?.userId?.fullname}</h2>
              <p><strong>Time:</strong> {appointment?.timeSlot}</p>
              {appointment?.appointmentDate&&<p><strong>Date:</strong> {appointment?.appointmentDate}</p>}
             {appointment?.amount===10000?<div className="appointment-button3" style={{backgroundColor:'blue'}}>Voice Call</div>:<div className="appointment-button3" style={{backgroundColor:'#00c500'}}>Video Call</div>}
            </div>
            {appointment?.status!=="completed"&&<button className="appointment-button decline-button">Decline</button>}
            {appointment?.status!=="completed"?<button onClick={()=>navigate(`/patient-test-result/${appointment?.userId?._id},${appointment?._id},${appointment?.hairTestId?._id}`)} className="appointment-button">Test</button>:<span className="appointment-button3" style={{backgroundColor:'green'}}>Completed</span>}
          

          </div>
        ))} */}
    </DoctorNavbar>
  );
}

export default AppointmentList;
