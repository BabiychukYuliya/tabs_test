// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";

import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
const HOME_URL = "/";

export const App = ({ routes }) => {
  const [tabs, setTabs] = useState([]);

  const fetchTabs = async () => {
    const { result, error } = await request("tabs.json");
    setTabs(result);
    if (error) {
      return;
    }
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  const RouteTab = (tabs) => {
    <Routes>
      {tabs.map(({ id, path }, key) => (
        <Route
          key={id}
          path={key ? `${HOME_URL}${id}` : [`${HOME_URL}${id}`, `${HOME_URL}`]}
          element={lazy(() => import(`./components/${path}`))}
        />
      ))}
    </Routes>;
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>;
  };
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Tabs tabs={tabs} />
    </div>
  );
};

export default App;
