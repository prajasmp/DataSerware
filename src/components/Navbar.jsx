import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import DataSerwareLogo from './DataSerwareLogo';
import {
  Menu, X, Home, Package, Server, Globe, Headphones,
  ChevronDown, LayoutGrid, CreditCard, Terminal, ExternalLink,
  ShieldCheck, LogOut, Copy, Check, Sparkles, Flame, ArrowRight,
  Monitor, Bot, Cpu, User, Shield
} from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dropdown states
  const [servicesOpen, setServicesOpen] = useState(false);
  const [vpsOpen, setVpsOpen] = useState(false);
  const [dedicatedOpen, setDedicatedOpen] = useState(false);
  const [panelsOpen, setPanelsOpen] = useState(false);

  const servicesTimer = useRef(null);
  const vpsTimer = useRef(null);
  const dedicatedTimer = useRef(null);
  const panelsTimer = useRef(null);

  const { user, loginWithGoogle, logout, isAdmin, authLoading } = useAuth();
  const { currency, toggleCurrency } = useCurrency();
  const navigate = useNavigate();

  // Copy promo code
  const handleCopyCode = () => {
    navigator.clipboard.writeText('dataserware10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const closeAllDropdowns = () => {
    setServicesOpen(false);
    setVpsOpen(false);
    setDedicatedOpen(false);
    setPanelsOpen(false);
    setMobileOpen(false);
  };

  return (
    <div className="ds-header-master-wrapper">
      {/* 1. TOP ANNOUNCEMENT / PROMO BANNER */}
      {showOfferBanner && (
        <div className="ds-top-offer-bar">
          <div className="ds-offer-inner container">
            <div className="ds-offer-left">
              <span className="ds-offer-tag">
                <Flame size={13} className="ds-flame-icon" />
                <span>OFFER</span>
              </span>
              <span className="ds-offer-text">
                Get <strong className="ds-highlight">10% OFF</strong> on Premium Plans with code
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="ds-promo-code-btn"
                title="Click to copy coupon code"
              >
                <span>dataserware10</span>
                {copiedCode ? <Check size={12} className="ds-copied-icon" /> : <Copy size={12} />}
              </button>
            </div>

            <div className="ds-offer-right">
              <a
                href="https://dsc.gg/dataserware"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-claim-btn"
              >
                <span>Join Discord &amp; Get Instantly</span>
                <ArrowRight size={13} />
              </a>
              <button
                type="button"
                className="ds-offer-close-btn"
                onClick={() => setShowOfferBanner(false)}
                aria-label="Close promotion banner"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING ISLAND NAVBAR */}
      <div className="ds-navbar-wrapper">
        <header className="ds-island-navbar container">
          {/* Logo brand */}
          <Link to="/" className="ds-brand-wrap" onClick={closeAllDropdowns}>
            <DataSerwareLogo size={32} showText={true} />
          </Link>

          {/* Mobile hamburger button */}
          <button
            className="ds-mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation Links: Keep Only Server, VPS, Bot Hosting */}
          <nav className={`ds-nav-links ${mobileOpen ? 'ds-mobile-open' : ''}`}>
            {/* Home */}
            <NavLink
              to="/"
              end
              onClick={closeAllDropdowns}
              className={({ isActive }) => `ds-nav-pill ${isActive ? 'active' : ''}`}
            >
              <Home size={15} className="ds-pill-icon" />
              <span>Home</span>
            </NavLink>

            {/* Game / Cloud Servers */}
            <NavLink
              to="/plans"
              onClick={closeAllDropdowns}
              className={({ isActive }) => `ds-nav-pill ${isActive ? 'active' : ''}`}
            >
              <Server size={15} className="ds-pill-icon" />
              <span>Servers</span>
            </NavLink>

            {/* Cloud VPS Overview */}
            <NavLink
              to="/vps"
              onClick={closeAllDropdowns}
              className={({ isActive }) => `ds-nav-pill ${isActive ? 'active' : ''}`}
            >
              <Cpu size={15} className="ds-pill-icon" />
              <span>Cloud VPS</span>
            </NavLink>

            {/* Bot Hosting */}
            <NavLink
              to="/plans/bot-hosting"
              onClick={closeAllDropdowns}
              className={({ isActive }) => `ds-nav-pill ${isActive ? 'active' : ''}`}
            >
              <Bot size={15} className="ds-pill-icon" />
              <span>Bot Hosting</span>
            </NavLink>

            {/* Discord Community */}
            <a
              href="https://dsc.gg/dataserware"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAllDropdowns}
              className="ds-nav-pill"
            >
              <MessageSquare size={15} className="ds-pill-icon" style={{ color: '#5865F2' }} />
              <span>Discord</span>
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="ds-nav-actions">
            {/* Panels Dropdown */}
            <div
              className="ds-dropdown-item"
              onMouseEnter={() => { clearTimeout(panelsTimer.current); setPanelsOpen(true); }}
              onMouseLeave={() => { panelsTimer.current = setTimeout(() => setPanelsOpen(false), 200); }}
            >
              <button
                type="button"
                className={`ds-panels-btn ${panelsOpen ? 'active' : ''}`}
                onClick={() => setPanelsOpen(!panelsOpen)}
              >
                <LayoutGrid size={15} />
                <span>Panels</span>
                <ChevronDown size={13} className={`ds-chevron ${panelsOpen ? 'rotate' : ''}`} />
              </button>

              {panelsOpen && (
                <div className="ds-dropdown-menu ds-panels-dropdown">
                  <a
                    href="https://panel.dataserware.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAllDropdowns}
                    className="ds-menu-row"
                  >
                    <div className="ds-row-icon purple">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <span className="ds-row-title" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>Game Control Panel</span>
                        <ExternalLink size={12} />
                      </span>
                      <span className="ds-row-sub">panel.dataserware.com (Pterodactyl)</span>
                    </div>
                  </a>

                  <Link to="/plans" onClick={closeAllDropdowns} className="ds-menu-row">
                    <div className="ds-row-icon blue">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <span className="ds-row-title">Billing &amp; Storefront</span>
                      <span className="ds-row-sub">Manage active invoices &amp; purchases</span>
                    </div>
                  </Link>

                  <Link to="/track-order" onClick={closeAllDropdowns} className="ds-menu-row">
                    <div className="ds-row-icon green">
                      <Shield size={16} />
                    </div>
                    <div>
                      <span className="ds-row-title">Track Order Status</span>
                      <span className="ds-row-sub">Check live server deployment</span>
                    </div>
                  </Link>

                  <a
                    href="https://dsc.gg/dataserware"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAllDropdowns}
                    className="ds-menu-row"
                  >
                    <div className="ds-row-icon discord">
                      <Bot size={16} />
                    </div>
                    <div>
                      <span className="ds-row-title" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>Discord Community</span>
                        <ExternalLink size={12} />
                      </span>
                      <span className="ds-row-sub">Instant 24/7 staff support</span>
                    </div>
                  </a>

                  {isAdmin && (
                    <Link to="/admin" onClick={closeAllDropdowns} className="ds-menu-row">
                      <div className="ds-row-icon green">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <span className="ds-row-title">Admin Console</span>
                        <span className="ds-row-sub">Manage cluster deployments</span>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Currency toggle */}
            <button
              type="button"
              className="ds-currency-btn"
              onClick={toggleCurrency}
              title="Switch Currency (INR / USD)"
            >
              <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>

            {/* Client Area Primary CTA Button */}
            {user ? (
              <div className="ds-user-profile-badge">
                <Link to="/dashboard" onClick={closeAllDropdowns} className="ds-user-btn" title="Client Dashboard">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="ds-user-avatar" />
                  ) : (
                    <div className="ds-avatar-placeholder">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="ds-user-name">
                    {user.displayName ? user.displayName.split(' ')[0] : 'Client'}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="ds-logout-icon-btn"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={loginWithGoogle}
                className="ds-client-area-btn"
              >
                <CreditCard size={15} />
                <span>Client Area</span>
              </button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}
