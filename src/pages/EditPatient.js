import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://mbros-backend.onrender.com/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age || '',
        });
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to load patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Updating...');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://mbros-backend.onrender.com/api/patients/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Patient updated successfully!');
      setTimeout(() => navigate('/admin/manage-patients'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update patient');
    }
  };

  if (loading) return <div className="p-6">Loading patient data...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit Patient</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
    </div>
  );
};

export default EditPatient;
