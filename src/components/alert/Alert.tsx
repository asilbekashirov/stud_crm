import ModalPortal from "../modal/ModalPortal";
import { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import styles from "./alert.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { hideAlert } from "../../redux/store/app";

const alertColors = {
  warning: "bg-orange-400",
  error: "bg-orange-400",
  info: "bg-blue-400",
  success: "bg-green-400",
};

const alertBarColors = {
  warning: "bg-orange-600",
  error: "bg-orange-600",
  info: "bg-blue-600",
  success: "bg-green-600",
};

const Alert = () => {
  const { show, type, text } = useAppSelector((state) => state.app.alert);
  const dispatch = useAppDispatch()

  const color = useMemo(() => alertColors[type], [type]);
  const barColor = useMemo(() => alertBarColors[type], [type]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (show) {
      timerId = setTimeout(() => dispatch(hideAlert()), 3000);
    }

    return () => clearTimeout(timerId);
  }, [show]);

  if (!show) return null

  return (
    <ModalPortal>
      <div
        className={`absolute top-4 left-4 rounded-lg ${color} z-50 max-w-xl min-w-[25rem]`}
      >
        <div className="p-4 relative flex flex-col">
          <div
            className="absolute cursor-pointer top-2 p-2 right-2"
            onClick={() => dispatch(hideAlert())}
          >
            <Icon width={30} icon="iconamoon:sign-times-circle-duotone" />
          </div>
          <h5 className="text-2xl">{type.toUpperCase()}</h5>
          <p className="mt-2">
            {text}
          </p>
        </div>
        <div className={[styles.alert_bar, `rounded-b-lg ${barColor} opacity-50`].join(" ")}></div>
      </div>
    </ModalPortal>
  );
};

export default Alert;
