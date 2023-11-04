import { NavLink } from "react-router-dom";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Name } from "./dummy.styled";

export const Tabs = ({ tabs }) => {
  return (
    <>
      <Header>
        <Name>Dummy Tabs</Name>
        <nav>
          {tabs.map((tab, index) => (
            <NavLink key={index} to={tab.id}>
              {tab.title}
            </NavLink>
          ))}
        </nav>
      </Header>
      <Suspense fallback={null}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Tabs;
