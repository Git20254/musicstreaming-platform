# 🎶 Music Streaming Platform

This is a **full-stack indie-first music streaming platform**.  
It includes a **NestJS backend**, a **React Native mobile app**, and a **Next.js frontend**.

---

## 🚀 Features
- 🎵 Track upload + streaming (Prisma + PostgreSQL)
- 👤 Artist + user accounts with authentication (JWT)
- ▶️ Playback via custom MusicPlayer
- 💳 Subscription payments via **Stripe Checkout**
- 🔔 Stripe **webhooks** for subscription lifecycle
- 💵 Payout calculation (2× Spotify rate)
- 🤖 AI recommendations (Python microservice)
- 🌐 Web + Mobile support

---

## 📂 Project Structure
musicstreaming-platform/
│── backend/ # NestJS + Prisma backend
│── frontend-web/ # Next.js frontend
│── mobile-app/ # React Native mobile app
│── ai-service/ # Python AI engine
│── CHANGELOG.md # Project history
│── README.md # Root documentation

yaml
Copy code

---

## 🛠️ Development Workflow

### 1. Clone & install
```bash
git clone https://github.com/Git20254/musicstreaming-platform.git
cd musicstreaming-platform
2. Backend setup
bash
Copy code
cd backend
npm install
cp .env.example .env   # configure DB + Stripe keys
npx prisma migrate dev
npm run start:dev
3. Mobile app
bash
Copy code
cd mobile-app
npm install
npm start
4. Web frontend
bash
Copy code
cd frontend-web
npm install
npm run dev
📡 Example API Usage
Register
bash
Copy code
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"fan@example.com","password":"secret123"}'
Login
bash
Copy code
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fan@example.com","password":"secret123"}'
Start subscription checkout
bash
Copy code
curl -X POST http://localhost:3000/payments/checkout \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json"
✅ Summary
The platform combines backend + mobile + frontend with Stripe-powered subscriptions, JWT auth, Prisma DB, and AI recommendations.
All changes are tracked in CHANGELOG.md.

yaml
Copy code

---

3. Save + exit:
- `CTRL+O`, then `Enter`  
- `CTRL+X`  

---

👉 Do you want me to give you the exact **git add/commit/push** commands for this new `README.md` right after you save it?





