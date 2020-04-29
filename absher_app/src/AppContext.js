import React, { createContext, useState } from "react";

export const AppContext = createContext();

// This context provider is passed to any component requiring the context
export const AppProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState("");
    const [requestedInfo, setRequestedInfo] = useState([]);

    return (
        <AppContext.Provider
            value={{
                businessData,
                requestedInfo,
                setBusinessData,
                setRequestedInfo
            }}
        >
            {children}
        </AppContext.Provider>
    );
};