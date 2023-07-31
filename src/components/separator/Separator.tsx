import { FC, memo } from "react";
import styles from './separator.module.css'

interface IProps {
    direction: "horizontal" | "vertical"
    className?: string
}

const Separator: FC<IProps> = ({direction, className = ""}) => {

    const isHorizontal = direction === "horizontal";

    return (
        <div className={`${isHorizontal ? styles.horizontal : styles.vertical } ${className}`}></div>
    )
}

export default memo(Separator);