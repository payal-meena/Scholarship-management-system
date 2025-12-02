import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft, Lock, User, Mail } from "lucide-react";

const UnifiedLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("http://localhost:4000/api/auth/unified-login", {
                email,
                password,
            });

            const { token, role } = res.data;

            if(token) {
                toast.success(`Login Successfull as ${role.toUpperCase()}!`);

                const tokenKey = role === 'admin' ? 'adminToken' : 'studentToken';
                localStorage.setItem(tokenKey, token);

                const dashboardPath = role === 'admin' ? '/admin-dashboard' : '/student-dashboard';
                navigate(dashboardPath);
            }  else {
                toast.error(res.data.message || "Login Failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed. Server or network Error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen 
                      bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-200 
                      bg-[length:200%_200%] animate-gradient-shift">
            <style >
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
            
            <div className="bg-indigo-50 shadow-2xl rounded-xl p-8 w-96 border-t-4 border-violet-800 transform transition-all duration-300 hover:scale-[1.01]">
                <h2 className="text-2xl font-bold text-center mb-6 text-violet-800 flex justify-center items-center space-x-2">
                    <User className="w-6 h-6" />
                    <span>Welcome back 🚀</span> 
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-150 pl-10" // Added padding-left
                        />
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-150 pl-10" // Added padding-left
                        />
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-violet-800 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-violet-700 disabled:bg-indigo-400 transition duration-150 flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Verifying Credentials...</span>
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5 mr-1" />
                                <span>Login</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    New Student? <Link to="/student-signup" className="text-violet-600 font-bold hover:underline"> Register Here </Link>
                </p>

                <Link to="/" className="text-sm text-center text-gray-500 hover:text-gray-700 mt-3 block">
                <ChevronLeft className="inline h-4 w-4 mr-1" /> Back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default UnifiedLogin;