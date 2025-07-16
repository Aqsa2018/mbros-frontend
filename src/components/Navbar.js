import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        M Bro's Telemedicine
      </Link>
      <nav className="flex gap-4 text-sm text-indigo-700 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/doctor-login" className="hover:underline">Doctor Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </nav>
    </header>
  );
}
