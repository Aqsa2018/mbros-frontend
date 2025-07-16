import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('⚠️ Unauthorized. Please login.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`https://mbros-backend.onrender.com/api/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          specialization: res.data.specialization || '',
        });
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to load doctor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Updating...');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://mbros-backend.onrender.com/api/doctors/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Doctor updated successfully!');
      setTimeout(() => navigate('/admin/manage-doctors'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update doctor');
    }
  };

  if (loading) return <div className="p-6">Loading doctor info...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit Doctor</h1>

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
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <input
            name="specialization"
            value={formData.specialization}
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

export default EditDoctor;
