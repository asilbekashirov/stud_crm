import { FC } from "react"

interface IProps {
    children: React.ReactNode
    className?: string 
}

const Card:FC<IProps> = ({children, className = ""}) => {
    return (
        <div className={`bg-primary-800 p-2 rounded-2xl shadow-[0_0_10px_3px_rgba(0,0,0,0.3)] ${className}`}>
            {children}
        </div>
    )
}

export default Card