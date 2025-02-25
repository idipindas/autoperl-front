import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';
import { ROUTE_PATHS } from './routePaths';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../pages/NotFound/NotFound';
import ServiceList from '../pages/services/ServiceList';
import PlansList from '../pages/plans/plansList';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={ROUTE_PATHS.SIGNUP} element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path={ROUTE_PATHS.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path={ROUTE_PATHS.SERVICE} element={<ServiceList/>} />
        <Route path={ROUTE_PATHS.PLANS} element={<PlansList/>} />


        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
