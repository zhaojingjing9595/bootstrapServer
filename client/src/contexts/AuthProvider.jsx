import React, { useState } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(
      localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
    );

    return (
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;