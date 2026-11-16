import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import DataSerwareLogo from '../components/DataSerwareLogo';
import {
  CATEGORIES, CATEGORY_GROUPS, SERVER_LOCATIONS,
  ALL_GAME_PLANS, ALL_VPS_PLANS, WEB_HOSTING_PLANS,
  BOT_HOSTING_PLANS, DOMAIN_PLANS, VDS_RYZEN9_PLANS,
  VDS_RYZEN7_PLANS, VDS_XEON_PLANS
} from '../data/plans';
import {
  CreditCard, ShoppingCart, Server, FileText, Headphones,
  CheckCircle2, ArrowRight, Shield, Zap, Search, Globe,
  ExternalLink, LogIn, UserPlus, Clock, Download, Tag,
  Cpu, HardDrive, RefreshCw, AlertCircle, Plus, ChevronRight,
  Terminal, ShieldCheck, Check, DollarSign
} from 'lucide-react';

export default function ClientBilling() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();
  const { currency, toggleCurrency, formatPrice } = useCurrency();

  // Parse URL query params (e.g. ?plan=ryzen-8gb or ?tab=services)
  const queryParams = new URLSearchParams(location.search);
  const planQuery = queryParams.get('plan');
  const tabQuery = queryParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabQuery || (planQuery ? 'cart' : 'store'));
  const [storeCategory, setStoreCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Currency multiplier for display if needed
  const currencyMultiplier = currency === 'USD' ? 0.012 : 1;

  // Compile full catalog for the storefront
  const allCatalogPlans = [
    ...ALL_GAME_PLANS,
    ...ALL_VPS_PLANS,
    ...WEB_HOSTING_PLANS,
    ...VDS_RYZEN9_PLANS,
    ...BOT_HOSTING_PLANS
  ];

  // Active Plan in Cart/Checkout configuration
  const initialPlan = allCatalogPlans.find(p => p.id === planQuery) || ALL_GAME_PLANS[1] || allCatalogPlans[0];
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);

  // Cart Configuration options
  const [serverHostname, setServerHostname] = useState('smp.dataserware.net');
  const [selectedLocation, setSelectedLocation] = useState(SERVER_LOCATIONS[0].name);
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, quarterly, annual
  const [serverSoftware, setServerSoftware] = useState('Paper 1.21 (Recommended)');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [orderCompleteData, setOrderCompleteData] = useState(null);

  // Demo client mode if not logged in
  const [demoLoggedIn, setDemoLoggedIn] = useState(true);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [clientEmail, setClientEmail] = useState('demo.client@dataserware.com');
  const [clientPassword, setClientPassword] = useState('••••••••••••');

  // Client Services list (supports additions upon checkout)
  const [services, setServices] = useState([
    {
      id: 'ds-mc-01',
      name: 'DataSerware SMP - Minecraft',
      planName: 'Ryzen 9 7950X Extreme 8 GB',
      category: 'Minecraft Java',
      status: 'Active',
      ip: '142.132.89.44:25565',
      node: 'node-01.mumbai.dataserware.net',
      location: 'Mumbai, India',
      ram: '8 GB DDR5',
      storage: '80 GB NVMe',
      nextDue: '2026-12-16',
      amount: '₹649/mo'
    },
    {
      id: 'ds-vps-02',
      name: 'Cloud Production VPS (Ubuntu 22.04)',
      planName: 'Ryzen Ultra VPS 16 GB',
      category: 'Cloud VPS',
      status: 'Active',
      ip: '185.193.125.10',
      node: 'node-04.singapore.dataserware.net',
      location: 'Singapore',
      ram: '16 GB RAM',
      storage: '160 GB Gen4 NVMe',
      nextDue: '2026-12-28',
      amount: '₹1,539/mo'
    }
  ]);

  // Client Invoices
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-DSW-2026-881',
      date: '16 Nov 2026',
      service: 'Ryzen 9 7950X Extreme 8 GB',
      amount: 649,
      status: 'PAID',
      method: 'Razorpay UPI'
    },
    {
      id: 'INV-DSW-2026-724',
      date: '28 Oct 2026',
      service: 'Cloud Production VPS 16 GB',
      amount: 1539,
      status: 'PAID',
      method: 'Credit Card'
    },
    {
      id: 'INV-DSW-2026-904',
      date: '14 Nov 2026',
      service: 'cPanel Web Hosting (SERWARE SOLO)',
      amount: 24.20,
      status: 'UNPAID',
      method: 'Pending'
    }
  ]);

  // Client Support Tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TICK-9021',
      subject: 'Custom subdomain DNS CNAME routing request',
      department: 'Technical Support',
      priority: 'Normal',
      status: 'Answered',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'TICK-8842',
      subject: 'Inquiry on Port 25565 allocation for secondary proxy',
      department: 'Network Operations',
      priority: 'Low',
      status: 'Resolved',
      lastUpdated: '3 days ago'
    }
  ]);

  const [newTicketModal, setNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDept, setTicketDept] = useState('Technical Support');
  const [ticketPriority, setTicketPriority] = useState('Normal');
  const [ticketMessage, setTicketMessage] = useState('');

  // If a plan is passed in query, set it
  useEffect(() => {
    if (planQuery) {
      const found = allCatalogPlans.find(p => p.id === planQuery);
      if (found) {
        setSelectedPlan(found);
        setActiveTab('cart');
      }
    }
  }, [planQuery]);

  // Handle promo code application
  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'SERWARE20' || code === 'LAUNCH20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Promotional Discount Applied Successfully!');
    } else if (code === 'SAVE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Discount Applied!');
    } else {
      setPromoError('Invalid coupon code. Try SERWARE20 for 20% off.');
      setDiscountPercent(0);
    }
  };

  // Calculate pricing
  const basePrice = selectedPlan ? (selectedPlan.price || 499) : 499;
  let cycleMultiplier = 1;
  let cycleDiscount = 0;
  if (billingCycle === 'quarterly') {
    cycleMultiplier = 3;
    cycleDiscount = 0.10; // 10% discount for quarterly
  } else if (billingCycle === 'annual') {
    cycleMultiplier = 12;
    cycleDiscount = 0.20; // 20% discount for annual
  }

  const rawSubtotal = basePrice * cycleMultiplier;
  const cycleSavings = rawSubtotal * cycleDiscount;
  const subtotalAfterCycle = rawSubtotal - cycleSavings;
  const promoSavings = subtotalAfterCycle * (discountPercent / 100);
  const finalPrice = Math.max(0, subtotalAfterCycle - promoSavings);

  // Handle complete checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    const newServiceId = `ds-srv-${Math.random().toString(36).substr(2, 6)}`;
    const newInvoiceId = `INV-DSW-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newServiceObj = {
      id: newServiceId,
      name: `${serverHostname} (${selectedPlan.name})`,
      planName: selectedPlan.name,
      category: selectedPlan.category || 'Game / VPS Cloud',
      status: 'Active',
      ip: `142.132.${Math.floor(10 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 200)}:25565`,
      node: `node-0${Math.floor(1 + Math.random() * 3)}.dataserware.net`,
      location: selectedLocation,
      ram: selectedPlan.ram || '8 GB RAM',
      storage: selectedPlan.storage || '60 GB NVMe',
      nextDue: '2026-12-16',
      amount: formatPrice(finalPrice)
    };

    const newInvoiceObj = {
      id: newInvoiceId,
      date: '16 Nov 2026',
      service: selectedPlan.name,
      amount: finalPrice,
      status: 'PAID',
      method: paymentMethod.toUpperCase()
    };

    setServices([newServiceObj, ...services]);
    setInvoices([newInvoiceObj, ...invoices]);
    setOrderCompleteData({
      service: newServiceObj,
      invoice: newInvoiceObj,
      plan: selectedPlan
    });
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    const newTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      department: ticketDept,
      priority: ticketPriority,
      status: 'Open',
      lastUpdated: 'Just now'
    };
    setTickets([newTicket, ...tickets]);
    setNewTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  // Filter storefront plans
  const filteredCatalog = allCatalogPlans.filter(p => {
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.ram && p.ram.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.cpu && p.cpu.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (storeCategory === 'all') return true;
    if (storeCategory === 'minecraft') return p.category === 'intel' || p.category === 'amd' || p.category === 'ryzen';
    if (storeCategory === 'vps') return p.category && p.category.includes('vps');
    if (storeCategory === 'web') return p.category === 'web-hosting';
    if (storeCategory === 'vds') return p.category && p.category.includes('vds');
    if (storeCategory === 'bot') return p.category === 'bot-hosting';
    return true;
  });

  return (
    <div className="client-portal-wrapper" style={{ minHeight: '100vh', background: '#020611', color: '#f8fafc', paddingBottom: '4rem' }}>

      {/* Subdomain Header Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #040d1f 0%, #081d33 50%, #040d1f 100%)',
        borderBottom: '1px solid rgba(0, 242, 254, 0.25)',
        padding: '12px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              PORTAL B: CLIENT &amp; BILLING
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#94a3b8' }}>
              Subdomain: <strong style={{ color: '#00f2fe' }}>client.dataserware.com</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.82rem', textDecoration: 'none' }}
              title="Return to Main Marketing Website"
            >
              <Globe size={13} style={{ color: '#00f2fe' }} />
              <span>Main Website</span>
            </Link>
            <span style={{ color: '#334155' }}>|</span>
            <Link
              to="/panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
              title="Switch to Server Control Panel"
            >
              <Terminal size={13} />
              <span>Launch Control Panel &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Client Portal Navigation Bar */}
      <div style={{
        background: 'rgba(10, 21, 40, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 1rem', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <DataSerwareLogo size={32} showText={true} portalTag="Client Area" />
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('store')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'store' ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: activeTab === 'store' ? '#00f2fe' : '#94a3b8',
                borderBottom: activeTab === 'store' ? '2px solid #00f2fe' : '2px solid transparent'
              }}
            >
              <ShoppingCart size={14} />
              <span>Storefront</span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'cart' ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: activeTab === 'cart' ? '#00f2fe' : '#94a3b8',
                borderBottom: activeTab === 'cart' ? '2px solid #00f2fe' : '2px solid transparent'
              }}
            >
              <CreditCard size={14} />
              <span>Configure &amp; Checkout</span>
              {selectedPlan && (
                <span style={{ background: '#00f2fe', color: '#020611', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>
                  1
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'services' ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: activeTab === 'services' ? '#00f2fe' : '#94a3b8',
                borderBottom: activeTab === 'services' ? '2px solid #00f2fe' : '2px solid transparent'
              }}
            >
              <Server size={14} />
              <span>My Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'invoices' ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: activeTab === 'invoices' ? '#00f2fe' : '#94a3b8',
                borderBottom: activeTab === 'invoices' ? '2px solid #00f2fe' : '2px solid transparent'
              }}
            >
              <FileText size={14} />
              <span>Invoices</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'tickets' ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: activeTab === 'tickets' ? '#00f2fe' : '#94a3b8',
                borderBottom: activeTab === 'tickets' ? '2px solid #00f2fe' : '2px solid transparent'
              }}
            >
              <Headphones size={14} />
              <span>Support Tickets</span>
            </button>
          </div>

          {/* User Account & Currency Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={toggleCurrency}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {currency === 'INR' ? 'INR ₹' : 'USD $'}
            </button>

            {user || demoLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f2fe, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#030712', fontWeight: 800, fontSize: '0.75rem' }}>
                  {user ? (user.displayName?.[0] || 'U') : 'D'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                    {user ? user.displayName : 'Demo Client'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#34d399' }}>● Verified Account</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                style={{
                  background: 'linear-gradient(135deg, #00f2fe, #06b6d4)',
                  color: '#020611',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <LogIn size={13} />
                <span>Client Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '2rem' }}>

        {/* TAB 1: STOREFRONT & PRODUCT CATALOG */}
        {activeTab === 'store' && (
          <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <span style={{ color: '#00f2fe', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  DATA SERWARE PRODUCT STOREFRONT
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 0', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                  Choose Your Infrastructure Tier
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: '4px 0 0' }}>
                  Select any high-performance server plan to customize locations, operating systems, and automated deployment.
                </p>
              </div>

              {/* Search & Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by RAM, CPU..."
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '8px 12px 8px 34px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      width: '220px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'all', label: 'All Products' },
                { id: 'minecraft', label: 'Minecraft & Game Servers' },
                { id: 'vps', label: 'Cloud VPS & RDP' },
                { id: 'vds', label: 'Bare-Metal VDS' },
                { id: 'web', label: 'cPanel Web Hosting' },
                { id: 'bot', label: 'Discord Bot Hosting' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setStoreCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    border: '1px solid',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: storeCategory === cat.id ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(6, 182, 212, 0.2))' : 'rgba(15, 23, 42, 0.6)',
                    borderColor: storeCategory === cat.id ? '#00f2fe' : 'rgba(255, 255, 255, 0.08)',
                    color: storeCategory === cat.id ? '#00f2fe' : '#94a3b8'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Plans Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredCatalog.map(plan => (
                <div
                  key={plan.id}
                  style={{
                    background: 'linear-gradient(180deg, #071529 0%, #030a16 100%)',
                    border: '1px solid rgba(0, 242, 254, 0.18)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'transform 0.2s, border-color 0.2s',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                  }}
                >
                  {plan.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #00f2fe, #38bdf8)',
                      color: '#030712',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {CATEGORIES[plan.category] || plan.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '4px 0 12px' }}>
                      {plan.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
                        {formatPrice(plan.price)}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>/{plan.period || 'month'}</span>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                        {plan.ram && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Cpu size={14} style={{ color: '#00f2fe' }} />
                            <span>{plan.ram}</span>
                          </div>
                        )}
                        {plan.cpu && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={14} style={{ color: '#38bdf8' }} />
                            <span>{plan.cpu}</span>
                          </div>
                        )}
                        {plan.storage && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <HardDrive size={14} style={{ color: '#22c55e' }} />
                            <span>{plan.storage}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setActiveTab('cart');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #00f2fe 0%, #06b6d4 100%)',
                      color: '#020611',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 16px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)'
                    }}
                  >
                    <span>Configure &amp; Order</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONFIGURE & CHECKOUT (ACCEPT PLAN FROM MAIN WEBSITE) */}
        {activeTab === 'cart' && (
          <div>
            {orderCompleteData ? (
              /* Order Completed State */
              <div style={{
                maxWidth: '650px',
                margin: '2rem auto',
                background: 'linear-gradient(180deg, #081d33 0%, #030c1a 100%)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                borderRadius: '24px',
                padding: '2.5rem',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
              }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981' }}>
                  <CheckCircle2 size={36} />
                </div>
                <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  ORDER PROVISIONED AUTOMATICALLY
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '8px 0 1rem' }}>
                  Your Server is Live!
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Service <strong>{orderCompleteData.service.name}</strong> has been allocated on node <strong>{orderCompleteData.service.node}</strong> with IP <code>{orderCompleteData.service.ip}</code>.
                </p>

                <div style={{ background: '#020611', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', textAlign: 'left', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#94a3b8' }}>Invoice ID:</span>
                    <strong style={{ color: '#fff' }}>{orderCompleteData.invoice.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#94a3b8' }}>Dedicated IP:</span>
                    <strong style={{ color: '#00f2fe', fontFamily: 'monospace' }}>{orderCompleteData.service.ip}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#94a3b8' }}>Status:</span>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>● RUNNING / PROVISIONED</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {/* DIRECT BUTTON TO CONTROL PANEL (PORTAL C) */}
                  <Link
                    to={`/panel`}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <Terminal size={18} />
                    <span>Manage in Control Panel (Portal C) &rarr;</span>
                  </Link>

                  <button
                    onClick={() => {
                      setOrderCompleteData(null);
                      setActiveTab('services');
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#fff',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    View All My Services
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Cart / Configurator */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

                {/* Left Column: Server Configuration */}
                <div style={{ background: '#071529', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '20px', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        Step 1: Configure Your Service
                      </span>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                        {selectedPlan ? selectedPlan.name : 'Select a Plan'}
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('store')}
                      style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Change Plan
                    </button>
                  </div>

                  {/* Config Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Server Hostname */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                        Server Hostname / Subdomain
                      </label>
                      <input
                        type="text"
                        value={serverHostname}
                        onChange={(e) => setServerHostname(e.target.value)}
                        placeholder="e.g. smp.dataserware.net"
                        style={{
                          width: '100%',
                          background: '#020611',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontFamily: 'JetBrains Mono, monospace'
                        }}
                      />
                    </div>

                    {/* Datacenter Location */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                        Datacenter Region
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                        {SERVER_LOCATIONS.map(loc => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => setSelectedLocation(loc.name)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: '1px solid',
                              background: selectedLocation === loc.name ? 'rgba(0, 242, 254, 0.15)' : '#020611',
                              borderColor: selectedLocation === loc.name ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                              color: selectedLocation === loc.name ? '#00f2fe' : '#cbd5e1',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{loc.flag} {loc.name.split(',')[0]}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Ping: {loc.ping}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Billing Cycle Switcher */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                        Billing Cycle
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setBillingCycle('monthly')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid',
                            background: billingCycle === 'monthly' ? 'rgba(0, 242, 254, 0.15)' : '#020611',
                            borderColor: billingCycle === 'monthly' ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                            color: billingCycle === 'monthly' ? '#00f2fe' : '#cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>1 Month</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Standard</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBillingCycle('quarterly')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid',
                            background: billingCycle === 'quarterly' ? 'rgba(0, 242, 254, 0.15)' : '#020611',
                            borderColor: billingCycle === 'quarterly' ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                            color: billingCycle === 'quarterly' ? '#00f2fe' : '#cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>3 Months</div>
                          <div style={{ fontSize: '0.7rem', color: '#22c55e' }}>Save 10%</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBillingCycle('annual')}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid',
                            background: billingCycle === 'annual' ? 'rgba(0, 242, 254, 0.15)' : '#020611',
                            borderColor: billingCycle === 'annual' ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                            color: billingCycle === 'annual' ? '#00f2fe' : '#cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>12 Months</div>
                          <div style={{ fontSize: '0.7rem', color: '#22c55e' }}>Save 20%</div>
                        </button>
                      </div>
                    </div>

                    {/* Server Operating System / Software */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                        Server Software / Operating System
                      </label>
                      <select
                        value={serverSoftware}
                        onChange={(e) => setServerSoftware(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#020611',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#fff',
                          fontSize: '0.9rem'
                        }}
                      >
                        <option value="Paper 1.21 (Recommended)">PaperMC 1.21.3 (Ultra Optimized)</option>
                        <option value="Purpur 1.21">Purpur 1.21 (High-Performance)</option>
                        <option value="Forge 1.20.1">Forge 1.20.1 (Modpack Ready)</option>
                        <option value="Fabric 1.21">Fabric 1.21 (Lightweight Mods)</option>
                        <option value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS (KVM Cloud VPS)</option>
                        <option value="Debian 12 Bookworm">Debian 12 Bookworm (Minimal)</option>
                        <option value="Windows Server 2022">Windows Server 2022 (RDP Remote Desktop)</option>
                        <option value="Node.js 20 LTS">Node.js 20 LTS (Discord Bot)</option>
                        <option value="Python 3.11">Python 3.11 (Bot / AI)</option>
                      </select>
                    </div>

                    {/* Promo Code Input */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                        Promotional Coupon (Try SERWARE20)
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Coupon Code"
                          style={{
                            flex: 1,
                            background: '#020611',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase'
                          }}
                        />
                        <button
                          type="button"
                          onClick={applyPromo}
                          style={{
                            background: 'rgba(0, 242, 254, 0.2)',
                            border: '1px solid #00f2fe',
                            color: '#00f2fe',
                            padding: '0 16px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          Apply
                        </button>
                      </div>
                      {promoSuccess && (
                        <div style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> {promoSuccess}
                        </div>
                      )}
                      {promoError && (
                        <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>
                          {promoError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Order Summary & Checkout */}
                <div style={{ background: '#071529', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '20px', padding: '2rem', height: 'fit-content' }}>
                  <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    Step 2: Order Summary
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '4px 0 1.25rem' }}>
                    Shopping Cart Total
                  </h3>

                  <div style={{ background: '#020611', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                      <span style={{ color: '#94a3b8' }}>Plan:</span>
                      <strong style={{ color: '#fff' }}>{selectedPlan ? selectedPlan.name : 'None'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                      <span style={{ color: '#94a3b8' }}>Cycle:</span>
                      <span style={{ color: '#cbd5e1', textTransform: 'capitalize' }}>{billingCycle}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                      <span style={{ color: '#94a3b8' }}>Location:</span>
                      <span style={{ color: '#cbd5e1' }}>{selectedLocation.split(',')[0]}</span>
                    </div>
                    {cycleDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem', color: '#22c55e' }}>
                        <span>Billing Cycle Discount:</span>
                        <span>-{formatPrice(cycleSavings)}</span>
                      </div>
                    )}
                    {discountPercent > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem', color: '#22c55e' }}>
                        <span>Coupon ({discountPercent}%):</span>
                        <span>-{formatPrice(promoSavings)}</span>
                      </div>
                    )}
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Total Due:</span>
                      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00f2fe' }}>
                        {formatPrice(finalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
                      Payment Gateway
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {[
                        { id: 'razorpay', label: 'Razorpay / UPI' },
                        { id: 'card', label: 'Debit / Credit Card' },
                        { id: 'paypal', label: 'PayPal (USD)' },
                        { id: 'crypto', label: 'Crypto (USDT)' }
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid',
                            background: paymentMethod === m.id ? 'rgba(0, 242, 254, 0.15)' : '#020611',
                            borderColor: paymentMethod === m.id ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                            color: paymentMethod === m.id ? '#00f2fe' : '#cbd5e1',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #00f2fe 0%, #06b6d4 100%)',
                      color: '#020611',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontWeight: 900,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 0 25px rgba(0, 242, 254, 0.35)'
                    }}
                  >
                    <ShieldCheck size={18} />
                    <span>Complete Order &amp; Auto-Provision</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.78rem', color: '#94a3b8' }}>
                    <Zap size={13} style={{ color: '#00f2fe' }} />
                    <span>Instant provisioning triggered to Pterodactyl node</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLIENT DASHBOARD - ACTIVE SERVICES */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  MY HOSTING INFRASTRUCTURE
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                  Active Server Services ({services.length})
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('store')}
                style={{
                  background: 'linear-gradient(135deg, #00f2fe, #06b6d4)',
                  color: '#020611',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} />
                <span>Deploy New Service</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.map(srv => (
                <div
                  key={srv.id}
                  style={{
                    background: '#071529',
                    border: '1px solid rgba(0, 242, 254, 0.2)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.25rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe' }}>
                      <Server size={24} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                          {srv.name}
                        </h3>
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                          ● {srv.status.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                        <span>IP: <strong style={{ color: '#00f2fe', fontFamily: 'monospace' }}>{srv.ip}</strong></span>
                        <span>&bull;</span>
                        <span>Node: {srv.node}</span>
                        <span>&bull;</span>
                        <span>{srv.ram}</span>
                        <span>&bull;</span>
                        <span>Renewal: {srv.nextDue}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* CRITICAL USER REQUIREMENT: DIRECT "MANAGE SERVER" BUTTON REDIRECTING TO CONTROL PANEL */}
                    <Link
                      to={`/panel`}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)'
                      }}
                    >
                      <Terminal size={15} />
                      <span>Manage Server (Control Panel)</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT INVOICES */}
        {activeTab === 'invoices' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                BILLING &amp; TRANSACTIONS
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                Account Invoices
              </h2>
            </div>

            <div style={{ background: '#071529', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#020611', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '14px 18px' }}>Invoice #</th>
                    <th style={{ padding: '14px 18px' }}>Date</th>
                    <th style={{ padding: '14px 18px' }}>Service / Description</th>
                    <th style={{ padding: '14px 18px' }}>Amount</th>
                    <th style={{ padding: '14px 18px' }}>Status</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#00f2fe', fontWeight: 700 }}>
                        {inv.id}
                      </td>
                      <td style={{ padding: '14px 18px', color: '#cbd5e1' }}>{inv.date}</td>
                      <td style={{ padding: '14px 18px', color: '#fff', fontWeight: 600 }}>{inv.service}</td>
                      <td style={{ padding: '14px 18px', color: '#fff', fontWeight: 700 }}>{formatPrice(inv.amount)}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: inv.status === 'PAID' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: inv.status === 'PAID' ? '#34d399' : '#f87171',
                          border: `1px solid ${inv.status === 'PAID' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          ● {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        {inv.status === 'PAID' ? (
                          <button
                            onClick={() => alert(`Receipt downloaded for ${inv.id}`)}
                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Download size={12} /> Receipt
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setInvoices(invoices.map(i => i.id === inv.id ? { ...i, status: 'PAID' } : i));
                              alert(`Invoice ${inv.id} marked as PAID!`);
                            }}
                            style={{ background: '#00f2fe', color: '#020611', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT TICKETS */}
        {activeTab === 'tickets' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  24/7 CLIENT HELPDESK
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                  Support Tickets
                </h2>
              </div>
              <button
                onClick={() => setNewTicketModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #00f2fe, #06b6d4)',
                  color: '#020611',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} />
                <span>Open New Ticket</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tickets.map(tick => (
                <div
                  key={tick.id}
                  style={{
                    background: '#071529',
                    border: '1px solid rgba(0, 242, 254, 0.15)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#00f2fe', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>{tick.id}</span>
                      <span style={{ color: '#64748b' }}>&bull;</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tick.department}</span>
                      <span style={{
                        background: tick.status === 'Answered' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: tick.status === 'Answered' ? '#38bdf8' : '#34d399',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '4px'
                      }}>
                        {tick.status}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                      {tick.subject}
                    </h4>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    Updated {tick.lastUpdated}
                  </div>
                </div>
              ))}
            </div>

            {/* New Ticket Modal */}
            {newTicketModal && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                <div style={{ background: '#071529', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '20px', padding: '2rem', maxWidth: '520px', width: '100%' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: 0 }}>Open Support Ticket</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '4px' }}>Subject</label>
                      <input
                        type="text"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="Brief summary of the issue"
                        style={{ width: '100%', background: '#020611', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '4px' }}>Department</label>
                      <select
                        value={ticketDept}
                        onChange={(e) => setTicketDept(e.target.value)}
                        style={{ width: '100%', background: '#020611', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }}
                      >
                        <option>Technical Support</option>
                        <option>Billing &amp; Payments</option>
                        <option>Network &amp; DDoS</option>
                        <option>Sales &amp; Custom Nodes</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '4px' }}>Message Details</label>
                      <textarea
                        rows={4}
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Describe your issue or request in detail..."
                        style={{ width: '100%', background: '#020611', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button
                        onClick={() => setNewTicketModal(false)}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateTicket}
                        style={{ background: '#00f2fe', color: '#020611', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: AUTHENTICATION (CLEAN LOGIN & REGISTER VIEWS) */}
        {activeTab === 'auth' && (
          <div style={{ maxWidth: '440px', margin: '2rem auto', background: '#071529', border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <DataSerwareLogo size={36} showText={true} />
            </div>

            {/* Toggle Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: '#020611', padding: '4px', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setAuthView('login')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: authView === 'login' ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  color: authView === 'login' ? '#00f2fe' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthView('register')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: authView === 'register' ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  color: authView === 'register' ? '#00f2fe' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setDemoLoggedIn(true); setActiveTab('services'); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '4px' }}>Email Address</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    style={{ width: '100%', background: '#020611', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '4px' }}>Password</label>
                  <input
                    type="password"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    required
                    style={{ width: '100%', background: '#020611', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{ width: '100%', background: 'linear-gradient(135deg, #00f2fe, #06b6d4)', color: '#020611', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', marginBottom: '1rem' }}
              >
                {authView === 'login' ? 'Sign In to Client Area' : 'Register Account'}
              </button>
            </form>

            <button
              onClick={() => { setDemoLoggedIn(true); setActiveTab('services'); }}
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#38bdf8', borderRadius: '10px', padding: '10px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              ⚡ Instant 1-Click Demo Client Access
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
