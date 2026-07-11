/* eslint-disable react/prop-types -- this project doesn't use prop-types; children is the only prop */
import { Component } from 'react';

// Catches errors thrown while rendering the lazy route tree — most importantly a
// dynamic import() that rejected after lazyWithReload already spent its one reload
// (see src/lib/lazyWithReload.js). Without this, a stale-chunk failure is an
// unhandled error and the user just sees a white screen. Here we show a small,
// on-brand "we've updated" panel with a manual reload as the last resort.
//
// It also catches any other render error in a page component, so a single broken
// route can't blank the whole app.

const wrap = {
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 14,
  textAlign: 'center',
  padding: '0 24px',
  fontFamily: 'var(--font-sans)',
  color: 'var(--ink-500)',
};

class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Surface it for monitoring; this is the path that means a chunk stayed
    // unreachable even after the auto-reload.
    console.error('Route failed to load:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={wrap}>
        <div style={{ fontSize: 16, color: 'var(--navy-900)', fontWeight: 600 }}>
          This page didn’t load.
        </div>
        <div style={{ fontSize: 13.5, maxWidth: 420 }}>
          The site was likely updated while you were here. Reloading should fix it.
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }
}

export default ChunkErrorBoundary;
