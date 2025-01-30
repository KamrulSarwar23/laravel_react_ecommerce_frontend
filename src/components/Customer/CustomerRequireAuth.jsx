import { useContext } from "react"

import { Navigate } from "react-router-dom";
import { CustomerAuthContext } from "../context/CustomerAuth";

export const CustomerRequireAuth = ({children}) => {

    const {user} = useContext(CustomerAuthContext);

    if (!user) {
        return <Navigate to='/' />
    }

    return children;
}