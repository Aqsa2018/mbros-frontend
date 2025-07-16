import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('⚠️ Unauthorized access. Please login.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://mbros-backend.onrender.com/api/doctors/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctor(res.data);
      } catch (err) {
        console.error('Failed to load doctor:', err);
        setError('❌ Doctor not found or server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!doctor) return <div className="p-6 text-gray-600">No data found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Doctor Profile</h1>
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border">
        <div><strong>Name:</strong> {doctor.name}</div>
        <div><strong>Email:</strong> {doctor.email}</div>
        <div><strong>Phone:</strong> {doctor.phone || 'N/A'}</div>
        <div><strong>Specialization:</strong> {doctor.specialization || 'N/A'}</div>
        <div>
          <strong>Joined:</strong>{' '}
          {doctor.createdAt ? new Date(doctor.createdAt).toLocaleString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
