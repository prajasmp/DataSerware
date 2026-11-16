# Data Serware — Multi-Portal Cloud & Game Hosting Architecture

**Data Serware** is an enterprise-grade cloud and game server hosting ecosystem delivering high-performance AMD Ryzen™ 9 7950X / EPYC™ bare metal, Cloud VPS, remote desktop (RDP), and cPanel Web Hosting with 1.2 Tbps DDoS protection and automated 60-second provisioning.

The platform is architected into three distinct, interconnected portals modeled after the SkilloraClouds ecosystem:
1. 🌐 **Portal A: Main Marketing Website** (`dataserware.com` / `/`)
2. 💳 **Portal B: Client Area & Billing Portal** (`client.dataserware.com` / `/billing` or `/client`)
3. 🖥️ **Portal C: Game & Server Control Panel** (`panel.dataserware.com` / `/panel`)

---

## 🏛️ Multi-Portal Architecture & User Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA SERWARE ECOSYSTEM                          │
├─────────────────────┬──────────────────────────┬───────────────────────┤
│      PORTAL A       │         PORTAL B         │       PORTAL C        │
│   Main Marketing    │   Client Area & Billing  │  Server Control Panel │
│  (dataserware.com)  │ (client.dataserware.com) │(panel.dataserware.com)│
│        [/]          │    [/billing, /client]   │   [/panel, /panel/..] │
├─────────────────────┼──────────────────────────┼───────────────────────┤
│ • Hardware Specs    │ • Product Storefront     │ • Pterodactyl Panel   │
│ • Service Showcase  │ • Shopping Cart Flow     │ • Live Web Console    │
│ • Interactive Map   │ • Currency Switcher      │ • Power Controls      │
│ • Pricing & Offers  │ • Active Services List   │ • Real-Time Metrics   │
│ • "Order Now" CTAs  │ • Invoice Management     │ • File Manager & Edit │
│   → Passes selected │ • Support Helpdesk       │ • MySQL Databases     │
│     plan to Portal B│ • "Manage Server" CTA    │ • Backup Snapshots    │
│                     │   → Launches Portal C    │ • Network & Port Allocs│
└─────────────────────┴──────────────────────────┴───────────────────────┘
```

### 1. Portal A: Main Marketing Website (`/`)
- **Headline & Badges**: 1.2 Tbps DDoS protection, 99.9% uptime SLA, sub-12ms ping, 24/7 technical support.
- **Service Categories**: Game Servers (Minecraft, Palworld, Rust, GTA V), Cloud VPS (Linux & Windows), Dedicated RDP, Bare-Metal Dedicated Servers (AMD Ryzen 9 9950X / EPYC), cPanel Web Hosting, Discord Bot Hosting.
- **Pricing & Discounts**: Monthly plans with promotional discounts (e.g. `SERWARE20` for 20% off). Clicking "Order Now" on any plan passes the plan parameters and redirects directly to Portal B (`/billing?plan=...`).
- **Global Nodes Showcase**: Interactive latency cards for Mumbai (8-18ms), Singapore (35-50ms), Frankfurt (110-130ms), Virginia, and London.

### 2. Portal B: Client Area & Billing Portal (`/billing` or `/client`)
- **Storefront**: Full searchable and filterable catalog across all infrastructure tiers.
- **Cart & Checkout**: Accepts preselected plans from the main website. Configurable server hostnames, datacenter locations, billing cycles (Monthly, Quarterly with 10% off, Annual with 20% off), OS/software selectors, and promo code verification.
- **Authentication**: Clean Login & Register views, plus a 1-click Demo Client toggle for immediate testing.
- **Client Dashboard**:
  - **Active Services**: Shows running servers with status pills (`● Active`), IP addresses, node names, and direct **"Manage Server (Control Panel)"** buttons redirecting to Portal C.
  - **Invoices**: Paid and unpaid invoices with download receipt and pay now workflows.
  - **Support Helpdesk**: Interactive ticket creation and status tracking.

### 3. Portal C: Game & Server Control Panel (`/panel`)
- **Pterodactyl-Style Dark-Mode UI**: Multi-server switcher, server status indicators (`● ONLINE`, `● STARTING`, `● OFFLINE`), node details, and IP addresses.
- **Interactive Management Features**:
  - **Power Controls**: `[▶ Start]`, `[⟳ Restart]`, `[■ Stop]`, `[⚡ Kill]` with instant visual feedback and simulated power transitions.
  - **Live Console Terminal**: Streaming timestamped server logs, animated colorized prompt, and command input supporting `help`, `tps`, `status`, `say <message>`, `stop`, `restart`, `clear`.
  - **Real-Time Resource Bars**: Live fluctuating CPU usage %, Memory allocation (RAM), NVMe storage gauge, and network I/O counters.
  - **File Manager**: Directory navigation (`server.properties`, `paper-global.yml`, `plugins/`, `world/`), built-in Code Editor modal with save capabilities, file creation, and deletion.
  - **MySQL Databases**: Connection hosts, database names, usernames, and password reveal toggles.
  - **Snapshots & Backups**: Daily automated snapshots, instant manual backup creation, and restore actions.
  - **Network & Ports**: Primary game port allocations and secondary webmap/voice port assignments.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6, Lucide Icons, Vite 8, JetBrains Mono & Outfit typography.
- **Ecosystem Portals**: Subdomain-ready architecture with top-level `PortalSwitcherBar` (`dataserware.com`, `client.dataserware.com`, `panel.dataserware.com`).
- **Deployment**: Static build output in `/dist` compatible with Netlify, Cloudflare Workers/Pages (`wrangler.json`), or custom nginx hosts.

---

## 🚀 Local Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

© 2026 Data Serware. All rights reserved. Enterprise Cloud Infrastructure.
