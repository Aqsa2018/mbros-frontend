import React from 'react';

const PatientDashboard = () => {
  // This can be later replaced with real data from API
  const patient = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 29,
  };

  const appointments = [
    { date: '13 July 2025', time: '11:00AM', doctor: 'Dr. John Doe' },
    { date: '20 July 2025', time: '3:00PM', doctor: 'Dr. Emily Wong' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">👩‍⚕️ Patient Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Profile Info</h2>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Age:</strong> {patient.age}</p>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Upcoming Appointments</h2>
          <ul className="space-y-2">
            {appointments.map((appt, idx) => (
              <li key={idx} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition">
                <span className="font-medium">{appt.date}</span> – {appt.time} with <strong>{appt.doctor}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Book Appointment */}
      <div className="mt-6 p-4 border rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Book New Appointment</h2>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
