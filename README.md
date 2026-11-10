# NOVEXHOST — Premium Web Hosting & Bare-Metal Cloud Platform

**NOVEXHOST** is an enterprise-grade hosting platform delivering high-performance Web Hosting (cPanel), Bare-Metal VDS physical servers (AMD Ryzen 9, AMD Ryzen 7, Intel Xeon), Game Server hosting (Minecraft, Palworld, Rust, GTA V), and Cloud VPS infrastructure with instant automated deployment, unguessable customer order tracking, and an international Aqua Cyber UI.

---

## 🌟 Key Features

- **Guest Purchasing (Zero Friction)**: Customers browse, customize configurations, and purchase servers without requiring account registration.
- **Instant Order Tracking**: Every order generates an unguessable 64-character cryptographic token (`/track-order?id=...&token=...`) allowing customers to access server status, cPanel logins, and SSH credentials securely.
- **cPanel / WHM Web Hosting**:
  - **NOVEX SOLO**: ₹24.20/month (1 Website, 10 GB NVMe, 2 MySQL DBs, Free SSL, cPanel).
  - **NOVEX PREMIUM**: ₹77.00/month (3 Websites, 20 GB NVMe, 10 MySQL DBs, Free SSL, cPanel).
  - **NOVEX BUSINESS**: ₹220.00/month (10 Websites, 50 GB NVMe, 100 MySQL DBs, SSH, cPanel).
  - Multi-term billing durations: 1 Month, 3 Months, 6 Months, and 12 Months.
- **Dedicated Bare-Metal Physical VDS Machines**:
  - **AMD Ryzen 9 9950X** (Flagship): 16 Cores / 32 Threads, 128 GB DDR4 ECC, 1 TB NVMe SSD, 1 Gbps Unmetered, 1 Dedicated IPv4, Full Root, Cloudflare Magic Transit DDoS, IPMI/KVM.
  - **AMD Ryzen 7 5700G** & **5800X**: 8 Cores / 16 Threads, 128 GB DDR4, 1 TB NVMe SSD, 1 Gbps Unmetered, Full Root.
  - **Intel Xeon E5-2699 v4**, **2680 v4**, **2670 v4**: Up to 22 Cores / 44 Threads, 128 GB ECC RAM, Enterprise NVMe, IPMI/KVM.
- **Razorpay Integration**: Real-time Razorpay Checkout modal, server-side order generation in INR paise, HMAC-SHA256 signature verification, timing-safe webhook processing, and duplicate-payment idempotency.
- **Multi-Engine Provisioning**:
  - cPanel / WHM API v1 integration for Linux shared hosting accounts.
  - Pterodactyl Application API integration for Minecraft, game servers, and VPS.
  - Bare-Metal NOC workflow and state machine with IPMI management.
- **Administrative Control Panel (`/admin`)**:
  - Revenue analytics and payment transaction records.
  - Manual deployment retry with zero duplicate charges.
  - Centralized catalog price management (+10% pricing formula preserved).
  - Web hosting account management and VDS physical machine fleet oversight.
  - Real-time environment and secrets health audit.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6, Lucide Icons, Vite 8, Tailwind CSS Aqua Theme (`#00f2fe`, `#06b6d4`, `#030712`).
- **Backend**: Netlify Serverless Functions (Node.js ES Modules).
- **Payment Gateway**: Razorpay Payments & Webhooks SDK.
- **Server Engines**: Pterodactyl Panel API, WHM Remote API v1, Bare-Metal IPMI / BMC.
- **Email Service**: Nodemailer (Aqua HTML receipts, invoices, deployment notices).

---

## 🚀 Quick Start (Local Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prajasmp/novexhost.git
   cd novexhost
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   *(See `ENV_SETUP_GUIDE.md` for full parameter descriptions).*

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   *Vite runs on `http://localhost:3000` with hot-reloading and integrated serverless API function execution.*

---

## 🧪 Testing & Verification

Run automated test suites:

```bash
# Core platform & Razorpay testing suite (39 assertions)
node scratch/test_novexhost.js

# Phase 2 Web Hosting & Bare-Metal VDS suite (24 assertions)
node scratch/test_phase2.js

# Environment validator & security suite (6 assertions)
node scratch/test_env_and_security.js
```

Build production bundle:
```bash
npm run build
```

---

## 📄 License & Attribution

NOVEXHOST Platform — All Rights Reserved.
