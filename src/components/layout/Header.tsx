import { memo } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import Tooltip from "../tooltip/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../redux/store/app";
import Select from "../select/Select";

const languages = [
  {name: "En", value: "en"},
  {name: "Ru", value: "ru"},
  {name: "Uz", value: "uz"},
]

const Header = () => {
  const {
    isAuth,
    user: { role },
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exitProfile = () => {
    dispatch(logout());
    navigate("/login");
  };

  const changeLocale = (e: React.ChangeEvent) => {
    
  };

  return (
    <header className="flex justify-between z-10 fixed inset-0 w-full bg-primary-900 h-20 items-center p-5">
      <div className="logo cursor-pointer">
        <h3 className="text-3xl text-secondary font-bold">
          <Link to="/dashboard/home">Mega Dream</Link>
        </h3>
      </div>
      <div className="tools flex items-center">
        <Tooltip text="Language" position="bottom">
          <Select
            hideIcon
            iterable={languages}
            onChange={changeLocale}
            text={
              <div className={style.circle}>
                <Icon width={25} icon="prime:language" />
              </div>
            }
          />
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
