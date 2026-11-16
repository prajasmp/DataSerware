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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#00f2fe', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
              <Lock size={12} /> Enterprise Encryption
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
              <Zap size={12} /> Instant 60s Provisioning
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Hosting Solutions</h4>
          <Link to="/web-hosting" style={{ color: '#00f2fe', fontWeight: 600 }}>cPanel Web Hosting</Link>
          <Link to="/vds-machines" style={{ color: '#00f2fe', fontWeight: 600 }}>VDS Bare-Metal Machines</Link>
          <Link to="/plans">Minecraft Game Servers</Link>
          <Link to="/plans">AMD Ryzen Ultra VPS</Link>
          <Link to="/plans">Discord Bot Hosting</Link>
          <Link to="/plans">Dedicated RDP Servers</Link>
        </div>

        <div className="footer-col">
          <h4>Connected Portals</h4>
          <Link to="/" style={{ color: '#cbd5e1' }}>
            <Globe size={13} style={{ display: 'inline', marginRight: '6px', color: '#00f2fe' }} />
            Main Website (dataserware.com)
          </Link>
          <Link to="/billing" style={{ color: '#38bdf8', fontWeight: 600 }}>
            <CreditCard size={13} style={{ display: 'inline', marginRight: '6px', color: '#38bdf8' }} />
            Client Area &amp; Billing Portal
          </Link>
          <Link to="/panel" style={{ color: '#34d399', fontWeight: 600 }}>
            <Terminal size={13} style={{ display: 'inline', marginRight: '6px', color: '#10b981' }} />
            Game &amp; Server Control Panel
          </Link>
          <Link to="/track-order" style={{ color: '#00f2fe' }}>
            <PackageCheck size={13} style={{ display: 'inline', marginRight: '6px' }} />
            Track Order Status
          </Link>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="/contact">24/7 Technical Support</Link>
          <a href="https://discord.gg/dataserware" target="_blank" rel="noopener noreferrer">
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

      <div className="copyright container" style={{ borderTop: '1px solid rgba(6, 182, 212, 0.12)', paddingTop: '1.5rem', marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
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
