# Data Serware — Complete Production Environment & Credentials Setup Guide

This document is the verified reference for all environment variables, security boundaries, and external integrations in the **Data Serware** platform.

---

## 1. Architectural Reality & Deployment Boundaries

- **Frontend (Client)**:
  - React 18 Single Page Application (SPA) built with Vite 8 into `dist/`.
  - Served via Cloudflare Pages or Netlify CDN.
  - SPA routing is preserved across CDN edges via `public/_redirects` (`/* /index.html 200`).
  - Cross-origin API calls are configured via `VITE_API_BASE_URL`.
- **Backend (Serverless API)**:
  - 17 Serverless Functions located in `netlify/functions/*.js` and `netlify/functions/lib/*.js`.
  - Runs in Node.js ES Module runtime.
  - In local development, `vite.config.js` executes these functions directly via `netlifyFunctionsDevPlugin` on `http://localhost:3000/api/*`.
- **Zero Login Purchasing**:
  - Customer ordering does **not** require customer registration or login.
  - Orders are tracked via 64-character cryptographic tokens (`/track-order?id=...&token=...`).
  - Admin authentication (`/admin`) is secured via Firebase Auth / Admin SDK with server-side role validation.

---

## 2. Environment Variables Master Matrix

| Exact Variable Name | Req/Opt | Public / Secret | Providing Service | Where to Obtain | Environment | Dependent Application Feature | Safe Placeholder? | How to Verify It Works |
|---|---|---|---|---|---|---|---|---|
| `RAZORPAY_KEY_ID` | **Required** (Live) | Public | Razorpay | [Razorpay Dashboard > Settings > API Keys](https://dashboard.razorpay.com/app/keys) | Both | Checkout modal initialization and backend order creation | Yes in dev (`rzp_test_...`) | Run test order checkout on `/checkout` |
| `RAZORPAY_KEY_SECRET` | **Required** (Live) | **STRICT SECRET** | Razorpay | [Razorpay Dashboard > Settings > API Keys](https://dashboard.razorpay.com/app/keys) | Both | Cryptographic HMAC-SHA256 signature verification | No in prod (must be real secret) | `node scratch/test_env_and_security.js` |
| `RAZORPAY_WEBHOOK_SECRET` | **Required** (Prod) | **STRICT SECRET** | Razorpay | [Razorpay Dashboard > Settings > Webhooks](https://dashboard.razorpay.com/app/webhooks) | Both | Asynchronous payment capture and timing-safe webhook verification | Allowed only in dev mode | Trigger simulated webhook in test suite |
| `PTERODACTYL_PANEL_URL` | Optional | Public | Pterodactyl | Pterodactyl Web Domain | Both | Game server & Cloud VPS provisioning API endpoint | Yes (`https://panel.dataserware.com`) | View nodes list in `/admin` |
| `PTERODACTYL_APPLICATION_API_KEY` | **Required** (Auto-Ptero) | **STRICT SECRET** | Pterodactyl | Pterodactyl Admin > Application API | Both | Automated Minecraft & VPS server creation and user provisioning | Safe dev fallback to sandbox queue | Order a game server on `/checkout` |
| `PTERODACTYL_CLIENT_API_KEY` | Optional | **STRICT SECRET** | Pterodactyl | Pterodactyl Account > API Credentials | Both | Console websockets and server power actions | Safe fallback to App Key | Test server power actions in admin |
| `PTERODACTYL_NODE_ID` | Optional | Public | Pterodactyl | Pterodactyl Admin > Nodes | Both | Target server allocation node | Yes (defaults to `1`) | Node allocation in provisioning |
| `PTERODACTYL_LOCATION_ID` | Optional | Public | Pterodactyl | Pterodactyl Admin > Locations | Both | Target datacenter location | Yes (defaults to `1`) | Node allocation in provisioning |
| `PTERODACTYL_NEST_ID` | Optional | Public | Pterodactyl | Pterodactyl Admin > Nests | Both | Server nest category | Yes (defaults to `1`) | Egg allocation in provisioning |
| `PTERODACTYL_MINECRAFT_EGG_ID` | Optional | Public | Pterodactyl | Pterodactyl Admin > Nests > Egg | Both | Minecraft egg ID | Yes (defaults to `3`) | Server startup parameters |
| `WHM_HOST` | **Required** (Auto-cPanel) | Public | cPanel/WHM | Dedicated WHM server IP/FQDN | Both | Linux shared hosting account creation (`createacct`) | Safe dev fallback to staging queue | Check account in WHM List Accounts |
| `WHM_USERNAME` | Optional | Public | cPanel/WHM | WHM administrative login | Both | WHM API authentication user | Yes (defaults to `root`) | Account ownership in WHM |
| `WHM_API_TOKEN` | **Required** (Auto-cPanel) | **STRICT SECRET** | cPanel/WHM | WHM > Manage API Tokens | Both | WHM Remote API v1 authentication header | Safe dev fallback to staging queue | Order cPanel hosting on `/checkout` |
| `WHM_PORT` | Optional | Public | cPanel/WHM | WHM SSL port configuration | Both | Remote port for WHM SSL API | Yes (defaults to `2087`) | WHM ping connectivity |
| `BARE_METAL_AUTO_PROVISION` | Optional | Public | Internal NOC | Set to `'false'` until datacenter hardware is verified | Both | Physical Bare-Metal VDS netboot deployment | **Must remain `false`** until verified | Staged in hardware allocation queue |
| `DEFAULT_DATACENTER` | Optional | Public | Internal NOC | Datacenter NOC agreement | Both | Physical location label on VDS cards | Yes (`"Equinix Mumbai (BOM1)"`) | Visible in customer tracking card |
| `SMTP_HOST` | Optional | Public | Email Provider | SendGrid, Postmark, Google Workspace | Both | Outgoing transactional email delivery | Safe (logs to console if unset) | Purchase server and check delivery |
| `SMTP_PORT` | Optional | Public | Email Provider | Email provider documentation | Both | SMTP submission port | Yes (defaults to `587`) | Nodemailer handshake |
| `SMTP_USER` | Optional | Public | Email Provider | Mail account username | Both | SMTP authentication user | Safe (logs to console if unset) | Outgoing mail authentication |
| `SMTP_PASS` | Optional | **STRICT SECRET** | Email Provider | Mail account password / App Password | Both | SMTP authentication password | Safe (logs to console if unset) | Outgoing mail authentication |
| `SMTP_FROM` | Optional | Public | Brand Spec | Brand configuration | Both | Customer-facing sender display header | Yes (`Data Serware Support <notifications@...>`) | Header in delivered customer email |
| `NODE_ENV` | Optional | Public | Node.js | Runtime environment | Both | Enforces strict HMAC validation and SSL checks | Yes (defaults to `development`) | Check `/api/admin/settings` |
| `PUBLIC_URL` | Optional | Public | Custom Domain | DNS / Cloudflare domain | Both | Customer order tracking URLs in emails | Yes (defaults to `http://localhost:3000`) | Click tracking URL in confirmation email |
| `VITE_API_BASE_URL` | Optional | Public | Hosting Provider | Backend Netlify domain (if separate from frontend) | Prod / Preview | Directs frontend API calls across origins | Yes (empty string for same-origin) | Network tab in browser DevTools |
| `ADMIN_EMAILS` | Optional | Public | Platform Ops | Organization administrator emails | Both | Whitelist of accounts authorized for `/admin` | Yes (`admin@dataserware.com`) | Login with admin email at `/admin` |
| `PRIMARY_ADMIN_EMAIL` | Optional | Public | Platform Ops | Owner email | Both | Designates owner role | Yes (`r26377269@gmail.com`) | Check owner badge in admin header |
| `SUPABASE_URL` | Optional | Public | Supabase | [Supabase Dashboard > Settings > API](https://supabase.com/dashboard) | Both | Remote PostgreSQL persistence | Safe (`devStore.js` used if unset) | Query orders in Supabase table |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | **STRICT SECRET** | Supabase | [Supabase Dashboard > Settings > API](https://supabase.com/dashboard) | Both | Master service_role database client | Safe (`devStore.js` used if unset) | Server-side database write test |
| `VITE_SUPABASE_URL` | Optional | Public | Supabase | [Supabase Dashboard > Settings > API](https://supabase.com/dashboard) | Both | Client-side Supabase connection | Safe fallback | Client-side query |
| `VITE_SUPABASE_ANON_KEY` | Optional | Public | Supabase | [Supabase Dashboard > Settings > API](https://supabase.com/dashboard) | Both | Public anon key subject to RLS | Safe fallback | Client-side query |
| `VITE_FIREBASE_*` (8 vars) | Optional | Public | Firebase | [Firebase Console > Project Settings](https://console.firebase.google.com/) | Both | Client-side Google OAuth login | Safe fallback in `firebase.js` | Sign in with Google on `/admin` |
| `FIREBASE_CLIENT_EMAIL` | Optional | Public | Firebase | Firebase Console > Service Accounts | Both | Server-side Admin SDK verification | Safe fallback | Verify token via Admin API |
| `FIREBASE_PRIVATE_KEY` | Optional | **STRICT SECRET** | Firebase | Firebase Console > Service Accounts | Both | Server-side Admin SDK RSA signature | Safe fallback | Verify token via Admin API |
| `UPI_RECEIVER_ID` | Optional | Public | Merchant Bank | Business UPI VPA | Both | Direct manual UPI intent QR code | Yes (`billing@dataserware`) | Test UPI QR code generation |
| `UPI_RECEIVER_NAME` | Optional | Public | Merchant Bank | Payee display name | Both | Direct manual UPI intent payee name | Yes (`Data Serware`) | Visible in UPI app intent |

---

## 3. Classification by Operational Requirement

### A. Required for Application Startup
- **None**: The application features zero crash-on-startup design. If all third-party environment variables are omitted, the platform initializes in full **development sandbox mode** using internal cluster storage (`devStore.js`), simulated hardware allocation, and test payment mocks.

### B. Required for Customer Purchasing & Registration
- **Zero Login Purchasing**: Customer registration is completely unauthenticated (zero login friction). Customers provide only server name, region/domain, customer name, email, and mobile number.
- **`PUBLIC_URL`**: Required in production to ensure tracking URLs sent to customers point to `https://dataserware.com/track-order?id=...&token=...` instead of localhost.

### C. Required for Razorpay Live Payments
- **`RAZORPAY_KEY_ID`**: Public key for checkout modal.
- **`RAZORPAY_KEY_SECRET`**: Private secret for backend order creation and HMAC verification.
- **`RAZORPAY_WEBHOOK_SECRET`**: Required for verifying asynchronous webhooks from Razorpay.

### D. Required for Automated Pterodactyl Provisioning (Minecraft, Game Servers, VPS)
- **`PTERODACTYL_PANEL_URL`**: Base URL of your Pterodactyl panel.
- **`PTERODACTYL_APPLICATION_API_KEY`**: Application API key (`ptla_...`) with write permissions for Users, Nodes, Allocations, and Servers.

### E. Required for Automated cPanel / WHM Web Hosting
- **`WHM_HOST`**: WHM server hostname or IP.
- **`WHM_API_TOKEN`**: API token generated in WHM > Manage API Tokens with `createacct`, `suspendacct`, `unsuspendacct` permissions.

### F. Required for Transactional Email (Receipts, Credentials)
- **`SMTP_HOST`**, **`SMTP_USER`**, **`SMTP_PASS`**: SMTP credentials for outgoing mail. In local dev, emails are safely logged to console.

### G. Required for VDS Machines / Bare-Metal Physical Provisioning
- **`BARE_METAL_AUTO_PROVISION`**: Must remain `false` until physical chassis, IPMI controllers, and network drops are verified in the datacenter. Orders are safely held in the `hardware_allocation` NOC staging queue.

### H. Variables Confirmed Obsolete / Unused
- `DATABASE_URL`: Not used. Persistence utilizes REST API via `@supabase/supabase-js` or in-memory `devStore.js`.
- `PORT` / `HOST`: Vite dev server manages port 3000 locally; production uses serverless functions.
- `JWT_SECRET` / `SESSION_SECRET`: Not used. Ordering requires zero customer login; admin auth uses Firebase tokens.
- `CORS_ORIGIN`: Built-in serverless handlers dynamically assign CORS headers.
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_PAGES_PROJECT_NAME`: Not referenced by application code (only used if running custom CI/CD scripts).
