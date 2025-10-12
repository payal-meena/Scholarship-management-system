import { Link , useNavigate} from "react-router-dom";
import React , {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";

export default function StudentLogin() {
    const navigate = useNavigate();

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[loading,setLoading] = useState(false);

    const handleLogin = async(e)=> {
      e.preventDefault();

      if(!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)) {
        toast.error("Please enter a valid email");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post("http://localhost:4000/api/students/login",{
          email,
          password,
        });

        if(res.data.success) {
          toast.success("Login successful");
          localStorage.setItem("studentToken", res.data.token);
          navigate("/student-dashboard");
        } else {
          toast.error(res.data.message || "Login failed");
        }
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 border-t-4 border-indigo-500">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Student Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-lg hover:bg-indigo-700"
          >
           {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
           Back to <Link to="/" className=" text-indigo-600">Home</Link> |{" "}
          <Link to="/student-signup" className="text-indigo-600">Signup</Link>
        </p>
        <Link to="/auth" className="text-sm text-center text-gray-500 hover:text-gray-700 mt-4">
                <ChevronLeft className='inline h-4 w-4 mr-1' /> Back to Role Selection
            </Link>
      </div>
    </div>
  );
}
