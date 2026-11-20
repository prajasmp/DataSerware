import React from 'react';
import { Link } from 'react-router-dom';
import DataSerwareLogo from './DataSerwareLogo';
import { ShieldCheck, Zap, Headphones, PackageCheck, Globe, Lock, Terminal, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer dataserware-footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="brand" style={{ marginBottom: '1rem' }}>
            <DataSerwareLogo size={32} showText={true} />
          </div>
          <p className="footer-desc" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px' }}>
            Enterprise cloud and game server ecosystem. High-performance AMD Ryzen™ 9 7950X bare metal, Gen4 NVMe Cloud VPS, and automated deployment with 1.2 Tbps DDoS protection.
          </p>
          <div className="footer-security-badges" style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <Lock size={12} /> Enterprise Encryption
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#d8b4fe', background: 'rgba(192, 132, 252, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
              <Zap size={12} /> Instant 60s Provisioning
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Hosting Solutions</h4>
          <Link to="/plans">Game &amp; Cloud Servers</Link>
          <Link to="/vps">High-Performance Cloud VPS</Link>
          <Link to="/plans/bot-hosting">Discord Bot Hosting</Link>
          <a href="https://dsc.gg/dataserware" target="_blank" rel="noopener noreferrer">Instant Discord Orders</a>
        </div>

        <div className="footer-col">
          <h4>Services &amp; Links</h4>
          <Link to="/" style={{ color: '#cbd5e1' }}>
            <Globe size={13} style={{ display: 'inline', marginRight: '6px', color: '#c084fc' }} />
            Main Website (dataserware.com)
          </Link>
          <a href="https://panel.dataserware.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#c084fc', fontWeight: 600 }}>
            <Terminal size={13} style={{ display: 'inline', marginRight: '6px', color: '#c084fc' }} />
            Control Panel (panel.dataserware.com)
          </a>
          <a href="https://dsc.gg/dataserware" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', fontWeight: 600 }}>
            <Zap size={13} style={{ display: 'inline', marginRight: '6px', color: '#a78bfa' }} />
            Discord Community
          </a>
          <Link to="/track-order" style={{ color: '#c084fc' }}>
            <PackageCheck size={13} style={{ display: 'inline', marginRight: '6px' }} />
            Track Order Status
          </Link>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="/contact">24/7 Technical Support</Link>
          <a href="https://dsc.gg/dataserware" target="_blank" rel="noopener noreferrer">
            Discord Community
          </a>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/refund-policy">Refund Policy</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
            Nodes: Mumbai (IN), Singapore (SG), Frankfurt (DE), Virginia (US), London (UK)
          </div>
        </div>
      </div>

      <div className="copyright container" style={{ borderTop: '1px solid rgba(168, 85, 247, 0.15)', paddingTop: '1.5rem', marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
        <div>
          &copy; {new Date().getFullYear()} Data Serware. All rights reserved. Enterprise Cloud Infrastructure.
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>AMD EPYC &amp; Ryzen 9</span>
          <span>&bull;</span>
          <span>Pterodactyl &amp; KVM</span>
          <span>&bull;</span>
          <span>99.9% Uptime SLA</span>
        </div>
      </div>
    </footer>
  );
}
