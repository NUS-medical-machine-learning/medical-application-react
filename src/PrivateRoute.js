import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const PrivateRoute = () => {
  const currentUser = auth.currentUser;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
  // const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
};

export default PrivateRoute;
