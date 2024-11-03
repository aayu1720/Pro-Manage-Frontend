import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ Component }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("proManageToken")
  );

  return <div>{isLoggedIn ? <Component /> : <Navigate to="/" />}</div>;
}

export default ProtectedRoute;
