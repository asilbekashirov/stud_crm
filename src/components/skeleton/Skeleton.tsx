import { FC } from "react";

interface IProps {
    width?: number;
    height: number;
}

const Skeleton: FC<IProps> = ({width, height}) => {
    return (
        <div className={`bg-slate-300 rounded-lg h-[${height}rem] ${width ? `w-[${width}rem]` : "w-full"}`}>

        </div>
    )
}

export default Skeleton