import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, getUserData } from '../Utils/storage'; // Adjust the path as necessary

// Create the UserContext with default value
const UserContext = createContext();

// Custom hook for using the UserContext
const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component to wrap around components needing the context
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from local storage when the component mounts
        const token = getAccessToken();
        const userData = getUserData();

        if (token && userData) {
            setUser(userData);
        }
    }, []);

    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUser };
