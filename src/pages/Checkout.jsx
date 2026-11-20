import React, { useState } from 'react';
import { useParams, useLocation, Navigate, Link } from 'react-router-dom';
import { getPlanById, BILLING_CYCLES, calculatePriceForCycle, formatINR } from '../data/plans';
import { useCurrency } from '../context/CurrencyContext';
import {
  ShieldCheck, Lock, Zap, ArrowLeft, CheckCircle2,
  Server, Globe, Cpu, HardDrive, MessageSquare, ExternalLink,
  Sparkles, Check, Copy
} from 'lucide-react';

export default function Checkout() {
  const { planId } = useParams();
  const location = useLocation();
  const plan = getPlanById(planId || '');
  const { formatPrice } = useCurrency();

  const queryParams = new URLSearchParams(location.search);
  const initialCycleId = queryParams.get('cycle') || '1mo';
  const initialCoupon = (queryParams.get('coupon') || '').trim();

  const [billingCycle, setBillingCycle] = useState(initialCycleId);
  const [couponCode, setCouponCode] = useState(initialCoupon || 'dataserware10');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  const currentCycle = BILLING_CYCLES.find(c => c.id === billingCycle) || BILLING_CYCLES[0];
  const baseCycleAmount = calculatePriceForCycle(plan.price, currentCycle.months);
  const isDiscountActive = couponCode.trim().toLowerCase() === 'dataserware10';
  const discountAmount = isDiscountActive ? Math.round(baseCycleAmount * 0.10) : 0;
  const totalAmount = Math.max(1, baseCycleAmount - discountAmount);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('dataserware10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="ds-checkout-page">
      <div className="ds-ambient-glow-top" />

      <div className="ds-checkout-container">
        {/* Breadcrumb & Heading */}
        <div className="ds-checkout-header">
          <Link to="/plans" className="ds-back-link">
            <ArrowLeft size={16} />
            <span>Back to All Plans</span>
          </Link>
          <div className="ds-checkout-title-row">
            <div>
              <h1 className="ds-checkout-main-title">
                Instant Order via <span className="ds-gradient-text">Discord</span>
              </h1>
              <p className="ds-checkout-subtitle">
                All purchases, billing, and server setups are handled directly through our 24/7 Discord tickets. Join our community to claim your server immediately.
              </p>
            </div>
            <div className="ds-security-tag">
              <ShieldCheck size={16} />
              <span>Verified Discord Setup • 24/7 Support</span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="ds-checkout-grid">
          {/* LEFT COLUMN: Discord Order Instructions & Direct Button */}
          <div className="ds-checkout-form-card">
            <div className="ds-form-section-header">
              <MessageSquare size={20} className="ds-form-icon" />
              <h3>How to Complete Your Purchase</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Join Data Serware Discord</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    Click the button below to join our verified Discord community at <strong>dsc.gg/dataserware</strong>.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Open a Purchase Ticket</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    Go to the <code>#tickets</code> or <code>#order</code> channel and click "Create Ticket" to connect with our deployment team.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Mention Your Plan &amp; Coupon</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    Mention <strong>{plan.name}</strong> ({currentCycle.duration}) and use code <strong style={{ color: '#a855f7' }}>dataserware10</strong> to get your 10% discount!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, flexShrink: 0 }}>
                  4
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Instant Automated Provisioning</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    Your credentials and Pterodactyl panel link (<strong>panel.dataserware.com</strong>) will be delivered directly in your ticket within minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Discord Action Button */}
            <a
              href="https://dsc.gg/dataserware"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-pay-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#5865F2',
                color: '#fff',
                textDecoration: 'none',
                marginTop: '1.8rem',
                padding: '16px 24px',
                fontSize: '1.08rem',
                fontWeight: 700,
                borderRadius: '12px'
              }}
            >
              <MessageSquare size={22} />
              <span>Join Discord &amp; Get Instantly &rarr;</span>
            </a>

            <div className="ds-checkout-footer-badges" style={{ marginTop: '1.25rem' }}>
              <span><ShieldCheck size={14} /> 100% Verified Support</span>
              <span><Zap size={14} /> Fast Setup via Tickets</span>
              <span><Lock size={14} /> Official Data Serware Discord</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Plan Summary Card */}
          <div className="ds-checkout-summary-wrap">
            <div className="ds-summary-card">
              <div className="ds-summary-badge-row">
                <span className="ds-summary-tag">SELECTED PLAN</span>
                {plan.badge && (
                  <span className="ds-summary-pill">{plan.badge}</span>
                )}
              </div>

              <h3 className="ds-summary-plan-title">{plan.name}</h3>
              <span className="ds-summary-plan-sub">
                {plan.category.toUpperCase()} &bull; {currentCycle.duration} Term
              </span>

              {/* Hardware Specs Box */}
              <div className="ds-summary-specs-box">
                {plan.ram && (
                  <div className="ds-summary-spec-row">
                    <span><Cpu size={14} /> Memory:</span>
                    <strong>{plan.ram}</strong>
                  </div>
                )}
                {plan.cpu && (
                  <div className="ds-summary-spec-row">
                    <span><Zap size={14} /> Compute:</span>
                    <strong>{plan.cpu}</strong>
                  </div>
                )}
                {plan.storage && (
                  <div className="ds-summary-spec-row">
                    <span><HardDrive size={14} /> Storage:</span>
                    <strong>{plan.storage}</strong>
                  </div>
                )}
                {plan.bandwidth && (
                  <div className="ds-summary-spec-row">
                    <span><Globe size={14} /> Bandwidth:</span>
                    <strong>{plan.bandwidth}</strong>
                  </div>
                )}
                {plan.websites && (
                  <div className="ds-summary-spec-row">
                    <span><Globe size={14} /> Domains:</span>
                    <strong>{plan.websites}</strong>
                  </div>
                )}
              </div>

              {/* Promo Coupon Box */}
              <div className="ds-summary-coupon-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>10% Promo Code:</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="ds-promo-code-btn"
                    title="Click to copy coupon code"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                  >
                    <span>dataserware10</span>
                    {copiedCode ? <Check size={12} className="ds-copied-icon" /> : <Copy size={12} />}
                  </button>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#4ade80', display: 'block', marginTop: '6px' }}>
                  ✓ Mention this code in your Discord ticket for 10% OFF!
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="ds-summary-pricing-list">
                <div className="ds-pricing-line">
                  <span>Base Monthly Rate:</span>
                  <span>{formatPrice(plan.price)}/mo</span>
                </div>
                <div className="ds-pricing-line">
                  <span>Billing Term:</span>
                  <span>{currentCycle.duration}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="ds-pricing-line ds-pricing-discount-row">
                    <span className="ds-text-green font-medium">10% Promo Discount (dataserware10):</span>
                    <span className="ds-text-green font-bold">- {formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="ds-pricing-line">
                  <span>DDoS Protection (1.2 Tbps):</span>
                  <span className="ds-text-green">INCLUDED</span>
                </div>
                <div className="ds-pricing-line">
                  <span>Discord Setup Support:</span>
                  <span className="ds-text-green">FREE &amp; INSTANT</span>
                </div>

                <div className="ds-pricing-total-row">
                  <div>
                    <span className="ds-total-label">Estimated Price:</span>
                    <span className="ds-total-sub">All taxes &amp; fees included</span>
                  </div>
                  <span className="ds-total-amount">{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* SLA Guarantee Note */}
              <div className="ds-summary-sla-box">
                <ShieldCheck size={18} className="ds-sla-icon" />
                <p>
                  <strong>Data Serware Guarantee:</strong> 99.9% uptime with automated anti-DDoS mitigation, offsite daily backups, and 24/7 Discord support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
