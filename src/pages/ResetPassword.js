// src/pages/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('Resetting password...');

    try {
      await axios.post(`https://mbros-backend.onrender.com/api/auth/reset-password/${token}`, { password });
      setMessage('✅ Password reset successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('❌ Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">🔁 Reset Password</h2>
        {message && <p className="text-sm mb-3 text-red-600">{message}</p>}
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
