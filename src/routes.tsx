import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import UniversitiesPage from "./pages/common/universities";
import ProgramsPage from "./pages/app/programs";
import HomePage from "./pages/app/home";
import LoginPage from "./pages/common/login";
import RegisterPage from "./pages/common/register";
import UniversityAddPage from "./pages/admin/university-add";
import NewsAddPage from "./pages/admin/news-add";
import UniversityDetailPage from "./pages/app/uniById";
import NewsPage from "./pages/admin/news";
import AllUsersPage from "./pages/admin/users-all";
import AnalyticsPage from "./pages/admin/analytics";
import ProfilePage from "./pages/app/profile";

interface IProps {
  isAuth: boolean;
  isAdmin: boolean;
}

export default function Router({ isAuth, isAdmin }: IProps) {

  return useRoutes([
    {
      path: "/app",
      element: <Dashboard />,
      children: [
        {
          path: "search",
          element: <UniversitiesPage />,
        },
        {
          path: "programs",
          element: <ProgramsPage />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "university/:id",
          element: <UniversityDetailPage />
        },
        {
          path: "profile",
          element: <ProfilePage />
        },
        {
          path: "*",
          element: <Navigate to="/app/home" />
        }
      ],
    },
    {
      path: "/admin",
      element: (isAdmin && isAuth) ? <Dashboard /> : <Navigate to="/app/home" />,
      children: [
        {
          path: "analytics",
          element: <AnalyticsPage />
        },
        {
          path: "university-add",
          element: <UniversityAddPage />,
        },
        {
          path: "universities",
          element: <UniversitiesPage />,
        },
        {
          path: "news-add",
          element: <NewsAddPage />,
        },
        {
          path: "news",
          element: <NewsPage />
        },
        {
          path: "users-all",
          element: <AllUsersPage />,
        },
        {
          path: "university/:id",
          element: <UniversityDetailPage />
        },
        {
          path: "*",
          element: <Navigate to="/admin/analytics" />
        }
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "*",
      element: <Navigate to={isAdmin ? "/admin/universities" : "/app/home"} />
    }
  ]);
}
