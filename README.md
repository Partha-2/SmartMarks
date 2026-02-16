# 🔖 SmartMarks — Real-time Bookmark Manager

SmartMarks is a high-performance, minimalist bookmark manager designed for the modern web. Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**, it offers a seamless experience with real-time synchronization across all your devices.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://smartmarks-beta.vercel.app)
[![GitHub](https://img.shields.io/badge/Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Partha-2/SmartMarks)

---

## ✨ Features

- **Google OAuth**: One-click secure login. No passwords to remember.
- **Private by Design**: Your bookmarks are yours. Enforced by Supabase Row Level Security (RLS).
- **Instant Sync**: See changes as they happen across tabs and devices without refreshing.
- **Optimistic UI**: Deletions and additions feel instant, with background processing.
- **Premium Aesthetics**: A custom glassmorphism dark-mode UI with Framer Motion animations.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🧠 Challenges & Solutions

Building a real-time application with secure auth presented several interesting challenges:

### 1. The "Refresh" Hurdle (Real-time Sync)
**Problem**: Initially, the UI required a manual refresh to show newly added bookmarks.
**Solution**: I implemented a robust `supabase_realtime` channel subscription in React. By listening for `postgres_changes` on the `bookmarks` table and updating the local state dynamically, the app now updates instantly across all open tabs.

### 2. UI Latency (Optimistic Updates)
**Problem**: The "Delete" operation felt slow because the app waited for a database response before updating the UI.
**Solution**: I moved to **Optimistic UI Updates**. When a user deletes a bookmark, the UI removes it immediately. If the database request fails, the app automatically restores the item and notifies the user. This makes the app feel incredibly snappy.

### 3. OAuth Redirect Mismatches
**Problem**: Configuring Google OAuth to work across both `localhost` and `vercel.app` caused several redirect errors.
**Solution**: I mapped out a definitive [OAuth Configuration Guide](.agent/brain/google_oauth_guide.md) that handles dual-redirect URIs for both the Supabase backend and the Vercel frontend.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account
- A Google Cloud Console account

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/Partha-2/SmartMarks.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the database migration:
   Copy the contents of `supabase_schema.sql` into the Supabase SQL Editor and run it.

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📄 License
Distributed under the MIT License.

## 🤝 Contact
Developed with ❤️ by [Partha](https://github.com/Partha-2)
