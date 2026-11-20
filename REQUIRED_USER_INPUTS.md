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

### A. Discord Community & Orders
*All customer purchases, billing, and server setups are handled directly through Discord tickets.*

1. **`DISCORD_INVITE_URL`**: `https://dsc.gg/dataserware`
2. **`DISCORD_PROMO_CODE`**: `dataserware10` (10% OFF on all plans)

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

### B. SMTP Transactional Mail Server
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
*When omitted, internal cluster storage (`devStore.js`) stores all active orders and servers locally.*
- **`SUPABASE_URL`**: [Supabase Dashboard > Settings > API](https://supabase.com/dashboard).
- **`SUPABASE_SERVICE_ROLE_KEY`**: Master key (Server-side Secret).
- **`VITE_SUPABASE_ANON_KEY`**: Public client key.
- **Migration**: Run `supabase_dataserware_migration.sql` in the Supabase SQL Editor.

### B. Firebase (Custom Admin Authentication Project)
*When omitted, client and server fallbacks allow Google OAuth login using existing configuration.*
- **`VITE_FIREBASE_*`**: Web client configuration from [Firebase Console > Project Settings](https://console.firebase.google.com/).
- **`FIREBASE_CLIENT_EMAIL` & `FIREBASE_PRIVATE_KEY`**: Service account private key for server-side token validation.
