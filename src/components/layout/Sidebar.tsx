// import { user } from "@/demo/account";
import { IMenuItem, adminSidebar, sidebar } from "../../demo/sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { FC, memo } from "react";
import { toggleSidebar } from "../../redux/store/app";
import styles from "./style.module.css";

const Sidebar = () => {
  const location = useLocation();
  const { showSidebar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const {
    user: { fullName, role },
    isAuth,
  } = useAppSelector((state) => state.app);

  const toggle = (state: boolean) => {
    dispatch(toggleSidebar(state));
  };

  return (
    <aside
      className={`md:flex fixed h-screen w-64 z-50 transition-transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div
        onClick={() => dispatch(toggleSidebar(false))}
        className={`block absolute ${
          showSidebar ? "block" : "hidden"
        } md:hidden top-0 left-0 w-screen h-screen z-20 bg-gradient-to-r from-transparent to-slate-800`}
      >
        {/* gradient-layer  */}
      </div>
      <div className={["flex flex-col z-40 w-full relative h-screen bg-primary-900 p-3", styles.sidebar].join(" ")}>
        <div className="cursor-pointer flex items-center">
          <div
            className="mr-2 block md:hidden cursor-pointer"
            onClick={() => toggle(!showSidebar)}
          >
            <Icon icon="gg:menu-motion" width={25} />
          </div>
          <h3 className="md:text-3xl text-text-900 text-xl font-bold">
            <Link to="/dashboard/home">Mega Dream</Link>
          </h3>
        </div>
        {isAuth ? (
          <h4 className="text-xl text-primary-700 font-bold text-center mt-4">
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
      className={`rounded-xl hover:bg-secondary-600 hover:text-secondary-700 mt-1 ${
        isActive ? "bg-secondary-600 text-secondary-700" : "text-primary-700"
      }`}
      key={route}
    >
      <Link
        className="flex items-center p-2"
        to={`/${prefix}/${route}`}
      >
        <div className="p-1 mr-4 rounded-x">
          <Icon width={25} icon={icon} className={`text-inherit`} />
        </div>{" "}
        {name}
      </Link>
    </li>
  );
};

export default memo(Sidebar);
