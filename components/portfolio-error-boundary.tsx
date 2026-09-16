'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class PortfolioErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio interactive section failed to render.', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section error-fallback" role="alert">
          <p className="eyebrow">Temporary display issue</p>
          <h2>The interactive view could not load.</h2>
          <p>You can still review Emmanuel’s work on GitHub or contact him directly by email.</p>
          <div className="button-row">
            <a className="button button-primary" href="https://github.com/ProgJosh">View GitHub</a>
            <a className="button button-secondary" href="mailto:velojoshemmanuel30@gmail.com">Send email</a>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
