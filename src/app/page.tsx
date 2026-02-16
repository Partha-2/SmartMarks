'use client';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';
import { Bookmark as BookmarkIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-25"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl">
            <BookmarkIcon className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col selection:bg-blue-500/30">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <div className="relative max-w-3xl z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-10"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-neutral-900 p-6 rounded-[2rem] shadow-2xl ring-1 ring-neutral-800 transition-transform group-hover:scale-110 duration-500">
                  <BookmarkIcon className="w-16 h-16 text-blue-500" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]"
            >
              Curate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">
                digital world.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed font-medium"
            >
              The minimal, real-time bookmark manager for humans.
              Private by design, fast by nature.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={signInWithGoogle}
                className="group relative px-10 py-5 bg-white text-black font-black rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3 text-xl">
                  Get Started with Google
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-0"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-0"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
              Dashboard <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white mb-2">
            Your Collection
          </h1>
          <p className="text-neutral-500 font-medium text-lg">
            A live feed of your workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
          <div className="xl:col-span-4">
            <div className="sticky top-28 space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-600/10 rounded-xl">
                    <Plus className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-wider">Quick Add</h2>
                </div>
                <BookmarkForm />
              </section>

              <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] hidden xl:block">
                <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-[0.2em]">Sync Status</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-40"></div>
                  </div>
                  <span className="text-neutral-300 font-bold text-sm">Real-time connection active</span>
                </div>
                <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                  Your link library is synced securely across all active devices.
                </p>
              </div>
            </div>
          </div>
          <div className="xl:col-span-8">
            <BookmarkList />
          </div>
        </div>
      </main>
    </div>
  );
}

// Re-using Pulse from earlier as a named icon for clarity in the JSX if needed
function Plus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
