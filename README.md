# Smart Bookmarks Manager

A simple, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## Features
- **Google OAuth**: Secure login using Google account.
- **Private Data**: Users only see their own bookmarks (enforced by Supabase RLS).
- **Real-time Sync**: Bookmark list updates instantly across tabs using Supabase Realtime.
- **Modern UI**: Sleek, dark-mode focused design with Framer Motion animations.
- **Responsive**: Works on mobile and desktop.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Backend/Auth**: Supabase (PostgreSQL, GoTrue, Realtime)
- **Deployment**: Vercel

## Challenges Encountered & Solutions
1. **Directory Naming Conflict**: The initial project folder `Abstrabit` had capital letters, which caused `create-next-app` to fail due to npm naming restrictions. I solved this by initializing the project in a temporary lowercase subfolder and moving the files to the root.
2. **Real-time Filtering**: Ensuring real-time updates only triggered for the relevant user's data. I used Supabase's channel filtering (`user_id=eq.${user.id}`) to optimize and secure the real-time stream.
3. **Session Persistence**: Managing auth state across page refreshes. I used Supabase's `onAuthStateChange` listener within a React Context Provider to ensure a consistent experience.

## Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. Run the SQL provided in `supabase_schema.sql` in your Supabase SQL Editor.
5. `npm run dev` to start locally.
