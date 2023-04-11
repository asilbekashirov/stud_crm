import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="pt-24 ml-80 px-3 pb-3 w-full h-screen">
          {children}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
