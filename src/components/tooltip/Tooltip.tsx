import { useToggle } from "../../hooks/useToggle";
import { FC, ReactNode } from "react";
import styles from './tooltip.module.css'

interface IProps {
    children: ReactNode
    text: string
    position: "top" | "bottom"
}

const Tooltip: FC<IProps> = ({children, text, position}) => {

    const show = useToggle(false)

    const handleMouseEnter = () => show.on()
    const handleMouseLeave = () => show.off()

    return (
        <div onMouseLeave={handleMouseLeave} className={styles.tooltip}>
            {
                show.state && (
                    <p className={[styles.tooltip_text, styles[position]].join(' ')}>{text}</p>
                )
            }
            <div onMouseEnter={handleMouseEnter}>
                {children}
            </div>
        </div>
    )
}

export default Tooltip;