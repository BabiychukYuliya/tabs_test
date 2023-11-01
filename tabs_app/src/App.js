// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { lazy } from "react";

export const App = () => {
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

  const sortedOrder = tabs.sort((a, b) => a.order - b.order);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Tabs tabs={sortedOrder} />}>
          {sortedOrder.map((tab, i) => {
            const Page = lazy(() => import(`./components/${tab.path}`));
            if (i === 0) {
              return (
                <React.Fragment key={i}>
                  <Route index element={<Navigate to={tab.id} />} />
                  <Route path={tab.id} element={<Page />} />
                </React.Fragment>
              );
            }
            return <Route key={i} path={tab.id} element={<Page />} />;
          })}
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
