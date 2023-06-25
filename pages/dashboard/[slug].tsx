import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useAppSelector } from "@/hooks/redux";
import { ReactNode } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {

  const isAuth = useAppSelector(state => state.app.isAuth)

  return isAuth ? (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="pt-24 ml-64 px-3 pb-3 w-full h-screen">
          {children}
        </main>
      </div>
    </>
  ) : (
    <main>
      {children}
    </main>
  )
};

export default Dashboard;
