// import { user } from "@/demo/account";
import { IMenuItem, adminSidebar, sidebar } from "../../demo/sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { FC, memo } from "react";
import { toggleSidebar } from "../../redux/store/app";

const Sidebar = () => {
  const location = useLocation();
  const { showSidebar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const {
    user: { fullName, role },
    isAuth,
  } = useAppSelector((state) => state.app);

  return (
    <aside
      className={`md:flex fixed md:pt-20 pt-16 h-screen w-64 z-40 transition-transform ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div onClick={() => dispatch(toggleSidebar(false))} className={`block absolute ${showSidebar ? "block" : "hidden"} md:hidden top-0 left-0 w-screen h-screen z-20 bg-gradient-to-r from-transparent to-slate-800`}></div>
      <div className="flex flex-col z-40 w-full relative h-screen bg-primary-900 p-3">
        {isAuth ? (
          <h4 className="text-xl text-gray-800 font-bold text-center mt-4 text-secondary">
            Welcome back, <br /> {fullName}
          </h4>
        ) : (
          <p className="text-center text-lg">
            Please, authorize to get access to all sections
          </p>
        )}

        <ul className="flex flex-col mt-4">
          {role === "admin"
            ? adminSidebar.map((menubar) => (
                <MenuItem
                  key={menubar.name}
                  {...menubar}
                  prefix="admin"
                  isActive={location.pathname === `/admin/${menubar.route}`}
                />
              ))
            : sidebar.map((menubar) => (
                <MenuItem
                  key={menubar.name}
                  {...menubar}
                  prefix="dashboard"
                  isActive={location.pathname === `/dashboard/${menubar.route}`}
                />
              ))}
        </ul>
      </div>
    </aside>
  );
};

interface IMenuItemProps extends IMenuItem {
  isActive: boolean;
  prefix: "dashboard" | "admin";
}

const MenuItem: FC<IMenuItemProps> = ({
  route,
  icon,
  name,
  isActive,
  prefix,
}) => {
  return (
    <li
      className={`rounded-lg hover:bg-primary-1000 hover:text-gray-100 mt-1 ${
        isActive ? "bg-primary-1000 text-gray-100" : "text-gray-600"
      }`}
      key={route}
    >
      <Link
        className="flex items-center text-lg p-2"
        to={`/${prefix}/${route}`}
      >
        <div className="p-1 mr-2 rounded-xl bg-slate-100 text-slate-800">
          <Icon width={25} icon={icon} />
        </div>{" "}
        {name}
      </Link>
    </li>
  );
};

export default memo(Sidebar);
