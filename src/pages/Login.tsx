import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full bg-white p-8 shadow-lg">
      <input
        type="text"
        className="form-input mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="form-input mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
      <div className="mt-4 text-center">
        <Link to="/reset" className="text-blue-500 hover:text-blue-700">Forgot Password</Link>
      </div>
      <div className="mt-2 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Register</Link> now.
      </div>
    </div>
  </div>
  
  );
}
export default Login;