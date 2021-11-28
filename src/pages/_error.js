import * as React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Center from "components/Center";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.props.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            App Crashed{" "}
            <span role="img" aria-label="boom">
              💥
            </span>
          </Typography>
          <Typography variant="caption" sx={{ display: "block" }}>
            Message: {this.state.error}
          </Typography>
          <Button component="a" href="/" variant="outlined" sx={{ mt: 2 }}>
            Take me home
          </Button>
        </Center>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  log: (error, errorInfo) => console.error(error, errorInfo)
};

ErrorBoundary.propTypes = {
  log: PropTypes.func
};

export default ErrorBoundary;
