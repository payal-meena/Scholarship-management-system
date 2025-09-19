import React from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Admin Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Back to{" "}
          <Link to="/" className="text-green-600">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
