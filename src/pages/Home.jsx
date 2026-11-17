import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import {
  Zap, Shield, Cpu, Gauge, Headphones, Lock, Sparkles,
  ArrowRight, Globe, Server, Puzzle, Users, CheckCircle2,
  Terminal, CreditCard, ExternalLink, HardDrive, Wifi, Monitor,
  Bot, Check, Clock, ShieldCheck, Flame
} from 'lucide-react';
import ElectricNodeDiagram from '../components/ElectricNodeDiagram';
import ScrollReveal from '../components/ScrollReveal';
import { SERVER_LOCATIONS } from '../data/plans';

export default function Home() {
  const { formatPrice } = useCurrency();
  const [pricingCategory, setPricingCategory] = useState('game');

  // 6 Core Service Categories
  const serviceCategories = [
    {
      id: 'game-servers',
      title: 'Game Servers',
      icon: Puzzle,
      description: 'Ultra-low latency game instances for Minecraft (Java/Bedrock), Palworld, Rust, ARK, and GTA V with automated instant provisioning.',
      specs: 'AMD Ryzen 9 7950X • Gen4 NVMe • 1.2 Tbps DDoS',
      link: '/checkout/ryzen-8gb',
      badge: 'POPULAR'
    },
    {
      id: 'cloud-vps',
      title: 'VPS Hosting',
      icon: Server,
      description: 'High-frequency KVM Cloud VPS running Linux (Ubuntu, Debian, AlmaLinux) or Windows with 100% dedicated vCPUs & dedicated IPv4.',
      specs: 'Dedicated IPv4 • 1 Gbps Port • Root Access',
      link: '/checkout/ryzen-vps-8gb',
      badge: 'HIGH-CLOCK'
    },
    {
      id: 'rdp-hosting',
      title: 'RDP Hosting',
      icon: Monitor,
      description: 'Dedicated Remote Desktop VPS with Windows Server 2022/2025, low latency, 24/7 background execution, and zero idle timeouts.',
      specs: 'Windows Server • GUI Desktop • 99.9% Uptime',
      link: '/checkout/ryzen-vps-16gb',
      badge: 'WINDOWS'
    },
    {
      id: 'dedicated-vds',
      title: 'Dedicated Servers',
      icon: Cpu,
      description: 'Pure bare-metal physical hardware with exclusive silicon, up to 128 GB DDR5 ECC, 2 TB Gen4 NVMe, and unshared 10 Gbps uplinks.',
      specs: '100% Bare-Metal • AMD Ryzen 9 9950X • IPMI Access',
      link: '/vds-machines',
      badge: 'BARE-METAL'
    },
    {
      id: 'web-hosting',
      title: 'Web Hosting',
      icon: Globe,
      description: 'LiteSpeed / NGINX hybrid web hosting with official cPanel, unlimited free AutoSSL certificates, MariaDB databases, and 1-click WordPress.',
      specs: 'cPanel 120 • Free SSL • NVMe SSD ~ 7,000 MB/s',
      link: '/web-hosting',
      badge: 'CPANEL'
    },
    {
      id: 'bot-hosting',
      title: 'Discord Bot Hosting',
      icon: Bot,
      description: 'Reliable 24/7 background container hosting for Discord bots, API workers, and webhooks in Node.js, Python, Go, and Java.',
      specs: 'Node.js 20 • Python 3.11 • 0% CPU Throttling',
      link: '/checkout/bot-2gb',
      badge: 'ALWAYS-ON'
    }
  ];

  // Featured Plans for Pricing & Offers section
  const featuredGamePlans = [
    {
      id: 'amd-4gb',
      name: 'AMD EPYC Gaming 4 GB',
      category: 'Game Server',
      price: 176,
      ram: '4 GB DDR4/DDR5 RAM',
      cpu: '150% Dedicated CPU',
      storage: '20 GB NVMe SSD',
      features: ['DDoS Protection (1.2 Tbps)', 'Pterodactyl Control Panel', 'Instant 60s Setup', 'Daily Automated Backups']
    },
    {
      id: 'ryzen-8gb',
      name: 'Ryzen 9 7950X Extreme 8 GB',
      category: 'Extreme Gaming',
      price: 968,
      badge: 'Most Popular',
      ram: '8 GB DDR5 High-Clock RAM',
      cpu: '250% Dedicated 5.7GHz CPU',
      storage: '40 GB Gen4 NVMe SSD',
      features: ['1.2 Tbps Corero DDoS Shield', 'Custom Control Panel & Console', 'Unmetered 1 Gbps Bandwidth', 'Free Subdomain Included']
    },
    {
      id: 'ryzen-16gb',
      name: 'Ryzen 9 7950X Mega 16 GB',
      category: 'Heavy Networks',
      price: 1936,
      badge: 'Extreme Power',
      ram: '16 GB DDR5 RAM',
      cpu: '350% Dedicated CPU',
      storage: '80 GB Gen4 NVMe SSD',
      features: ['Unlimited Player Slots', 'Full SFTP & Database Access', 'Multi-Port Allocation (3 Ports)', 'Priority 24/7 Engineer Support']
    }
  ];

  const featuredVpsPlans = [
    {
      id: 'intel-vps-8gb',
      name: 'Intel Cloud VPS 8 GB',
      category: 'Cloud VPS',
      price: 373,
      ram: '8 GB RAM',
      cpu: '2 Intel vCores',
      storage: '60 GB Gen4 NVMe',
      features: ['Full KVM Root Access', 'Dedicated IPv4 Address', 'Ubuntu, Debian, AlmaLinux', 'Enterprise DDoS Filter']
    },
    {
      id: 'ryzen-vps-8gb',
      name: 'Ryzen Ultra VPS 8 GB',
      category: 'High-Clock VPS',
      price: 868,
      badge: 'Recommended',
      ram: '8 GB DDR5 RAM',
      cpu: '2 AMD Ryzen vCores (5.7GHz)',
      storage: '60 GB NVMe Storage',
      features: ['Full Root / Administrator Access', '1 Gbps Dedicated Port', 'Windows / Linux OS Switcher', 'Instant Automated Deployment']
    },
    {
      id: 'ryzen-vps-16gb',
      name: 'Ryzen Ultra VPS 16 GB (RDP)',
      category: 'High-End / RDP',
      price: 1748,
      badge: 'RDP Ready',
      ram: '16 GB RAM',
      cpu: '4 AMD Ryzen vCores',
      storage: '96 GB Gen4 NVMe',
      features: ['Windows Server 2022/2025 GUI', 'Ultra Low Latency RDP Access', 'Unmetered 1 Gbps Uplink', 'Daily Cloud Snapshots']
    }
  ];

  const featuredWebPlans = [
    {
      id: 'web-solo',
      name: 'SERWARE SOLO',
      category: 'cPanel Web Hosting',
      price: 24.20,
      ram: '1 Hosted Website',
      cpu: '10 GB NVMe Storage',
      storage: '2 MySQL Databases',
      features: ['1 Hosted Website', '10 GB NVMe Storage', 'Free AutoSSL Certificate', 'cPanel Control Panel Included']
    },
    {
      id: 'web-premium',
      name: 'SERWARE PREMIUM',
      category: 'cPanel Web Hosting',
      price: 77.00,
      badge: 'Best Value',
      ram: '3 Hosted Websites',
      cpu: '20 GB NVMe Storage',
      storage: '10 MySQL Databases',
      features: ['3 Hosted Websites', '20 GB NVMe Storage', 'Free Domain (Annual Plan)', '7 Automated Backup Slots']
    },
    {
      id: 'web-business',
      name: 'SERWARE BUSINESS',
      category: 'cPanel Web Hosting',
      price: 220.00,
      badge: 'Enterprise',
      ram: '10 Hosted Websites',
      cpu: '50 GB NVMe Storage',
      storage: '100 MySQL Databases',
      features: ['10 Hosted Websites', '50 GB NVMe Storage', 'SSH Terminal Access & Git', 'Free Domain & Dedicated IP']
    }
  ];

  const activePlans = pricingCategory === 'game' ? featuredGamePlans : pricingCategory === 'vps' ? featuredVpsPlans : featuredWebPlans;

  const hardwareFeatures = [
    {
      icon: Cpu,
      title: 'AMD Ryzen 9 7950X & EPYC',
      description: 'Single-core clock speeds up to 5.7 GHz boost ensure 20.0 tick rates on Minecraft and lag-free game worlds.'
    },
    {
      icon: Gauge,
      title: 'Ultra-Low Ping Routing',
      description: 'Sub-15ms latency across Mumbai, Singapore, Frankfurt, London, and Virginia via tier-1 telecom backbones.'
    },
    {
      icon: Shield,
      title: '1.2 Tbps Always-On DDoS Shield',
      description: 'Automated Corero & Path.net layer-3/4/7 packet filtering instantly absorbs volumetric UDP/TCP attacks.'
    },
    {
      icon: Headphones,
      title: '24/7 Specialized Support',
      description: 'Direct assistance from knowledgeable systems engineers via live Discord community and support tickets.'
    },
    {
      icon: Lock,
      title: 'Automated 60-Second Setup',
      description: 'Immediate automated provisioning upon payment verification. You receive panel credentials in seconds.'
    },
    {
      icon: Sparkles,
      title: 'Pterodactyl & KVM Control',
      description: 'Full web console, live SFTP file manager, database provisioner, and automated offsite snapshots.'
    }
  ];

  return (
    <div className="ds-home-wrapper">

      {/* 1. HERO SECTION (MATCHES SCREENSHOT PRECISELY) */}
      <section className="ds-hero-section">
        <div className="container ds-hero-grid">
          {/* Left Column: Headlines, Badge & CTA */}
          <div className="ds-hero-left">
            <div className="ds-hero-pill-badge">
              <Zap size={14} className="ds-pill-neon-icon" />
              <span>Ultra-Premium Infrastructure for Games, Cloud and VPS</span>
            </div>

            <h1 className="ds-hero-title">
              Deploy High-Performance<br />
              <span className="ds-hero-gradient-text">Game, Cloud &amp; VPS</span><br />
              Servers
            </h1>

            <p className="ds-hero-desc">
              Instant deployment for Game Servers, VPS, RDP, Dedicated Servers, Web Hosting and Discord Bot Hosting on AMD Ryzen &amp; EPYC with NVMe SSD, 500 Tbps+ DDoS protection.
            </p>

            <div className="ds-hero-cta-group">
              <Link to="/plans" className="ds-hero-btn-primary">
                <span>View All Plans</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://panel.dataserware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-hero-btn-secondary"
              >
                <Terminal size={16} />
                <span>Control Panel</span>
                <ExternalLink size={13} className="ds-ext-icon" />
              </a>

              <a
                href="https://dsc.gg/dataserware"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-hero-btn-discord"
              >
                <Bot size={16} />
                <span>Discord</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid (From Screenshot) */}
          <div className="ds-hero-right">
            <div className="ds-hero-cards-2x2">
              {/* Card 1 */}
              <div className="ds-hero-card">
                <div className="ds-card-top-row">
                  <h3 className="ds-card-title">AMD Ryzen &amp; EPYC</h3>
                  <div className="ds-card-icon-box">
                    <Monitor size={18} />
                  </div>
                </div>
                <p className="ds-card-text">
                  Enterprise compute engineered for low-latency hosting at scale.
                </p>
              </div>

              {/* Card 2 */}
              <div className="ds-hero-card">
                <div className="ds-card-top-row">
                  <h3 className="ds-card-title">NVMe SSD Storage</h3>
                  <div className="ds-card-icon-box">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <p className="ds-card-text">
                  Ultra-fast IOPS for worlds, workloads and production applications.
                </p>
              </div>

              {/* Card 3 */}
              <div className="ds-hero-card">
                <div className="ds-card-top-row">
                  <h3 className="ds-card-title">500 Tbps+ DDoS</h3>
                  <div className="ds-card-icon-box">
                    <Clock size={18} />
                  </div>
                </div>
                <p className="ds-card-text">
                  Always-on global mitigation to keep servers online 24/7 without dropouts.
                </p>
              </div>

              {/* Card 4 */}
              <div className="ds-hero-card">
                <div className="ds-card-top-row">
                  <h3 className="ds-card-title">24/7 Support</h3>
                  <div className="ds-card-icon-box">
                    <Headphones size={18} />
                  </div>
                </div>
                <p className="ds-card-text">
                  Real engineers available around the clock via tickets and Discord community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 SERVICE CATEGORIES */}
      <section className="ds-section">
        <div className="container">
          <div className="ds-section-header-center">
            <span className="ds-badge-tag">HOSTING ECOSYSTEM</span>
            <h2 className="ds-section-heading">Engineered for Every Workload</h2>
            <p className="ds-section-sub">
              From competitive multiplayer game servers to mission-critical Bare-Metal hypervisors, Data Serware delivers high speed, low latency, and rock-solid DDoS mitigation.
            </p>
          </div>

          <div className="ds-services-grid">
            {serviceCategories.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.id} className="ds-service-card">
                  <div>
                    <div className="ds-svc-top-row">
                      <div className="ds-svc-icon-box">
                        <Icon size={22} />
                      </div>
                      <span className="ds-svc-badge">{svc.badge}</span>
                    </div>

                    <h3 className="ds-svc-title">{svc.title}</h3>
                    <p className="ds-svc-desc">{svc.description}</p>
                  </div>

                  <div>
                    <div className="ds-svc-specs">{svc.specs}</div>
                    <Link to={svc.link} className="ds-svc-order-btn">
                      <span>Order in Client Area</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PRICING & SPECIAL OFFERS */}
      <section className="ds-section">
        <div className="container">
          {/* Promo Callout */}
          <div className="ds-promo-callout-box">
            <div className="ds-promo-callout-left">
              <div className="ds-promo-icon-wrap">
                <Sparkles size={20} />
              </div>
              <div>
                <strong className="ds-promo-heading">Special Offer: Save 10% on Premium Plans!</strong>
                <span className="ds-promo-sub">
                  Use coupon code <code className="ds-code-highlight">SKILL26</code> during checkout for an instant discount.
                </span>
              </div>
            </div>

            <Link to="/plans" className="ds-promo-cta-btn">
              <span>Explore Plans</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="ds-section-header-center">
            <span className="ds-badge-tag">TRANSPARENT PRICING</span>
            <h2 className="ds-section-heading">Featured Plans &amp; Instant Provisioning</h2>
            <p className="ds-section-sub">
              Select any tier below to pass the plan details directly into the high-speed 1-click Razorpay checkout.
            </p>

            {/* Category Switcher Tabs */}
            <div className="ds-category-tabs">
              <button
                type="button"
                onClick={() => setPricingCategory('game')}
                className={`ds-tab-btn ${pricingCategory === 'game' ? 'active' : ''}`}
              >
                🎮 Minecraft &amp; Game
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('vps')}
                className={`ds-tab-btn ${pricingCategory === 'vps' ? 'active' : ''}`}
              >
                🚀 Cloud VPS &amp; RDP
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('web')}
                className={`ds-tab-btn ${pricingCategory === 'web' ? 'active' : ''}`}
              >
                🌐 cPanel Web
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="ds-pricing-cards-grid">
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                className={`ds-plan-pricing-card ${plan.badge ? 'featured' : ''}`}
              >
                {plan.badge && (
                  <span className="ds-plan-featured-pill">{plan.badge}</span>
                )}

                <div>
                  <span className="ds-plan-cat-label">{plan.category}</span>
                  <h3 className="ds-plan-name">{plan.name}</h3>

                  <div className="ds-plan-price-row">
                    <span className="ds-plan-price">{formatPrice(plan.price)}</span>
                    <span className="ds-plan-period">/month</span>
                  </div>

                  <div className="ds-plan-specs-list">
                    <ul>
                      <li className="spec-highlight">
                        <Check size={16} />
                        <span>{plan.ram}</span>
                      </li>
                      <li>
                        <Check size={16} />
                        <span>{plan.cpu}</span>
                      </li>
                      <li>
                        <Check size={16} />
                        <span>{plan.storage}</span>
                      </li>
                      {plan.features.map((f, i) => (
                        <li key={i} className="spec-secondary">
                          <Check size={16} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link to={`/checkout/${plan.id}`} className="ds-plan-deploy-btn">
                  <Zap size={16} />
                  <span>Deploy Now &bull; Instant Setup</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL SERVER LOCATIONS */}
      <section className="ds-section" id="locations">
        <div className="container">
          <div className="ds-section-header-center">
            <span className="ds-badge-tag">GLOBAL EDGE INFRASTRUCTURE</span>
            <h2 className="ds-section-heading">Optimized Low-Latency Datacenter Nodes</h2>
            <p className="ds-section-sub">
              Strategically placed tier-3 &amp; tier-4 data facilities connected directly to internet exchange points (IXPs) for minimal routing hops.
            </p>
          </div>

          <div className="ds-locations-grid">
            {SERVER_LOCATIONS.map((loc) => (
              <div key={loc.id} className="ds-location-card">
                <div className="ds-loc-top">
                  <span className="ds-loc-flag">{loc.flag}</span>
                  <span className="ds-loc-status">● {loc.status}</span>
                </div>
                <h3 className="ds-loc-name">{loc.name}</h3>
                <div className="ds-loc-ping">
                  <Zap size={14} />
                  <span>Latency: {loc.ping}</span>
                </div>
                <span className="ds-loc-bandwidth">10 Gbps Redundant Fiber Uplink</span>
              </div>
            ))}
          </div>

          <ElectricNodeDiagram />
        </div>
      </section>

      {/* 5. HARDWARE HIGHLIGHTS */}
      <section className="ds-section" id="features">
        <div className="container">
          <div className="ds-section-header-center">
            <span className="ds-badge-tag">HARDWARE SPECIFICATIONS</span>
            <h2 className="ds-section-heading">Built for Performance &amp; Maximum Reliability</h2>
            <p className="ds-section-sub">
              We operate genuine enterprise silicon with strict resource reservations and zero throttling.
            </p>
          </div>

          <div className="ds-hardware-grid">
            {hardwareFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="ds-hardware-card">
                  <div className="ds-hardware-icon-box">
                    <IconComp size={22} />
                  </div>
                  <h3 className="ds-hardware-title">{feat.title}</h3>
                  <p className="ds-hardware-desc">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="ds-section ds-bottom-cta-section">
        <div className="container">
          <div className="ds-bottom-cta-banner">
            <div className="ds-cta-left">
              <span className="ds-badge-tag">DATA SERWARE CLOUD ECOSYSTEM</span>
              <h2 className="ds-cta-title">Deploy Your Infrastructure Today</h2>
              <p className="ds-cta-sub">
                Instant setup, 24/7 Discord support, and sub-15ms latency across Asia and global nodes.
              </p>
            </div>
            <div className="ds-cta-right">
              <Link to="/plans" className="ds-hero-btn-primary">
                <Zap size={18} />
                <span>Explore All Plans</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://panel.dataserware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-hero-btn-secondary"
              >
                <Terminal size={18} />
                <span>Launch Control Panel</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
