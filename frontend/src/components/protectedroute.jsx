import { CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthenContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading} = useAuth();
 
  if (loading) {
    console.log("Login...")
    return (
      <>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <CircularProgress size="10rem" color="secondary"/>
        </div>
      </>
    );
  }else{
    console.log("user after lodaing: ", user);
     return !user ? children : <Navigate to="/login" />;
  }
//   return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
