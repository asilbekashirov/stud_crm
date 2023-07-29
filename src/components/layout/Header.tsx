import { memo, useEffect } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import Tooltip from "../tooltip/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout, toggleSidebar } from "../../redux/store/app";
import Select from "../select/Select";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const languages = [
  { name: "En", value: "en" },
  { name: "Ru", value: "ru" },
  { name: "Uz", value: "uz" },
];

const Header = () => {
  const {
    isAuth,
    showSidebar,
    user: { role },
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const match = useMediaQuery("md");
  const {i18n} = useTranslation()

  useEffect(() => {
    toggle(true);
  }, [match]);

  const toggle = (state: boolean) => {
    dispatch(toggleSidebar(state));
  };

  const exitProfile = () => {
    dispatch(logout());
    navigate("/login");
  };
  const changeLocale = async (newData: string) => {
    await i18n.changeLanguage(newData)
  };

  return (
    <header className="flex justify-between fixed inset-0 w-full bg-primary-900 md:h-20 h-16 items-center px-2 md:p-5 z-50">
      <div className="logo cursor-pointer flex items-center">
        <div
          className="mr-2 block md:hidden cursor-pointer"
          onClick={() => toggle(!showSidebar)}
        >
          <Icon icon="gg:menu-motion" width={25} />
        </div>
        <h3 className="md:text-3xl text-xl text-secondary font-bold">
          <Link to="/dashboard/home">Mega Dream</Link>
        </h3>
      </div>
      <div className="tools flex items-center">
        <Tooltip text="Language" position="bottom">
          <div className={style.circle}>
            <Select
              hideIcon
              iterable={languages}
              onChange={changeLocale}
              initialValue={i18n.language}
              // text={
              //   <div className={style.circle}>
              //     <Icon width={25} icon="prime:language" />
              //   </div>
              // }
            />
          </div>
        </Tooltip>
        {isAuth && role !== "admin" ? (
          <>
            <Tooltip text="Messages" position="bottom">
              <div className={style.circle}>
                <Icon icon="mdi:message-processing-outline" />
              </div>
            </Tooltip>
            <Tooltip text="Notifications" position="bottom">
              <div className={style.circle}>
                <Icon icon="mdi:bell-badge-outline" />
              </div>
            </Tooltip>
            <Tooltip text="Profile" position="bottom">
              <div className={style.circle}>
                <Icon icon="mdi:account-badge-outline" />
              </div>
            </Tooltip>
            <Tooltip text="Logout" position="bottom">
              <div className={style.circle} onClick={exitProfile}>
                <Icon icon="iconamoon:arrow-right-4-square-duotone" />
              </div>
            </Tooltip>
          </>
        ) : role === "admin" ? (
          <Tooltip text="Logout" position="bottom">
            <div className={style.circle} onClick={exitProfile}>
              <Icon icon="iconamoon:arrow-right-4-square-duotone" />
            </div>
          </Tooltip>
        ) : (
          <Tooltip text="Login" position="bottom">
            <Link to="/login" className={style.circle}>
              <Icon icon="iconamoon:enter-duotone" />
            </Link>
          </Tooltip>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
