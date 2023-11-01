import { NavLink } from "react-router-dom";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Tabs = ({ tabs }) => {
  return (
    <>
      <nav>
        {tabs.map((tab, index) => (
          <NavLink key={index} to={tab.id}>
            {tab.title}
          </NavLink>
        ))}
      </nav>
      <Suspense fallback={null}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Tabs;
