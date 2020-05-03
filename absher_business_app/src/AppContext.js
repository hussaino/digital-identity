import React, { createContext, useState } from "react";

export const AppContext = createContext();

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
    const [customerInfo, setCustomerInfo] = useState({});

    return (
        <AppContext.Provider
            value={{
                customerInfo,
                setCustomerInfo
            }}
        >
            {children}
        </AppContext.Provider>
    );
};