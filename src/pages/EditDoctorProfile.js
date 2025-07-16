import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditDoctorProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('⚠️ Unauthorized. Please login.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('https://mbros-backend.onrender.com/api/doctors/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, specialization, phone } = res.data;
        setFormData({ name, email, specialization: specialization || '', phone: phone || '' });
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      await axios.put('https://mbros-backend.onrender.com/api/doctors/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update profile');
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit Doctor Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
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
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
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

export default EditDoctorProfile;
