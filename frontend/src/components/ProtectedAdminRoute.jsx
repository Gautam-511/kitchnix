import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure you import the function correctly

const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime; // Check if the token is expired
};

const isAdmin = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.role === "admin"; // Check if the user is an admin
};

export const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Remove expired token
    return <Navigate to="/adminlogin" replace />;
  }

  if (!isAdmin(token)) {
    return <Navigate to="/adminlogin" replace />; // Redirect to an unauthorized page if the user is not an admin
  }

  return children; // Render the children components if the user is an admin and the token is valid
};
