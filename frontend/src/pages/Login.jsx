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
      localStorage.setItem("role", profile.role);

      navigate("/places"); 

    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <input type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;