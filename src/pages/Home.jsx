import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import {
  Zap, Shield, Cpu, Gauge, Headphones, Lock, Sparkles,
  ArrowRight, Globe, Server, Puzzle, Users, CheckCircle2,
  Terminal, CreditCard, ExternalLink, HardDrive, Wifi, Monitor,
  Bot, Check, Clock, ShieldCheck, Flame, ChevronDown, HelpCircle,
  Play, RotateCcw, Square, FolderGit2, Database, KeyRound
} from 'lucide-react';
import { SERVER_LOCATIONS } from '../data/plans';

export default function Home() {
  const { formatPrice } = useCurrency();
  const [pricingCategory, setPricingCategory] = useState('game');
  const [openFaq, setOpenFaq] = useState(0);

  // Supported games & runtimes strip
  const supportedGames = [
    { name: 'Minecraft Java & Bedrock', tag: 'Paper / Fabric / Forge' },
    { name: 'Palworld', tag: 'High-Ram Dedicated' },
    { name: 'Rust', tag: 'Anti-DDoS Protected' },
    { name: 'ARK: Survival Ascended', tag: 'Unreal Engine 5 Ready' },
    { name: 'GTA V / FiveM', tag: 'Low Latency Mumbai' },
    { name: 'Discord Bots', tag: 'Node.js / Python / Java' },
    { name: 'Cloud VPS (KVM)', tag: 'Ubuntu / Debian / Windows' },
    { name: 'cPanel Web Hosting', tag: 'LiteSpeed / NVMe' }
  ];

  // 3 Core Service Categories: Server, VPS, Bot Hosting
  const serviceCategories = [
    {
      id: 'game-servers',
      title: 'Game & Cloud Servers',
      icon: Puzzle,
      description: 'Ultra-low latency game instances for Minecraft, Palworld, Rust, and ARK with custom Pterodactyl panel and instant Discord deployment.',
      specs: 'AMD Ryzen 9 7950X • Gen4 NVMe • 1.2 Tbps DDoS',
      link: '/plans',
      badge: 'HIGH-FREQUENCY'
    },
    {
      id: 'cloud-vps',
      title: 'High-Performance Cloud VPS',
      icon: Server,
      description: 'Enterprise KVM Cloud VPS powered by AMD Ryzen, AMD EPYC, and Intel Xeon with 100% dedicated vCPUs, dedicated IPv4 & full root access.',
      specs: '100% Dedicated vCPU • Dedicated IPv4 • 1 Gbps Port',
      link: '/vps',
      badge: 'ENTERPRISE KVM'
    },
    {
      id: 'bot-hosting',
      title: 'Discord Bot Hosting',
      icon: Bot,
      description: 'Reliable 24/7 background container runtime for Discord bots, API workers, and webhooks in Node.js, Python, Go, and Java.',
      specs: 'Node.js 20 • Python 3.11 • 24/7 Uptime',
      link: '/plans/bot-hosting',
      badge: 'ALWAYS-ON'
    }
  ];

  // Featured Plans for Pricing & Offers
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
      name: 'Ryzen Ultra VPS 16 GB',
      category: 'Extreme KVM Compute',
      price: 1748,
      badge: 'Powerhouse',
      ram: '16 GB DDR5 RAM',
      cpu: '4 AMD Ryzen vCores',
      storage: '96 GB Gen4 NVMe',
      features: ['Full KVM Root Access', 'Dedicated IPv4 Address', 'Unmetered 1 Gbps Uplink', 'Daily Cloud Backups']
    }
  ];

  const featuredBotPlans = [
    {
      id: 'bot-2gb',
      name: 'Bot Hosting 2 GB',
      category: 'Bot Runtime',
      price: 48,
      ram: '2 GB RAM',
      cpu: '1 Dedicated vCore',
      storage: '10 GB NVMe SSD',
      features: ['Node.js 20 & Python 3.11', '24/7 Always-On Background Runtime', 'Pterodactyl Container Isolation', 'Automated Crash Restart']
    },
    {
      id: 'bot-4gb',
      name: 'Bot Hosting 4 GB',
      category: 'Bot Runtime',
      price: 97,
      badge: 'Most Popular',
      ram: '4 GB RAM',
      cpu: '2 Dedicated vCores',
      storage: '20 GB NVMe SSD',
      features: ['Discord / Telegram Bot Ready', 'Low Latency Network Socket', 'SFTP File Manager & Web Console', 'Daily Automated Backups']
    },
    {
      id: 'bot-8gb',
      name: 'Bot Hosting 8 GB',
      category: 'High-Traffic Cluster',
      price: 194,
      badge: 'Shard Ready',
      ram: '8 GB RAM',
      cpu: '4 Dedicated vCores',
      storage: '40 GB NVMe SSD',
      features: ['Multi-Bot Discord Sharding', 'Java 21, Golang & Rust Support', 'Unmetered 1 Gbps Bandwidth', '24/7 Priority Discord Support']
    }
  ];

  const activePlans = pricingCategory === 'game' ? featuredGamePlans : pricingCategory === 'vps' ? featuredVpsPlans : featuredBotPlans;

  // Real, practical FAQs
  const faqs = [
    {
      q: 'How do I purchase a server or service?',
      a: 'All purchases and server provisioning are handled directly through our official Discord community (https://dsc.gg/dataserware). Simply join our Discord, open an instant purchase ticket in #tickets, specify your desired plan, and our team will configure and deliver your server immediately.'
    },
    {
      q: 'How fast is my server deployed after joining Discord?',
      a: 'Deployment is instant! Once you create your order ticket on Discord, our staff and automated bot scripts provision your Pterodactyl container or KVM hypervisor within minutes, delivering credentials and panel links directly to you.'
    },
    {
      q: 'How do I get the 10% discount with code dataserware10?',
      a: 'Simply mention the promo code "dataserware10" when opening your ticket on our Discord server. Our staff will instantly apply the 10% discount to your invoice.'
    },
    {
      q: 'Can I upgrade my RAM, CPU, or storage later without losing data?',
      a: 'Yes, absolutely. You can scale your plan directly by opening a support ticket on our Discord at any time. Upgrades take effect instantly with zero data loss or re-configuration required.'
    },
    {
      q: 'Is 1.2 Tbps DDoS protection included with all servers?',
      a: 'Yes! Every game server, VPS, and web hosting container is protected by our automated Corero & Path.net layer-3, layer-4, and layer-7 DDoS mitigation at no extra charge.'
    },
    {
      q: 'How do I access the game server control panel?',
      a: 'You can access our custom Pterodactyl control panel directly at panel.dataserware.com. Your login credentials will be provided in your Discord ticket immediately upon setup.'
    },
    {
      q: 'Where are the server locations and what is the ping in India?',
      a: 'Our primary node cluster is hosted in Mumbai, India, offering ultra-low 8-18ms ping across India. We also operate nodes in Singapore (35-50ms), Frankfurt (110-130ms), and Virginia, USA.'
    }
  ];

  return (
    <div className="ds-home-wrapper">

      {/* 1. HERO SECTION (MATCHES USER REFERENCE SCREENSHOT) */}
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
              Instant 24/7 deployment for Game Servers, High-Frequency Cloud VPS, and Discord Bot Hosting on AMD Ryzen™ &amp; EPYC with Gen4 NVMe and 1.2 Tbps DDoS protection.
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

      {/* 2. SUPPORTED WORKLOADS / GAMES TICKER STRIP */}
      <section className="ds-ticker-section">
        <div className="container">
          <div className="ds-ticker-bar">
            {supportedGames.map((item, idx) => (
              <div key={idx} className="ds-ticker-item">
                <CheckCircle2 size={14} className="ds-ticker-icon" />
                <span className="ds-ticker-name">{item.name}</span>
                <span className="ds-ticker-tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE CATEGORIES */}
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

      {/* 4. PRICING & SPECIAL OFFERS */}
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
                  Use coupon code <code className="ds-code-highlight">dataserware10</code> on Discord for an instant discount. All purchases are handled through Discord.
                </span>
              </div>
            </div>

            <a
              href="https://dsc.gg/dataserware"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-promo-cta-btn"
            >
              <span>Join Discord &amp; Get Instantly</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="ds-section-header-center">
            <span className="ds-badge-tag">TRANSPARENT PRICING</span>
            <h2 className="ds-section-heading">Featured Plans &amp; Instant Provisioning</h2>
            <p className="ds-section-sub">
              Select any plan below and join our Discord community for instant order setup and automated deployment.
            </p>

            {/* Category Switcher Tabs */}
            <div className="ds-category-tabs">
              <button
                type="button"
                onClick={() => setPricingCategory('game')}
                className={`ds-tab-btn ${pricingCategory === 'game' ? 'active' : ''}`}
              >
                🎮 Game Servers
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('vps')}
                className={`ds-tab-btn ${pricingCategory === 'vps' ? 'active' : ''}`}
              >
                🚀 Cloud VPS
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('bot')}
                className={`ds-tab-btn ${pricingCategory === 'bot' ? 'active' : ''}`}
              >
                🤖 Bot Hosting
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

                <a
                  href="https://dsc.gg/dataserware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-plan-deploy-btn"
                >
                  <Zap size={16} />
                  <span>Join Discord &amp; Get Instantly</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CONTROL PANEL SHOWCASE (PTERODACTYL REALISTIC MOCKUP) */}
      <section className="ds-section ds-panel-showcase-section">
        <div className="container">
          <div className="ds-section-header-center">
            <span className="ds-badge-tag">PTERODACTYL CONTROL PANEL</span>
            <h2 className="ds-section-heading">Complete Server Control at Your Fingertips</h2>
            <p className="ds-section-sub">
              Manage your servers seamlessly via our official Pterodactyl-powered console at <strong className="text-purple">panel.dataserware.com</strong>.
            </p>
          </div>

          <div className="ds-mock-panel-window">
            {/* Window Top Header */}
            <div className="ds-mock-panel-bar">
              <div className="ds-mock-window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="ds-mock-server-info">
                <span className="ds-mock-server-status">● ONLINE</span>
                <span className="ds-mock-server-name">node-bom-01.dataserware.com:25565</span>
                <span className="ds-mock-server-spec">AMD Ryzen 9 7950X &bull; 8 GB DDR5</span>
              </div>
              <div className="ds-mock-power-controls">
                <button type="button" className="mock-btn-start" title="Start"><Play size={12} /> Start</button>
                <button type="button" className="mock-btn-restart" title="Restart"><RotateCcw size={12} /> Restart</button>
                <button type="button" className="mock-btn-stop" title="Stop"><Square size={12} /> Stop</button>
              </div>
            </div>

            {/* Window Navigation Tabs */}
            <div className="ds-mock-tabs">
              <span className="mock-tab active"><Terminal size={14} /> Console</span>
              <span className="mock-tab"><FolderGit2 size={14} /> File Manager</span>
              <span className="mock-tab"><Database size={14} /> Databases</span>
              <span className="mock-tab"><HardDrive size={14} /> Backups</span>
              <span className="mock-tab"><KeyRound size={14} /> Users &amp; SFTP</span>
            </div>

            {/* Simulated Live Console Output */}
            <div className="ds-mock-console">
              <p className="log-line info"><span className="log-ts">[12:00:01 INFO]:</span> Loading DataSerware kernel modules and initializing memory registers...</p>
              <p className="log-line info"><span className="log-ts">[12:00:02 INFO]:</span> Allocated 8192MB DDR5 ECC RAM &bull; 250% Dedicated 5.7GHz CPU thread</p>
              <p className="log-line success"><span className="log-ts">[12:00:03 SUCCESS]:</span> Corero 1.2 Tbps DDoS shield online &bull; Path.net filter active on port 25565</p>
              <p className="log-line info"><span className="log-ts">[12:00:05 INFO]:</span> Starting minecraft_server.1.21.1.jar with Java 21 LTS (ZGC low latency GC)</p>
              <p className="log-line success"><span className="log-ts">[12:00:07 SUCCESS]:</span> [Server thread/INFO]: Done (2.128s)! For help, type "help"</p>
              <p className="log-line prompt"><span className="log-cursor">&gt;</span> server ready for connections on in-bom.dataserware.com:25565</p>
            </div>

            {/* Bottom Panel Bar */}
            <div className="ds-mock-footer-row">
              <div className="ds-mock-metrics">
                <span>CPU: <strong className="text-white">14.2%</strong></span>
                <span>Memory: <strong className="text-white">2.4 GB / 8 GB</strong></span>
                <span>Storage: <strong className="text-white">18.5 GB / 40 GB NVMe</strong></span>
                <span>Uptime: <strong className="text-green">99.98%</strong></span>
              </div>
              <a
                href="https://panel.dataserware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-mock-launch-btn"
              >
                <span>Open panel.dataserware.com</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GLOBAL DATACENTER LOCATIONS */}
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
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="ds-section ds-faq-section">
        <div className="container">
          <div className="ds-section-header-center">
            <span className="ds-badge-tag">HAVE QUESTIONS?</span>
            <h2 className="ds-section-heading">Frequently Asked Questions</h2>
            <p className="ds-section-sub">
              Everything you need to know about our hosting infrastructure, payments, and automated deployment.
            </p>
          </div>

          <div className="ds-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`ds-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="ds-faq-question-btn"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`ds-faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
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

      {/* 8. BOTTOM CTA BANNER */}
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
