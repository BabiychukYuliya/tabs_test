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
  const [selectedTabPath, setSelectedTabPath] = useState(null);
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
    if (tabs.length) {
      navigate(firstTabPath);
    }
  }, [firstTabPath]);

  return (
    <div className="App">
      {!isLoading && sortedOrder.length > 0 && (
        <Routes>
          <Route
            path="/"
            element={
              <Tabs tabs={sortedOrder} selectedTabPath={selectedTabPath} />
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={<Navigate to={selectedTabPath || tabs[0]?.id} />}
                />
              }
            />
            ;
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
