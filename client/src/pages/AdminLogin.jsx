import React , {useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { ChevronLeft } from "lucide-react";

const AdminLogin = ({onViewChange}) => {
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
      <div className="bg-white shadow-xl rounded-xl p-8 w-96 border-t-4 border-green-500">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Admin Login</h2>

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
                <button type="button" onClick={()=> onViewChange('login-page')} className="text-sm text-center text-gray-500 hover:text-gray-700 mt-4">
                <ChevronLeft className='inline h-4 w-4 mr-1' /> Back to Role Selection
            </button>

      </div>
    </div>
  );
};

export default AdminLogin;
