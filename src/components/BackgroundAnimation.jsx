import React from 'react';

export default function BackgroundAnimation() {
  return (
    <div className="ds-background-system" aria-hidden="true">
      {/* 1. Base dark obsidian surface */}
      <div className="ds-bg-base" />

      {/* 2. Developer engineering grid pattern */}
      <div className="ds-bg-grid" />

      {/* 3. Soft ambient radial violet/purple glows */}
      <div className="ds-bg-glow ds-glow-top-right" />
      <div className="ds-bg-glow ds-glow-center-hero" />
      <div className="ds-bg-glow ds-glow-bottom-left" />

      {/* 4. Subtle top light beam */}
      <div className="ds-bg-beam" />
    </div>
  );
}
