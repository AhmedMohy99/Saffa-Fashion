# Saffa Fashion — صفا فاشون

Next.js 14 storefront for Saffa Fashion. Seven individual modest-dress products, 1,000 EGP each, sizes L and XL, and WhatsApp ordering.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Images

All product photos are stored in `public/products/` and the logo is `public/logo.jpeg`.

To replace a product image, keep the same filename or update its path in `lib-products.ts`.

## WhatsApp

The project uses the WhatsApp message link supplied by the store. The order flow creates the full order message (product, color, price, size and weight), copies it to the clipboard, and opens the supplied WhatsApp link.

If you later provide a direct WhatsApp number, the order button can be changed to a true one-click `wa.me/<number>?text=...` link without requiring paste.

## Deploy to Vercel

Push this folder to GitHub, then import the repository into Vercel. Vercel will build the Next.js app automatically.

Add the custom domain `saffafashion.shop` in Vercel Project Settings → Domains. Vercel will show the exact DNS records required for the registrar.
