
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes/routePaths';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the Dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
