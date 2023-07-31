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
  { name: "En", value: "en", icon: "flag:gb-4x3" },
  { name: "Ru", value: "ru", icon: "flag:ru-4x3" },
  { name: "Uz", value: "uz", icon: "flag:uz-4x3" },
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
    <header className="flex justify-end fixed inset-0 bg-primary-900 md:h-20 h-16 items-center px-2 md:p-5 z-50">
      
      <div className="tools flex items-center gap-3">
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
              <div className={style.circle} onClick={exitProfile} >
                <Icon icon="iconamoon:arrow-right-4-square-duotone" width={30} />
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
          <Tooltip text="Login" position="bottom" >
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
