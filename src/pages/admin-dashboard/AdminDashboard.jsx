import React, { useEffect } from 'react'
// import AdminNavbar from './AdminNavbar'
import './AdminDashboard.css'
import AllHairTest from './AllHairTest';
import { ToastContainer } from 'react-toastify';
export default function AdminDashboard({setDoctor}) {
    const data = [
        { id: 1, personName: 'John Doe', taskName: 'Task 1', status: 'pending', date: '2024-04-09', payment: 'Rs100' },
        { id: 2, personName: 'Jane Smith', taskName: 'Task 2', status: 'completed', date: '2024-04-08', payment: 'Rs500' },
        { id: 3, personName: 'Alice Johnson', taskName: 'Task 3', status: 'pending', date: '2024-04-07', payment: 'Rs100' },
        { id: 4, personName: 'Michael Johnson', taskName: 'Task 4', status: 'completed', date: '2024-04-06', payment: 'Rs100' },
        { id: 5, personName: 'Sarah Brown', taskName: 'Task 5', status: 'pending', date: '2024-04-05', payment: 'Rs500' },
        { id: 6, personName: 'David Wilson', taskName: 'Task 6', status: 'pending', date: '2024-04-04', payment: 'Rs100' },
        { id: 7, personName: 'Emma Martinez', taskName: 'Task 7', status: 'completed', date: '2024-04-03', payment: 'Rs100' },
        { id: 8, personName: 'Daniel Taylor', taskName: 'Task 8', status: 'pending', date: '2024-04-02', payment: 'Rs500' },
        { id: 9, personName: 'Olivia Garcia', taskName: 'Task 9', status: 'completed', date: '2024-04-01', payment: 'Rs500' },
        { id: 10, personName: 'William Rodriguez', taskName: 'Task 10', status: 'pending', date: '2024-03-31', payment: 'Rs100' },
        { id: 11, personName: 'Sophia Hernandez', taskName: 'Task 11', status: 'completed', date: '2024-03-30', payment: 'Rs500' },
        { id: 12, personName: 'James Lopez', taskName: 'Task 12', status: 'pending', date: '2024-03-29', payment: 'Rs500' },
        // { id: 13, personName: 'Isabella Martinez', taskName: 'Task 13', status: 'completed', date: '2024-03-28', payment: 'Rs100' },
        // { id: 14, personName: 'Liam Gonzalez', taskName: 'Task 14', status: 'pending', date: '2024-03-27', payment: 'Rs100' },
        // { id: 15, personName: 'Mia Perez', taskName: 'Task 15', status: 'completed', date: '2024-03-26', payment: 'Rs500' },
        // { id: 16, personName: 'Benjamin Sanchez', taskName: 'Task 16', status: 'pending', date: '2024-03-25', payment: 'Rs100' },
        // { id: 17, personName: 'Elijah Ramirez', taskName: 'Task 17', status: 'completed', date: '2024-03-24', payment: 'Rs500' },
        // { id: 18, personName: 'Michael Brown', taskName: 'Task 18', status: 'pending', date: '2024-03-23', payment: 'Rs100' },
        // { id: 19, personName: 'Emily Davis', taskName: 'Task 19', status: 'completed', date: '2024-03-22', payment: 'Rs100' },
        // { id: 20, personName: 'Daniel Wilson', taskName: 'Task 20', status: 'pending', date: '2024-03-21', payment: 'Rs500' }
    ];
  
    return (
       <>
                  <AllHairTest setDoctor={setDoctor}>
            {/* <table className="custom-table">
                <thead>
                    <tr>
                        <th className="custom-th">Name</th>
                        <th className="custom-th">Date</th>
                        <th className="custom-th">Payment</th>
                        <th className="custom-th">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(task => (
                        <tr key={task.id}>
                            <td className="custom-td">{task.personName}</td>
                            <td className="custom-td">{task.date}</td>
                            <td className="custom-td">{task.payment}</td>
                            <td className="custom-td">{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            </AllHairTest>
            <ToastContainer position="bottom-right"/>
       </>

      
    )
}
