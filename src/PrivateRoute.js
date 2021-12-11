import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isSignedIn] = useState(false);
  console.log(isSignedIn);
  // const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return !isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
