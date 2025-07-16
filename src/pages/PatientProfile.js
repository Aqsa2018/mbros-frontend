import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://mbros-backend.onrender.com/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data);
      } catch (err) {
        console.error('Failed to load patient:', err);
        setError('❌ Patient not found or server error.');
      }
    };

    fetchPatient();
  }, [id]);

  if (error) {
    return <div className="p-6 text-red-600 font-medium">{error}</div>;
  }

  if (!patient) {
    return <div className="p-6 text-gray-600">Loading patient profile...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🧑‍⚕️ Patient Profile</h1>
      <div className="bg-white p-6 rounded-xl shadow-md border space-y-3">
        <div><strong>Name:</strong> {patient.name}</div>
        <div><strong>Email:</strong> {patient.email}</div>
        <div><strong>Age:</strong> {patient.age || 'N/A'}</div>
        <div>
          <strong>Created At:</strong>{' '}
          {patient.createdAt ? new Date(patient.createdAt).toLocaleString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
