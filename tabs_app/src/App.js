import "./App.css";
import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import request from "./components/utils/request";

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

  return (
    <div className="App">
      <header className="App-header"></header>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default App;
