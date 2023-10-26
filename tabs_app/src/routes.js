import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
const HOME_URL = "/";

export const RouteTab = (tabs) => {
  <Routes>
    {tabs.map(
      ({ id, path }, key) =>
        id && (
          <Route
            key={id}
            path={
              (key ? `${HOME_URL}${id}` : `${HOME_URL}${id}`, `${HOME_URL}`)
            }
            component={lazy(() => import(`./components/${path}`))}
          />
        )
    )}
  </Routes>;
  <Suspense fallback={null}>
    <Outlet />
  </Suspense>;
};

export default RouteTab;
