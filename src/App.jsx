import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { OrderProvider } from './context/OrderContext';
import Preloader from './components/Preloader';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

import Home from './pages/Home';
import Plans from './pages/Plans';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import TrackOrder from './pages/TrackOrder';
import WebHosting from './pages/WebHosting';
import VdsMachines from './pages/VdsMachines';

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(168, 85, 247, 0.2)', borderTopColor: '#c084fc', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1.5rem' }} />
      <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Redirecting to Data Serware Control Panel
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Taking you to <strong style={{ color: '#c084fc' }}>panel.dataserware.com</strong>...
      </p>
      <a
        href={url}
        style={{
          color: '#070213',
          background: 'linear-gradient(135deg, #c084fc, #a855f7)',
          padding: '10px 22px',
          borderRadius: '10px',
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}
      >
        Click here if not redirected automatically
      </a>
    </div>
  );
}

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <CurrencyProvider>
          <OrderProvider>
            {!loadingComplete && (
              <Preloader onComplete={() => setLoadingComplete(true)} />
            )}
            <div className={`app-shell ${loadingComplete ? 'app-loaded' : ''}`}>
              <BackgroundAnimation />

              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Main Hosting Solutions (Like skilloraclouds.com) */}
                  <Route path="/" element={<Home />} />
                  <Route path="/web-hosting" element={<WebHosting />} />
                  <Route path="/vds-machines" element={<VdsMachines />} />
                  <Route path="/vds-machines/:family" element={<VdsMachines />} />
                  <Route path="/amd-ryzen-9-machines" element={<VdsMachines />} />
                  <Route path="/amd-ryzen-7-machines" element={<VdsMachines />} />
                  <Route path="/intel-xeon-machines" element={<VdsMachines />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/plans/:category" element={<Plans />} />

                  {/* Ordering & Checkout Flow */}
                  <Route path="/checkout/:planId" element={<Checkout />} />
                  <Route path="/order-success/:id" element={<OrderSuccess />} />

                  {/* Legacy Client Area Redirect to Plans */}
                  <Route path="/billing" element={<Navigate to="/plans" replace />} />
                  <Route path="/client" element={<Navigate to="/plans" replace />} />

                  {/* Control Panel Direct Redirect to https://panel.dataserware.com/ */}
                  <Route path="/panel" element={<ExternalRedirect url="https://panel.dataserware.com/" />} />
                  <Route path="/panel/*" element={<ExternalRedirect url="https://panel.dataserware.com/" />} />

                  {/* Customer Tracking, Account & Legal */}
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<Admin mode="orders" />} />
                  <Route path="/admin-emails" element={<Admin mode="emails" />} />
                  <Route path="/terms" element={<Legal />} />
                  <Route path="/refund-policy" element={<Legal />} />
                  <Route path="/privacy" element={<Legal />} />
                  <Route path="/contact" element={<Legal />} />

                  {/* Catch-all redirect to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <CookieConsent />
              <Footer />
            </div>
          </OrderProvider>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
