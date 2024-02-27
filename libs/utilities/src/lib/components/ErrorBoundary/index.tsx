import React from "react";
import ErrorPageDesign from "./ErrorPageDesign";

type ReactProps = {
  children: React.ReactNode;
};

type ReactState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ReactProps, ReactState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError = false } = this.state;
    return <>{hasError ? <ErrorPageDesign /> : this.props.children}</>;
  }
}
export default ErrorBoundary;
