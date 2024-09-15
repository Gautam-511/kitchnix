


import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Otp from './routes/Otp'
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import Dashboard from "./routes/Dashboard";
import LandingPage from './routes/LandingPage';
import AdminLogin from './routes/AdminLogin';
import AdminDashboard from './routes/AdminDashboard';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';


function App() {
  

  return (
  <div>
    <Routes>
      <Route path="/landing" element={<LandingPage/>} />
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
      <Route path='/adminlogin' element={<AdminLogin/>} />
      <Route
          path="/admindashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard/>
            </ProtectedAdminRoute>
          }
        />
    </Routes>
    <h1 className="text-3xl font-bold underline">
      
    </h1>
  </div>
  )
}

export default App
