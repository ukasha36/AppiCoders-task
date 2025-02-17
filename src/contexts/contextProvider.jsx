import { createContext, useContext, useState } from 'react';

// Create Context
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

// Context Provider Component
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({}); // Initialize as null
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); // Fetch initial token from localStorage

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token); // Corrected key
        } else {
            localStorage.removeItem('ACCESS_TOKEN'); // Corrected key
        }
    };

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children} {/* Corrected prop name */}
        </StateContext.Provider>
    );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);