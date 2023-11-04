import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Name, Navs } from "./dummy.styled";

export const Tabs = ({ tabs }) => {
  return (
    <>
      <Name>Dummy Tabs</Name>
      <Header>
        <nav>
          {tabs.map((tab, index) => (
            <Navs key={index} to={tab.id}>
              {tab.title}
            </Navs>
          ))}
        </nav>
      </Header>
      <Suspense fallback={<div>loading..</div>}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Tabs;
