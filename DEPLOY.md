# Deploying ZEWARE FITRAT on Coolify

The site is a Next.js app with a small **file-based database**. Products, orders,
and uploaded images/videos are stored on disk under `DATA_DIR` (default `/app/data`).
You **must** attach a persistent volume there, or every deploy resets your data.

There are two supported ways to deploy. Pick one.

---

## Option A — Docker Compose (recommended, volume is automatic)

1. In Coolify, create a new resource → **Docker Compose** → point it at this GitHub repo.
2. Coolify reads `docker-compose.yml`, which already defines the `zf_data` volume
   mounted at `/app/data`. Nothing else to configure for persistence.
3. Set the environment variable:
   - `ADMIN_PASSWORD` = *your strong password*
4. Deploy.

That's it — the `zf_data` volume survives redeploys, so products/orders/uploads persist.

---

## Option B — Dockerfile build pack

1. In Coolify, create a new resource → **Dockerfile** (or "Application" with build
   pack = Dockerfile) → point it at this repo. It uses the included `Dockerfile`.
2. Add **Persistent Storage** (Storages tab):
   - Mount path: `/app/data`
   - (name/host path can be anything Coolify suggests)
3. Add environment variables:
   - `ADMIN_PASSWORD` = *your strong password*
   - `DATA_DIR` = `/app/data`  *(already the default, but set it to be safe)*
4. Set the port to **3000** if Coolify asks.
5. Deploy.

---

## After the first deploy

- Visit `https://your-domain/admin` and log in with `ADMIN_PASSWORD`.
- Add/edit products, upload photos and product videos, manage orders.
- Everything you change is written to the volume and kept across future deploys.

## Environment variables

| Variable         | Required | Default              | Purpose                                   |
|------------------|----------|----------------------|-------------------------------------------|
| `ADMIN_PASSWORD` | **Yes**  | `zewarefitrat123`    | Password for `/admin`. Change it.         |
| `DATA_DIR`       | Yes*     | `/app/data`          | Where the JSON db + uploads live.         |
| `ADMIN_SECRET`   | No       | derived from password| Extra secret for signing admin sessions.  |
| `CALLMEBOT_PHONE`  | No     | —                    | Your WhatsApp number for order alerts.    |
| `CALLMEBOT_APIKEY` | No     | —                    | CallMeBot key (see below).                |
| `ORDER_WEBHOOK_URL`| No     | —                    | POST each order to n8n/Zapier/etc.        |

## WhatsApp order notifications

Get a WhatsApp message the moment a customer places an order.

**Free option — CallMeBot (2 minutes):**
1. Save **+34 644 74 82 80** to your phone contacts.
2. Send it this WhatsApp message: `I allow callmebot to send me messages`
3. It replies with your **apikey**.
4. In Coolify env vars, set:
   - `CALLMEBOT_PHONE` = your number with country code, e.g. `923001234567`
   - `CALLMEBOT_APIKEY` = the key it gave you
5. Redeploy. Place a test order — you'll get a WhatsApp with the order details.

**Advanced option — webhook:** set `ORDER_WEBHOOK_URL` to any endpoint (n8n, Zapier,
Make, or a WhatsApp Cloud API relay). Each order is POSTed as
`{ type: "new_order", message, order }`.

Both can be set at once. If neither is set, orders are still saved — you just
won't get a push notification (check the admin Orders page).

\* Required only in the sense that it must point at your mounted volume. The Docker
image already defaults it to `/app/data`.

## Notes

- Uploaded media is served from `/api/media/<file>` (supports video range requests).
- To back up your store, copy the contents of the volume (`products.json`,
  `orders.json`, `uploads/`).
- The first boot seeds `products.json` from the built-in catalogue; after that,
  the admin panel is the source of truth.
