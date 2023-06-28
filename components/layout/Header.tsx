import { memo } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import Tooltip from "../tooltip/Tooltip";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between z-10 fixed inset-0 w-full bg-primary-900 h-20 items-center p-5">
      <div className="logo cursor-pointer">
        <h3 className="text-3xl text-secondary font-bold"><Link href="/dashboard/home">Mega Dream</Link></h3>
      </div>
      <div className="tools flex">
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
      </div>
    </header>
  );
};

export default memo(Header);
