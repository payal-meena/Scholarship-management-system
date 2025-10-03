import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { ChevronLeft } from "lucide-react";


const StudentSignupPage = () => {

    const navigate = useNavigate();
    const[name , setName ] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const[loading,setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!name || !email || !password || !confirmPassword){
        toast.error("Please fill all fields ");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        toast.error("Please enter a valid email address");
        return;
      }

      if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post("http://localhost:4000/api/students/signup", {
          name,
          email,
          password,
        });

        if(res.data.success){
          toast.success("Account created successfully");
          localStorage.setItem("studentToken", res.data.token);
          navigate("/student-dashboard");
        }  else {
          toast.error(res.data.message || "Signup failed");
        }
        } catch(error) { 
          console.log(error);
        toast.error(error.response?.data?.message || "Server Error ");
        } finally {
          setLoading(false);
        }
      };
    

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-xl rounded-2xl p-8 text-center border-t-4 border-indigo-500">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Student Signup</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 tranisiton"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <p className="my-6 text-sm text-center text-gray-600">
          Already registered?{" "}
          <Link
            to="/student-login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
              <Link to="/auth" className="text-sm text-center text-gray-500 hover:text-gray-700 mt-4">
                    <ChevronLeft className='inline h-4 w-4 mr-1' /> Back to Role Selection
                </Link>

      </div>
    </div>
  );
};

export default StudentSignupPage;
