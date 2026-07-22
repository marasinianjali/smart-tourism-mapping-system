import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  login,
  getProfile,
} from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const profile = await getProfile();
      console.log(profile);
      localStorage.setItem("user_id", profile.id);
      localStorage.setItem("full_name", profile.full_name);
      localStorage.setItem("role", profile.role);

      navigate("/places");

    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    }
  };
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Smart Tourism
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Admin Login
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
                            w-full
                            border
                            border-gray-300
                            rounded-lg
                            px-4
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-green-500
                        "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
                            w-full
                            border
                            border-gray-300
                            rounded-lg
                            px-4
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-green-500
                        "
          />

          <button
            onClick={handleLogin}
            className="
                            w-full
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            py-3
                            rounded-lg
                            font-semibold
                            transition
                        "
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );
}

export default Login;