import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('dataserware_cookies_accepted');
      if (!accepted) {
        // Show after a brief delay for a polished feel
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('dataserware_cookies_accepted', 'true');
    } catch {}
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="ds-cookie-popup" role="dialog" aria-live="polite">
      <button
        type="button"
        className="ds-cookie-close-btn"
        onClick={handleDismiss}
        aria-label="Dismiss cookie notice"
      >
        <X size={14} />
      </button>

      <div className="ds-cookie-header">
        <div className="ds-cookie-icon-wrap">
          <Cookie size={18} />
        </div>
        <h4 className="ds-cookie-title">We Value Your Privacy</h4>
      </div>

      <p className="ds-cookie-text">
        We use cookies to enhance your experience and analyze traffic.
      </p>

      <div className="ds-cookie-actions">
        <Link to="/privacy" className="ds-cookie-learn-link">
          Learn More
        </Link>
        <button
          type="button"
          onClick={handleAccept}
          className="ds-cookie-accept-btn"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
