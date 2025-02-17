// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const ProtectedRoute = ({ children }) => {
    const { token } = useStateContext();

    // Always render the children or a Navigate component
    return token ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;