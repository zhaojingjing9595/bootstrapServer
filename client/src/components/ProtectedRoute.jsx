import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
    if (currentUser) return <>{children}</>;
    else return <Navigate to={'/'} replace/>
}

export default ProtectedRoute;
