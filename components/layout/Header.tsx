import { memo } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import Tooltip from "../tooltip/Tooltip";

const Header = () => {
  return (
    <header className="flex justify-between fixed inset-0 w-full bg-slate-300 h-20 items-center p-5">
      <div className="logo cursor-pointer">
        <h3 className="text-2xl">Mega Dream</h3>
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
