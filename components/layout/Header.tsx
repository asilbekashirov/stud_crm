import { memo } from "react"
import style from'./style.module.css';

const Header = () => {
    return (
        <header className="flex justify-between absolute inset-0 w-full bg-slate-300 h-20 items-center p-5">
            <div className="logo cursor-pointer">
                <h3 className="text-2xl">Mega Dream</h3>
            </div>
            <div className="tools flex">
                <div className={style.circle}>

                </div>
                <div className={style.circle}>

                </div>
                <div className={style.circle}>

                </div>
                <div className={style.circle}>
                    
                </div>
            </div>
        </header>
    )
}

export default memo(Header)