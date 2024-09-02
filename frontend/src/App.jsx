


import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Otp from './routes/Otp'
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { Dashboard } from "./routes/Dashboard";


function App() {
  

  return (
  <div>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/verify" element={<Otp/>} />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
    </Routes>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  </div>
  )
}

export default App
