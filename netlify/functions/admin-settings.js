import { verifyFirebaseToken, isAuthorizedAdmin } from './lib/firebaseAdmin.js';
import { validateEnvironment } from './lib/envValidator.js';

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const authUser = await verifyFirebaseToken(event.headers);

    if (!isAuthorizedAdmin(authUser.email)) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Forbidden: Admin access required' })
      };
    }

    const panelUrl = process.env.PTERODACTYL_PANEL_URL || 'https://panel.dataserware.com';
    const hasPteroAppKey = Boolean(process.env.PTERODACTYL_APPLICATION_API_KEY && !process.env.PTERODACTYL_APPLICATION_API_KEY.includes('your_'));
    const hasPteroClientKey = Boolean(process.env.PTERODACTYL_CLIENT_API_KEY && !process.env.PTERODACTYL_CLIENT_API_KEY.includes('your_'));

    const smtpHost = process.env.SMTP_HOST || '';
    const smtpPort = process.env.SMTP_PORT || '587';
    const smtpFrom = process.env.SMTP_FROM || 'Data Serware Support <notifications@dataserware.com>';
    const hasSmtpAuth = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        settings: {
          brand: {
            name: 'Data Serware',
            company: 'Data Serware Hosting Platform',
            currency: 'INR',
            website: 'https://dataserware.com',
            theme: 'Aqua Cyber UI'
          },
          discord: {
            inviteUrl: 'https://dsc.gg/dataserware',
            ticketChannel: '#tickets',
            promoCode: 'dataserware10',
            discountPercent: 10
          },
          pterodactyl: {
            panelUrl,
            hasApplicationKey: hasPteroAppKey,
            hasClientKey: hasPteroClientKey,
            nodeId: Number(process.env.PTERODACTYL_NODE_ID || 1),
            locationId: Number(process.env.PTERODACTYL_LOCATION_ID || 1),
            nestId: Number(process.env.PTERODACTYL_NEST_ID || 1),
            eggId: Number(process.env.PTERODACTYL_MINECRAFT_EGG_ID || 3)
          },
          smtp: {
            isConfigured: Boolean(smtpHost && hasSmtpAuth),
            host: smtpHost || 'smtp.sendgrid.net (Example)',
            port: smtpPort,
            from: smtpFrom,
            hasAuth: hasSmtpAuth
          },
          envAudit: validateEnvironment()
        }
      })
    };
  } catch (err) {
    console.error('[Admin Settings Error]:', err);
    return {
      statusCode: err.message.includes('Unauthorized') ? 401 : 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
}

