import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoutes = ({ allowedRoles }) => {
  const auth = JSON.parse(localStorage.getItem('User343'));
  
  if (!auth) {
    return <Navigate to="/login" />;
  }
  
  return allowedRoles.includes(auth.logedInUser.role) ? <Outlet /> :<Navigate to="/unauthorized" />;
};

export default RoleBasedRoutes;
