import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, CreditCard, Terminal, Sparkles } from 'lucide-react';

export default function PortalSwitcherBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // Determine current portal
  const isPanel = path.startsWith('/panel');
  const isBilling = path.startsWith('/billing') || path.startsWith('/client') || path.startsWith('/checkout');
  const isMain = !isPanel && !isBilling;

  const portals = [
    {
      id: 'main',
      name: 'Main Website',
      shortName: 'Website',
      subdomain: 'dataserware.com',
      path: '/',
      icon: Globe,
      color: '#c084fc',
      active: isMain,
      description: 'Plans, specs, locations & hardware highlights'
    },
    {
      id: 'billing',
      name: 'Client Area & Billing',
      shortName: 'Client Area',
      subdomain: 'client.dataserware.com',
      path: '/billing',
      icon: CreditCard,
      color: '#a855f7',
      active: isBilling,
      description: 'Storefront, cart, invoices & support tickets'
    },
    {
      id: 'panel',
      name: 'Control Panel',
      shortName: 'Panel',
      subdomain: 'panel.dataserware.com',
      path: '/panel',
      icon: Terminal,
      color: '#34d399',
      active: isPanel,
      description: 'Pterodactyl-style live console, power & files'
    }
  ];

  return (
    <div className="ds-portal-switcher-wrapper">
      <div className="container ds-portal-switcher-inner">
        <div className="ds-portal-left">
          <span className="ds-eco-badge">
            <Sparkles size={12} className="ds-pulse-icon" />
            <span className="ds-eco-text">ECOSYSTEM</span>
          </span>
          <span className="ds-portal-label">Data Serware Portals:</span>
        </div>

        <div className="ds-portal-pills">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => navigate(portal.path)}
                className={`ds-portal-pill ${portal.active ? 'active' : ''}`}
                style={{
                  '--portal-color': portal.color
                }}
                title={`Switch to ${portal.name} (${portal.subdomain})`}
              >
                <Icon size={13} className="ds-portal-icon" />
                <span className="ds-portal-pill-name">{portal.shortName}</span>
                <span className="ds-portal-pill-domain">{portal.subdomain}</span>
                {portal.active && <span className="ds-portal-pill-indicator">●</span>}
              </button>
            );
          })}
        </div>

        <div className="ds-portal-right">
          <span className="ds-active-tag">
            Active: <strong>{isPanel ? 'panel.dataserware.com' : isBilling ? 'client.dataserware.com' : 'dataserware.com'}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
