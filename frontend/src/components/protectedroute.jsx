import { useAuth } from "../context/AuthenContext";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) =>{
    const {user} = useAuth();
    return user? children : <Navigate to="/login"/>
}

export default ProtectedRoute