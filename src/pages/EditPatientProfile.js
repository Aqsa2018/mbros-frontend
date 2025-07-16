import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPatientProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://mbros-backend.onrender.com/api/patients/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          age: res.data.age || '',
          phone: res.data.phone || '',
        });
      } catch (err) {
        console.error('Error fetching patient profile:', err);
        setMessage('❌ Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      await axios.put('https://mbros-backend.onrender.com/api/patients/me', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setMessage('❌ Failed to update profile');
    }
  };

  if (loading) return <div className="p-6">Loading your profile...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit Patient Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
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

export default EditPatientProfile;
