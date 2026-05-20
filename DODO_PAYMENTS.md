# Dodo Payments Setup Guide

Everything you need to go from "account exists" to "checkout is live on the site."

---

## Step 1 — Get your API key

1. Log into [dodopayments.com](https://dodopayments.com)
2. Go to **Developer → API Keys**
3. Copy your **Secret Key** (starts with `sk_live_...` for production)

---

## Step 2 — Add environment variables to Vercel

1. Go to [vercel.com](https://vercel.com) → your `lazygirlai` project → **Settings → Environment Variables**
2. Add each of these:

| Key | Value |
|---|---|
| `DODO_API_KEY` | your secret key from Step 1 |
| `DODO_MODE` | `live` |
| `NEXT_PUBLIC_DODO_MODE` | `live` |
| `NEXT_PUBLIC_SITE_URL` | `https://lazygirlai.vercel.app` |

3. Make sure **all environments** (Production, Preview, Development) are checked for each variable
4. Click **Save**

> **Test mode:** If you want to test first before going live, use `test` instead of `live` for the mode variables. In test mode, use card number `4242 4242 4242 4242` with any future date and any CVC to simulate a payment.

---

## Step 3 — Create products in Dodo

You need one product entry per shop item. Here's the process:

1. In your Dodo dashboard go to **Products → Create Product**
2. Fill in:
   - **Name** — same as the shop item (e.g. "Brand Voice GPT")
   - **Price** — match what's in the shop (e.g. $27)
   - **Type** — One-time payment
3. Save the product
4. Copy the **Product ID** — it looks like `prd_abc123xyz`

Do this for every available product you want to sell on-site.

---

## Step 4 — Wire each product to the site

Open `lib/shop-data.ts` and find the product. Add `dodoProductId` with the ID you copied:

```ts
{
  id: 'brand-voice-gpt',
  name: 'Brand Voice GPT',
  price: 27,
  status: 'available',
  kofiUrl: 'https://ko-fi.com/lazygirlai',
  dodoProductId: 'prd_abc123xyz',   // ← add this line
},
```

Once `dodoProductId` is set, the "get this ✦" button on that product card automatically switches to on-site checkout. The Ko-fi link stays as a fallback in the code but won't be shown.

After editing, deploy:
```bash
vercel --prod
```

---

## How the checkout flow works

1. Customer clicks **get this ✦**
2. An email input slides in below the button
3. They type their email and click **continue ✦**
4. The site calls `/api/checkout` (serverless function on Vercel)
5. That function creates a session via the Dodo API using your secret key
6. Dodo's checkout overlay opens on top of the page — customer fills in card details there
7. On success, they land on `/shop/thank-you`
8. Dodo emails them their receipt; you deliver the product manually or via Dodo's delivery settings

---

## Product delivery

Dodo Payments can automatically send a file or URL to the customer after purchase:

1. In the product settings, go to **Fulfillment → Digital Product**
2. Either upload the file directly, or paste the URL (e.g. your Notion template share link)
3. Dodo sends it to the customer's email automatically after payment clears

This is how to make the whole thing hands-off — no manual delivery needed.

---

## Quick reference: all shop products

Fill in the `dodoProductId` column as you create each product in Dodo:

| Product | Price | `id` in shop-data.ts | Dodo Product ID |
|---|---|---|---|
| Brand Voice GPT | $27 | `brand-voice-gpt` | |
| Job Search GPT | $37 | `job-search-gpt` | |
| Content Creator GPT | $37 | `content-creator-gpt` | |
| Weekly Planning GPT | $27 | `weekly-planning-gpt` | |
| Life Admin GPT | $17 | `life-admin-gpt` | |
| Inbox Zero System | $47 | `inbox-zero` | |
| Content Repurpose Workflow | $47 | `content-repurpose` | |
| Weekly Wrap Generator | $27 | `weekly-wrap` | |
| Life OS Dashboard | $47 | `life-os` | |
| Content Calendar System | $37 | `content-calendar` | |
| Finance Tracker | $27 | `finance-tracker` | |
| Goal + Habit System | $27 | `goal-habit` | |
| Brand Bible System | $37 | `brand-bible` | |
| Lazy Girl AI Sticker Pack | $8 | `sticker-pack` | |
| The Brand Bundle | $97 | `brand-bundle` | |
| The Life Admin Bundle | $77 | `life-admin-bundle` | |
| The Content Creator Bundle | $107 | `content-creator-bundle` | |

---

## Troubleshooting

**Checkout button does nothing / no overlay**
- Check browser console for errors
- Confirm `DODO_API_KEY` is set in Vercel and the deployment has been re-deployed after adding it
- Make sure `dodoProductId` is set on the product in `shop-data.ts`

**"Payment service not configured" error**
- The `DODO_API_KEY` env var is missing or empty in Vercel
- Re-deploy after adding it — env var changes require a new deployment

**Overlay opens but payment fails**
- In test mode: use card `4242 4242 4242 4242`, any future date, any CVC
- In live mode: confirm your Dodo account is verified and activated for live payments

**Customer paid but didn't receive the product**
- Set up Fulfillment in the Dodo product settings (see Product delivery section above)
- Or check your email for the Dodo payment notification and deliver manually

---

## Files changed for this integration

| File | What it does |
|---|---|
| `app/api/checkout/route.ts` | Serverless API that creates Dodo checkout sessions |
| `components/BuyButton.tsx` | The buy button with email collection and overlay logic |
| `components/DodoInit.tsx` | Loads and initializes the Dodo JS SDK on every page |
| `lib/shop-data.ts` | Add `dodoProductId` to each product here |
| `lib/dodo.d.ts` | TypeScript types for the Dodo SDK |
| `app/shop/thank-you/page.tsx` | Post-checkout success page |
| `.env.local` | Local environment variables (not committed to git) |
| `.env.local.example` | Template — shows which vars are needed |
