import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute2 = () => {
    const user = localStorage.getItem("UserId");
  return (
    user ? <Navigate to="/dashboard" /> : <Outlet/>
  )
}

export default ProtectedRoute2