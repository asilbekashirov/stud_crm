import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useApp } from "@/hooks/useApp";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {

  useApp()
  const router = useRouter()

  const isMainLayout = useMemo(() => {
    return ["dashboard", "admin"].includes(router.pathname.split("/")[1])
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
