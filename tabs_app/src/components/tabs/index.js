import { NavLink } from "react-router-dom";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const uniqueKey = () => {
  const randomKey = Math.floor(Math.random() * 25);
  return randomKey;
};

export const Tabs = ({ tabs }) => {
  return (
    <>
      <nav>
        {tabs.map((tab) => (
          <NavLink key={uniqueKey()} to={tab.id}>
            {tab.title}
          </NavLink>
        ))}
      </nav>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Tabs;
