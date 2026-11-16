import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import {
  Zap, Shield, Cpu, Gauge, Headphones, Lock, Sparkles,
  ArrowRight, Globe, Layers, Server, Puzzle, Users, CheckCircle2,
  Terminal, CreditCard, ExternalLink, HardDrive, Wifi, Monitor,
  Bot, RefreshCw, Check, Star, ChevronRight
} from 'lucide-react';
import ElectricNodeDiagram from '../components/ElectricNodeDiagram';
import ScrollReveal from '../components/ScrollReveal';
import { SERVER_LOCATIONS, ALL_GAME_PLANS, ALL_VPS_PLANS, WEB_HOSTING_PLANS } from '../data/plans';

export default function Home() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const canvasRef = useRef(null);

  // Active pricing category tab on the homepage
  const [pricingCategory, setPricingCategory] = useState('game');

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.3 ? '#c084fc' : '#d8b4fe'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 6 Core Service Categories required by user
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
      price: 299,
      ram: '4 GB DDR4/DDR5 RAM',
      cpu: '200% Dedicated CPU',
      storage: '40 GB NVMe SSD',
      features: ['DDoS Protection (1.2 Tbps)', 'Pterodactyl Control Panel', 'Instant 60s Setup', 'Daily Automated Backups']
    },
    {
      id: 'ryzen-8gb',
      name: 'Ryzen 9 7950X Extreme 8 GB',
      category: 'Extreme Gaming',
      price: 649,
      badge: 'Most Popular',
      ram: '8 GB DDR5 High-Clock RAM',
      cpu: '350% Dedicated 5.7GHz CPU',
      storage: '80 GB Gen4 NVMe SSD',
      features: ['1.2 Tbps Corero DDoS Shield', 'Custom Control Panel & Console', 'Unmetered 1 Gbps Bandwidth', 'Free Subdomain Included']
    },
    {
      id: 'ryzen-16gb',
      name: 'Ryzen 9 7950X Mega 16 GB',
      category: 'Heavy Networks',
      price: 1299,
      badge: 'Extreme Power',
      ram: '16 GB DDR5 RAM',
      cpu: '500% Dedicated CPU',
      storage: '160 GB Gen4 NVMe SSD',
      features: ['Unlimited Player Slots', 'Full SFTP & Database Access', 'Multi-Port Allocation (3 Ports)', 'Priority 24/7 Engineer Support']
    }
  ];

  const featuredVpsPlans = [
    {
      id: 'intel-vps-4gb',
      name: 'Intel Cloud VPS 4 GB',
      category: 'Cloud VPS',
      price: 499,
      ram: '4 GB RAM',
      cpu: '2 Intel vCores',
      storage: '50 GB Gen4 NVMe',
      features: ['Full KVM Root Access', 'Dedicated IPv4 Address', 'Ubuntu, Debian, AlmaLinux', 'Enterprise DDoS Filter']
    },
    {
      id: 'ryzen-vps-8gb',
      name: 'Ryzen Ultra VPS 8 GB',
      category: 'High-Clock VPS',
      price: 899,
      badge: 'Recommended',
      ram: '8 GB DDR5 RAM',
      cpu: '4 AMD Ryzen vCores (5.7GHz)',
      storage: '100 GB NVMe Storage',
      features: ['Full Root / Administrator Access', '1 Gbps Dedicated Port', 'Windows / Linux OS Switcher', 'Instant Automated Deployment']
    },
    {
      id: 'ryzen-vps-16gb',
      name: 'Ryzen Ultra VPS 16 GB (RDP)',
      category: 'High-End / RDP',
      price: 1539,
      badge: 'RDP Ready',
      ram: '16 GB RAM',
      cpu: '6 AMD Ryzen vCores',
      storage: '160 GB Gen4 NVMe',
      features: ['Windows Server 2022/2025 GUI', 'Ultra Low Latency RDP Access', 'Unmetered 10 Gbps Uplink', 'Daily Cloud Snapshots']
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

  const features = [
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
    <div className="home-redesign-wrapper">

      {/* PORTAL A: HERO SECTION */}
      <section className="ag-hero-container">

        <canvas ref={canvasRef} className="ag-hero-canvas" />

        <div className="ag-ambient-glow purple" />
        <div className="ag-ambient-glow blue" />

        <div className="ag-hero-art-layer">
          <img
            src="/assets/dataserware-banner.png"
            alt="Data Serware Enterprise Cloud & Game Hosting Banner"
            className="ag-cinematic-bg-img"
          />
          <div className="ag-art-gradient-overlay" />

          <div className="ag-artwork-text-left">
            <span className="ag-art-line">DEPLOY</span>
            <span className="ag-art-line">SCALE</span>
            <span className="ag-art-line">PROTECT</span>
            <span className="ag-art-line purple-highlight">DATA SERWARE</span>
          </div>

          <div className="ag-artwork-text-right">
            <span>ENTERPRISE CLOUD &amp; GAME SERVERS</span>
          </div>
        </div>

        <div className="container ag-hero-content-grid">

          <div className="ag-hero-left">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="ag-glass-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>Next-Gen Cloud &amp; Bare Metal Platform</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <h1 className="ag-hero-title">
                HIGH-PERFORMANCE<br />
                INFRASTRUCTURE BY<br />
                <span className="cyan-electric-text">DATA SERWARE</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <p className="ag-hero-desc">
                Ultra-low latency AMD Ryzen™ 9 7950X, EPYC™ &amp; NVMe Gen4 game servers, Cloud VPS, dedicated RDP, and cPanel web hosting with 1.2 Tbps DDoS protection and instant 60-second deployment.
              </p>
            </ScrollReveal>

            {/* LIVE BADGES */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="ag-compact-features">
                <div className="ag-feature-pill">
                  <Shield size={16} className="pill-icon cyan" />
                  <div>
                    <span className="pill-title">1.2 Tbps Shield</span>
                    <span className="pill-val">Always On</span>
                  </div>
                </div>

                <div className="ag-feature-pill">
                  <Server size={16} className="pill-icon blue" />
                  <div>
                    <span className="pill-title">99.9% Uptime</span>
                    <span className="pill-val">SLA Backed</span>
                  </div>
                </div>

                <div className="ag-feature-pill">
                  <Zap size={16} className="pill-icon cyan" />
                  <div>
                    <span className="pill-title">Ultra Low Ping</span>
                    <span className="pill-val">&lt;12ms India</span>
                  </div>
                </div>

                <div className="ag-feature-pill">
                  <Users size={16} className="pill-icon blue" />
                  <div>
                    <span className="pill-title">24/7 Support</span>
                    <span className="pill-val">Discord &amp; Desk</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* QUICK CTA BUTTONS (CONNECTED TO PLANS, CONTROL PANEL & DISCORD) */}
            <ScrollReveal animation="fade-up" delay={500}>
              <div className="ag-hero-ctas" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Link to="/plans" className="ag-primary-cta" style={{ textDecoration: 'none' }}>
                  <Zap size={17} />
                  <span>View All Hosting Plans</span>
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="https://panel.dataserware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.9rem 1.4rem',
                    borderRadius: '12px',
                    background: 'rgba(168, 85, 247, 0.16)',
                    border: '1px solid rgba(192, 132, 252, 0.45)',
                    color: '#c084fc',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <Terminal size={17} />
                  <span>Control Panel</span>
                  <ExternalLink size={14} style={{ opacity: 0.8 }} />
                </a>

                <a
                  href="https://dsc.gg/dataserware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-discord-cta"
                  style={{ textDecoration: 'none' }}
                >
                  <Bot size={17} />
                  <span>Discord</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="ag-hero-right">
            <ScrollReveal animation="zoom-in" delay={300}>
              <div className="ag-hud-card live-servers-card">
                <div className="hud-card-header">
                  <span className="hud-label">LIVE HARDWARE TELEMETRY</span>
                  <div className="live-dot-pulse" />
                </div>
                <div className="hud-main-val">
                  <span className="num-count">99.98%</span>
                  <span className="val-dot">●</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                  Active Nodes: Mumbai, Singapore, Frankfurt, Virginia, London
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>CPU Boost:</span>
                    <span style={{ color: '#c084fc' }}>5.7 GHz Ryzen 9</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>DDoS Mitigation:</span>
                    <span style={{ color: '#22c55e' }}>Corero 1.2 Tbps</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Provisioning:</span>
                    <span style={{ color: '#d8b4fe' }}>Automated Pterodactyl</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </section>

      {/* SECTION 2: 6 SERVICE CATEGORIES (PORTAL A REQUIREMENT) */}
      <section className="ag-section" style={{ paddingTop: '3rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span className="ag-section-badge">HOSTING ECOSYSTEM</span>
            <h2 className="ag-section-title" style={{ marginTop: '8px' }}>
              Engineered for Every Workload
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              From competitive multiplayer game servers to mission-critical Bare-Metal hypervisors, Data Serware delivers unparalleled speed, low latency, and rock-solid DDoS mitigation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {serviceCategories.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(8, 20, 38, 0.9) 0%, rgba(3, 8, 20, 0.95) 100%)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: '20px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s, border-color 0.2s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                        <Icon size={24} />
                      </div>
                      <span style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#d8b4fe',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.08em'
                      }}>
                        {svc.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                      {svc.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {svc.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.85rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#d8b4fe', fontFamily: 'JetBrains Mono, monospace' }}>
                      {svc.specs}
                    </div>

                    {/* REDIRECT TO CLIENT AREA / BILLING */}
                    <Link
                      to={svc.link}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: 'rgba(168, 85, 247, 0.12)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        color: '#c084fc',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        transition: 'background 0.2s'
                      }}
                    >
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

      {/* SECTION 3: PRICING & SPECIAL OFFERS SECTION (PORTAL A REQUIREMENT) */}
      <section className="ag-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">

          {/* Promotional Discount Callout */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.18) 0%, rgba(124, 58, 237, 0.18) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '16px',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#030712' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <strong style={{ color: '#fff', fontSize: '1.1rem', display: 'block' }}>
                  Launch Special: Save 20% on Your First Order!
                </strong>
                <span style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                  Use coupon code <code style={{ color: '#c084fc', background: '#070213', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>SERWARE20</code> during checkout in the Client Area.
                </span>
              </div>
            </div>

            <Link
              to="/plans"
              style={{
                background: '#c084fc',
                color: '#070213',
                padding: '9px 18px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Explore Plans</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="text-center" style={{ maxWidth: '680px', margin: '0 auto 2rem' }}>
            <span className="ag-section-badge">TRANSPARENT PRICING</span>
            <h2 className="ag-section-title" style={{ marginTop: '8px' }}>
              Featured Plans &amp; Instant Provisioning
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
              Select any tier below to automatically pass the plan parameters directly into the Client Area &amp; Billing Portal.
            </p>

            {/* Category Switcher Tabs */}
            <div style={{ display: 'inline-flex', background: '#110626', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '4px', borderRadius: '12px', marginTop: '1.5rem', gap: '6px' }}>
              <button
                onClick={() => setPricingCategory('game')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: pricingCategory === 'game' ? 'linear-gradient(135deg, #c084fc, #a855f7)' : 'transparent',
                  color: pricingCategory === 'game' ? '#070213' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🎮 Minecraft &amp; Game
              </button>

              <button
                onClick={() => setPricingCategory('vps')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: pricingCategory === 'vps' ? 'linear-gradient(135deg, #c084fc, #a855f7)' : 'transparent',
                  color: pricingCategory === 'vps' ? '#070213' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🚀 Cloud VPS &amp; RDP
              </button>

              <button
                onClick={() => setPricingCategory('web')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: pricingCategory === 'web' ? 'linear-gradient(135deg, #c084fc, #a855f7)' : 'transparent',
                  color: pricingCategory === 'web' ? '#070213' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                🌐 cPanel Web
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}>
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: 'linear-gradient(180deg, #081a33 0%, #030a16 100%)',
                  border: plan.badge ? '2px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(168, 85, 247, 0.18)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: plan.badge ? '0 0 35px rgba(168, 85, 247, 0.2)' : '0 8px 32px rgba(0,0,0,0.4)'
                }}
              >
                {plan.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'linear-gradient(135deg, #c084fc, #d8b4fe)',
                    color: '#030712',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {plan.badge}
                  </span>
                )}

                <div>
                  <span style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {plan.category}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '6px 0 1rem' }}>
                    {plan.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff' }}>
                      {formatPrice(plan.price)}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>/month</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 600 }}>
                        <Check size={16} style={{ color: '#c084fc' }} />
                        <span>{plan.ram}</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={16} style={{ color: '#c084fc' }} />
                        <span>{plan.cpu}</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={16} style={{ color: '#c084fc' }} />
                        <span>{plan.storage}</span>
                      </li>
                      {plan.features.map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                          <Check size={16} style={{ color: '#d8b4fe' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/checkout/${plan.id}`}
                  style={{
                    background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                    color: '#070213',
                    textDecoration: 'none',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 900,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.35)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <Zap size={16} />
                  <span>Deploy Now &bull; Instant Setup</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL SERVER LOCATIONS SHOWCASE (PORTAL A REQUIREMENT) */}
      <section className="ag-section" id="locations" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <span className="ag-section-badge">GLOBAL EDGE INFRASTRUCTURE</span>
            <h2 className="ag-section-title" style={{ marginTop: '8px' }}>
              Optimized Low-Latency Datacenter Nodes
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Strategically placed tier-3 &amp; tier-4 data facilities connected directly to internet exchange points (IXPs) for minimal routing hops.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {SERVER_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                style={{
                  background: '#071529',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem' }}>{loc.flag}</span>
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    ● {loc.status}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                  {loc.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace' }}>
                  <Zap size={14} />
                  <span>Latency: {loc.ping}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  10 Gbps Redundant Fiber Uplink
                </span>
              </div>
            ))}
          </div>

          <ElectricNodeDiagram />
        </div>
      </section>

      {/* SECTION 5: 24/7 SUPPORT & HARDWARE SPECS (PORTAL A REQUIREMENT) */}
      <section className="ag-section" id="features" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <ScrollReveal animation="fade-up" className="section-heading text-center">
            <span className="ag-section-badge">HARDWARE SPECIFICATIONS</span>
            <h2 className="ag-section-title">Built for Performance &amp; Maximum Reliability</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '650px', margin: '8px auto 0' }}>
              We do not resell cheap virtualized slices. Data Serware operates dedicated enterprise hardware with strict resource reservation.
            </p>
          </ScrollReveal>

          <div className="ag-features-grid" style={{ marginTop: '2.5rem' }}>
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                  <div className="ag-feature-card">
                    <div className="feat-icon-ring">
                      <IconComp size={24} className="feat-icon" />
                    </div>
                    <h3 className="feat-title">{feat.title}</h3>
                    <p className="feat-desc">{feat.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA: CONNECTED DIRECTLY TO CLIENT AREA & CONTROL PANEL */}
      <section className="ag-section bottom-cta-sec">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="ag-bottom-cta-box" style={{ background: 'linear-gradient(135deg, #1a0b36 0%, #0c041a 100%)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '24px', padding: '3rem 2rem' }}>
              <div className="cta-info">
                <span className="ag-section-badge">DATA SERWARE CLOUD ECOSYSTEM</span>
                <h2>Deploy Your Infrastructure Today</h2>
                <p>Instant setup, 24/7 Discord support, and sub-15ms latency across Asia and global nodes.</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/plans" className="ag-primary-cta" style={{ textDecoration: 'none' }}>
                  <Zap size={18} />
                  <span>Explore All Plans</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://panel.dataserware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.9rem 1.5rem',
                    borderRadius: '12px',
                    background: 'rgba(168, 85, 247, 0.16)',
                    border: '1px solid rgba(192, 132, 252, 0.45)',
                    color: '#c084fc',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textDecoration: 'none'
                  }}
                >
                  <Terminal size={18} />
                  <span>Launch Control Panel</span>
                  <ExternalLink size={14} style={{ opacity: 0.8 }} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
