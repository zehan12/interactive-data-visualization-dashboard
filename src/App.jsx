import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
