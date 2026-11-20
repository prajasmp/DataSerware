import React, { useState } from 'react';
import { VPS_PLANS, BILLING_CYCLES, calculatePriceForCycle } from '../data/plans';
import { useCurrency } from '../context/CurrencyContext';
import {
  Cpu,
  Server,
  Zap,
  HardDrive,
  Globe,
  Lock,
  ArrowRight,
  Sparkles,
  Terminal,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Activity,
  Layers,
  MessageSquare
} from 'lucide-react';

export default function VpsOverview() {
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedCycle, setSelectedCycle] = useState('1mo');
  const [activeFaq, setActiveFaq] = useState(null);
  const { formatPrice } = useCurrency();

  const currentCycle = BILLING_CYCLES.find(c => c.id === selectedCycle) || BILLING_CYCLES[0];

  const families = [
    { id: 'all', label: 'All VPS Tiers', count: VPS_PLANS.length },
    { id: 'ryzen-vps', label: 'AMD Ryzen Ultra VPS (5.7 GHz)', count: VPS_PLANS.filter(p => p.category === 'ryzen-vps').length },
    { id: 'amd-vps', label: 'AMD EPYC Cloud VPS', count: VPS_PLANS.filter(p => p.category === 'amd-vps').length },
    { id: 'intel-vps', label: 'Intel Cloud VPS', count: VPS_PLANS.filter(p => p.category === 'intel-vps').length }
  ];

  const filteredPlans = selectedFamily === 'all'
    ? VPS_PLANS
    : VPS_PLANS.filter(p => p.category === selectedFamily);

  const supportedOS = [
    { name: 'Ubuntu 24.04 LTS', tag: 'Noble Numbat', icon: '🐧' },
    { name: 'Ubuntu 22.04 LTS', tag: 'Jammy Jellyfish', icon: '🐧' },
    { name: 'Debian 12', tag: 'Bookworm', icon: '🍥' },
    { name: 'AlmaLinux 9', tag: 'RHEL 9 Compatible', icon: '🛡️' },
    { name: 'Rocky Linux 9', tag: 'Enterprise', icon: '🪨' },
    { name: 'Alpine Linux 3.20', tag: 'Ultra-Lightweight', icon: '🏔️' }
  ];

  const faqs = [
    {
      q: 'What is a Data Serware Cloud VPS and how is it virtualized?',
      a: 'Data Serware Cloud VPS instances utilize KVM (Kernel-based Virtual Machine) hardware virtualization. Every instance is allocated 100% dedicated CPU slices, unshared DDR4/DDR5 RAM, high-speed Gen4 NVMe storage, and a dedicated public IPv4 address with zero hypervisor contention.'
    },
    {
      q: 'How does purchasing via Discord work?',
      a: 'All purchases and server provisioning are handled directly through our official Discord community (https://dsc.gg/dataserware). Simply join our Discord, open a purchase ticket in #tickets, specify your desired VPS plan, and our deployment staff and automated bots configure and deliver your server credentials immediately.'
    },
    {
      q: 'Do I get full root access and custom OS installation?',
      a: 'Yes! Every VPS includes unrestricted root administrative access via SSH and web VNC console. You can install any modern Linux distribution (Ubuntu, Debian, AlmaLinux, Rocky, Alpine) or upload custom ISOs upon request in your ticket.'
    },
    {
      q: 'Is 1.2 Tbps DDoS protection included with all VPS instances?',
      a: 'Yes, absolutely. Every Cloud VPS comes protected by our enterprise-grade DDoS filtering shield with automated mitigation against Layer-3, Layer-4, and Layer-7 attacks with zero extra fees.'
    },
    {
      q: 'Can I scale up my VPS resources (RAM, CPU, NVMe) later?',
      a: 'Yes! You can scale your VPS resources seamlessly at any time by opening a ticket on our Discord server. Resource scaling is fast with zero data loss.'
    },
    {
      q: 'Where are the VPS datacenters located?',
      a: 'Our primary VPS node cluster is hosted in Mumbai, India, offering ultra-low 8-18ms ping across India. We also operate nodes in Singapore (35-50ms), Frankfurt, Germany (110-130ms), and Virginia, USA.'
    }
  ];

  return (
    <div className="ds-vps-page">
      {/* 1. HERO SECTION */}
      <section className="ds-vps-hero">
        <div className="container">
          <div className="ds-hero-pill">
            <Sparkles size={14} className="ds-sparkle-icon" />
            <span>HIGH-FREQUENCY KVM INFRASTRUCTURE</span>
          </div>

          <h1 className="ds-vps-title">
            Enterprise <span className="ds-gradient-text">Cloud VPS</span> Solutions
          </h1>

          <p className="ds-vps-subtitle">
            Engineered for high performance, reliability, and security. Powered by AMD Ryzen™ 9 7950X, AMD EPYC, and Intel Xeon processors with 100% dedicated vCPU allocations, enterprise Gen4 NVMe, and dedicated IPv4.
          </p>

          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://dsc.gg/dataserware"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-hero-btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <MessageSquare size={16} />
              <span>Join Discord &amp; Get Instantly</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#vps-tiers"
              className="ds-hero-btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <span>View All 18 VPS Tiers &darr;</span>
            </a>
          </div>

          <div className="ds-hero-stats-row">
            <div className="ds-stat-item">
              <span className="stat-number">Up to 5.7 GHz</span>
              <span className="stat-label">Max Boost Clock</span>
            </div>
            <div className="ds-stat-divider" />
            <div className="ds-stat-item">
              <span className="stat-number">Gen4 NVMe</span>
              <span className="stat-label">Up to 7,000 MB/s SSD</span>
            </div>
            <div className="ds-stat-divider" />
            <div className="ds-stat-item">
              <span className="stat-number">1 Gbps</span>
              <span className="stat-label">Dedicated Uplink</span>
            </div>
            <div className="ds-stat-divider" />
            <div className="ds-stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Dedicated vCPU (KVM)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL ADVANTAGES (4 HIGHLIGHT CARDS) */}
      <section className="container" style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: '#0f0d1a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '1rem' }}>
              <Cpu size={20} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Guaranteed Compute</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Zero CPU throttling and no noisy neighbors. Every core assigned to your instance is strictly guaranteed via hardware KVM isolation.
            </p>
          </div>

          <div style={{ background: '#0f0d1a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '1rem' }}>
              <HardDrive size={20} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Enterprise Gen4 NVMe</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              RAID-10 protected PCIe 4.0 NVMe storage arrays delivering ultra-fast random IOPS for heavy databases and compile workloads.
            </p>
          </div>

          <div style={{ background: '#0f0d1a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(74, 222, 128, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', marginBottom: '1rem' }}>
              <Globe size={20} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Dedicated Clean IPv4</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Every VPS includes a static public IPv4 with clean reputation. Reverse DNS (PTR) configuration is available upon ticket request.
            </p>
          </div>

          <div style={{ background: '#0f0d1a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(251, 191, 36, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1rem' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>1.2 Tbps DDoS Defense</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Multi-layered enterprise DDoS mitigation filters Layer-3, Layer-4, and volumetric floods automatically without latency spikes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VPS PLANS SHOWCASE */}
      <section className="container" id="vps-tiers" style={{ marginBottom: '4rem' }}>
        {/* Family Switcher */}
        <div className="ds-family-selector-wrap">
          <div className="ds-family-tabs">
            {families.map((fam) => (
              <button
                key={fam.id}
                type="button"
                onClick={() => setSelectedFamily(fam.id)}
                className={`ds-family-tab-btn ${selectedFamily === fam.id ? 'active' : ''}`}
              >
                <span>{fam.label}</span>
                <span className="badge-count">{fam.count}</span>
              </button>
            ))}
          </div>

          {/* Billing Cycle Switcher */}
          <div className="ds-billing-cycle-selector">
            <span className="cycle-title">Term:</span>
            <div className="ds-cycle-pills">
              {BILLING_CYCLES.map((cycle) => (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setSelectedCycle(cycle.id)}
                  className={`ds-cycle-pill-btn ${selectedCycle === cycle.id ? 'active' : ''}`}
                >
                  <span>{cycle.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Discord Notice Strip */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(88, 101, 242, 0.1)', border: '1px solid rgba(88, 101, 242, 0.25)', borderRadius: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c7d2fe', fontSize: '0.9rem' }}>
            <MessageSquare size={18} style={{ color: '#5865F2' }} />
            <span>All VPS configurations are provisioned instantly through Discord tickets with 24/7 staff support. Mention <strong>dataserware10</strong> for 10% OFF!</span>
          </div>
          <a
            href="https://dsc.gg/dataserware"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#a5b4fc', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Open Ticket</span> &rarr;
          </a>
        </div>

        {/* VPS Cards Grid */}
        <div className="ds-vps-cards-grid">
          {filteredPlans.map((plan) => {
            const cyclePrice = calculatePriceForCycle(plan.price, currentCycle.months);
            const isRyzen = plan.category === 'ryzen-vps';

            return (
              <div
                key={plan.id}
                className={`ds-vps-card ${isRyzen ? 'flagship' : ''}`}
              >
                {/* Header Tag */}
                <div className="ds-card-top-tag">
                  <span className="ds-tag-text">
                    {isRyzen ? '⚡ AMD RYZEN HIGH-CLOCK' : plan.category === 'amd-vps' ? '🚀 AMD EPYC DENSITY' : '🛡️ INTEL CLOUD KVM'}
                  </span>
                  {plan.badge && (
                    <span className="ds-badge-pill">{plan.badge}</span>
                  )}
                </div>

                {/* Plan Name & Processor */}
                <h3 className="ds-card-title">{plan.name}</h3>
                <span className="ds-card-subtitle">{plan.cpu}</span>

                {/* Price Display */}
                <div className="ds-card-pricing-block">
                  <div className="ds-price-row">
                    <span className="ds-price-number">{formatPrice(cyclePrice)}</span>
                    <span className="ds-price-period">/{currentCycle.duration}</span>
                  </div>
                  {currentCycle.months > 1 && (
                    <span className="ds-price-effective">
                      Effective: {formatPrice(plan.price)}/mo
                    </span>
                  )}
                </div>

                {/* Hardware Spec Badges */}
                <div className="ds-specs-grid">
                  <div className="ds-spec-item">
                    <Cpu size={15} className="ds-spec-icon" />
                    <span>{plan.cpu}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Activity size={15} className="ds-spec-icon" />
                    <span>{plan.ram}</span>
                  </div>
                  <div className="ds-spec-item">
                    <HardDrive size={15} className="ds-spec-icon" />
                    <span>{plan.storage}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Globe size={15} className="ds-spec-icon" />
                    <span>1 Dedicated IPv4</span>
                  </div>
                  <div className="ds-spec-item bonus">
                    <Zap size={15} className="ds-spec-icon bonus" />
                    <span>1 Gbps Port Speed</span>
                  </div>
                  <div className="ds-spec-item bonus">
                    <Lock size={15} className="ds-spec-icon bonus" />
                    <span>Full Root Access</span>
                  </div>
                </div>

                {/* Order Button pointing to Discord */}
                <a
                  href="https://dsc.gg/dataserware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ds-card-btn ${isRyzen ? 'flagship-btn' : ''}`}
                >
                  <span>Join Discord &amp; Get Instantly</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. OPERATING SYSTEM SHOWCASE */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="ds-os-showcase-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">OS DISTRIBUTIONS</span>
            <h2 className="ds-section-title">Pre-Installed Linux Templates</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
              Instant automated OS deployment. Clean minimal images configured with SSH root keys and optimized kernel sysctl profiles.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            {supportedOS.map((os, i) => (
              <div
                key={i}
                style={{
                  background: '#0a0812',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '2rem', marginBottom: '4px' }}>{os.icon}</span>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{os.name}</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{os.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DATACENTER LOCATIONS & NETWORK BENCHMARKS */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ background: '#0f0d1a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2.5rem' }}>
          <div className="ds-section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="ds-section-tag">GLOBAL NETWORK</span>
            <h2 className="ds-section-title" style={{ margin: '4px 0 8px' }}>Low-Latency Datacenter Clusters</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0 }}>
              Strategically deployed across major internet exchanges with direct peering to national telecom providers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#0a0812', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🇮🇳</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', background: 'rgba(74, 222, 128, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>Optimal Ping</span>
              </div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>Mumbai, India</h4>
              <span style={{ color: '#c084fc', fontSize: '0.86rem', fontWeight: 600, display: 'block' }}>Ping: 8-18ms (Nationwide)</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Equinix MBX • 100 Gbps Peering</span>
            </div>

            <div style={{ background: '#0a0812', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🇸🇬</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>Asia Hub</span>
              </div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>Singapore</h4>
              <span style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, display: 'block' }}>Ping: 35-50ms</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Equinix SG1 • Direct APAC Transit</span>
            </div>

            <div style={{ background: '#0a0812', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🇩🇪</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', background: 'rgba(251, 191, 36, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>Europe Hub</span>
              </div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>Frankfurt, Germany</h4>
              <span style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, display: 'block' }}>Ping: 110-130ms</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Interxion FRA • DE-CIX Backbone</span>
            </div>

            <div style={{ background: '#0a0812', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🇺🇸</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>US East</span>
              </div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>Virginia, USA</h4>
              <span style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, display: 'block' }}>Ping: 160-190ms</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Ashburn DC • Direct North America</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL FAQ ACCORDION */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="ds-faq-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="ds-section-title">Cloud VPS FAQ</h2>
          </div>

          <div className="ds-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`ds-faq-card ${isOpen ? 'active' : ''}`}
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                >
                  <div className="ds-faq-question-row">
                    <h3>{faq.q}</h3>
                    <ChevronDown size={18} className={`ds-faq-chevron ${isOpen ? 'rotate' : ''}`} />
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
      </section>
    </div>
  );
}
