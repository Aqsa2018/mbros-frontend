import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');
      try {
        const [statsRes, chartRes] = await Promise.all([
          axios.get('https://mbros-backend.onrender.com/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://mbros-backend.onrender.com/api/admin/appointments/monthly', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCounts(statsRes.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
        setError('❌ Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-gray-600">Doctors</h3>
              <p className="text-2xl font-semibold">{counts.doctors}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-gray-600">Patients</h3>
              <p className="text-2xl font-semibold">{counts.patients}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-gray-600">Appointments</h3>
              <p className="text-2xl font-semibold">{counts.appointments}</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">Monthly Appointments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
