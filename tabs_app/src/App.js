// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";

import { Routes, Route, Navigate } from "react-router-dom";

import { lazy } from "react";

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

  const uniqueKey = () => {
    const randomKey = Math.floor(Math.random() * 25);
    return randomKey;
  };

  const sortedOrder = tabs.sort((a, b) => a.order - b.order);

  return (
    <div className="App">
      <Routes>
        <Route key={uniqueKey()} path="/" element={<Tabs tabs={sortedOrder} />}>
          {sortedOrder.map((tab, element) => {
            const DummyTab = lazy(() => import(`./${tab}.path}`));

            if (element === 0) {
              <>
                <Route
                  key={uniqueKey()}
                  index
                  element={<Navigate to={tab.id} />}
                />
                <Route key={uniqueKey()} path={tab.id} element={DummyTab} />
              </>;
            }
            return <Route path={tab.id} element={<DummyTab />} />;
          })}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
