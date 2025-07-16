// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('⚠️ Not authenticated. Please log in again.');
        return;
      }

      try {
        // Fetch doctor profile
        const resDoctor = await axios.get(
          'https://mbros-backend.onrender.com/api/doctors/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(resDoctor.data);

        // Fetch all appointments and filter for this doctor
        const resAppointments = await axios.get(
          'https://mbros-backend.onrender.com/api/appointments',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filtered = resAppointments.data.filter(
          (appt) => appt.doctor?._id === resDoctor.data._id
        );
        setAppointments(filtered);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('❌ Failed to load dashboard data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Doctor Dashboard 🩺</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {doctor && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-xl font-semibold">Welcome, {doctor.name}</h2>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-2">Upcoming Appointments 📅</h2>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appt) => (
              <li key={appt._id} className="p-3 bg-gray-100 rounded">
                <p><strong>Patient:</strong> {appt.patient?.name || 'Unknown'}</p>
                <p><strong>Date & Time:</strong> {new Date(appt.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
