import { createContext, useState } from "react";

export const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {

    const customerInfo = localStorage.getItem('customerInfo');

    const [user, setUser] = useState(customerInfo);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem('customerInfo')
        setUser(null);
    }

    return <CustomerAuthContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </CustomerAuthContext.Provider>
}