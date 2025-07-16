import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import EditDoctorProfile from './pages/EditDoctorProfile';
import AppointmentList from './pages/AppointmentList';
import EditPatientProfile from './pages/EditPatientProfile';
import AdminDashboard from './pages/AdminDashboard';
import ManageDoctors from './pages/ManageDoctors';
import ManagePatients from './pages/ManagePatients';
import AddDoctor from './pages/AddDoctor';
import AddPatient from './pages/AddPatient';
import Navbar from "./components/Navbar";
import PrivateRoute from './components/PrivateRoute';
import EditDoctor from './pages/EditDoctor';
import EditPatient from './pages/EditPatient';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DoctorLogin from './pages/DoctorLogin';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavbar = [
    '/login',
    '/register',
    '/doctor-login',
    '/forgot-password'
  ].some(path => location.pathname.startsWith(path)) || location.pathname.startsWith('/reset-password');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/doctor-dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
          <Route path="/patient-dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
          <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
          <Route path="/edit-doctor-profile" element={<PrivateRoute><EditDoctorProfile /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><AppointmentList /></PrivateRoute>} />
          <Route path="/edit-patient-profile" element={<PrivateRoute><EditPatientProfile /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/manage-doctors" element={<PrivateRoute><ManageDoctors /></PrivateRoute>} />
          <Route path="/admin/manage-patients" element={<PrivateRoute><ManagePatients /></PrivateRoute>} />
          <Route path="/admin/add-doctor" element={<PrivateRoute><AddDoctor /></PrivateRoute>} />
          <Route path="/admin/add-patient" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
          <Route path="/admin/edit-patient/:id" element={<PrivateRoute><EditPatient /></PrivateRoute>} />
          <Route path="/admin/edit-doctor/:id" element={<PrivateRoute><EditDoctor /></PrivateRoute>} />
          <Route path="/admin/doctor/:id" element={<PrivateRoute><DoctorProfile /></PrivateRoute>} />
          <Route path="/admin/patient/:id" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
