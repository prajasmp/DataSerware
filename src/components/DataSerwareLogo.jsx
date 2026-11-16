import React from 'react';

export default function DataSerwareLogo({ size = 36, showText = true, portalTag = '', className = '' }) {
  return (
    <div className={`dataserware-brand-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dataserware-logo-svg"
      >
        <defs>
          <linearGradient id="dsPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="dsPurpleBlade1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="dsPurpleBlade2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#d8b4fe" />
          </linearGradient>
          <filter id="dsPurpleNeonGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Shell */}
        <polygon
          points="50,6 88,27 88,73 50,94 12,73 12,27"
          fill="#0c071d"
          stroke="url(#dsPurpleGradient)"
          strokeWidth="3.5"
          filter="url(#dsPurpleNeonGlow)"
        />

        {/* Inner geometric accent ring */}
        <polygon
          points="50,14 80,31 80,69 50,86 20,69 20,31"
          fill="rgba(168, 85, 247, 0.08)"
          stroke="rgba(192, 132, 252, 0.35)"
          strokeWidth="1.2"
        />

        {/* High-Tech Server Blades Stack (Hardware Infrastructure) */}
        {/* Blade 1 (Top) */}
        <rect x="27" y="30" width="46" height="9" rx="2.5" fill="#1e1038" stroke="url(#dsPurpleBlade1)" strokeWidth="1.2" />
        <circle cx="34" cy="34.5" r="1.8" fill="#c084fc" filter="url(#dsPurpleNeonGlow)" />
        <circle cx="40" cy="34.5" r="1.5" fill="#e9d5ff" />
        <line x1="47" y1="34.5" x2="66" y2="34.5" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Blade 2 (Middle Active) */}
        <rect x="27" y="44" width="46" height="9" rx="2.5" fill="#2b1552" stroke="#c084fc" strokeWidth="1.6" filter="url(#dsPurpleNeonGlow)" />
        <circle cx="34" cy="48.5" r="1.8" fill="#10b981" filter="url(#dsPurpleNeonGlow)" />
        <circle cx="40" cy="48.5" r="1.5" fill="#c084fc" />
        <line x1="47" y1="48.5" x2="66" y2="48.5" stroke="#d8b4fe" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Blade 3 (Bottom) */}
        <rect x="27" y="58" width="46" height="9" rx="2.5" fill="#1e1038" stroke="url(#dsPurpleBlade2)" strokeWidth="1.2" />
        <circle cx="34" cy="62.5" r="1.8" fill="#818cf8" />
        <circle cx="40" cy="62.5" r="1.5" fill="#c084fc" />
        <line x1="47" y1="62.5" x2="66" y2="62.5" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Corner Micro Nodes */}
        <circle cx="50" cy="8" r="2.2" fill="#c084fc" />
        <circle cx="88" cy="27" r="2.2" fill="#c084fc" />
        <circle cx="88" cy="73" r="2.2" fill="#c084fc" />
        <circle cx="50" cy="92" r="2.2" fill="#c084fc" />
        <circle cx="12" cy="73" r="2.2" fill="#c084fc" />
        <circle cx="12" cy="27" r="2.2" fill="#c084fc" />
      </svg>

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
            ENTERPRISE CLOUD &amp; GAME SERVERS
          </span>
        </div>
      )}
    </div>
  );
}
