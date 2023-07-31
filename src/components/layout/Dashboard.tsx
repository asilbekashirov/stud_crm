import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="md:pt-24 pt-20 bg-primary-900 md:ml-64 md:px-3 px-2 pb-3 w-full min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
