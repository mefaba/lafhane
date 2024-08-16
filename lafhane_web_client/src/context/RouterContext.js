import React, { createContext, useContext, useState } from 'react';

// Create the Router context
const RouterContext = createContext();

// Custom hook to use the router context
export const useRouter = () => useContext(RouterContext);

// Router component to handle current route state and navigation
export const Router = ({ children}) => {
  const [route, setRoute] = useState('home');

  /* const setRoute = (route) => {
    setroute(route);
  }; */

  return (
    <RouterContext.Provider value={{ setRoute, route }}>
      {children}
    </RouterContext.Provider>
  );
};