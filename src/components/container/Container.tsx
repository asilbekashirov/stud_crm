import { FC } from "react"

interface IProps {
    className?: string
    children?: React.ReactNode
}

const Container: FC<IProps> = ({className, children}) => {
    return (
        <section className={["w-4/5 m-auto", className].join(" ")}>
            {children}
        </section>
    )
}

export default Container