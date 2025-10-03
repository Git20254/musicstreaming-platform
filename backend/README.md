# 🎶 Music Streaming Platform – Backend (NestJS + Prisma + Stripe)

This is the **backend service** for the Indie-first Music Streaming Platform.  
It powers **track storage, streaming, subscriptions, payouts, and recommendations**.

---

## 🚀 Features
- 🎵 **Track Management** – Upload, stream, log playback (Prisma + PostgreSQL)  
- 👤 **User Accounts** – Register/login with role-based access (Artist, Fan)  
- 🔐 **Authentication** – Secure JWT auth with guards  
- 💳 **Stripe Integration** – Checkout Sessions, Subscriptions, Webhooks  
- 💵 **Payout Calculation** – Artist earnings (2× Spotify rate)  
- 🤖 **AI Recommendations** – Powered by Python engine  

---

## 📂 Project Structure
backend/
│── src/
│ ├── auth/ # JWT-based authentication
│ ├── payments/ # Stripe checkout + subscriptions
│ ├── users/ # User accounts + subscription flag
│ ├── webhooks/ # Stripe webhook listener
│ ├── tracks/ # Track CRUD + streaming
│ ├── streams/ # Stream logs
│ ├── prisma.service.ts # Prisma DB service
│ └── app.module.ts # Root NestJS module
│── prisma/
│ ├── schema.prisma # Prisma schema (User, Track, Stream, StripeEvent)
│ └── migrations/ # Database migrations
│── .env # Environment variables
│── package.json
│── README.md

yaml
Copy code

---

## ⚙️ Environment Variables (`.env`)
Copy and configure:

```env
# PostgreSQL
DATABASE_URL="postgresql://mainframe@localhost:5432/musicdb?schema=public"

# JWT
JWT_SECRET=your_jwt_secret_here

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_xxx_your_key_here

# Stripe Webhook Secret (from `stripe listen`)
STRIPE_WEBHOOK_SECRET=whsec_7cd32bdd81c1513651766f7d9020688c8ea1caca7b098237bc2d07fd11c34e43
🛠️ Development Workflow
1. Setup database
bash
Copy code
psql -h localhost -U mainframe -d musicdb
npx prisma migrate dev
2. Start backend
bash
Copy code
cd backend
npm install
npm run start:dev
3. Stripe CLI (listen for webhooks)
bash
Copy code
stripe listen --forward-to localhost:3000/webhooks/stripe
4. Authentication
Register → Login → Get JWT Token

bash
Copy code
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"fan1@example.com","password":"secret123"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fan1@example.com","password":"secret123"}'
5. Stripe Checkout (Subscription)
bash
Copy code
curl -X POST http://localhost:3000/payments/checkout \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json"
✅ Returns a Stripe Checkout URL. Open in browser → Pay with test card (4242 4242 4242 4242).

6. Verify Subscription
bash
Copy code
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
Response includes:

json
Copy code
{
  "userId": 2,
  "email": "dgaye2@gmail.com",
  "role": "FAN",
  "subscriptionActive": true
}
📜 Project Log
v1.0.0 (Oct 1, 2025)
✅ Integrated Stripe Checkout (subscription mode)
✅ Added Stripe Webhooks (checkout.session.completed, subscription.deleted)
✅ Prisma migrations: add_password_and_role_to_user, add_subscription_flag, add_stripe_events
✅ User model updated with subscriptionActive flag
✅ End-to-end working login → checkout → webhook → DB subscription update
✅ Tagged release: v1.0.0

✅ Summary
The backend now fully supports JWT authentication, subscriptions via Stripe, webhook syncing, and Prisma migrations.
This README keeps track of setup + deployment instructions, so you don’t forget steps. 🚀

yaml
Copy code

---

### 3. Save & Exit  
- In `nano`: `CTRL+O` → `ENTER` → `CTRL+X`  

---

### 4. Commit + Push  
```bash
git add README.md
git commit -m "docs: update README with Stripe + subscriptions setup"
git push origin main
