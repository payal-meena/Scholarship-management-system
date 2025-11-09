import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft, Lock, User } from "lucide-react";

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
            }  else {
                toast.error(res.data.message || "Login Failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed. Server or network Error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-96 border-t-4 border-violet-800">
                <h2 className="text-2xl font-bold text-center mb-6 text-violet-800 flex justify-center items-center space-x-2">
                    <User className="w-6 h-6" />
                    <span>Welcome back </span>
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                   />
                    <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-violet-800 cursor-pointer text-white py-3 rounded-lg hover:bg-violet-700 disabled:bg-indigo-400"
                    >
                        {loading ? 'Verifying Credentials...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    New Student? <Link to="/student-signup" className="text-violet-600 font-medium hover:underline"> Register Here </Link>
                </p>

                <Link to="/" className="text-sm text-center text-gray-500 hover:text-gray-700 mt-2 block">
                <ChevronLeft className="inline h-4 w-4 mr-1" /> Back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default UnifiedLogin;