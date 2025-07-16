import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('⚠️ Not authenticated. Please log in.');
        return;
      }

      try {
        const profileRes = await axios.get(
          'https://mbros-backend.onrender.com/api/doctors/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(profileRes.data);

        const apptRes = await axios.get(
          'https://mbros-backend.onrender.com/api/appointments',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const myAppointments = apptRes.data.filter(
          (appt) => appt.doctor?._id === profileRes.data._id
        );
        setAppointments(myAppointments);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('❌ Failed to load dashboard data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-blue-700">👨‍⚕️ Doctor Dashboard</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {doctor && (
        <div className="bg-white shadow p-4 rounded-md mb-6">
          <h3 className="text-xl font-medium mb-2">Your Profile</h3>
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
        </div>
      )}

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="text-xl font-medium mb-4">📅 Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="border-b py-2">
              <p><strong>Patient:</strong> {appt.patient?.name || 'Unknown'}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
