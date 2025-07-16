import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://mbros-backend.onrender.com/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError('❌ Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment List</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{appt.patient?.name || 'N/A'}</td>
                  <td className="p-3">{appt.doctor?.name || 'N/A'}</td>
                  <td className="p-3">{new Date(appt.date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
