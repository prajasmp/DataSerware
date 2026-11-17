import React from 'react';

export default function BackgroundAnimation() {
  return (
    <div className="ds-background-system" aria-hidden="true">
      {/* 1. Flat dark matte obsidian surface */}
      <div className="ds-bg-base" />

      {/* 2. Very faint, crisp engineering grid */}
      <div className="ds-bg-grid" />
    </div>
  );
}
