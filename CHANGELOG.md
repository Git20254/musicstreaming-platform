# 📜 Changelog
   
All notable changes to this project will be documented here.  
This project follows [Keep a Changelog](https://keepachangelog.com/) and uses [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
- Planned: add user authentication
- Planned: improve playlist UI
- Planned: connect payments service

---

## [1.0.0] - 2025-10-01
### Added
- 💳 Integrated **Stripe Checkout** for subscriptions (PaymentsModule + PaymentsService)
- 🔔 Implemented **Stripe Webhooks** (`/webhooks/stripe`) for handling subscription events
- 🗄️ Added **Prisma migrations**:
  - `add_password_and_role_to_user`
  - `fix_user_stream_relation`
  - `add_stripe_events`
  - `add_subscription_flag`
- 👤 Extended `User` model with `subscriptionActive` flag
- 🔐 JWT authentication fully working (login + register endpoints)
- 📘 Updated **README.md** to document Stripe integration, Prisma, and dev setup  

### Changed
- 🔧 Improved backend project structure with new modules (`auth/`, `payments/`, `webhooks/`)
- 📝 Synced backend + DB changes to GitHub with tag `v1.0.0`

### Notes
- Current backend subscription flow:  
  1. User registers or logs in (`/auth/register` or `/auth/login`)  
  2. User calls `/payments/checkout` → Stripe subscription session created  
  3. Webhook updates DB → activates subscription (`subscriptionActive = true`)  

---

## [0.1.0] - 2025-09-30
### Added
- 🎵 Working **MusicPlayer** with cover art + audio playback
- 🖼️ Local asset artwork (`me-against-world.jpg`) displayed in player
- 📱 Playlist view in mobile app (`App.js`) with artist + title 
- 📂 Backend endpoint `/tracks` with artist and artwork data

### Changed
- 📝 Cleaned up `README.md` for **backend** and **mobile-app**
- 🔧 Database updated with sample track (`me-against-world`)

---

## [0.0.1] - 2025-09-28
### Added
- 🎶 Initial backend setup with **NestJS + Prisma + PostgreSQL**
- 📱 Initial mobile app scaffold with Expo / React Native
- 🖥️ Project structure: backend, mobile-app, frontend-web

