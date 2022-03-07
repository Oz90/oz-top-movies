import React, { useState, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [startFetch, setStartFetch] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{ startFetch, setStartFetch, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
