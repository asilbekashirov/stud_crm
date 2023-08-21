import { FC } from "react"

interface IProps {
    error: any
    resetErrorBoundary: any
}

const MainErrorBoundary= () => {
    return (
        <div>
            error occured!
        </div>
    )
}

export default MainErrorBoundary