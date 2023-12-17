import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </>
  )
}

export default App
