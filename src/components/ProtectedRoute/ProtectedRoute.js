import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ component }) => {
  const loggedIn = localStorage.getItem('validated')
  return loggedIn ? (
    component
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRouteElement;