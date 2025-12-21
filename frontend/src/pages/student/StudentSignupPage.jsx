import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft, User, User2, Mail, Lock, CheckCircle, UserPlus } from "lucide-react";


const StudentSignupPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (password !== confirmPassword) {
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

            if (res.data.success) {
                toast.success("Account created successfully! Redirecting...");
                localStorage.setItem("studentToken", res.data.token);
                navigate("/student-dashboard");
            } else {
                toast.error(res.data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.response?.data?.message || "Server Error ");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center h-screen 
                      bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-200 
                      bg-[length:200%_200%] animate-gradient-shift">
            
            <style>
                {`
                    @keyframes gradient-shift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-shift {
                        animation: gradient-shift 15s ease infinite;
                    }
                `}
            </style>

            <div className="w-96 bg-indigo-50 shadow-2xl rounded-xl p-8 text-center border-t-4 border-violet-800 transform transition-all duration-300 hover:scale-[1.01]">
                <h2 className="text-2xl font-bold text-center mb-6 text-violet-800 flex justify-center items-center space-x-2">
                    <User2 className="h-6 w-6" />
                    <span>Create Your Account ✨</span>
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition pl-10"
                        />
                        <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition pl-10"
                        />
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition pl-10"
                        />
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition pl-10"
                        />
                        <CheckCircle className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer bg-violet-800 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-violet-700 disabled:bg-indigo-400 transition duration-150 flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing up...</span>
                            </>
                        ) : (
                            <>
                            <UserPlus className="h-5 w-5 mr-1" />
                            <span>Create Account</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="my-6 text-sm text-center text-gray-600">
                    Already registered?{" "}
                    <Link
                        to="/unified-login"
                        className="text-violet-600 font-bold hover:underline"
                    >
                        Login here
                    </Link>
                </p>
                <Link to="/" className="text-sm text-center text-gray-500 hover:text-gray-700 mt-4 block">
                    <ChevronLeft className='inline h-4 w-4 mr-1' /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default StudentSignupPage;