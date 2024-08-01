import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

const isAuthenticated = () => {
  // Replace with your authentication logic
  return !!localStorage.getItem('token'); // Example using a token
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to={ROUTE_PATHS.DASHBOARD} /> : children;
};

export default PublicRoute;
