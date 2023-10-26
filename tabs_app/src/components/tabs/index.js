import { NavLink } from "react-router-dom";

const HOME_URL = "/";
const isActiveTab = (id, key, path) =>
  path === `${HOME_URL}${id}` || (path === `${HOME_URL}` && !key);

const Tabs = ({ tabs, path }) => {
  return (
    <nav>
      <ul>
        {tabs.map(({ id, title }, key) => (
          <li key={id}>
            <NavLink
              isActive={isActiveTab(id, key, path)}
              to={`${HOME_URL}${id}`}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
