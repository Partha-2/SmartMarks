'use client';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';
import { Bookmark as BookmarkIcon } from 'lucide-react';

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-500/20">
                <BookmarkIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              Organize your digital world.
            </h1>
            <p className="text-xl text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed">
              A simple, real-time bookmark manager for humans. Private, fast, and synced everywhere.
            </p>
            <button
              onClick={signInWithGoogle}
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              Get Started with Google
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Add Bookmark</h2>
              <BookmarkForm />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Your Bookmarks</h2>
            <BookmarkList />
          </div>
        </div>
      </main>
    </div>
  );
}
