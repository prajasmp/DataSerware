import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WEB_HOSTING_PLANS, BILLING_CYCLES, calculatePriceForCycle } from '../data/plans';
import { useCurrency } from '../context/CurrencyContext';
import {
  Globe,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Mail,
  Clock,
  Key,
  HardDrive,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function WebHosting() {
  const [selectedCycle, setSelectedCycle] = useState('1mo');
  const [activeFaq, setActiveFaq] = useState(null);
  const { formatPrice, currency } = useCurrency();

  const currentCycle = BILLING_CYCLES.find(c => c.id === selectedCycle) || BILLING_CYCLES[0];

  const cycleDiscounts = {
    '1mo': null,
    '3mo': 'Save 5%',
    '6mo': 'Save 10%',
    '12mo': 'Save 15%'
  };

  const faqs = [
    {
      q: "What is Data Serware cPanel Web Hosting and how fast is activation?",
      a: "Data Serware Web Hosting is an enterprise-grade hosting solution powered by official cPanel and ultra-fast NVMe Gen4 storage. Activation is instant—simply join our Discord at https://dsc.gg/dataserware and open a ticket, and your cPanel account and credentials are created and delivered within minutes."
    },
    {
      q: "Does my Web Hosting plan come with a Free SSL Certificate?",
      a: "Yes! Every website and subdomain hosted on Data Serware receives automated, unlimited AutoSSL / Let's Encrypt certificates that renew automatically with zero manual effort."
    },
    {
      q: "Can I host multiple domains and WordPress websites?",
      a: "Yes! Our SERWARE SOLO plan includes 1 website, SERWARE PREMIUM includes 3 hosted domains, and SERWARE BUSINESS allows up to 10 separate hosted domains with 100 MySQL databases."
    },
    {
      q: "Do you offer Softaculous 1-click app installations?",
      a: "Yes! Every plan includes full cPanel access with Softaculous 1-click installer for WordPress, WooCommerce, Joomla, Laravel, Drupal, and 400+ other web applications."
    },
    {
      q: "Do I get SSH terminal access for Node.js / Git deployment?",
      a: "Yes, our SERWARE BUSINESS tier comes with secure chrooted SSH terminal access, Git version control, and PHP version selector (PHP 7.4 through 8.3)."
    },
    {
      q: "What DDoS mitigation is included?",
      a: "All web hosting clusters sit behind enterprise 1.2 Tbps L3/L4/L7 automated anti-DDoS scrubbing to keep your websites online and protected from malicious spikes."
    }
  ];

  return (
    <div className="ds-page-container">
      {/* Background Glow Accents */}
      <div className="ds-ambient-glow-top" />

      <div className="ds-content-wrap">
        {/* Hero Section */}
        <div className="ds-page-hero">
          <div className="ds-hero-badge">
            <Sparkles size={14} className="ds-badge-sparkle" />
            <span>NVMe Gen4 Enterprise Cloud</span>
          </div>

          <h1 className="ds-page-title">
            Enterprise <span className="ds-gradient-text">cPanel Web Hosting</span>
          </h1>

          <p className="ds-page-subtitle">
            Host ultra-fast WordPress, PHP, and web applications on enterprise NVMe Gen4 storage, powered by official cPanel, automated daily backups, and 1.2 Tbps DDoS protection.
          </p>

          {/* Billing Cycle Selector */}
          <div className="ds-cycle-bar">
            {BILLING_CYCLES.map((cycle) => {
              const active = cycle.id === selectedCycle;
              const discount = cycleDiscounts[cycle.id];
              return (
                <button
                  key={cycle.id}
                  onClick={() => setSelectedCycle(cycle.id)}
                  className={`ds-cycle-btn ${active ? 'active' : ''}`}
                >
                  <span>{cycle.label}</span>
                  {discount && <span className="ds-cycle-discount">{discount}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="ds-cards-grid">
          {WEB_HOSTING_PLANS.map((plan) => {
            const cyclePrice = calculatePriceForCycle(plan.price, currentCycle.months);
            const isPopular = plan.badge === 'Most Popular';

            return (
              <div
                key={plan.id}
                className={`ds-hosting-card ${isPopular ? 'popular-card' : ''}`}
              >
                {plan.badge && (
                  <div className="ds-card-badge-pill">
                    <Sparkles size={12} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="ds-card-header">
                  <div className="ds-card-title-row">
                    <h3 className="ds-card-title">{plan.name}</h3>
                    <div className="ds-card-icon-wrap">
                      <Globe size={20} />
                    </div>
                  </div>
                  <p className="ds-card-desc">
                    {plan.id === 'web-solo' && 'Ideal for personal sites, portfolios, and blogs.'}
                    {plan.id === 'web-premium' && 'Perfect for expanding websites and small businesses.'}
                    {plan.id === 'web-business' && 'Engineered for high-traffic stores & enterprise apps.'}
                  </p>
                </div>

                {/* Price Display */}
                <div className="ds-price-box">
                  <div className="ds-price-row">
                    <span className="ds-price-amount">{formatPrice(cyclePrice)}</span>
                    <span className="ds-price-period">/ {currentCycle.duration}</span>
                  </div>
                  {currentCycle.months > 1 && (
                    <div className="ds-price-sub">
                      Equivalent to {formatPrice(plan.price)}/mo
                    </div>
                  )}
                </div>

                {/* Specs List */}
                <div className="ds-specs-list">
                  <div className="ds-spec-item highlight">
                    <Globe size={15} className="ds-spec-icon" />
                    <span><strong>{plan.websites}</strong></span>
                  </div>
                  <div className="ds-spec-item">
                    <HardDrive size={15} className="ds-spec-icon" />
                    <span>{plan.storage}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Database size={15} className="ds-spec-icon" />
                    <span>{plan.databases}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Clock size={15} className="ds-spec-icon" />
                    <span>{plan.backups}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Mail size={15} className="ds-spec-icon" />
                    <span>{plan.emails}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Lock size={15} className="ds-spec-icon success" />
                    <span>Free AutoSSL Certificate</span>
                  </div>
                  <div className="ds-spec-item">
                    <Layers size={15} className="ds-spec-icon" />
                    <span>Official cPanel Control Panel</span>
                  </div>
                  {plan.ssh && (
                    <div className="ds-spec-item highlight">
                      <Key size={15} className="ds-spec-icon" />
                      <span>{plan.ssh}</span>
                    </div>
                  )}
                  {plan.domain && (
                    <div className="ds-spec-item bonus">
                      <Sparkles size={15} className="ds-spec-icon bonus" />
                      <span>{plan.domain}</span>
                    </div>
                  )}
                </div>

                {/* Order Button */}
                <a
                  href="https://dsc.gg/dataserware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ds-card-btn ${isPopular ? 'popular-btn' : ''}`}
                >
                  <span>Join Discord &amp; Get Instantly</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Showcase */}
        <div className="ds-features-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">HARDWARE &amp; INFRASTRUCTURE</span>
            <h2 className="ds-section-title">Built for Speed, Reliability &amp; Security</h2>
            <p className="ds-section-desc">Every Data Serware web hosting package includes tier-1 features standard.</p>
          </div>

          <div className="ds-features-grid">
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Zap size={22} /></div>
              <h4>NVMe Gen4 Storage</h4>
              <p>Lightning-fast database queries and webpage loads with sustained 7,000 MB/s SSD read/write throughput.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Lock size={22} /></div>
              <h4>1.2 Tbps DDoS Defense</h4>
              <p>Real-time automated edge scrubbing protects your HTTP/HTTPS endpoints from volumetric flood attacks.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Layers size={22} /></div>
              <h4>Official cPanel &amp; Softaculous</h4>
              <p>Full-featured web control panel with 1-click installation for WordPress, phpMyAdmin, and file manager.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Clock size={22} /></div>
              <h4>Automated Daily Backups</h4>
              <p>Offsite encrypted backups with 1-click restore point options so your data is always protected.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><ShieldCheck size={22} /></div>
              <h4>99.9% Uptime Guarantee</h4>
              <p>Redundant power feeds, multi-homed BGP network uplinks, and enterprise hardware SLA guarantees.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Globe size={22} /></div>
              <h4>Ultra-Low Latency Nodes</h4>
              <p>Strategically routed carrier peering across Mumbai, Singapore, Frankfurt, and Virginia data centers.</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="ds-faq-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="ds-section-title">Web Hosting FAQ</h2>
          </div>

          <div className="ds-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`ds-faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                >
                  <div className="ds-faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`ds-faq-arrow ${isOpen ? 'rotated' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="ds-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Discord Support Bottom CTA Banner */}
        <div className="ds-bottom-banner">
          <div className="ds-bottom-content">
            <h3>Need a Custom Web Hosting Solution?</h3>
            <p>Our systems engineers are available 24/7 on Discord to migrate your website for free.</p>
          </div>
          <a
            href="https://dsc.gg/dataserware"
            target="_blank"
            rel="noopener noreferrer"
            className="ds-discord-btn"
          >
            <Zap size={16} />
            <span>Join 24/7 Discord Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
