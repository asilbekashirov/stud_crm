import { FC } from "react";
import styles from './skeleton.module.css'

interface IProps {
    width?: number;
    height: number;
    className?: string;
}

const Skeleton: FC<IProps> = ({width, height, className}) => {
    return (
        <div className={["rounded-lg", className, styles.skeleton].join(" ")}>

        </div>
    )
}

export default Skeleton