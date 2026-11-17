import React from 'react';

export default function DataSerwareLogo({ size = 32, showText = true, portalTag = '', className = '' }) {
  return (
    <div className={`dataserware-brand-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <div
        className="dataserware-logo-emblem-wrap"
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <img
          src="/assets/dataserware-logo.png"
          alt="DataSerware Logo"
          width={size}
          height={size}
          className="dataserware-logo-img"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            border: '1.5px solid rgba(168, 85, 247, 0.45)',
            boxShadow: '0 0 12px rgba(168, 85, 247, 0.3)'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="dataserware-text-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1 }}>
          <span
            style={{
              fontSize: `${Math.round(size * 0.58)}px`,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            DataSerware
          </span>

          {portalTag && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                padding: '2px 7px',
                borderRadius: '6px',
                background: 'rgba(168, 85, 247, 0.15)',
                color: '#c084fc',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                textTransform: 'uppercase'
              }}
            >
              {portalTag}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
