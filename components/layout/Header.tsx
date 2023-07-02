import { memo } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import Tooltip from "../tooltip/Tooltip";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { appSlice } from "@/redux/store/app";
import { useRouter } from "next/router";

const Header = () => {
  const isAuth = useAppSelector((state) => state.app.isAuth);
  const dispatch = useAppDispatch()
  const router = useRouter()

  const exitProfile = () => {
    dispatch(appSlice.actions.logout())
    router.push("/login")
  }

  return (
    <header className="flex justify-between z-10 fixed inset-0 w-full bg-primary-900 h-20 items-center p-5">
      <div className="logo cursor-pointer">
        <h3 className="text-3xl text-secondary font-bold">
          <Link href="/dashboard/home">Mega Dream</Link>
        </h3>
      </div>
      <div className="tools flex">
        {isAuth ? (
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
        ) : (
          <Tooltip text="Login" position="bottom">
            <Link href="/login" className={style.circle}>
              <Icon icon="iconamoon:enter-duotone" />
            </Link>
          </Tooltip>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
