import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Name, Navs } from "./dummy.styled";

export const Tabs = ({ tabs, selectedTabPath }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTabPath) {
      navigate(`/${selectedTabPath}`);
    }
  }, [selectedTabPath, navigate]);
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
