import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute =({children,allowedRoles})=>{
    const token=localStorage.getItem("accessToken");
    const role=localStorage.getItem("role");

    if(!token) return <Navigate to="/login"/>;

    if(allowedRoles && !allowedRoles.includes(role)){
        return <Navigate to="/unauthorized"/>;
    }

    return children;
}

export default PrivateRoute;
