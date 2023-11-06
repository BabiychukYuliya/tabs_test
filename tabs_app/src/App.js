// import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";
import React from "react";
import NotFound from "./components/NotFound";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { lazy } from "react";

export const App = () => {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLoadFirstPage, setShouldLoadFirstPage] = useState(false);
  const location = useLocation();
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

  useEffect(() => {
    if (!isLoading && sortedOrder.length > 0) {
      setShouldLoadFirstPage(true);
    }
  }, [isLoading, sortedOrder]);

  useEffect(() => {
    if (shouldLoadFirstPage) {
      const { pathname } = location;
      const firstTabPath = sortedOrder[0].id;

      if (pathname === "/") {
        navigate(firstTabPath, { replace: true });
      }
    }
  }, [shouldLoadFirstPage, location, sortedOrder, navigate]);

  return (
    <div className="App">
      <>
        {!isLoading && sortedOrder.length && (
          <Routes>
            <Route path="/" element={<Tabs tabs={sortedOrder} />}>
              {sortedOrder.map((tab, index) => {
                const Page = lazy(() => import(`./components/${tab.path}`));

                if (shouldLoadFirstPage && index === 0) {
                  return (
                    <React.Fragment key={index}>
                      <Route index element={<Navigate to={tab.id} replace />} />
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
        {isLoading && <div>Loading...</div>}
      </>
    </div>
  );
};
export default App;
