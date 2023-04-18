import { FC } from "react";

interface IProps {
    completed: boolean
    text: string
    index: number
}

const TodoItem: FC<IProps> = ({completed, text, index}) => {
    return (
        <div className={`w-full flex text-md mt-1 ${completed ? 'pacity-70' : ''}`}>
            <h6 className="font-semibold mr-2">{index+1}.</h6>
            <input type="checkbox" checked={completed} readOnly id={text} />
            <label className={`${completed ? 'line-through' : ''}`} htmlFor={text}>{text}</label>
        </div>
    )
}

export default TodoItem;