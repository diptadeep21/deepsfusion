import { useState, useEffect } from "react";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    token,
    setToken,
    backendUrl
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;