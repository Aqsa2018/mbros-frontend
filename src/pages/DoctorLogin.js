import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const res = await axios.post('https://mbros-backend.onrender.com/api/doctors/login', { email, password });
      const { token } = res.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'doctor');
        setMessage('✅ Login successful!');
        setTimeout(() => navigate('/doctor-dashboard'), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">👨‍⚕️ Doctor Login</h2>
        {message && <p className="text-sm text-red-600 mb-3">{message}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorLogin;
