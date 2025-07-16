import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    reason: '',
  });
  const [time, setTime] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch available doctors from backend
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://mbros-backend.onrender.com/api/doctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const token = localStorage.getItem('token');
      const appointmentDateTime = new Date(`${formData.date}T${time}`);

      await axios.post(
        'https://mbros-backend.onrender.com/api/appointments',
        {
          doctor: formData.doctor,
          patient: localStorage.getItem('userId'), // ensure userId is stored during login
          date: appointmentDateTime,
          reason: formData.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Appointment booked successfully!');
      setFormData({ doctor: '', date: '', reason: '' });
      setTime('');
    } catch (err) {
      console.error('Failed to book appointment:', err);
      setMessage('❌ Failed to book appointment');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-medium mb-1">Select Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Reason for appointment"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Book Appointment
        </button>
      </form>

      {message && <p className="mt-4 text-blue-700 text-sm">{message}</p>}
    </div>
  );
};

export default BookAppointment;
