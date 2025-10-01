# 🎶 Music Streaming Platform – Backend (NestJS + Prisma)

This is the **backend service** for the Indie-first Music Streaming Platform.  
It powers **track storage, streaming, payouts, and recommendations**.

---

## 🚀 Features
- 🎵 Track upload + metadata (Prisma + PostgreSQL)
- 👤 Artist + user accounts
- ▶️ Stream logging
- 💵 Payout calculation (2× Spotify rate)
- 🤖 AI recommendations (Python engine)
- 🔐 Authentication (JWT)

---

## 📂 Project Structure
backend/
│── src/
│   ├── tracks/        # Track service (CRUD, streaming)
│   ├── auth/          # Authentication
│   ├── payments/      # Artist payouts
│   ├── recommendations/ # AI engine (Python)
│   └── prisma/        # Prisma client + schema
│── prisma/schema.prisma # Database schema
│── README.md
│── package.json

---

## 🛠️ Development Workflow

### 1. Setup database
Make sure PostgreSQL is running locally:
```bash
psql -h localhost -U mainframe -d musicdb
2. Start backend
bash
Copy code
cd backend
npm install
npm run start:dev
📡 API Example
Fetch all tracks
bash
Copy code
curl http://localhost:3000/tracks
Example response:

json
Copy code
{
  "id": "me-against-world",
  "title": "Me Against the World",
  "url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "artwork": "https://upload.wikimedia.org/wikipedia/en/9/97/2PacMeAgainsttheWorld.jpg",
  "creator": { "name": "Tupac Shakur" }
}
✅ Summary:
The backend handles track management, streaming logs, payouts, and AI recommendations.
It connects to PostgreSQL via Prisma and serves JSON APIs for the mobile + web apps.

yaml
Copy code

---

### 3. Save & exit
- In `nano`: press `CTRL+O`, `ENTER` to save, then `CTRL+X` to exit.  

---

### 4. Commit changes
```bash
git add README.md
git commit -m "docs(backend): add clean README with features + setup"
o
