import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContex";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return <Outlet />;  //continua con el compomponente q esta adentro eso quiere decir autlet
}

export default ProtectedRoute