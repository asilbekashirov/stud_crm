import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="pt-24 ml-64 px-3 pb-3 w-full h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
