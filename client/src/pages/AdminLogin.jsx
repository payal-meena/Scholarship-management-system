import React , {useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const AdminLogin = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=> {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/admin/login" , {email, password});
      toast.success("Login Successful!");
      localStorage.setItem("adminToken",res.data.token);

      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700"
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
