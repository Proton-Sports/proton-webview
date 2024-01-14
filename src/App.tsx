import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import Auth from './views/auth/auth';

function App() {
  const navigate = useNavigate();
  const [getRoute, setRoute] = useState("");

  const changeRouter = (route: string, params?: any) => {

    navigate(route, {
      state: params ? params : {},
    });
    setRoute(route);
  };

  useEffect(() => {
    changeRouter("/auth");
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App