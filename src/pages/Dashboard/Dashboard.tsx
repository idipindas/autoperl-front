
// import { useNavigate } from 'react-router-dom';
// import { ROUTE_PATHS } from '../../routes/routePaths';
import Layout from '../../components/Layout/Layout';

const Dashboard = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('accessToken');
  //   navigate(ROUTE_PATHS.LOGIN);
  // };

  return (
    <div>
      {/* <h2>Dashboard</h2>
      <p>Welcome to the Dashboard!</p>
      <button onClick={handleLogout}>Logout</button> */}
      <Layout/>
    </div>
  );
};

export default Dashboard;
