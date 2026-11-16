import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VDS_PLANS, BILLING_CYCLES, SUPPORTED_VDS_OS, calculatePriceForCycle } from '../data/plans';
import { useCurrency } from '../context/CurrencyContext';
import {
  Cpu,
  Server,
  Zap,
  ShieldAlert,
  HardDrive,
  Activity,
  Globe,
  Radio,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function VdsMachines() {
  const { family: urlFamily } = useParams();
  const [selectedFamily, setSelectedFamily] = useState(urlFamily || 'all');
  const [selectedCycle, setSelectedCycle] = useState('1mo');
  const [activeFaq, setActiveFaq] = useState(null);
  const { formatPrice } = useCurrency();

  const currentCycle = BILLING_CYCLES.find(c => c.id === selectedCycle) || BILLING_CYCLES[0];

  const families = [
    { id: 'all', label: 'All VDS Machines', count: VDS_PLANS.length },
    { id: 'ryzen9', label: 'AMD Ryzen 9 (Flagship)', count: 1 },
    { id: 'ryzen7', label: 'AMD Ryzen 7 Series', count: 2 },
    { id: 'xeon', label: 'Intel Xeon Series', count: 3 }
  ];

  const filteredPlans = selectedFamily === 'all'
    ? VDS_PLANS
    : VDS_PLANS.filter(p => p.family === selectedFamily);

  const cycleDiscounts = {
    '1mo': null,
    '3mo': 'Save 5%',
    '6mo': 'Save 10%',
    '12mo': 'Save 15%'
  };

  const faqs = [
    {
      q: "What is a Data Serware VDS Machine?",
      a: "Data Serware VDS Machines are pure dedicated bare-metal servers designed for extreme computing, heavy database clusters, virtualization nodes, and competitive game networks. You receive 100% of the physical hardware—no shared vCPUs, no hypervisor overhead, and zero noisy neighbors."
    },
    {
      q: "How does billing and deployment work for VDS Machines?",
      a: "You can purchase VDS machines for 1 Month, 3 Months, 6 Months, or 1 Year with automatic multi-month discounts. Upon successful payment verification, our automated NOC provisioning engine prepares the hardware, installs your selected OS, tests network uplinks, and delivers login credentials."
    },
    {
      q: "Is IPMI / KVM out-of-band management included?",
      a: "Yes! Dedicated IPMI / KVM access is included across supported machines, providing you with full hardware-level remote control, BIOS configuration, and custom ISO mounting capabilities."
    },
    {
      q: "What DDoS mitigation is included?",
      a: "All VDS machines come protected by Data Serware's multi-layered Enterprise Anti-DDoS infrastructure with real-time BGP filtering and Cloudflare Magic Transit on supported clusters."
    },
    {
      q: "Can I install Windows Server on a VDS machine?",
      a: "Yes! We support Windows Server 2022 and 2025 (BYOL / Evaluation) alongside enterprise Linux distributions including Ubuntu 24.04/22.04 LTS, Debian 12/13, and AlmaLinux 9."
    }
  ];

  return (
    <div className="ds-page-container">
      {/* Background Ambient Glow */}
      <div className="ds-ambient-glow-top" />

      <div className="ds-content-wrap">
        {/* Page Hero */}
        <div className="ds-page-hero">
          <div className="ds-hero-badge">
            <Radio size={14} className="ds-badge-sparkle" />
            <span>Dedicated Bare-Metal Architecture</span>
          </div>

          <h1 className="ds-page-title">
            Data Serware <span className="ds-gradient-text">VDS Machines</span>
          </h1>

          <p className="ds-page-subtitle">
            Dedicated physical bare-metal hardware for mission-critical operations. Powered by flagship AMD Ryzen 9 9950X, Ryzen 7, and Intel Xeon multi-threaded processors on unmetered 1 Gbps uplinks.
          </p>

          {/* Family Filter Tabs */}
          <div className="ds-family-tabs">
            {families.map((fam) => (
              <button
                key={fam.id}
                onClick={() => setSelectedFamily(fam.id)}
                className={`ds-family-btn ${selectedFamily === fam.id ? 'active' : ''}`}
              >
                <span>{fam.label}</span>
                <span className="ds-fam-count">({fam.count})</span>
              </button>
            ))}
          </div>

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

        {/* VDS Plans Grid */}
        <div className="ds-cards-grid">
          {filteredPlans.map((plan) => {
            const cyclePrice = calculatePriceForCycle(plan.price, currentCycle.months);
            const isFlagship = plan.family === 'ryzen9';

            return (
              <div
                key={plan.id}
                className={`ds-hosting-card ${isFlagship ? 'flagship-card' : ''}`}
              >
                {plan.badge && (
                  <div className="ds-card-badge-pill flagship">
                    <Sparkles size={12} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="ds-card-header">
                  <div className="ds-card-title-row">
                    <h3 className="ds-card-title">{plan.name}</h3>
                    <div className="ds-card-icon-wrap">
                      <Cpu size={20} />
                    </div>
                  </div>
                  <p className="ds-card-desc">
                    {plan.processor} &bull; {plan.cores}
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
                    <Cpu size={15} className="ds-spec-icon" />
                    <span><strong>{plan.cpu}</strong></span>
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
                    <span>{plan.bandwidth} on {plan.network}</span>
                  </div>
                  <div className="ds-spec-item">
                    <Server size={15} className="ds-spec-icon" />
                    <span>{plan.ipv4} Dedicated</span>
                  </div>
                  <div className="ds-spec-item">
                    <Terminal size={15} className="ds-spec-icon success" />
                    <span>{plan.access}</span>
                  </div>
                  <div className="ds-spec-item">
                    <ShieldAlert size={15} className="ds-spec-icon" />
                    <span>{plan.ddos}</span>
                  </div>
                  {plan.ipmi && (
                    <div className="ds-spec-item bonus">
                      <Lock size={15} className="ds-spec-icon bonus" />
                      <span>{plan.ipmi}</span>
                    </div>
                  )}
                </div>

                {/* Order Button */}
                <Link
                  to={`/checkout/${plan.id}?cycle=${currentCycle.id}`}
                  className={`ds-card-btn ${isFlagship ? 'flagship-btn' : ''}`}
                >
                  <span>Deploy {plan.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Supported Operating Systems Showcase */}
        <div className="ds-os-showcase-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">OPERATING SYSTEM TEMPLATES</span>
            <h2 className="ds-section-title">Pre-Configured OS &amp; Distributions</h2>
            <p className="ds-section-desc">Deploy your choice of Linux or Windows with automated netboot installation.</p>
          </div>

          <div className="ds-os-grid">
            {SUPPORTED_VDS_OS.map((os) => (
              <div key={os.id} className="ds-os-card">
                <span className="ds-os-icon">{os.icon}</span>
                <div className="ds-os-info">
                  <span className="ds-os-name">{os.name}</span>
                  <span className="ds-os-tag">{os.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="ds-features-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">ENTERPRISE HARDWARE</span>
            <h2 className="ds-section-title">Pure Dedicated Bare-Metal Power</h2>
          </div>

          <div className="ds-features-grid">
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Cpu size={22} /></div>
              <h4>100% Dedicated Silicon</h4>
              <p>Zero virtualization penalty. All physical CPU cores and RAM are 100% allocated to your machine.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Lock size={22} /></div>
              <h4>IPMI / KVM Remote Console</h4>
              <p>Hardware out-of-band management console lets you access BIOS, troubleshoot kernel panics, and mount ISOs.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Globe size={22} /></div>
              <h4>Unmetered 1 Gbps Port</h4>
              <p>High-speed unmetered network pipeline with low-latency carrier routes and unshared bandwidth.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><ShieldAlert size={22} /></div>
              <h4>Automated DDoS Scrubbing</h4>
              <p>Multi-layered enterprise L3/L4/L7 DDoS mitigation protects against volumetric amplification attacks.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><HardDrive size={22} /></div>
              <h4>Enterprise Gen4 NVMe</h4>
              <p>High-endurance PCIe Gen4 NVMe solid state drives delivering massive IOPS for heavy database clusters.</p>
            </div>
            <div className="ds-feature-box">
              <div className="ds-feature-icon-wrap"><Zap size={22} /></div>
              <h4>Instant NOC Provisioning</h4>
              <p>Automated network orchestration configures and tests your physical machine immediately upon checkout.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="ds-faq-section">
          <div className="ds-section-header">
            <span className="ds-section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="ds-section-title">VDS Bare-Metal FAQ</h2>
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

        {/* Discord Support Bottom CTA */}
        <div className="ds-bottom-banner">
          <div className="ds-bottom-content">
            <h3>Need Custom Hardware Specs or BGP IP Announcement?</h3>
            <p>Our infrastructure engineers can build custom bare-metal clusters and announce your ASN/BGP subnets.</p>
          </div>
          <a
            href="https://dsc.gg/dataserware"
            target="_blank"
            rel="noopener noreferrer"
            className="ds-discord-btn"
          >
            <Zap size={16} />
            <span>Chat on Discord Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
