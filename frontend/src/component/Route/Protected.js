import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({ isAdmin, children }) => {

    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    const { user } = useSelector(state => state.user);
    console.log(isAuthenticated);
    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }


    if (isAdmin === true && user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default Protected;