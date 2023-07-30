import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import SearchPage from "./pages/dashboard/search";
import ProgramsPage from "./pages/dashboard/programs";
import HomePage from "./pages/dashboard/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UniversityAddPage from "./pages/admin/university-add";
import UniversitiesPage from "./pages/admin/universities";
import NewsAddPage from "./pages/admin/news-add";
import UniversityDetailPage from "./pages/dashboard/uniById";
import NewsPage from "./pages/admin/news";
import AllUsersPage from "./pages/admin/users-all";

interface IProps {
  isAuth: boolean;
  isAdmin: boolean;
}

export default function Router({ isAuth, isAdmin }: IProps) {

  return useRoutes([
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "search",
          element: <SearchPage />,
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
        }
      ],
    },
    {
      path: "/admin",
      element: (isAdmin && isAuth) ? <Dashboard /> : <Navigate to="/dashboard" />,
      children: [
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
      element: <Navigate to={isAdmin ? "/admin/universities" : "/dashboard/home"} />
    }
  ]);
}
