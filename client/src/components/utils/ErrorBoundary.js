import React, { Component } from "react";
import { Card } from "@blueprintjs/core";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error, componentTrace) {
    this.setState({ error, componentTrace });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <Card>
          <p>Something went wrong!</p>
          <code>{error.message}</code>
          <code>{error.stack}</code>
        </Card>
      );
    }

    return children;
  }
}
