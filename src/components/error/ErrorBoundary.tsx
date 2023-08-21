import React from 'react'

interface IProps {
    fallback: React.ReactNode
    children: React.ReactNode
}

class ErrorBoundary extends React.Component<IProps> {
    state = {hasError: false};

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }

}

export default ErrorBoundary;