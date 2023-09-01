import { FC } from "react";
import styles from './skeleton.module.css'

interface IProps {
    className?: string;
}

const Skeleton: FC<IProps> = ({className}) => {
    return (
        <div className={["rounded-lg", className, styles.skeleton].join(" ")}>

        </div>
    )
}

export default Skeleton