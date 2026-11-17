import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { getPlanById, SERVER_LOCATIONS, BILLING_CYCLES, SUPPORTED_VDS_OS, calculatePriceForCycle, formatINR } from '../data/plans';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { createPaymentOrder, verifyPayment } from '../services/api';
import DataSerwareLogo from '../components/DataSerwareLogo';
import {
  ShieldCheck, Lock, Zap, User, Mail, Smartphone,
  Check, ArrowRight, ArrowLeft, CheckCircle2,
  Server, Globe, Cpu, HardDrive, AlertCircle, Loader2,
  Terminal, Key, Radio, Calendar, CreditCard, Sparkles
} from 'lucide-react';

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const plan = getPlanById(planId || '');
  const { formatPrice } = useCurrency();
  const { user } = useAuth();

  // Query parameter for preselected billing cycle (e.g. ?cycle=3mo) & coupon
  const queryParams = new URLSearchParams(location.search);
  const initialCycleId = queryParams.get('cycle') || '1mo';
  const initialCoupon = (queryParams.get('coupon') || '').trim();

  // Coupon promo code states
  const [couponCode, setCouponCode] = useState(initialCoupon);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return initialCoupon.toLowerCase() === 'dataserware10' ? 'dataserware10' : '';
  });
  const [couponMsg, setCouponMsg] = useState(() => {
    return initialCoupon.toLowerCase() === 'dataserware10'
      ? { type: 'success', text: '10% discount applied with code dataserware10!' }
      : null;
  });

  // Customer details (Prefill from Google Auth or LocalStorage if available)
  const [fullName, setFullName] = useState(() => {
    if (user?.displayName) return user.displayName;
    try {
      const saved = JSON.parse(localStorage.getItem('dataserware_guest_info') || '{}');
      return saved.name || '';
    } catch {
      return '';
    }
  });

  const [email, setEmail] = useState(() => {
    if (user?.email) return user.email;
    try {
      const saved = JSON.parse(localStorage.getItem('dataserware_guest_info') || '{}');
      return saved.email || '';
    } catch {
      return '';
    }
  });

  const [mobileNumber, setMobileNumber] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dataserware_guest_info') || '{}');
      return saved.mobile || '';
    } catch {
      return '';
    }
  });

  // Configuration options
  const [billingCycle, setBillingCycle] = useState(initialCycleId);
  const [domainName, setDomainName] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('ubuntu-24-04');
  const [sshKey, setSshKey] = useState('');
  const [serverName, setServerName] = useState('');
  const [serverRegion, setServerRegion] = useState('Mumbai, India');

  // Checkout states
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStepText, setDeployStepText] = useState('Verifying payment signature...');

  const isWebHosting = plan?.category === 'web-hosting' || plan?.id?.startsWith('web-');
  const isBareMetalVds = plan?.category?.startsWith('vds-') || plan?.type === 'bare-metal';

  const currentCycle = BILLING_CYCLES.find(c => c.id === billingCycle) || BILLING_CYCLES[0];
  const baseCycleAmount = plan ? calculatePriceForCycle(plan.price, currentCycle.months) : 0;
  const isDiscountActive = appliedCoupon.toLowerCase() === 'dataserware10';
  const discountAmount = isDiscountActive ? Math.round(baseCycleAmount * 0.10) : 0;
  const totalAmount = Math.max(1, baseCycleAmount - discountAmount);

  // Apply or Remove discount coupon
  const handleApplyCoupon = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const clean = couponCode.trim().toLowerCase();
    if (!clean) {
      setCouponMsg({ type: 'error', text: 'Please enter a coupon code.' });
      return;
    }
    if (clean === 'dataserware10') {
      setAppliedCoupon('dataserware10');
      setCouponMsg({ type: 'success', text: 'Coupon dataserware10 applied! 10% discount deducted.' });
    } else {
      setAppliedCoupon('');
      setCouponMsg({ type: 'error', text: 'Invalid coupon code. Try code "dataserware10".' });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    setCouponMsg(null);
  };

  useEffect(() => {
    if (user) {
      if (!fullName && user.displayName) setFullName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
    if (plan && !serverName) {
      setServerName(`${plan.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Math.floor(100 + Math.random() * 900)}`);
    }
  }, [user, plan]);

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  // Load Razorpay Checkout SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Directly initiate Razorpay Payment Modal
  const handlePayAndDeploy = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName || !fullName.trim()) {
      setErrorMessage('Please enter your full name for server registration.');
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address to receive your server credentials.');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order verification.');
      return;
    }
    if (isWebHosting && (!domainName || !domainName.includes('.'))) {
      setErrorMessage('Please enter a valid primary domain name (e.g. mysite.com) for Web Hosting.');
      return;
    }

    try {
      localStorage.setItem('dataserware_guest_info', JSON.stringify({
        name: fullName.trim(),
        email: email.trim(),
        mobile: cleanMobile
      }));
    } catch {}

    setSubmitting(true);

    try {
      // 1. Create order on backend
      const orderPayload = {
        planId: plan.id,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: cleanMobile,
        serverName: serverName.trim() || domainName.trim() || `${plan.name} Node`,
        serverRegion,
        billingCycle: currentCycle.id,
        couponCode: isDiscountActive ? 'dataserware10' : null,
        domainName: domainName.trim(),
        os: isBareMetalVds ? operatingSystem : null,
        sshKey: isBareMetalVds ? sshKey.trim() : null
      };

      const orderRes = await createPaymentOrder(orderPayload);

      if (!orderRes.success) {
        throw new Error(orderRes.error || 'Failed to initialize order on server.');
      }

      // 2. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 3. Configure Razorpay Modal Options
      const options = {
        key: orderRes.razorpayKeyId,
        amount: orderRes.amountInPaise,
        currency: 'INR',
        name: 'Data Serware',
        description: `${plan.name} (${currentCycle.duration})`,
        image: '/assets/dataserware-logo.png',
        order_id: orderRes.razorpayOrderId,
        handler: async function (response) {
          await handlePaymentSuccess(response, orderRes);
        },
        prefill: {
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          contact: cleanMobile
        },
        notes: {
          orderId: orderRes.orderId,
          planId: plan.id,
          duration: currentCycle.duration,
          serverName: serverName.trim() || domainName.trim()
        },
        theme: {
          color: '#a855f7'
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          }
        }
      };

      // 4. Open native Razorpay modal
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (failRes) {
        console.error('[Razorpay Failed]:', failRes.error);
        setErrorMessage(`Payment declined: ${failRes.error?.description || 'Transaction canceled'}`);
        setSubmitting(false);
      });

      rzp.open();
    } catch (err) {
      console.error('[Payment Initiation Error]:', err);
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
      setSubmitting(false);
    }
  };

  // Payment Verification & Auto Server Provisioning
  const handlePaymentSuccess = async (rzpResponse, orderMeta) => {
    setIsDeploying(true);
    setSubmitting(true);
    setErrorMessage('');
    setDeployStepText('Verifying cryptographic payment signature with Razorpay...');

    try {
      const verifyRes = await verifyPayment({
        orderId: orderMeta.orderId,
        razorpayOrderId: rzpResponse.razorpay_order_id || orderMeta.razorpayOrderId,
        razorpayPaymentId: rzpResponse.razorpay_payment_id || `pay_${Date.now()}`,
        razorpaySignature: rzpResponse.razorpay_signature || `sig_${Date.now()}`
      });

      if (!verifyRes.success) {
        throw new Error(verifyRes.error || 'Payment signature verification failed.');
      }

      setDeployStepText('Allocating hardware on Data Serware cluster...');

      setTimeout(() => {
        navigate(`/order-success/${orderMeta.orderId}?token=${orderMeta.trackingToken}`);
      }, 1500);
    } catch (err) {
      console.error('[Verification Error]:', err);
      setErrorMessage(`Payment received notice: ${err.message}. Your payment was captured; tracking order now.`);
      setIsDeploying(false);
      setSubmitting(false);
    }
  };

  // Instant Test Simulation Handler (for sandbox development)
  const handleTestSimulatePayment = async () => {
    if (!fullName || !email) {
      setErrorMessage('Please fill in your name and email first.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        planId: plan.id,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: (mobileNumber.trim() || '9876543210'),
        serverName: serverName.trim() || domainName.trim() || `${plan.name} Node`,
        serverRegion,
        billingCycle: currentCycle.id,
        couponCode: isDiscountActive ? 'dataserware10' : null,
        domainName: domainName.trim(),
        os: isBareMetalVds ? operatingSystem : null,
        sshKey: isBareMetalVds ? sshKey.trim() : null
      };

      const orderRes = await createPaymentOrder(orderPayload);
      if (!orderRes.success) throw new Error(orderRes.error || 'Failed to create test order.');

      await handlePaymentSuccess({
        razorpay_order_id: orderRes.razorpayOrderId,
        razorpay_payment_id: `pay_sim_${Date.now()}`,
        razorpay_signature: `test_sig_${Date.now()}`
      }, orderRes);
    } catch (err) {
      setErrorMessage(err.message || 'Simulation error.');
      setSubmitting(false);
    }
  };

  return (
    <div className="ds-checkout-page">
      <div className="ds-ambient-glow-top" />

      <div className="ds-checkout-container">
        {/* Breadcrumb & Heading */}
        <div className="ds-checkout-header">
          <Link to="/plans" className="ds-back-link">
            <ArrowLeft size={16} />
            <span>Back to Hosting Plans</span>
          </Link>
          <div className="ds-checkout-title-row">
            <div>
              <h1 className="ds-checkout-main-title">
                Configure &amp; <span className="ds-gradient-text">Instant Deploy</span>
              </h1>
              <p className="ds-checkout-subtitle">
                Enter your delivery details, pay securely via Razorpay (UPI / Card / NetBanking), and receive automated server credentials instantly.
              </p>
            </div>
            <div className="ds-security-tag">
              <ShieldCheck size={16} />
              <span>Razorpay 256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="ds-error-alert">
            <AlertCircle size={20} className="ds-error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Deploying Overlay Modal */}
        {isDeploying && (
          <div className="ds-deploying-card">
            <div className="ds-deploy-spinner-wrap">
              <Loader2 size={46} className="spin-loader" />
            </div>
            <h2 className="ds-deploy-heading">Payment Verified! Provisioning Server...</h2>
            <p className="ds-deploy-step">{deployStepText}</p>
            <div className="ds-deploy-progress-bar">
              <div className="ds-deploy-progress-fill" />
            </div>
            <span className="ds-deploy-footer-note">
              {isWebHosting
                ? 'Configuring cPanel account and AutoSSL certificates...'
                : isBareMetalVds
                ? 'Allocating physical bare-metal hardware and initiating PXE boot...'
                : 'Allocating Pterodactyl node ports, RAM limits, and generating credentials...'}
            </span>
          </div>
        )}

        {/* 2-Column Checkout Layout */}
        {!isDeploying && (
          <div className="ds-checkout-grid">
            {/* LEFT COLUMN: Customer Form + Razorpay Direct Pay Button */}
            <form onSubmit={handlePayAndDeploy} className="ds-checkout-form-card">
              <div className="ds-form-section-header">
                <User size={18} className="ds-form-icon" />
                <h3>1. Customer Delivery Information</h3>
              </div>

              <div className="ds-input-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="ds-input"
                />
              </div>

              <div className="ds-input-group">
                <label>
                  Delivery Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@gmail.com"
                  className="ds-input"
                />
                <span className="ds-input-help">
                  Your server login credentials, control panel URL, and Razorpay invoice receipt will be delivered here.
                </span>
              </div>

              <div className="ds-input-group">
                <label>
                  Mobile Number (10 Digits) <span className="required">*</span>
                </label>
                <div className="ds-phone-row">
                  <span className="ds-phone-prefix">+91 (IN)</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="9876543210"
                    className="ds-input"
                  />
                </div>
              </div>

              {/* Billing Cycle Duration */}
              <div className="ds-form-section-header with-border">
                <Calendar size={18} className="ds-form-icon" />
                <h3>2. Select Billing Term</h3>
              </div>

              <div className="ds-cycle-grid">
                {BILLING_CYCLES.map((c) => {
                  const isSel = c.id === billingCycle;
                  const cPrice = calculatePriceForCycle(plan.price, c.months);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBillingCycle(c.id)}
                      className={`ds-cycle-box ${isSel ? 'selected' : ''}`}
                    >
                      <div className="ds-cycle-box-top">
                        <span className="ds-cycle-box-label">{c.duration}</span>
                        {isSel && <CheckCircle2 size={16} className="ds-cycle-check" />}
                      </div>
                      <span className="ds-cycle-box-price">{formatINR(cPrice)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Service Configuration */}
              <div className="ds-form-section-header with-border">
                <Server size={18} className="ds-form-icon" />
                <h3>3. Server Configuration</h3>
              </div>

              {/* Web Hosting: Domain prompt */}
              {isWebHosting && (
                <div className="ds-input-group">
                  <label>
                    Primary Domain Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="e.g. yourbrand.com or yourname.in"
                    className="ds-input"
                  />
                  <span className="ds-input-help">
                    Your cPanel account and web root will be created for this domain.
                  </span>
                </div>
              )}

              {/* VDS Bare-Metal: OS prompt */}
              {isBareMetalVds && (
                <div className="ds-input-group">
                  <label>Operating System Installation</label>
                  <select
                    value={operatingSystem}
                    onChange={(e) => setOperatingSystem(e.target.value)}
                    className="ds-input ds-select"
                  >
                    {SUPPORTED_VDS_OS.map((os) => (
                      <option key={os.id} value={os.name}>
                        {os.icon} {os.name} ({os.tag})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="ds-input-group">
                <label>Datacenter Location</label>
                <select
                  value={serverRegion}
                  onChange={(e) => setServerRegion(e.target.value)}
                  className="ds-input ds-select"
                >
                  {SERVER_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.flag} {loc.name} (Ping: {loc.ping})
                    </option>
                  ))}
                </select>
              </div>

              {/* Prominent Direct Razorpay Pay Button */}
              <button
                type="submit"
                disabled={submitting}
                className="ds-pay-btn"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="spin-loader" />
                    <span>Connecting to Razorpay...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Pay {formatINR(totalAmount)} with Razorpay &amp; Auto-Deploy &rarr;</span>
                  </>
                )}
              </button>

              <div className="ds-checkout-footer-badges">
                <span><ShieldCheck size={14} /> 100% Safe UPI &amp; Cards</span>
                <span><Zap size={14} /> 60s Instant Setup</span>
                <span><Lock size={14} /> Official Pterodactyl</span>
              </div>

              {/* Sandbox quick testing simulation button */}
              <div className="ds-sandbox-test-row">
                <button
                  type="button"
                  onClick={handleTestSimulatePayment}
                  disabled={submitting}
                  className="ds-sandbox-btn"
                >
                  ⚡ Sandbox Mode: Test Simulated Instant Deploy
                </button>
              </div>
            </form>

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
                  <div className="ds-coupon-field-row">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. dataserware10)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponMsg && couponMsg.type === 'error') setCouponMsg(null);
                      }}
                      className="ds-coupon-text-input"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="ds-coupon-apply-btn"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <div className={`ds-coupon-feedback ${couponMsg.type}`}>
                      {couponMsg.type === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                      <span>{couponMsg.text}</span>
                      {appliedCoupon && (
                        <button type="button" onClick={handleRemoveCoupon} className="ds-coupon-remove-btn" title="Remove coupon">✕</button>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="ds-summary-pricing-list">
                  <div className="ds-pricing-line">
                    <span>Base Monthly Rate:</span>
                    <span>{formatPrice(plan.price)}/mo</span>
                  </div>
                  <div className="ds-pricing-line">
                    <span>Billing Duration:</span>
                    <span>{currentCycle.duration}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="ds-pricing-line ds-pricing-discount-row">
                      <span className="ds-text-green font-medium">10% Off ({appliedCoupon}):</span>
                      <span className="ds-text-green font-bold">- {formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="ds-pricing-line">
                    <span>DDoS Protection (1.2 Tbps):</span>
                    <span className="ds-text-green">INCLUDED</span>
                  </div>
                  <div className="ds-pricing-line">
                    <span>Automated Deployment:</span>
                    <span className="ds-text-green">INSTANT 60s</span>
                  </div>

                  <div className="ds-pricing-total-row">
                    <div>
                      <span className="ds-total-label">Total Due Today:</span>
                      <span className="ds-total-sub">All taxes &amp; fees included</span>
                    </div>
                    <span className="ds-total-amount">{formatINR(totalAmount)}</span>
                  </div>
                </div>

                {/* SLA Guarantee Note */}
                <div className="ds-summary-sla-box">
                  <ShieldCheck size={18} className="ds-sla-icon" />
                  <p>
                    <strong>Data Serware SLA Guarantee:</strong> 99.9% uptime with automated anti-DDoS mitigation, offsite daily backups, and 24/7 systems support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
