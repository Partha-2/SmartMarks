'use client';

import { useAuth } from './AuthProvider';
import { Bookmark, LogOut, User, Menu } from 'lucide-react';

export default function Navbar() {
    const { user, signInWithGoogle, signOut, loading } = useAuth();

    if (loading) return null;

    return (
        <nav className="border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4 group">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Bookmark className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="font-extrabold text-2xl tracking-tighter text-white">SmartMarks</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500 opacity-80 leading-none">Real-time sync</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900/50 rounded-2xl border border-neutral-800 shadow-inner group transition-all hover:bg-neutral-900">
                                {user.user_metadata.avatar_url ? (
                                    <div className="relative">
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="avatar"
                                            className="w-7 h-7 rounded-lg object-cover ring-1 ring-neutral-700"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-950"></div>
                                    </div>
                                ) : (
                                    <div className="w-7 h-7 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                                        <User className="w-4 h-4 text-neutral-400" />
                                    </div>
                                )}
                                <div className="hidden sm:flex flex-col -gap-1">
                                    <span className="text-xs font-black text-neutral-200 truncate max-w-[120px]">
                                        {user.user_metadata.full_name || user.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Free Plan</span>
                                </div>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-3 hover:bg-red-500/10 rounded-2xl transition-all text-neutral-500 hover:text-red-400 border border-transparent hover:border-red-500/20"
                                title="Log out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="px-6 py-3 bg-white text-black text-sm font-black rounded-2xl hover:bg-neutral-200 transition-all shadow-xl shadow-white/5 active:scale-95"
                        >
                            Log in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
