import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resources from "./components/pages/Resources";
import Navbar from "./components/navbar/Navbar";
import { ActivityProvider } from "./context/ActivityContext";
import { ReactNode } from "react";
import Dashboard from "./components/pages/Dashboard";
import { Goals } from "./components/pages/Goals";
import { GoalProvider } from "./context/GoalContext";

export type Nav = { link: string; name: string; page: ReactNode };

const directory = [
  { link: "/", name: "Dashboard", page: <Dashboard /> },
  { link: "/resources", name: "Resources", page: <Resources /> },
  { link: '/goals', name: 'Set Goals', page: <Goals /> },
];

function App() {
  return (
    <ActivityProvider>
      <GoalProvider>
      <BrowserRouter>
        <Navbar links={directory}>CarbonHeist 3000</Navbar>
        <div className="pt-16">
          <Routes>
            {directory.map((item: Nav) => (
              <Route key={item.link} path={item.link} element={item.page} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
      </GoalProvider>
    </ActivityProvider>
  );
}

export default App;
