// src/Auth/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/CreateContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};
export default PrivateRoute;
