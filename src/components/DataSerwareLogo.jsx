import React from 'react';

export default function DataSerwareLogo({ size = 36, showText = true, portalTag = '', className = '' }) {
  return (
    <div className={`dataserware-brand-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
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
          alt="Data Serware Logo"
          width={size}
          height={size}
          className="dataserware-logo-img"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.55), 0 0 30px rgba(192, 132, 252, 0.25)',
            border: '2px solid rgba(192, 132, 252, 0.65)'
          }}
          onError={(e) => {
            // Fallback gracefully if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="dataserware-text-wrapper" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', letterSpacing: '0.06em' }}>
            <span style={{ fontSize: size * 0.52, fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>DATA</span>
            <span style={{ fontSize: size * 0.52, fontWeight: 900, background: 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Outfit, sans-serif' }}>SERWARE</span>
            {portalTag && (
              <span style={{
                marginLeft: '6px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '2px 7px',
                borderRadius: '4px',
                background: 'rgba(168, 85, 247, 0.16)',
                color: '#c084fc',
                border: '1px solid rgba(192, 132, 252, 0.4)',
                textTransform: 'uppercase'
              }}>
                {portalTag}
              </span>
            )}
          </div>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#c084fc', textTransform: 'uppercase', opacity: 0.9 }}>
            HOST • BUILD • GROW
          </span>
        </div>
      )}
    </div>
  );
}
