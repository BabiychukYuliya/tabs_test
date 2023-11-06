// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";
import React from "react";
import NotFound from "./components/NotFound";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { lazy } from "react";

export const App = () => {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTabs() {
      try {
        setIsLoading(true);
        const { result } = await request("tabs.json");
        setTabs(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTabs();
  }, []);

  const sortedOrder = tabs.sort((a, b) => a.order - b.order);
  const firstTabPath = sortedOrder.length > 0 ? sortedOrder[0].id : null;

  useEffect(() => {
    if (firstTabPath && window.location.pathname === "/") {
      navigate(firstTabPath, { replace: true });
    }
  }, [firstTabPath, navigate]);

  return (
    <div className="App">
      {!isLoading && sortedOrder.length && (
        <Routes>
          <Route path="/" element={<Tabs tabs={sortedOrder} />}>
            <Route index element={<Navigate to={firstTabPath} />} />

            {sortedOrder.map((tab, index) => {
              const Page = lazy(() => import(`./components/${tab.path}`));

              return <Route key={index} path={tab.id} element={<Page />} />;
            })}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
export default App;
