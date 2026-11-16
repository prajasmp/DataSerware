import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import DataSerwareLogo from './DataSerwareLogo';
import {
  Menu, X, LogOut, ShieldCheck, UserPlus,
  Server, Loader2, ChevronDown, Headphones, FileText,
  RefreshCcw, PackageCheck, Zap, Shield, HelpCircle,
  CreditCard, Terminal, ExternalLink, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const { user, loginWithGoogle, logout, isAdmin, authLoading } = useAuth();
  const { currency, toggleCurrency } = useCurrency();

  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const adminDropdownTimeoutRef = useRef(null);

  const handleMouseEnterSupport = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setSupportDropdownOpen(true);
  };

  const handleMouseLeaveSupport = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSupportDropdownOpen(false);
    }, 220);
  };

  const handleMouseEnterAdmin = () => {
    if (adminDropdownTimeoutRef.current) clearTimeout(adminDropdownTimeoutRef.current);
    setAdminDropdownOpen(true);
  };

  const handleMouseLeaveAdmin = () => {
    adminDropdownTimeoutRef.current = setTimeout(() => {
      setAdminDropdownOpen(false);
    }, 220);
  };

  const defaultAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Admin')}&background=06b6d4&color=020711&bold=true`;

  return (
    <header className="nav-wrap-design6">
      <nav className="nav container design6-nav">

        <Link className="brand-design6" to="/">
          <DataSerwareLogo size={36} showText={true} />
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links-design6 ${mobileOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setMobileOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>

          <NavLink to="/web-hosting" onClick={() => setMobileOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
            Web Hosting
          </NavLink>

          <NavLink to="/vds-machines" onClick={() => setMobileOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
            VDS &amp; Dedicated
          </NavLink>

          <NavLink to="/plans" onClick={() => setMobileOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
            Game &amp; VPS
          </NavLink>

          {/* Portal B: Direct Link to Client Area / Billing */}
          <NavLink
            to="/billing"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `portal-nav-link client-portal-btn ${isActive ? 'active' : ''}`}
            style={{
              color: '#38bdf8',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CreditCard size={14} style={{ color: '#00f2fe' }} />
            <span>Client Area</span>
            <span style={{
              fontSize: '9px',
              padding: '1px 5px',
              borderRadius: '4px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8'
            }}>
              Billing
            </span>
          </NavLink>

          {/* Portal C: Direct Link to Control Panel */}
          <NavLink
            to="/panel"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `portal-nav-link panel-portal-btn ${isActive ? 'active' : ''}`}
            style={{
              color: '#34d399',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Terminal size={14} style={{ color: '#10b981' }} />
            <span>Control Panel</span>
            <span style={{
              fontSize: '9px',
              padding: '1px 5px',
              borderRadius: '4px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399'
            }}>
              Live
            </span>
          </NavLink>

          <NavLink to="/track-order" onClick={() => setMobileOpen(false)} className={({ isActive }) => `track-order-link ${isActive ? 'active' : ''}`}>
            <PackageCheck size={14} style={{ display: 'inline', marginRight: '5px', color: '#00f2fe' }} />
            Track Order
          </NavLink>

          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={handleMouseEnterSupport}
            onMouseLeave={handleMouseLeaveSupport}
          >
            <button
              className="nav-dropdown-btn"
              onClick={() => setSupportDropdownOpen(!supportDropdownOpen)}
            >
              <span>Support</span>
              <ChevronDown size={14} className={`dropdown-arrow ${supportDropdownOpen ? 'open' : ''}`} />
            </button>

            {supportDropdownOpen && (
              <div className="support-menu-dropdown">
                <Link to="/contact" onClick={() => { setSupportDropdownOpen(false); setMobileOpen(false); }}>
                  <Headphones size={16} className="menu-icon cyan" />
                  <div>
                    <span className="menu-title">24/7 Technical Desk</span>
                    <span className="menu-desc">Specialized systems engineers</span>
                  </div>
                </Link>

                <a href="https://discord.gg/dataserware" target="_blank" rel="noopener noreferrer" onClick={() => { setSupportDropdownOpen(false); setMobileOpen(false); }}>
                  <Zap size={16} className="menu-icon cyan" />
                  <div>
                    <span className="menu-title">Discord Community</span>
                    <span className="menu-desc">Join 4,500+ developers &amp; gamers</span>
                  </div>
                </a>

                <Link to="/terms" onClick={() => { setSupportDropdownOpen(false); setMobileOpen(false); }}>
                  <FileText size={16} className="menu-icon cyan" />
                  <div>
                    <span className="menu-title">Terms of Service</span>
                    <span className="menu-desc">Hosting SLA &amp; acceptable use</span>
                  </div>
                </Link>

                <Link to="/refund-policy" onClick={() => { setSupportDropdownOpen(false); setMobileOpen(false); }}>
                  <RefreshCcw size={16} className="menu-icon cyan" />
                  <div>
                    <span className="menu-title">Refund Policy</span>
                    <span className="menu-desc">Transparent money-back terms</span>
                  </div>
                </Link>

                <Link to="/privacy" onClick={() => { setSupportDropdownOpen(false); setMobileOpen(false); }}>
                  <Shield size={16} className="menu-icon cyan" />
                  <div>
                    <span className="menu-title">Privacy Policy</span>
                    <span className="menu-desc">Enterprise data protection</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {user && (
            <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}>
              My Account
            </NavLink>
          )}

          {isAdmin && (
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={handleMouseEnterAdmin}
              onMouseLeave={handleMouseLeaveAdmin}
            >
              <button
                className="nav-dropdown-btn admin-dropdown-btn"
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
              >
                <ShieldCheck size={15} className="admin-btn-icon" />
                <span>Admin Console</span>
                <ChevronDown size={14} className={`dropdown-arrow ${adminDropdownOpen ? 'open' : ''}`} />
              </button>

              {adminDropdownOpen && (
                <div className="support-menu-dropdown admin-menu-dropdown">
                  <Link to="/admin" onClick={() => { setAdminDropdownOpen(false); setMobileOpen(false); }}>
                    <ShieldCheck size={16} className="menu-icon cyan" />
                    <div>
                      <span className="menu-title">Admin Dashboard</span>
                      <span className="menu-desc">Orders, deployments &amp; revenue</span>
                    </div>
                  </Link>

                  <Link to="/admin?tab=products" onClick={() => { setAdminDropdownOpen(false); setMobileOpen(false); }}>
                    <Zap size={16} className="menu-icon cyan" />
                    <div>
                      <span className="menu-title">Product Pricing</span>
                      <span className="menu-desc">Manage plans &amp; price rates</span>
                    </div>
                  </Link>

                  <Link to="/admin-emails" onClick={() => { setAdminDropdownOpen(false); setMobileOpen(false); }}>
                    <UserPlus size={16} className="menu-icon green" style={{ color: '#34d399' }} />
                    <div>
                      <span className="menu-title" style={{ color: '#34d399' }}>Admin Team</span>
                      <span className="menu-desc">Manage admin access permissions</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="auth-box-design6">

          <button
            className="currency-toggle-design6"
            onClick={toggleCurrency}
            title="Switch Currency (INR / USD)"
          >
            {currency === 'INR' ? (
              <>
                <span>INR ₹</span>
                <ChevronDown size={13} />
              </>
            ) : (
              <>
                <span>USD $</span>
                <ChevronDown size={13} />
              </>
            )}
          </button>

          {user ? (
            <div className="user-profile-design6">
              <img
                className="avatar"
                src={user.photoURL || defaultAvatar(user.displayName)}
                alt={user.displayName || 'User'}
              />
              <button
                className="logout-btn-design6"
                onClick={logout}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              className="login-btn-design6"
              onClick={loginWithGoogle}
              disabled={authLoading}
              title="Client / Admin Sign In"
            >
              {authLoading ? (
                <Loader2 size={16} className="spin-loader" />
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          )}

        </div>

      </nav>
    </header>
  );
}
