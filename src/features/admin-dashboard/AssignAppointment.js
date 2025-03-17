import React from 'react';
import AdminNavbar from './AdminNavbar';

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

function AssignAppointment() {
  return (
    <AdminNavbar>
      <div className="appointment-container">
        {appointmentData.map(appointment => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-details">
              <h2>{appointment.name}</h2>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Problem:</strong> {appointment.problem}</p>
            </div>
            <button className="appointment-button decline-button">Reject</button>
            <button className="appointment-button">Assign to a Doctor</button>
          </div>
        ))}
      </div>
    </AdminNavbar>
  );
}

export default AssignAppointment;
