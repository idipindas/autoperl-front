
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

const isAuthenticated = () => {
  // Replace with your authentication logic
  return !!localStorage.getItem('token'); // Example using a token
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to={ROUTE_PATHS.LOGIN} />;
};

export default PrivateRoute;
