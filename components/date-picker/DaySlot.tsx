import { FC } from "react";

interface IProps {
    day: string
    interactive: boolean
    selected?: boolean
}

const DaySlot: FC<IProps> = ({day, interactive, selected}) => {
    return (
        <div className={`rounded-full p-2 transition-colors text-center w-10 h-10 ${interactive ? "hover:bg-slate-200 cursor-pointer" : "cursor-default"} ${selected ? "bg-slate-200" : ""}`}>
            {day}
        </div>
    )
}

export default DaySlot;