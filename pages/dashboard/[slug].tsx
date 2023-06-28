import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {

  const router = useRouter()
  const isMainLayout = useMemo(() => {
    return router.pathname.split("/")[1] === "dashboard"
  }, [router.pathname])

  return isMainLayout ? (
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
