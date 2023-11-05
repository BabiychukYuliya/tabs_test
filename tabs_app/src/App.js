// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";
import React from "react";
import NotFound from "./components/NotFound";

import { Routes, Route, Navigate } from "react-router-dom";

import { lazy } from "react";

export const App = () => {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTabs = async () => {
    try {
      setIsLoading(true);
      const { result } = await request("tabs.json");
      setTabs(result);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  const sortedOrder = tabs.sort((a, b) => a.order - b.order);

  return (
    <div className="App">
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Tabs tabs={sortedOrder} />}>
            {sortedOrder.map((tab, index) => {
              const Page = lazy(() => import(`./components/${tab.path}`));
              if (sortedOrder[0]) {
                return (
                  <React.Fragment key={index}>
                    <Route
                      index
                      element={
                        <Navigate to={tab.id} replace isActive={() => true} />
                      }
                    />
                    <Route path={tab.id} element={<Page />} />
                  </React.Fragment>
                );
              }
              return <Route key={index} path={tab.id} element={<Page />} />;
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
