# Data Serware — Required User Inputs & Setup Checklist

This document provides a clean, easy-to-follow checklist of every value, credential, and setting you must provide to launch **Data Serware** into production.

---

## 1. Information You Can Provide Without Credentials

| Item | Description | Where to Set It | Safe Default |
|---|---|---|---|
| **Public Base URL** | Your production website URL (e.g. `https://dataserware.com`). Used to construct customer tracking links in emails. | `PUBLIC_URL` in `.env` / Hosting env | `http://localhost:3000` |
| **Admin Email Whitelist** | Comma-separated email addresses authorized to access the `/admin` dashboard. | `ADMIN_EMAILS` in `.env` / Hosting env | `admin@dataserware.com` |
| **Primary Owner Email** | The primary administrator designated with full owner privileges. | `PRIMARY_ADMIN_EMAIL` in `.env` | `r26377269@gmail.com` |
| **Default Datacenter Label** | Physical facility name shown on VDS machine cards. | `DEFAULT_DATACENTER` in `.env` | `"Equinix Mumbai (BOM1)"` |

---

## 2. API Credentials You Must Obtain

### A. Razorpay Live Payment Gateway
*Required to collect real payments from customers. Never commit secrets to Git.*

1. **`RAZORPAY_KEY_ID`**:
   - **Where to Obtain**: [Razorpay Dashboard > Settings > API Keys](https://dashboard.razorpay.com/app/keys).
   - **Instructions**: Switch the top toggle to **Live Mode**. Click **Generate Key**. Copy the **Key Id** (`rzp_live_...`).
   - **Where to Enter**: Cloudflare Pages / Netlify Dashboard Environment Variables.
   - **Secret?**: Public key ID (used in checkout modal).

2. **`RAZORPAY_KEY_SECRET`**:
   - **Where to Obtain**: [Razorpay Dashboard > Settings > API Keys](https://dashboard.razorpay.com/app/keys).
   - **Instructions**: Generated alongside Key ID. Copy immediately.
   - **Where to Enter**: Netlify Dashboard > Site configuration > Environment variables (Server-side Secret).
   - **Secret?**: **STRICT SECRET**.

3. **`RAZORPAY_WEBHOOK_SECRET`**:
   - **Where to Obtain**: [Razorpay Dashboard > Settings > Webhooks](https://dashboard.razorpay.com/app/webhooks).
   - **Instructions**: Click **Add New Webhook**. Set Webhook URL to `https://<your-domain>/api/payments/webhook`. Set a secure Secret string. Check active events: `payment.captured`, `order.paid`, `payment.failed`. Save and copy the secret string.
   - **Where to Enter**: Netlify Secrets Dashboard.
   - **Secret?**: **STRICT SECRET**.

---

## 3. Server and Hosting Details

### A. Pterodactyl Panel (Game Servers & Cloud VPS)
*Required for automatic server provisioning of Minecraft, Palworld, Rust, GTA V, and VPS plans.*

1. **`PTERODACTYL_PANEL_URL`**:
   - **Where to Obtain**: The domain where your Pterodactyl panel runs (e.g. `https://panel.dataserware.com`).
2. **`PTERODACTYL_APPLICATION_API_KEY`**:
   - **Where to Obtain**: Pterodactyl Admin Panel > Application API.
   - **Instructions**: Click **Create New**. Grant read and write permissions to `Users`, `Nodes`, `Allocations`, and `Servers`. Copy the `ptla_...` token.
   - **Where to Enter**: Netlify Secrets Dashboard.
   - **Secret?**: **STRICT SECRET**.
3. **Pterodactyl Target Identifiers** (Optional, defaults to `1`):
   - `PTERODACTYL_NODE_ID`: ID of the target Pterodactyl node (Pterodactyl Admin > Nodes).
   - `PTERODACTYL_LOCATION_ID`: ID of the datacenter location (Pterodactyl Admin > Locations).
   - `PTERODACTYL_NEST_ID`: ID of the nest (Pterodactyl Admin > Nests).
   - `PTERODACTYL_MINECRAFT_EGG_ID`: ID of the Minecraft egg (defaults to `3`).

### B. cPanel / WHM (Web Hosting Provisioning)
*Required for automatic cPanel account creation for SERWARE SOLO, PREMIUM, and BUSINESS plans.*

1. **`WHM_HOST`**:
   - **Where to Obtain**: Your cPanel/WHM server domain or IP (e.g. `https://cpanel.dataserware.com`).
2. **`WHM_USERNAME`**:
   - **Where to Obtain**: WHM root or reseller username (defaults to `root`).
3. **`WHM_API_TOKEN`**:
   - **Where to Obtain**: Log in to WHM (`https://your-server-ip:2087`) > In search box, type **Manage API Tokens** > Click **Generate Token**.
   - **Instructions**: Name it `Data Serware-Billing`. Under Privileges, enable `createacct`, `suspendacct`, `unsuspendacct`, and Package Management. Copy the token.
   - **Where to Enter**: Netlify Secrets Dashboard.
   - **Secret?**: **STRICT SECRET**.
4. **`WHM_PORT`**: Port for WHM SSL (defaults to `2087`).

### C. SMTP Transactional Mail Server
*Required for customer order receipts, invoices, and server credential delivery.*

1. **`SMTP_HOST`**: Outgoing mail server (e.g. `smtp.gmail.com` or `mail.dataserware.com`).
2. **`SMTP_PORT`**: Submission port (defaults to `587` or `465`).
3. **`SMTP_USER`**: Email address used for sending (e.g. `notifications@dataserware.com`).
4. **`SMTP_PASS`**: Account password or Google Workspace App Password ([https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
   - **Secret?**: **STRICT SECRET**.
5. **`SMTP_FROM`**: Formatted sender header (e.g. `"Data Serware Support <notifications@dataserware.com>"`).

---

## 4. Cloudflare and Domain Configuration

### A. Cloudflare Pages Frontend Deployment
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
2. Select repository: `prajasmp/dataserware`.
3. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Set Build Environment Variables:
   - `NODE_VERSION` = `20`
   - `VITE_API_BASE_URL` = `https://<your-netlify-backend-subdomain>.netlify.app` *(or your custom API domain e.g. `https://api.dataserware.com`)*.
5. Deploy. SPA routing is automatically maintained via `public/_redirects`.

### B. Custom Domain & DNS
1. Point your root domain `dataserware.com` and `www.dataserware.com` to Cloudflare Pages.
2. Point your API subdomain `api.dataserware.com` (or Netlify backend) to your Netlify site.
3. Ensure SSL/TLS encryption is set to **Full (strict)** in Cloudflare.

---

## 5. Optional Integrations

### A. Supabase (Remote PostgreSQL Persistence)
*When omitted, internal cluster storage (`devStore.js`) stores all active orders, machines, and web accounts locally.*
- **`SUPABASE_URL`**: [Supabase Dashboard > Settings > API](https://supabase.com/dashboard).
- **`SUPABASE_SERVICE_ROLE_KEY`**: Master key (Server-side Secret).
- **`VITE_SUPABASE_ANON_KEY`**: Public client key.
- **Migration**: Run `supabase_dataserware_migration.sql` in the Supabase SQL Editor.

### B. Firebase (Custom Admin Authentication Project)
*When omitted, client and server fallbacks allow Google OAuth login using existing configuration.*
- **`VITE_FIREBASE_*`**: Web client configuration from [Firebase Console > Project Settings](https://console.firebase.google.com/).
- **`FIREBASE_CLIENT_EMAIL` & `FIREBASE_PRIVATE_KEY`**: Service account private key for server-side token validation.

---

## 6. Hardware & Bare-Metal VDS Information

*CRITICAL: Automatic bare-metal provisioning is intentionally kept **DISABLED** (`BARE_METAL_AUTO_PROVISION=false`) by default to prevent failed netboot attempts on non-existent hardware.*

- **Hardware Racking**: Racking physical bare-metal chassis (AMD Ryzen 9 9950X, Ryzen 7 5700G/5800X, Intel Xeon E5-2699/2680/2670 v4).
- **Network & IPMI Access**: Datacenter technicians must provide:
  1. Dedicated Out-of-Band IPMI/BMC controller IP addresses and login credentials.
  2. Public dedicated IPv4 blocks and gateway MAC addresses.
  3. PXE netboot operating system images (Ubuntu 24.04/22.04 LTS, Debian 12, Rocky Linux 9, Windows Server).
- Once physical hardware is verified, you can toggle `BARE_METAL_AUTO_PROVISION=true` in `.env` / Admin Console.
