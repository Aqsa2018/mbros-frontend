import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await axios.post("https://mbros-backend.onrender.com/api/doctors/login", {
        email,
        password,
      });

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role || "doctor");
        setMessage("✅ Login successful!");

        if (role === "doctor") {
          navigate("/doctor-dashboard");
        } else if (role === "patient") {
          navigate("/patient-dashboard");
        } else if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Login 🔐</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <div className="text-sm text-right mt-2">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
