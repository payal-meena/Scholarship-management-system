import React from "react";
import { Link } from "react-router-dom";
const StudentSignupPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Student Signup</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-xl fpcus:outline-none focus:ring-2 focus:ring-blue-400 tranisiton"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already registered?{" "}
          <a
            href="/student-login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentSignupPage;
