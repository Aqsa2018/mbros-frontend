import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex-grow flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to M Bro’s Telemedicine
        </h2>
        <p className="text-gray-600 mb-6">
          Helping doctors and patients connect securely, efficiently, and anytime from the comfort of their homes.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/doctor-login">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Doctor Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Register as Doctor
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
