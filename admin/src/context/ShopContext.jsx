import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const backendUrl = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const value = {
        token, setToken,
        backendUrl, currency
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;