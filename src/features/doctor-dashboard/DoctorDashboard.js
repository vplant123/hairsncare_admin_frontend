
import './Dashboard.css'; // Import CSS file for DoctorDashboard styling
import DoctorNavbar from './DoctorNavbar';

import Barchart from './components/BarChart'
import CircleChart from "./components/CircleChart";
function DoctorDashboard() {
  const data = [
    { id: 1, personName: 'John Doe', taskName: 'Task 1', status: 'pending', date: '2024-04-09' },
    { id: 2, personName: 'Jane Smith', taskName: 'Task 2', status: 'completed', date: '2024-04-08' },
    { id: 3, personName: 'Alice Johnson', taskName: 'Task 3', status: 'pending', date: '2024-04-07' }
    // Add more dummy data here if needed
  ];
  let storedUserData = JSON.parse(localStorage.getItem("User343")) ;

  return (
  <>
  <DoctorNavbar>
  <h1>Welcome back, {storedUserData?.logedInUser?.user?.fullname}</h1>
  <div>phone: {storedUserData?.logedInUser?.user?.mobile}</div>
  <div>email: {storedUserData?.logedInUser?.user?.email}</div>

<div className="right-col-container">
   <div><CircleChart/></div>
   <div><Barchart/></div>
</div>
<h4>Recent Appointment</h4>
<table className="custom-table">
<thead>
 <tr>
   <th className="custom-th">Name</th>
   <th className="custom-th">Date</th>
   <th className="custom-th">Status</th>
 </tr>
</thead>
<tbody>
 {data.map(task => (
   <tr key={task.id}>
     <td className="custom-td">{task.personName}</td>
     <td className="custom-td">{task.date}</td>
     <td className="custom-td">{task.status}</td>
   </tr>
 ))}
</tbody>
</table>
  </DoctorNavbar>

  </>
  );
}
export default DoctorDashboard;


