// import { user } from "@/demo/account";
import {
  IMenuItem,
  adminSidebar,
  adminSidebar2,
  sidebar,
} from "../../demo/sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Icon } from "@iconify/react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { FC, memo } from "react";
import { toggleSidebar } from "../../redux/store/app";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { useToggle } from "../../hooks/useToggle";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
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
      className={`md:flex fixed h-screen w-64 z-50 transition-transform ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        onClick={() => dispatch(toggleSidebar(false))}
        className={`block absolute ${
          showSidebar ? "block" : "hidden"
        } md:hidden top-0 left-0 w-screen h-screen z-20 bg-gradient-to-r from-transparent to-slate-800`}
      >
        {/* gradient-layer  */}
      </div>
      <div
        className={[
          "flex flex-col z-40 w-full relative h-screen bg-primary-900 p-3",
          styles.sidebar,
        ].join(" ")}
      >
        <div className="cursor-pointer flex items-center">
          <div
            className="mr-2 block md:hidden cursor-pointer"
            onClick={() => toggle(!showSidebar)}
          >
            <Icon icon="gg:menu-motion" width={25} />
          </div>
          <h3 className="md:text-3xl text-text-900 text-xl text-center w-full mt-4 font-bold">
            <Link to="/dashboard/home">Mega Dream</Link>
          </h3>
        </div>
        {isAuth ? (
          <h4 className="text-xl text-primary-700 font-bold text-center mt-4">
            Welcome back, <br /> {fullName}
          </h4>
        ) : (
          <p className="text-center text-lg mt-4">
            Please, authorize to get access to all sections
          </p>
        )}

        <ul className="flex flex-col mt-4">
          {role === "admin"
            ? adminSidebar2.map((menubar) => (
                <MenuItem key={menubar.name} {...menubar} prefix="admin" />
              ))
            : sidebar.map((menubar) => (
                <MenuItem key={menubar.name} {...menubar} prefix="dashboard" />
              ))}
        </ul>
      </div>
    </aside>
  );
};

interface IMenuItemProps extends IMenuItem {
  prefix: "dashboard" | "admin";
}

const MenuItem: FC<IMenuItemProps> = ({
  route,
  icon,
  name,
  prefix,
  children,
}) => {
  const { t } = useTranslation();
  const open = useToggle(false);
  const location = useLocation();

  const isActive = (pathname: string): boolean => {
    return location.pathname === `/${prefix}/${pathname}`;
  };

  return children?.length ? (
    <li className={`cursor-pointer flex flex-col mt-1 text-primary-700`}>
      <div
        className="flex items-center justify-between p-2 hover:bg-primary-600 transition-colors rounded-xl"
        onClick={() => open.toggle()}
      >
        <div className="flex items-center">
          <div className="p-1 mr-4">
            <Icon width={25} icon={icon} className={`text-inherit`} />
          </div>{" "}
          {t(`sidebar.${name}`)}
        </div>
        <div
          className={`transition-transform ${
            open.state ? "rotate-90" : "rotate-0"
          }`}
        >
          <Icon
            width={20}
            icon="iconamoon:arrow-right-2-duotone"
            className={`text-inherit`}
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open.state && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children.map((child) => (
              <motion.div
                variants={{ collapsed: { scale: 0.9 }, open: { scale: 1 } }}
                transition={{ duration: 0.8 }}
                key={child.route}
              >
                <Link
                  className={`flex items-center p-2 pl-6 hover:bg-primary-600 transition-colors rounded-xl ${
                    isActive(child.route as string) ? "text-secondary-700" : ""
                  }`}
                  to={`/${prefix}/${child.route}${child.params || ""}`}
                >
                  <div className="p-1 mr-4">
                    <Icon
                      width={25}
                      icon={child.icon}
                      className={`text-inherit`}
                    />
                  </div>{" "}
                  {t(`sidebar.${child.name}`)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  ) : (
    <li
      className={`rounded-xl hover:bg-primary-600 mt-1 ${
        isActive(route as string)
          ? "bg-secondary-600 text-secondary-700"
          : "text-primary-700"
      }`}
      key={route}
    >
      <Link className="flex items-center p-2" to={`/${prefix}/${route}`}>
        <div className="p-1 mr-4">
          <Icon width={25} icon={icon} className={`text-inherit`} />
        </div>{" "}
        {t(`sidebar.${name}`)}
      </Link>
    </li>
  );
};

export default memo(Sidebar);
